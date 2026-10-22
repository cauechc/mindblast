import { ImageResponse } from "next/og";

export const alt = "Casa Nova Interior: orçamentos gratuitos para sua casa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento (WhatsApp, Facebook, Google). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0A1B3D", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 34, fontWeight: 800, color: "#22C55E" }}>Casa Nova Interior</div>
        <div style={{ marginTop: 24, fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>Receba orçamentos gratuitos para sua casa em poucos minutos</div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#E6ECF7" }}>Energia Solar · Móveis Planejados · Ar-Condicionado</div>
        <div style={{ marginTop: 12, fontSize: 28, color: "#E6ECF7" }}>Salto · Itu · Indaiatuba · Cabreúva</div>
      </div>
    ),
    size,
  );
}
