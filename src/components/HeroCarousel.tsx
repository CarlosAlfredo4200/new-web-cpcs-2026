import { useEffect, useRef, useState } from "react";

import firstImage from "../assets/images/hero-2.jpg";
import secondImage from "../assets/images/hero-desktop.jpg.jpg";
import thirdImage from "../assets/images/hero-3-v2.jpg";

import AdmissionsHeroEffect from "./AdmissionsHeroEffect";
import "../assets/styles/hero-carousel.css";

const slides = [
  {
    image: firstImage,
    alt: "Admisiones 2027",
  },
  {
    image: secondImage,
    alt: "Comunidad del Colegio Panamericano Colombosueco",
  },
  {
    image: thirdImage,
    alt: "Preescolar del Colegio Panamericano Colombosueco",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);

  // Cambio automático de fotografías cada 8 segundos.
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let interval: ReturnType<typeof setInterval> | undefined;

    const stop = () => {
      if (interval !== undefined) {
        clearInterval(interval);
        interval = undefined;
      }
    };

    const start = () => {
      stop();

      if (paused || motionPreference.matches || document.hidden) {
        return;
      }

      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % slides.length);
      }, 8000);
    };

    start();

    motionPreference.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);

    return () => {
      stop();
      motionPreference.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
    };
  }, [paused]);

  // Parallax en computador, respetando la preferencia de movimiento.
  useEffect(() => {
    const photo = photoRef.current;
    const hero = photo?.closest<HTMLElement>(".hero");

    if (!photo || !hero) return;

    const preference = window.matchMedia(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
    );

    let frame: number | null = null;

    const update = () => {
      frame = null;

      if (!preference.matches) {
        photo.style.setProperty("--parallax-y", "0px");
        return;
      }

      const rect = hero.getBoundingClientRect();
      const offset = Math.min(70, Math.max(-70, -rect.top * 0.15));

      photo.style.setProperty("--parallax-y", `${offset}px`);
    };

    const scheduleUpdate = () => {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);
    preference.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      preference.removeEventListener("change", scheduleUpdate);

      photo.style.removeProperty("--parallax-y");
    };
  }, []);

  return (
    <>
      <div className="hero-photo" ref={photoRef}>
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.image}
              className={[
                "hero-slide",
                isActive ? "hero-slide--active" : "",
                index % 2 === 0
                  ? "hero-slide--grow"
                  : "hero-slide--shrink",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />

             <AdmissionsHeroEffect paused={paused || !isActive} />
            </div>
          );
        })}
      </div>

      <div
        className="hero-carousel-controls"
        role="group"
        aria-label="Controles de las fotografías"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={[
              "hero-carousel-dot",
              index === activeIndex
                ? "hero-carousel-dot--active"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={`Mostrar fotografía ${index + 1}`}
            aria-pressed={index === activeIndex}
            onClick={() => {
              setActiveIndex(index);
              setPaused(true);
            }}
          />
        ))}

        <button
          type="button"
          className="hero-carousel-pause"
          aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
          onClick={() => setPaused((current) => !current)}
        >
        
        </button>
      </div>
    </>
  );
}