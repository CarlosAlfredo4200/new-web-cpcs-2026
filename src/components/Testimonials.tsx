import { useEffect, useRef } from "react";
import "../assets/styles/testimonials.css";
import familyImage from "../assets/images/base_familia.png";
import familyTwo from "../assets/images/familia_2.jpeg";
import { MdFamilyRestroom } from "react-icons/md";


const testimonials = [
  {
    id: 1,
    label: "Familia — pendiente",
    text: "Espacio reservado para un testimonio autorizado de nuestra comunidad educativa.",
    image: familyImage,
  },
  {
    id: 2,
    label: "Familia Pérez Botero",
    text: "El colegio significa para nuestra familia la oportunidad de ver crecer a nuestras hijas en conocimiento, carácter y fe, aprendiendo que primero debemos ser antes que hacer. Valoramos una formación académica cimentada en principios cristocéntricos, que nos inspira a construir un legado de fe y amor para las futuras generaciones, formando líderes de testimonio de vida para las naciones.",
    image: familyTwo,
  },
  {
    id: 3,
    label: "Familia — pendiente",
    text: "Espacio reservado para un testimonio autorizado de nuestra comunidad educativa.",
    image: familyImage,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(".testimonial-card"),
    );

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    let observer: IntersectionObserver | undefined;

    const configure = () => {
      observer?.disconnect();

      cards.forEach((card) => {
        card.classList.remove("testimonial-card--pending");
      });

      if (preference.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Repite la entrada al salir y regresar a la tarjeta.
            entry.target.classList.toggle(
              "testimonial-card--pending",
              !entry.isIntersecting,
            );
          });
        },
        {
          threshold: 0,
          rootMargin: "0px 0px -50px 0px",
        },
      );

      cards.forEach((card) => {
        card.classList.add("testimonial-card--pending");
        observer?.observe(card);
      });
    };

    configure();
    preference.addEventListener("change", configure);

    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);

      cards.forEach((card) => {
        card.classList.remove("testimonial-card--pending");
      });
    };
  }, []);

  return (
    <section
      id="comunidad"
      className="testimonials"
      ref={sectionRef}
      aria-labelledby="testimonials-title"
    >
      <div className="testimonials-container">
        <header className="levels-heading">
          <span className="levels-eyebrow">Comunidad CPCS</span>

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
              {/* Globo de conversación */}
              <path
                d="
        M18 12
        H62
        A10 10 0 0 1 72 22
        V48
        A10 10 0 0 1 62 58
        H35
        L18 71
        V58
        A10 10 0 0 1 8 48
        V22
        A10 10 0 0 1 18 12
        Z
      "
              />

              {/* Comillas */}
              <path d="M32 26c-6 3-9 8-9 15h11V31h-9" />
              <path d="M53 26c-6 3-9 8-9 15h11V31h-9" />
            </svg>

            <h1 id="testimonials-heading">Testimonios</h1>
          </div>
        </header>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article
              className="testimonial-card"
              key={testimonial.id}
              aria-labelledby={`family-${testimonial.id}`}
            >
              <div className="testimonial-photo">
                <img
                  src={testimonial.image}
                  alt="Fotografía provisional de una familia de la comunidad CPCS"
                  loading="lazy"
                />
              </div>

              <div className="testimonial-body">
                <span
                  className="testimonial-mark testimonial-mark--family"
                  aria-hidden="true"
                >
                  <MdFamilyRestroom  
                  color="#ffd106"
                  fontSize={42} />
                </span>

                <p className="testimonial-text">{testimonial.text}</p>

                <h3 id={`family-${testimonial.id}`}>{testimonial.label}</h3>

                
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
