import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)} {...props}>
      <InfiniteSlider gap={64} duration={32} durationOnHover={120}>
        {logos.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={logo.width ?? 140}
            height={logo.height ?? 40}
            className="h-8 w-auto opacity-90 transition hover:opacity-100 md:h-10"
            loading="lazy"
          />
        ))}
      </InfiniteSlider>

    </div>
  );
}