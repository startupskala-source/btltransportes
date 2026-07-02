import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";



export type CarouselLogo = {
  id: number;
  name: string;
  src: string;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeLogos = (allLogos: CarouselLogo[], columnCount: number): CarouselLogo[][] => {
  const shuffled = shuffleArray(allLogos);
  const columns: CarouselLogo[][] = Array.from({ length: columnCount }, () => []);
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });
  const maxLength = Math.max(...columns.map((c) => c.length));
  // Pad shorter columns without repeating a logo inside the same column.
  let padCursor = 0;
  columns.forEach((col) => {
    while (col.length < maxLength) {
      let candidate = shuffled[padCursor % shuffled.length];
      let attempts = 0;
      while (col.some((l) => l.id === candidate.id) && attempts < shuffled.length) {
        padCursor += 1;
        candidate = shuffled[padCursor % shuffled.length];
        attempts += 1;
      }
      col.push(candidate);
      padCursor += 1;
    }
  });
  return columns;
};

interface LogoColumnProps {
  logos: CarouselLogo[];
  index: number;
  currentTime: number;
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(({ logos, index, currentTime }) => {
  const cycleInterval = 2000;
  const adjustedTime = currentTime % (cycleInterval * logos.length);
  const currentIndex = Math.floor(adjustedTime / cycleInterval);

  const current = useMemo(() => logos[currentIndex], [logos, currentIndex]);

  return (
    <motion.div
      className="relative h-12 w-16 overflow-hidden sm:h-14 sm:w-24 md:h-20 md:w-36"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`${current.id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "10%", opacity: 0, filter: "blur(6px)" }}
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 1,
              bounce: 0.2,
              duration: 0.5,
            },
          }}
          exit={{
            y: "-20%",
            opacity: 0,
            filter: "blur(6px)",
            transition: { type: "tween", ease: "easeIn", duration: 0.3 },
          }}
        >
          <img
            src={current.src}
            alt={current.name}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            draggable={false}
            className="max-h-full max-w-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});
LogoColumn.displayName = "LogoColumn";

interface LogoCarouselProps {
  columnCount?: number;
  logos: CarouselLogo[];
}

export function LogoCarousel({ columnCount = 4, logos }: LogoCarouselProps) {
  const effectiveColumnCount = columnCount;

  const logoSets = useMemo(
    () => distributeLogos(logos, effectiveColumnCount),
    [logos, effectiveColumnCount],
  );
  const [currentTime, setCurrentTime] = useState(0);
  const preloadRunRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  const updateTime = useCallback(() => {
    setCurrentTime((prev) => prev + 50);
  }, []);

  useEffect(() => {
    const runId = preloadRunRef.current + 1;
    preloadRunRef.current = runId;
    setIsReady(false);
    setCurrentTime(0);

    const uniqueSources = Array.from(new Set(logos.map((logo) => logo.src)));

    Promise.all(
      uniqueSources.map(
        (src) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = src;

            if (image.complete) {
              resolve();
              return;
            }

            if (image.decode) {
              image.decode().then(resolve).catch(resolve);
            }
          }),
      ),
    ).then(() => {
      if (preloadRunRef.current === runId) {
        setIsReady(true);
      }
    });
  }, [logos]);

  useEffect(() => {
    if (!isReady || logoSets.length === 0) return;
    const id = setInterval(updateTime, 50);
    return () => clearInterval(id);
  }, [isReady, updateTime, logoSets.length]);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10">
      {logoSets.map((cols, index) => (
        <LogoColumn key={index} logos={cols} index={index} currentTime={currentTime} />
      ))}
    </div>
  );
}

