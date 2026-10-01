"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyHydrateWhenVisibleProps = {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
  className?: string;
};

export default function LazyHydrateWhenVisible({
  children,
  fallback,
  rootMargin = "200px 0px",
  minHeight,
  className = "",
}: LazyHydrateWhenVisibleProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hydrate, setHydrate] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || hydrate) return;

    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no IntersectionObserver: hydrate immediately
      setHydrate(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHydrate(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hydrate, rootMargin]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={minHeight !== undefined ? { minHeight } : undefined}
    >
      {hydrate ? children : fallback}
    </div>
  );
}
