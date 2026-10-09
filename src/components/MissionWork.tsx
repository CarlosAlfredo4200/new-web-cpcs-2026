import { useEffect, useRef } from "react";
import "../assets/styles/mission-work.css";

// Permite agregar las fotografías después sin errores de importación.
const images = import.meta.glob<string>(
  "../assets/images/misiones/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

function findImage(name: string) {
  return Object.entries(images).find(([path]) =>
    path.split("/").pop()?.startsWith(`${name}.`),
  )?.[1];
}

const africaImage = findImage("africa-dicko");
const supportImage = findImage("apoyo-misionero");

export default function MissionWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    let observer: IntersectionObserver | undefined;

    const configure = () => {
      observer?.disconnect();
      section.classList.remove("mission--animated", "mission--visible");

      if (preference.matches) return;

      section.classList.add("mission--animated");

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;

          // Repite la entrada cuando vuelves a llegar a la sección.
          section.classList.toggle("mission--visible", entry.isIntersecting);
        },
        { threshold: 0, rootMargin: "0px 0px -60px 0px" },
      );

      observer.observe(section);
    };

    configure();
    preference.addEventListener("change", configure);

    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);

      section.classList.remove("mission--animated", "mission--visible");
    };
  }, []);

  return (
    <section
      id="obra-misionera"
      className="mission"
      ref={sectionRef}
      aria-labelledby="mission-title"
    >
      <div className="mission-container ">
        {/* Fotografías superpuestas */}
        <div className="mission-collage">
          <figure
            className="mission-photo mission-photo--back"
            data-mission-reveal="left"
          >
            {africaImage ? (
              <img
                src={africaImage}
                alt="Obra misionera apoyada en la aldea Dicko, África"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="mission-placeholder">
                Fotografía de la obra misionera en Dicko
              </div>
            )}

            <figcaption>Aldea Dicko · África</figcaption>
          </figure>

          <figure
            className="mission-photo mission-photo--front"
            data-mission-reveal="left"
          >
            {supportImage ? (
              <img
                src={supportImage}
                alt="Actividad de apoyo misionero de la comunidad CPCS"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="mission-placeholder">
                Fotografía del apoyo misionero
              </div>
            )}
          </figure>

          <div className="mission-badge">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M24 39 7 23C-3 12 13 1 24 14 35 1 51 12 41 23Z" />
              <path d="M24 18v12M18 24h12" />
            </svg>

            <span>Fe en acción</span>
          </div>
        </div>

        {/* Título y texto */}
        <div className="mission-copy">
          <header className="mission-heading" data-mission-reveal="top">
            <span className="mission-eyebrow">Servir también es educar</span>

            <h1 id="mission-heading">Proyección sin fronteras</h1>

            <div className="mission-divider" aria-hidden="true">
              <i />
              <i />
              <i />
              <span />
            </div>
          </header>

          <div className="mission-description" data-mission-reveal="bottom">
            <p>
              En el <strong>Colegio Panamericano Colombosueco</strong>, nuestra
              fe nos inspira a servir y compartir. Como comunidad educativa,
              hemos apoyado obras misioneras en la{" "}
              <strong>aldea Dicko, en África</strong>, y en{" "}
              <strong>Nepal, Ecuador y Bolivia</strong>.
            </p>

            <p>
              También hemos extendido nuestra solidaridad a las personas
              damnificadas por el terremoto en
              <strong> Urabá</strong>, acompañando a quienes enfrentan momentos
              de dificultad.
            </p>

            <p className="mission-message">
              Formamos corazones dispuestos a servir, llevando amor y esperanza
              más allá de nuestras aulas.
            </p>

            <ul className="mission-places" aria-label="Lugares apoyados">
              <li>África · Dicko</li>
              <li>Nepal</li>
              <li>Ecuador</li>
              <li>Bolivia</li>
              <li>Urabá · Colombia</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
