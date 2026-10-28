import { useEffect, useRef } from "react";
import "../assets/styles/missions-challenge.css";

// Guarda las ocho fotografías en:
// src/assets/images/desafio-misiones/
const availableImages = import.meta.glob<string>(
  "../assets/images/desafio-misiones/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const moments = [
  {
    id: 1,
    file: "misiones-01.jpg",
    word: "VE",
    message: "Da el primer paso. Hay vidas esperando buenas noticias.",
    alt: "Actividad del proyecto Desafío Misiones",
  },
  {
    id: 2,
    file: "misiones-02.jpg",
    word: "ORA",
    message: "Lleva a las naciones en tu corazón y en tus oraciones.",
    alt: "Encuentro de oración del proyecto Desafío Misiones",
  },
  {
    id: 3,
    file: "misiones-03.jpg",
    word: "COMPARTE",
    message: "Que tu voz anuncie la esperanza que transforma vidas.",
    alt: "Estudiantes compartiendo en Desafío Misiones",
  },
  {
    id: 4,
    file: "misiones-04.jpg",
    word: "SIRVE",
    message: "Haz visible el amor de Jesús con tus acciones.",
    alt: "Actividad de servicio del proyecto Desafío Misiones",
  },
  {
    id: 5,
    file: "misiones-05.jpg",
    word: "RESPONDE",
    message: "El llamado también es para ti. Di: aquí estoy.",
    alt: "Participación estudiantil en Desafío Misiones",
  },
  {
    id: 6,
    file: "misiones-06.jpg",
    word: "APRENDE",
    message: "Conoce otras culturas. Descubre un propósito sin fronteras.",
    alt: "Aprendizaje sobre las naciones en Desafío Misiones",
  },
  {
    id: 7,
    file: "misiones-07.jpg",
    word: "AMA",
    message: "Cruza las diferencias con un amor que acerca.",
    alt: "Encuentro de la comunidad educativa en Desafío Misiones",
  },
  {
    id: 8,
    file: "misiones-08.jpg",
    word: "ANUNCIA",
    message: "Lleva el mensaje de salvación a toda lengua, tribu y nación.",
    alt: "Jornada del proyecto Desafío Misiones",
  },
];

export default function MissionsChallenge() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let observer: IntersectionObserver | undefined;
    let frame: number | undefined;

    const configure = () => {
      observer?.disconnect();

      if (frame !== undefined) {
        window.cancelAnimationFrame(frame);
      }

      section.classList.remove("challenge--pending");

      if (preference.matches) return;

      section.classList.add("challenge--pending");

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;

          frame = window.requestAnimationFrame(() => {
            section.classList.remove("challenge--pending");
          });

          observer?.disconnect();
        },
        { threshold: 0.08 },
      );

      observer.observe(section);
    };

    configure();
    preference.addEventListener("change", configure);

    // Evita ocultar una fotografía que recibe foco por teclado.
    const revealOnFocus = () => {
      section.classList.remove("challenge--pending");
      observer?.disconnect();
    };

    section.addEventListener("focusin", revealOnFocus);

    return () => {
      observer?.disconnect();

      if (frame !== undefined) {
        window.cancelAnimationFrame(frame);
      }

      preference.removeEventListener("change", configure);
      section.removeEventListener("focusin", revealOnFocus);
      section.classList.remove("challenge--pending");
    };
  }, []);

  return (
    <section
      id="desafio-misiones"
      className="missions-challenge"
      ref={sectionRef}
      aria-labelledby="challenge-title"
    >
      <span className="challenge-watermark" aria-hidden="true">
        MISIONES
      </span>

      <div className="challenge-container">
        <div className="challenge-composition">
          <header className="challenge-heading">
            

            <h2 id="challenge-title">
              Desafío
              <span>Misiones</span>
            </h2>

            <p className="challenge-lead">
              Un llamado que comienza en el corazón y llega a las naciones.
            </p>

            <p className="challenge-description">
              Entrenamos a nuestros estudiantes para comprender el plan global
              de Dios para la humanidad. Junto a toda la comunidad educativa,
              aprendemos, oramos y desarrollamos estrategias para llevar el
              mensaje de salvación a toda lengua, tribu y nación.
            </p>

            
          </header>

          {moments.map((moment) => {
            const image =
              availableImages[
                `../assets/images/desafio-misiones/${moment.file}`
              ];

            return (
              <figure
                className={`challenge-photo challenge-photo--${moment.id}`}
                key={moment.id}
                tabIndex={0}
                aria-labelledby={`challenge-word-${moment.id}`}
                aria-describedby={`challenge-message-${moment.id}`}
              >
                {image ? (
                  <img
                    src={image}
                    alt={moment.alt}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="750"
                  />
                ) : (
                  <div className="challenge-placeholder" aria-hidden="true">
                    <span>Desafío Misiones</span>
                    <strong>
                      {String(moment.id).padStart(2, "0")}
                    </strong>
                    <span>Fotografía por agregar</span>
                  </div>
                )}

                <span className="challenge-photo-index" aria-hidden="true">
                  {String(moment.id).padStart(2, "0")}
                </span>

                <figcaption className="challenge-caption">
                  <span
                    className="challenge-word"
                    id={`challenge-word-${moment.id}`}
                  >
                    {moment.word}
                  </span>

                  <p id={`challenge-message-${moment.id}`}>
                    {moment.message}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <figure className="challenge-scripture">
          <span className="challenge-scripture-line" aria-hidden="true" />

          <blockquote>
            «Por tanto, id, y haced discípulos a todas las naciones…»
          </blockquote>

          <figcaption>Mateo 28:19 · RVR1960</figcaption>
        </figure>
      </div>
    </section>
  );
}