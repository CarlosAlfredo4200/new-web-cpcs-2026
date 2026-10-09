import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const images = import.meta.glob<string>("../assets/images/*.{png,jpg,jpeg,webp}", {
  eager: true, query: "?url", import: "default",
});

export function schoolPhoto(...names: string[]) {
  return names.map((name) => images[`../assets/images/${name}`]).find(Boolean);
}

export default function SchoolParallax({ src, alt, children, className = "" }: {
  src?: string; alt: string; children?: ReactNode; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
    );
    let frame: number | null = null;
    let visible = true;
    const update = () => {
      frame = null;
      if (!preference.matches) {
        element.style.setProperty("--school-parallax", "0px");
        return;
      }
      if (!visible) return;
      const rect = element.getBoundingClientRect();
      const distance = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.09;
      element.style.setProperty("--school-parallax", `${Math.max(-34, Math.min(34, distance))}px`);
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          visible = Boolean(entry?.isIntersecting);
          if (visible) schedule();
        }, { rootMargin: "100px" })
      : null;
    observer?.observe(element);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      observer?.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      element.style.removeProperty("--school-parallax");
    };
  }, []);

  return (
    <div className={`school-parallax ${className}`} ref={ref}>
      {src ? <img className="school-parallax-photo" src={src} alt={alt} loading="lazy" />
        : <div className="school-photo-placeholder">Fotografía institucional pendiente</div>}
      {children}
    </div>
  );
}
