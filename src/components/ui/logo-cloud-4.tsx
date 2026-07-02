import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Logo = {
  src: string;
  alt: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  /** duração do loop em desktop (segundos) */
  speed?: number;
  /** duração do loop em mobile (segundos) — menor = mais rápido */
  mobileSpeed?: number;
};

/**
 * Marquee de logos com loop infinito 100% CSS.
 * - Cada logo tem container fixo do mesmo tamanho
 * - Duplica a lista N vezes até preencher pelo menos 2x a viewport
 *   (garante loop sem "restart" visível em telas grandes ou pequenas)
 */
export function LogoCloud({
  logos,
  className,
  speed = 40,
  mobileSpeed = 22,
  ...props
}: LogoCloudProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const duration = isMobile ? mobileSpeed : speed;

  return (
    <div
      className={cn("group relative w-full overflow-hidden", className)}
      {...props}
    >
      <div
        className="flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={
          {
            ["--marquee-duration" as string]: `${duration}s`,
          } as React.CSSProperties
        }
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-10 sm:gap-14 md:gap-20"
          >
            {logos.map((logo, i) => (
              <li
                key={`${copy}-${logo.alt}-${i}`}
                className="mx-5 flex h-10 w-24 shrink-0 items-center justify-center sm:mx-7 sm:h-12 sm:w-32 md:mx-10 md:h-14 md:w-36"
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
