import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import "../assets/styles/contact.css";

const campuses = [
  {
    id: "bachillerato",
    title: "Sede Bachillerato",
    address: "Carrera 83 N.º 78-30",
    neighborhood: "Robledo Diamante, Medellín",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Carrera 83 78-30, Medellín, Colombia"),
  },
  {
    id: "preescolar",
    title: "Sede Preescolar",
    address: "Calle 78B N.º 84-41",
    neighborhood: "Robledo Diamante, Medellín",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Calle 78B 84-41, Medellín, Colombia"),
  },
];

const whatsappUrl =
  "https://wa.me/573011774167?text=" +
  encodeURIComponent(
    "Hola, quisiera información sobre el Colegio Panamericano Colombosueco.",
  );

export default function Contact() {
  useEffect(() => {
    const previousTitle = document.title;

    let description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    const createdDescription = description === null;
    const previousDescription = description?.getAttribute("content");

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    document.title =
      "Contacto y ubicación | Colegio Panamericano Colombosueco";

    description.content =
      "Comunícate con el Colegio Panamericano Colombosueco en Robledo, Medellín. Consulta nuestras sedes, teléfono, WhatsApp y horarios de atención.";

    const descriptionElement = description;

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        descriptionElement.remove();
      } else if (previousDescription != null) {
        descriptionElement.setAttribute("content", previousDescription);
      } else {
        descriptionElement.removeAttribute("content");
      }
    };
  }, []);

  return (
    <main className="contact-page">
      <div className="contact-container">
        <Link className="contact-back" to="/">
          <FiArrowLeft aria-hidden="true" />
          Volver al colegio
        </Link>

        <header className="contact-heading">
          <span className="contact-eyebrow">
            Estamos para acompañarte
          </span>

          <div className="contact-title-row">
            <FiMail aria-hidden="true" />
            <h1>Contáctanos</h1>
          </div>

          <p>
            Resolvemos tus inquietudes y te acompañamos a conocer nuestra
            comunidad educativa.
          </p>
        </header>

        <section
          className="contact-information"
          aria-labelledby="contact-information-title"
        >
          <div className="contact-intro">
            <span className="contact-eyebrow">Colegio CPCS</span>

            <h2 id="contact-information-title">
              Hablemos del próximo paso.
            </h2>

            <p>
              Si necesitas información sobre el colegio, admisiones o nuestros
              niveles académicos, comunícate con nosotros.
            </p>

            <Link className="contact-button" to="/admisiones">
              Conocer admisiones 2027
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <div className="contact-methods">
            <a className="contact-method" href="tel:+576044420606">
              <span className="contact-icon">
                <FiPhone aria-hidden="true" />
              </span>

              <div>
                <span className="contact-label">Llámanos</span>
                <strong>(604) 442 0606</strong>
              </div>

              <FiArrowUpRight
                className="contact-arrow"
                aria-hidden="true"
              />
            </a>

            <a
              className="contact-method"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp al 301 177 4167, abre en una nueva pestaña"
            >
              <span className="contact-icon contact-icon--whatsapp">
                <FaWhatsapp aria-hidden="true" />
              </span>

              <div>
                <span className="contact-label">
                  Escríbenos por WhatsApp
                </span>
                <strong>301 177 4167</strong>
              </div>

              <FiArrowUpRight
                className="contact-arrow"
                aria-hidden="true"
              />
            </a>

            <a
              className="contact-method"
              href="mailto:academico@colombosueco.com"
            >
              <span className="contact-icon">
                <FiMail aria-hidden="true" />
              </span>

              <div>
                <span className="contact-label">Escríbenos</span>
                <strong>academico@colombosueco.com</strong>
              </div>

              <FiArrowUpRight
                className="contact-arrow"
                aria-hidden="true"
              />
            </a>

            <div className="contact-method">
              <span className="contact-icon">
                <FiClock aria-hidden="true" />
              </span>

              <div>
                <span className="contact-label">
                  Atención administrativa
                </span>

                <strong>Lunes a jueves</strong>

                <span className="contact-hours">
                  7:00 a. m. – 12:00 del mediodía
                  <br />
                  1:00 p. m. – 3:00 p. m.
                </span>

                <strong className="contact-friday">Viernes</strong>

                <span className="contact-hours">
                  7:00 a. m. – 12:30 p. m.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="contact-campuses"
          aria-labelledby="contact-campuses-title"
        >
          <header className="contact-section-heading">
            <span className="contact-eyebrow">Encuéntranos</span>

            <h2 id="contact-campuses-title">Nuestras sedes</h2>

            <p>Estamos ubicados en Robledo Diamante, Medellín.</p>
          </header>

          <div className="contact-campus-grid">
            {campuses.map((campus) => (
              <article
                key={campus.id}
                className={`contact-campus contact-campus--${campus.id}`}
                aria-labelledby={`contact-campus-${campus.id}`}
              >
                <span className="contact-campus-icon">
                  <FiMapPin aria-hidden="true" />
                </span>

                <h3 id={`contact-campus-${campus.id}`}>
                  {campus.title}
                </h3>

                <address>
                  <strong>{campus.address}</strong>
                  <span>{campus.neighborhood}</span>
                  <span>Antioquia, Colombia</span>
                </address>

                <a
                  className="contact-button contact-button--location"
                  href={campus.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver ubicación de ${campus.title} en Google Maps, abre en una nueva pestaña`}
                >
                  Ver ubicación
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <p className="contact-whatsapp-note">
          También puedes escribirnos desde el botón de WhatsApp disponible
          en la página.
        </p>
      </div>
    </main>
  );
}