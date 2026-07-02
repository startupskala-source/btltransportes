import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SatelliteBrazilMap } from "@/components/ui/satellite-brazil-map";

import { diferenciaisWarehouseImage } from "@/assets/diferenciais-warehouse-base64";
const warehouse = diferenciaisWarehouseImage;


import heroPoster from "@/assets/hero-truck.jpg";
import heroVideoWebm from "@/assets/hero-truck.webm";
import heroVideoMobileWebm from "@/assets/hero-truck-mobile.webm";
import heroVideo from "@/assets/hero-truck.mp4";
import heroVideoMobile from "@/assets/hero-truck-mobile.mp4";
import btlLogo from "@/assets/btl-logo-new.png";
import btlFooterLogo from "@/assets/btl-footer-logo.png";

import muellerLogo from "@/assets/mueller.png";
import osterLogo from "@/assets/oster.png";
import whirlpoolLogo from "@/assets/whirlpool.png";
import philipsLogo from "@/assets/philips.png";
import electroluxLogo from "@/assets/electrolux.png";
import geloparLogo from "@/assets/gelopar.png";
import colormaqLogo from "@/assets/colormaq.png";
import zemaLogo from "@/assets/zema.svg";
import mateusLogo from "@/assets/mateus.png";
import lilianiLogo from "@/assets/liliani.png";
import logoNovo from "@/assets/logo-novo.svg";
import { martinelloLogo } from "@/lib/martinello-logo";
import { grupoAtanLogo } from "@/lib/grupo-atan-logo";

import { LogoCarousel } from "@/components/ui/logo-carousel";
import { ContactCard } from "@/components/ui/contact-card";

import { TextEffect } from "@/components/ui/text-effect";
import {
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  PackageCheck,
  Refrigerator,
  ShoppingBag,
  Boxes,
  Route as RouteIcon,
  Target,
  Mountain,
  Telescope,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BTL Transportes — Linha branca e bazar com segurança" },
      { name: "description", content: "Transportadora especializada em linha branca e bazar. Frota própria, rastreamento em tempo real e cobertura nacional." },
      { property: "og:title", content: "BTL Transportes — Linha branca e bazar" },
      { property: "og:description", content: "Frota própria, rastreamento e cobertura nacional para sua carga." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Partners />
      <Services />
      <WhyUs />
      <Essence />
      <Clients />
      <Coverage />
      <BrazilFiliais />
      <Cta />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={btlLogo} alt="BTL Transportes e Armazenagem" className="h-12 w-12 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wider text-primary">BTL TRANSPORTES</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Transportes e Armazenagem</div>
          </div>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
          <a href="#servicos" className="transition hover:text-primary">Serviços</a>
          <a href="#diferenciais" className="transition hover:text-primary">Diferenciais</a>
          <a href="#cobertura" className="transition hover:text-primary">Cobertura</a>
          <a href="#contato" className="transition hover:text-primary">Contato</a>
        </nav>
        <a
          href="#contato"
          className="btn-primary-shine hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider md:inline-flex"
        >
          Entrar em contato <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function BackgroundVideo({ className = "" }: { className?: string }) {
  return (
    <>
      <img
        src={heroPoster}
        alt="Caminhão BTL em rota"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        loading="eager"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroPoster}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      >
        <source src={heroVideoMobileWebm} type="video/webm" media="(max-width: 767px)" />
        <source src={heroVideoWebm} type="video/webm" />
        <source src={heroVideoMobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={heroVideo} type="video/mp4" />
      </video>
    </>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black"
    >
      <BackgroundVideo className="z-0" />

      {/* readability overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-32 pb-24 text-center md:pt-40 md:pb-32">
        <TextEffect
          as="h1"
          per="word"
          preset="blur"
          delay={0.1}
          className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Sua carga no destino, sem surpresas.
        </TextEffect>

        <TextEffect
          as="p"
          per="word"
          preset="fade"
          delay={0.5}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
        >
          Especialistas em linha branca e bazar. Frota própria, equipe treinada e rastreamento em tempo real — do embarque à entrega.
        </TextEffect>

        <div
          className="mt-10 flex items-center gap-3 animate-fade-up"
          style={{ animationDelay: "0.9s", animationFillMode: "both", opacity: 0 }}
        >
          <a
            href="#contato"
            className="btn-primary-shine inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wider"
          >
            SAIBA MAIS
          </a>
          <a
            href="#servicos"
            aria-label="Ver serviços"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <ArrowRight className="h-4 w-4 -rotate-45" />
          </a>
        </div>
      </div>
    </section>
  );
}


function Marquee() {
  const items = [
    "Geladeiras", "Fogões", "Máquinas de lavar", "Micro-ondas", "Utensílios domésticos",
    "Eletroportáteis", "Bazar", "Pequenos eletros", "Linha branca",
  ];
  const loop = [...items, ...items];
  return (
    <section className="overflow-hidden border-y border-border bg-secondary py-6">
      <div className="flex w-[200%] animate-marquee gap-12 whitespace-nowrap">
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-3 font-display text-2xl tracking-wider text-primary/80">
            {it}
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </section>
  );
}

function Partners() {
  const logos = [
    { id: 1, name: "Whirlpool", src: whirlpoolLogo },
    { id: 3, name: "Philips", src: philipsLogo },
    { id: 4, name: "Electrolux", src: electroluxLogo },
    { id: 5, name: "Gelopar", src: geloparLogo },
    { id: 6, name: "Mueller", src: muellerLogo },
    { id: 7, name: "Oster", src: osterLogo },
    { id: 8, name: "Sancol", src: logoNovo },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
            Indústrias que confiam
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Parceiros de estrada
          </h2>
        </div>
        <LogoCarousel columnCount={4} logos={logos} />
      </div>
    </section>
  );
}

function Clients() {
  const logos = [
    { id: 1, name: "Zema", src: zemaLogo },
    { id: 2, name: "Grupo Mateus", src: mateusLogo },
    { id: 3, name: "Magazine Liliani", src: lilianiLogo },
    { id: 4, name: "Grupo Atan", src: grupoAtanLogo },
    { id: 5, name: "Colormaq", src: colormaqLogo },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
            Clientes
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Quem confia na BTL
          </h2>
        </div>
        <LogoCarousel columnCount={4} logos={logos} />
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Refrigerator,
      title: "Linha Branca",
      desc: "Geladeiras, fogões, máquinas de lavar, freezers. Manuseio especializado e embalagens reforçadas para zero avaria.",
    },
    {
      icon: Boxes,
      title: "Armazenagem",
      desc: "Galpões próprios com controle de inventário, picking e cross-docking para distribuição imediata.",
    },
    {
      icon: RouteIcon,
      title: "Distribuição Nacional",
      desc: "Rotas otimizadas e malha logística que cobre as cinco regiões com previsibilidade de prazos.",
    },
  ];
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <span className="mr-2 inline-block h-px w-8 align-middle bg-primary" />
            O que transportamos
          </div>
          <h2 className="font-display text-5xl tracking-wide text-foreground md:text-6xl">
            Carga certa, <span className="text-primary italic">manuseio certo.</span>
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Cada categoria tem suas exigências. Treinamos nossa equipe e equipamos nossa frota para cada uma delas.
        </p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="group flex flex-col gap-4 bg-card p-8 transition hover:bg-primary hover:text-primary-foreground">
            <s.icon className="h-10 w-10 text-primary transition group-hover:text-primary-foreground group-hover:scale-110" strokeWidth={1.5} />
            <h3 className="font-display text-2xl tracking-wide">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground transition group-hover:text-primary-foreground/80">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: ShieldCheck, title: "Carga 100% segurada", desc: "Cobertura completa do embarque à entrega." },
    
    { icon: Clock, title: "Prazo cumprido", desc: "98% das entregas dentro do prazo combinado." },
    { icon: MapPin, title: "Rastreio em tempo real", desc: "Acompanhe cada quilômetro da sua carga." },
  ];
  const stats = [
    { value: "98%", label: "Entregas no prazo" },
    { value: "15+", label: "Anos de estrada" },
    { value: "100%", label: "Carga segurada" },
    { value: "24/7", label: "Rastreio ativo" },
  ];
  return (
    <section id="diferenciais" className="relative bg-background text-foreground">
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        {/* Image side — full bleed, no card */}
        <div className="relative h-[60vh] min-h-[460px] w-full lg:h-auto lg:min-h-[760px]">
          <img
            src={warehouse}
            alt="Galpão BTL com linha branca paletizada e organizada"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            width={1600}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/95" />
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center px-6 py-20 md:px-12 md:py-28 lg:px-16">
          <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
            Por que a BTL
          </div>
          <h2 className="font-display text-4xl leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
            Logística pensada
            <br />
            para <span className="text-primary italic">carga delicada.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Linha branca e bazar pedem cuidado redobrado. Cada motorista, ajudante e operador passa por treinamento contínuo — porque uma entrega bem feita começa muito antes do caminhão sair do pátio.
          </p>

          {/* Differentiators as clean list */}
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {items.map((it) => (
              <li key={it.title} className="group flex items-start gap-5 py-5 transition hover:bg-muted/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <it.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg leading-snug tracking-tight">{it.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Stats strip */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl tracking-tight text-foreground md:text-4xl">{s.value}</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Essence() {
  const pillars = [
    {
      icon: Target,
      title: "Propósito",
      desc: "Existimos para mover o Brasil levando muito mais do que cargas. Levamos oportunidades, desenvolvimento e qualidade de vida, conectando pessoas, empresas e sonhos em cada entrega.",
    },
    {
      icon: Mountain,
      title: "Missão",
      desc: "Conectar pessoas, empresas e sonhos por meio de soluções logísticas seguras, eficientes e humanas, transportando não apenas mercadorias, mas tudo aquilo que transforma a vida das pessoas.",
    },
    {
      icon: Telescope,
      title: "Visão",
      desc: "Construir uma empresa sólida, admirada e perene, referência no transporte rodoviário de cargas, reconhecida pela excelência, pela cultura e pelas pessoas que fazem parte da nossa história.",
    },
  ];
  return (
    <section id="essencia" className="relative bg-background">
      {/* Pillars block */}
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-14 text-center">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
            Nossa Essência
          </div>
          <h2 className="font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
            Transportamos muito mais do que <span className="italic text-primary">cargas.</span>
            <br />
            Transportamos <span className="italic text-primary">confiança.</span>
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {pillars.map((p) => (
            <div key={p.title} className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <p.icon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-2xl tracking-tight text-primary md:text-3xl">{p.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

function Coverage() {
  const regions = [
    { name: "Sudeste", states: "SP · MG · ES" },
    { name: "Sul", states: "PR · SC" },
    { name: "Centro-Oeste", states: "GO · MT · MS" },
    { name: "Nordeste", states: "BA · PE · CE · e mais" },
    { name: "Norte", states: "PA · AM · TO · e mais" },
  ];
  return (
    <section id="cobertura" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <span className="mr-2 inline-block h-px w-8 align-middle bg-primary" />
            Cobertura nacional
          </div>
          <h2 className="font-display text-5xl tracking-wide md:text-6xl">
            do sul ao norte do brasil, <span className="text-primary italic">sem perder o ritmo.</span>
          </h2>
        </div>
      <div className="grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-5">
        {regions.map((r) => (
          <div key={r.name} className="bg-card p-8">
            <MapPin className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-2xl tracking-wide">{r.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{r.states}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  return (
    <section id="contato" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-display text-4xl tracking-tight text-primary md:text-5xl lg:text-6xl">
            Preencha e aguarde o nosso contato.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Preencha ou entre em contato via e-mail
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const raw = new FormData(form);

            const nome = String(raw.get("nome") || "").trim();
            const empresa = String(raw.get("empresa") || "").trim();
            const email = String(raw.get("email") || "").trim();
            const whatsapp = String(raw.get("whatsapp") || "").trim();
            const assunto = String(raw.get("assunto") || "").trim();
            const mensagem = String(raw.get("mensagem") || "").trim();

            const payload = new FormData();
            payload.append("access_key", "15665dfd-0a5d-465b-abbd-97911e59e3d0");
            payload.append("subject", `📩 Novo contato BTL — ${assunto || "Sem assunto"}`);
            payload.append("from_name", `BTL Transportes • ${nome || "Novo contato"}`);
            if (email) payload.append("replyto", email);
            payload.append("botcheck", String(raw.get("botcheck") || ""));

            payload.append("👤 Nome", nome || "—");
            payload.append("🏢 Empresa", empresa || "—");
            payload.append("✉️ E-mail", email || "—");
            payload.append("📱 WhatsApp", whatsapp || "—");
            payload.append("🏷️ Assunto", assunto || "—");
            payload.append("💬 Mensagem", mensagem || "—");

            setStatus("sending");
            setErrorMsg("");
            try {
              const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: payload,
              });
              const json = await res.json();
              if (json.success) {
                setStatus("success");
                form.reset();
              } else {
                setStatus("error");
                setErrorMsg(json.message || "Falha no envio.");
              }
            } catch (err) {
              setStatus("error");
              setErrorMsg("Não foi possível enviar. Verifique sua conexão.");
            }
          }}
          className="space-y-10"
        >
          {/* Honeypot */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          {/* Two-column fields */}
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            <UnderlineField name="nome" label="Nome" required />
            <UnderlineField name="empresa" label="Empresa" />
            <UnderlineField name="email" label="Email" type="email" required />
            <UnderlineField name="whatsapp" label="WhatsApp" type="tel" />
          </div>

          <UnderlineField name="mensagem" label="Mensagem" />

          {/* Bottom row: radios + button */}
          <div className="grid items-end gap-10 md:grid-cols-2">
            {/* Radio group */}
            <fieldset>
              <legend className="mb-4 text-sm font-medium text-primary">
                Selecione uma opção
              </legend>
              <div className="space-y-3">
                {[
                  { value: "orcamentos", label: "Orçamentos" },
                  { value: "frota", label: "Frota" },
                  { value: "mecanica", label: "Mecânica/Manutenção" },
                  { value: "rh", label: "Recrutamento" },
                ].map((opt) => (
                  <label key={opt.value} className="flex cursor-pointer items-center gap-3 group">
                    <input
                      type="radio"
                      name="assunto"
                      value={opt.value}
                      defaultChecked={opt.value === "frota"}
                      className="peer sr-only"
                    />
                    <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary/40 bg-transparent transition-colors duration-200 group-hover:border-primary peer-checked:border-primary peer-checked:bg-primary" />

                    <span className="text-sm text-foreground/80 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1 peer-checked:text-foreground peer-checked:font-medium peer-checked:translate-x-1">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary-shine w-full rounded-sm py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground cursor-pointer transition-transform duration-150 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Enviando..." : "Enviar"}
            </button>
          </div>

          {status === "success" && (
            <p className="text-center text-sm font-medium text-green-700">
              Mensagem enviada! Em breve entraremos em contato.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm font-medium text-red-700">
              {errorMsg || "Erro ao enviar. Tente novamente."}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function UnderlineField({
  name,
  label,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="group block">
      <span className="mb-3 block text-sm font-medium text-primary">
        {label}
        {required && <span className="ml-0.5">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-0 border-b-2 border-primary/20 bg-transparent pb-3 text-sm text-foreground outline-none transition focus:border-primary"
      />
    </label>
  );
}


function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-black text-white">
      <BackgroundVideo className="z-0" />
      {/* dark overlay for readability */}
      <div className="absolute inset-0 z-10 bg-black/75" />
      {/* glass marsala line at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative z-20 mx-auto grid max-w-7xl gap-8 px-6 py-10 md:gap-12 md:py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-4">
            <img src={btlFooterLogo} alt="BTL Transportes" className="h-20 w-20 object-contain md:h-24 md:w-24" loading="lazy" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
            Especialistas em linha branca e bazar. Sua carga tratada com o mesmo cuidado de quem a fabricou.
          </p>
        </div>

        <div>
          <h4 className="mb-3 inline-block border-b border-white pb-1 text-sm font-bold uppercase tracking-[0.2em] text-white md:mb-4">Serviços</h4>
          <ul className="space-y-2 text-sm text-white">
            <li><a href="#servicos" className="transition hover:text-primary">Linha Branca</a></li>
            
            <li><a href="#servicos" className="transition hover:text-primary">Armazenagem</a></li>
            <li><a href="#servicos" className="transition hover:text-primary">Distribuição Nacional</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 inline-block border-b border-white pb-1 text-sm font-bold uppercase tracking-[0.2em] text-white md:mb-4">Empresa</h4>
          <ul className="space-y-2 text-sm text-white">
            <li><a href="#diferenciais" className="transition hover:text-primary">Diferenciais</a></li>
            <li><a href="#cobertura" className="transition hover:text-primary">Cobertura</a></li>
            <li><a href="#filiais" className="transition hover:text-primary">Filiais</a></li>
            <li><a href="#contato" className="transition hover:text-primary">Contato</a></li>
            <li><a href="#essencia" className="transition hover:text-primary">Nossos Valores</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 inline-block border-b border-white pb-1 text-sm font-bold uppercase tracking-[0.2em] text-white md:mb-4">Fale com a gente</h4>
          <ul className="space-y-3 text-sm text-white">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-white" /> (47) 3620-0917</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-white" /> contato@btltransportes.com.br</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-white" /> Atendimento em todo o Brasil</li>
          </ul>
        </div>
      </div>

      <div className="relative z-20 border-t border-white/10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-white/70 md:flex-row md:py-6">
          <p>Copyright © 2026 BTL Transportes. Todos os direitos reservados.</p>
          <p className="uppercase tracking-[0.25em]">CNPJ 34.904.898/0003-06 · ANTT · Carga Segurada</p>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-6 text-center md:pb-8">
          <a
            href="https://skalanegocios.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="skala-credit"
            aria-label="Feito com carinho SKALA NEGÓCIOS"
          >
            <span className="skala-credit-prefix">Feito com carinho</span>
            <span className="skala-credit-heart">❤</span>
            <span className="skala-credit-text">SKALA NEGÓCIOS</span>
          </a>
        </div>
      </div>

    </footer>
  );
}



// ============================================================================
// Brazil filiais map
// ============================================================================

const FILIAIS: Array<{ city: string; uf: string; lat: number; lng: number; hq?: boolean }> = [
  { city: "São Paulo", uf: "SP", lat: -23.5505, lng: -46.6333, hq: true },
  { city: "Belo Horizonte", uf: "MG", lat: -19.9167, lng: -43.9345 },
  { city: "Curitiba", uf: "PR", lat: -25.4284, lng: -49.2733 },
  { city: "Salvador", uf: "BA", lat: -12.9777, lng: -38.5016 },
  { city: "Recife", uf: "PE", lat: -8.0476, lng: -34.8770 },
  { city: "Fortaleza", uf: "CE", lat: -3.7319, lng: -38.5267 },
  { city: "Manaus", uf: "AM", lat: -3.119, lng: -60.0217 },
];

function BrazilFiliais() {
  const allPins = [
    { city: "Jundiaí", uf: "SP", lat: -23.1864, lng: -46.8842, hq: true },
    { city: "Joinville", uf: "SC", lat: -26.3044, lng: -48.8456 },
    { city: "Camaçari", uf: "BA", lat: -12.6975, lng: -38.3242 },
    { city: "Alfredo Chaves", uf: "ES", lat: -20.5425, lng: -40.8237 },
    { city: "Ananindeua", uf: "PA", lat: -1.3539, lng: -48.3028 },
    { city: "Marabá", uf: "PA", lat: -5.3688, lng: -49.1177 },
    { city: "Porto Nacional", uf: "TO", lat: -10.7014, lng: -48.4172 },
    { city: "Guaraí", uf: "TO", lat: -8.8361, lng: -48.5108 },
    { city: "Gurupi", uf: "TO", lat: -11.7292, lng: -49.0680 },
    { city: "Xinguara", uf: "PA", lat: -7.0954, lng: -49.9486 },
    { city: "São Geraldo do Araguaia", uf: "PA", lat: -7.3508, lng: -48.5542 },
    { city: "Guajará-Mirim", uf: "RO", lat: -10.7828, lng: -65.3394 },
    { city: "Cabo de Santo Agostinho", uf: "PE", lat: -8.2861, lng: -35.0320 },
    { city: "Lucas do Rio Verde", uf: "MT", lat: -13.0731, lng: -55.9150 },
    { city: "Araxá", uf: "MG", lat: -19.5932, lng: -46.9437 },
    { city: "Barreiras", uf: "BA", lat: -12.1439, lng: -44.9968 },
    { city: "Luís Eduardo Magalhães", uf: "BA", lat: -12.0926, lng: -45.9054 },
    { city: "Imperatriz", uf: "MA", lat: -5.4913, lng: -47.4925 },
    { city: "São Luís", uf: "MA", lat: -2.5297, lng: -44.3028 },
    { city: "Teresina", uf: "PI", lat: -5.0892, lng: -42.8016 },
    { city: "São José de Ribamar", uf: "MA", lat: -2.5617, lng: -44.0572 },
    { city: "Presidente Dutra", uf: "MA", lat: -5.2900, lng: -44.4931 },
    { city: "Campina Grande", uf: "PB", lat: -7.2307, lng: -35.8817 },
    { city: "Feira de Santana", uf: "BA", lat: -12.2664, lng: -38.9663 },
    { city: "Araguatins", uf: "TO", lat: -5.6505, lng: -47.7900 },
    { city: "Araguaína", uf: "TO", lat: -7.1911, lng: -48.2076 },
    { city: "Paraíso do Tocantins", uf: "TO", lat: -10.1736, lng: -48.8819 },
    { city: "Colinas do Tocantins", uf: "TO", lat: -8.0575, lng: -46.4265 },
  ];

  // Keep only one pin per state (prioritize HQ, then first in list)
  const seen = new Set<string>();
  const pins = allPins.filter((p) => {
    if (seen.has(p.uf)) return false;
    seen.add(p.uf);
    return true;
  });
  return (
    <section id="filiais" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <span className="mr-2 inline-block h-px w-8 align-middle bg-primary" />
            Nossas filiais
            <span className="ml-2 inline-block h-px w-8 align-middle bg-primary" />
          </div>
          <h2 className="font-display text-5xl tracking-wide md:text-6xl">
            Presença <span className="text-primary italic">de norte a sul</span> do Brasil
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Uma rede de filiais estrategicamente posicionadas para entregar mais rápido, com custo justo e total rastreabilidade.
          </p>
        </div>
      </div>

      {/* Mapa satélite full-bleed, responsivo */}
      <div className="relative mt-12 left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]">
        <div className="relative h-[60vh] min-h-[420px] md:h-[75vh] md:min-h-[600px] w-full overflow-hidden border-y border-border bg-black">
          <SatelliteBrazilMap pins={pins} color="oklch(0.38 0.14 18)" />
        </div>
      </div>
    </section>
  );
}

