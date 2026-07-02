import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  /** seconds for one full loop */
  speed?: number;
};

/**
 * Marquee de logos com loop infinito 100% CSS.
 * - Cada logo tem container de tamanho fixo (mesma altura/largura)
 * - Duplica a lista para loop sem saltos
 * - Responsivo: velocidade proporcional em telas menores
 */
export function LogoCloud({
  logos,
  className,
  speed = 40,
  ...props
}: LogoCloudProps) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
      {...props}
    >
      <div
        className="flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={
          {
            ["--marquee-duration" as string]: `${speed}s`,
          } as React.CSSProperties
        }
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14 md:gap-20 md:pr-20"
          >
            {logos.map((logo, i) => (
              <li
                key={`${copy}-${logo.alt}-${i}`}
                className="flex h-10 w-24 shrink-0 items-center justify-center sm:h-12 sm:w-32 md:h-14 md:w-36"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  draggable={false}
                  className="max-h-full max-w-full object-contain opacity-80 transition hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
