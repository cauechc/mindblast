import { BadgeCheck, Lock, MapPin, Users } from "lucide-react";
import { cities } from "@/config/site";
import { Container } from "../ui";

const points = [
  { icon: BadgeCheck, title: "Profissionais da região", text: "Buscamos empresas e técnicos que atendem a sua cidade." },
  { icon: Users, title: "Atendimento humano", text: "Seu pedido é lido por uma pessoa, não por um robô." },
  { icon: Lock, title: "Dados protegidos", text: "Seguimos a LGPD. Seu contato não é vendido nem divulgado." },
];

export function Trust() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="rounded-[2rem] bg-navy-900 px-6 py-14 text-center text-white sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-400">Rede regional</p>
          <p className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Estamos construindo a maior rede de serviços residenciais da região.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {cities.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-leaf-400" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-leaf-50 text-leaf">
                <p.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-extrabold text-navy-900">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
