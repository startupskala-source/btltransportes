import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ContactInfo = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  className?: string;
};

interface ContactCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  infos: ContactInfo[];
  children?: React.ReactNode;
}

function CornerPlus({ className }: { className?: string }) {
  return (
    <span
      className={cn("pointer-events-none absolute h-4 w-4 text-black/40", className)}
      aria-hidden
    >
      <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
      <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
    </span>
  );
}

export function ContactCard({
  title = "Fale com a gente",
  description = "Tem dúvidas sobre nossos serviços ou precisa de uma cotação? Preencha o formulário ao lado. Respondemos em até 1 dia útil.",
  infos,
  children,
  className,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-6 text-neutral-900 backdrop-blur-2xl sm:p-8 md:p-14",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/60"
      />


      <CornerPlus className="-left-2 -top-2" />
      <CornerPlus className="-right-2 -top-2" />
      <CornerPlus className="-bottom-2 -left-2" />
      <CornerPlus className="-bottom-2 -right-2" />

      <div className="relative grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="md:border-r md:border-black/10 md:pr-12">
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600">
            {description}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {infos.map((info) => {
              const Icon = info.icon;
              const Inner = (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/5 ring-1 ring-black/10">
                    <Icon className="h-5 w-5 text-neutral-900" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-neutral-900">{info.label}</div>
                    <div className="truncate text-sm text-neutral-600">{info.value}</div>
                  </div>
                </div>
              );
              return (
                <div key={info.label} className={info.className}>
                  {info.href ? (
                    <a href={info.href} className="block transition hover:opacity-70">
                      {Inner}
                    </a>
                  ) : (
                    Inner
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
