import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import studentsImage from "../assets/images/1_futuro.png";
import "../assets/styles/admissions-promo.css";

export default function AdmissionsPromo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const elements = Array.from(
      section.querySelectorAll<HTMLElement>("[data-promo-reveal]"),
    );
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    const reveal = (element: HTMLElement) => {
      element.classList.remove("promo-reveal--pending");
      observer?.unobserve(element);
    };

    const configure = () => {
      observer?.disconnect();
      elements.forEach((element) => {
        element.classList.remove("promo-reveal--pending");
      });

      if (preference.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -35px 0px" },
      );

      elements.forEach((element) => {
        // No oculta un elemento que ya tenga el foco del teclado.
        if (element.contains(document.activeElement)) return;
        element.classList.add("promo-reveal--pending");
        observer?.observe(element);
      });
    };

    const handleFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-promo-reveal]");
      if (element && section.contains(element)) reveal(element);
    };

    configure();
    preference.addEventListener("change", configure);
    section.addEventListener("focusin", handleFocus);

    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      section.removeEventListener("focusin", handleFocus);
      elements.forEach((element) => {
        element.classList.remove("promo-reveal--pending");
      });
    };
  }, []);

  return (
    <section
      className="admissions-promo"
      ref={sectionRef}
      aria-labelledby="admissions-promo-title"
    >
      <div className="admissions-promo-container">
        <header className="admissions-promo-heading">
          <svg
            className="admissions-promo-icon"
            viewBox="0 0 80 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 68V28L40 12l30 16v40" />
            <path d="M6 28L40 8l34 20" />
            <path d="M31 68V48h18v20" />
            <rect x="18" y="35" width="8" height="8" rx="1" />
            <rect x="54" y="35" width="8" height="8" rx="1" />
            <path d="M40 39l-7-7a5 5 0 0 1 7-7 5 5 0 0 1 7 7Z" />
            <path d="M5 68h70" />
          </svg>

          <h2 id="admissions-promo-title">
            Admisiones Abiertas <span>2027</span>
          </h2>
        </header>

        <div className="admissions-promo-layout">
          {/* Izquierda: fotografía y tarjeta parcialmente superpuesta. */}
          <div className="admissions-promo-visual">
            <figure className="admissions-promo-image" data-promo-reveal="left">
              <img
                src={studentsImage}
                alt="Estudiantes con uniforme del colegio en una composición educativa"
                width="1024"
                height="893"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <div className="admissions-promo-card" data-promo-reveal="bottom">
              <div className="admissions-promo-card-heading">
                 

                <h3>
                  Admisiones Abiertas
                  <strong>2027</strong>
                </h3>
              </div>

              <div className="admissions-promo-copy">
                <p className="admissions-promo-subtitle">
                  Tu familia tiene un lugar aquí
                </p>

                <p className="admissions-promo-description">
                  Una educación CRISTIANA que fortalece los talentos,
                  los valores y el propósito de tus hijos.  
                </p>

                <Link
                  className="admissions-promo-button"
                  to="/admisiones"
                >
                  <span>Conoce el proceso de admisión</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <p className="admissions-promo-welcome">
                ¡Te esperamos!
              </p>
            </div>
          </div>

          {/* Derecha: video vertical. */}
          <div className="admissions-promo-video-column" data-promo-reveal="left">
            <div className="admissions-promo-phone">
              <video
                className="admissions-promo-video"
                controls
                playsInline
                preload="none"
                 poster="/src/assets/images/portada-admisiones.jpg.png"
                aria-label="Video institucional de admisiones"
              >
                <source
                  src="/videos/reel_admisiones.mp4"
                  type="video/mp4"
                />

                Tu navegador no admite este video.{" "}
                <a href="/videos/reel_admisiones.mp4">
                  Abrir video institucional
                </a>
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
