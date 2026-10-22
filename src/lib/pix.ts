import QRCode from "qrcode";

/**
 * Pix estático "copia e cola" (BR Code, padrão EMV do Banco Central) com valor e identificador do pedido.
 * Funciona só com a chave Pix, sem provedor; a confirmação do pagamento é manual.
 * Variáveis: PIX_KEY, PIX_MERCHANT_NAME (titular da conta), PIX_MERCHANT_CITY.
 */

const field = (id: string, value: string) => `${id}${String(value.length).padStart(2, "0")}${value}`;

/** Remove acentos e caracteres fora do padrão do BR Code. */
const clean = (s: string, max: number) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9 ]/g, "").toUpperCase().slice(0, max).trim();

function crc16(payload: string) {
  let crc = 0xffff;
  for (const byte of Buffer.from(payload, "utf8")) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export const staticPixConfigured = () => Boolean(process.env.PIX_KEY);

export function pixPayload({ amountCents, txid }: { amountCents: number; txid: string }) {
  const key = process.env.PIX_KEY!.trim();
  const body =
    field("00", "01") +
    field("26", field("00", "br.gov.bcb.pix") + field("01", key)) +
    field("52", "0000") +
    field("53", "986") +
    field("54", (amountCents / 100).toFixed(2)) +
    field("58", "BR") +
    field("59", clean(process.env.PIX_MERCHANT_NAME ?? "MIND BLAST", 25)) +
    field("60", clean(process.env.PIX_MERCHANT_CITY ?? "SALTO", 15)) +
    field("62", field("05", txid.replace(/[^A-Za-z0-9]/g, "").slice(0, 25))) +
    "6304";
  return body + crc16(body);
}

export async function pixQrDataUrl(payload: string) {
  return QRCode.toDataURL(payload, { margin: 1, width: 320, color: { dark: "#070B1F", light: "#FFFFFF" } });
}
