import { useRef, useState, useCallback } from "react";

interface SeamlessVideoProps {
  src: string;
  mobileSrc?: string;
  className?: string;
}

export function SeamlessVideo({ src, mobileSrc, className = "" }: SeamlessVideoProps) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const durationRef = useRef(0);
  const threshold = 0.8; // seconds before end to start crossfade

  const handleLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!durationRef.current) {
      durationRef.current = e.currentTarget.duration;
    }
  }, []);

  const handleTimeUpdate = useCallback(
    (idx: number) => {
      const current = refs.current[idx];
      if (!current || !durationRef.current) return;
      const remaining = durationRef.current - current.currentTime;
      if (remaining <= threshold) {
        const next = (idx + 1) % 2;
        const nextVideo = refs.current[next];
        if (nextVideo && nextVideo.paused) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {});
          setActive(next);
        }
      }
    },
    []
  );

  return (
    <>
      {[0, 1].map((i) => (
        <video
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          autoPlay={i === 0}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={() => handleTimeUpdate(i)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            active === i ? "opacity-100" : "opacity-0"
          } ${className}`}
        >
          <source src={mobileSrc ?? src} type="video/mp4" />
        </video>
      ))}
    </>
  );
}
