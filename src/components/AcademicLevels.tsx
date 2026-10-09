import { useEffect, useRef } from "react";
import "../assets/styles/academic-levels.css";
import preschoolImage from "../assets/images/preescolar.png";
import primaryImage from "../assets/images/pre_primaria.jpg";
import secondaryImage from "../assets/images/secondaryImage.jpg";

// const optionalImages = import.meta.glob<string>(
//   "../assets/images/secundaria_card.{png,jpg,jpeg,webp}",
//   {
//     eager: true,
//     query: "?url",
//     import: "default",
//   },
// );

// const secondaryImage = Object.values(optionalImages)[0];

const levels = [
  {
    number: "01",
    title: "Preescolar",
    image: preschoolImage,
    alt: "Estudiantes de preescolar del colegio",
    schedule: "7:00 a. m. – 12:30 p. m.",
    day: "Jornada de la mañana",
    details: ["Pre-Jardín: 3 años", "Jardín: 4 años", "Transición: 5 años"],
  },
  {
    number: "02",
    title: "Básica primaria",
    image: primaryImage,
    alt: "Estudiantes de básica primaria del colegio",
    schedule: "7:00 a. m. – 1:15 p. m.",
    day: "Jornada única",
    details: [],
  },
  {
    number: "03",
    title: "Básica secundaria y media académica",
    image: secondaryImage,
    alt: "Estudiantes de secundaria y media del colegio",
    schedule: "7:00 a. m. – 3:00 p. m.",
    day: "Jornada única",
    details: [],
  },
];

export default function AcademicLevels() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          section.classList.add("levels--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    section.classList.add("levels--animated");
    observer.observe(section);

    return () => {
      observer.disconnect();
      section.classList.remove("levels--animated", "levels--visible");
    };
  }, []);

  return (
    <section
      id="niveles"
      className="levels"
      ref={sectionRef}
      aria-labelledby="levels-title"
    >
      <div className="levels-container">
        <header className="levels-heading">
          <span className="levels-eyebrow">Nuestra propuesta educativa</span>

          <div className="levels-title-row">
            <svg
              className="levels-book"
              viewBox="0 0 80 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Libro abierto */}
              <path d="M40 22C30 14 18 13 8 16v43c12-3 23 0 32 7" />
              <path d="M40 22c10-8 22-9 32-6v43c-12-3-23 0-32 7" />
              <path d="M40 22v44" />
              <path d="M8 23H3v43c14-3 25 0 37 7 12-7 23-10 37-7V23h-5" />

              {/* Líneas de las páginas */}
              <path d="M16 28c6-1 11 1 16 4" />
              <path d="M16 39c6-1 11 1 16 4" />
              <path d="M48 32c5-3 10-5 16-4" />
              <path d="M48 43c5-3 10-5 16-4" />
            </svg>

            <h1 id="levels-heading">
              Niveles  académicos 
            </h1>
          </div>

           
        </header>

        <div className="levels-grid">
          {levels.map((level) => (
            <article
              className="academic-card"
              key={level.number}
              tabIndex={0}
              aria-labelledby={`academic-title-${level.number}`}
            >
              <div className="academic-image">
                {level.image && (
                  <img src={level.image} alt={level.alt} loading="lazy" />
                )}

                <h3 id={`academic-title-${level.number}`}>{level.title}</h3>
              </div>

              <div className="academic-reveal">
                <div className="academic-content">
                  <div className="academic-schedule">
                    <span>Horario académico</span>
                    <p>{level.schedule}</p>
                    <span>{level.day}</span>
                  </div>

                  {level.details.length > 0 && (
                    <ul className="academic-details">
                      {level.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
