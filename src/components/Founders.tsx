import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

import foundersImage from "../assets/images/fundadores.jpeg";
import "../assets/styles/founders.css";

export default function Founders() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <section
      id="fundadores"
      className="founders-page"
      aria-labelledby="founders-title"
    >
      <div className="founders-container">
        <div className="founders-layout">
          <figure className="founders-photo">
            <img
              src={foundersImage}
              alt="Fotografía de los fundadores del Colegio Panamericano Colombosueco"
              loading="lazy"
              decoding="async"
            />

            <figcaption>
              <span>Nuestras raíces</span>
              <strong>Una Historia De Fe y Propósito</strong>
            </figcaption>
          </figure>

          <div className="founders-copy">
            <header className="founders-heading">
              <span className="founders-eyebrow">
                Nuestro colegio
              </span>

              <h2 id="founders-title">
                Nuestros Fundadores
              </h2>

              <p className="founders-lead">
                Una visión que nació en oración y se convirtió en
                una comunidad educativa.
              </p>
            </header>

            <div className="founders-story">
              <p>
                El Colegio Panamericano Colombosueco nació de una
                visión de educación CRISTIANA impulsada en 1990 por
                la pastora Marilyn Finke y Noemí Mendieta. Con el
                liderazgo de los pastores Roberto y Marilyn Finke
                y un equipo interdisciplinario, abrió sus puertas
                en febrero de 1994 con 63 estudiantes de preescolar
                y cinco docentes.
              </p>

              <button
                className="founders-read-more"
                type="button"
                aria-expanded={historyOpen}
                aria-controls="founders-full-history"
                onClick={() => setHistoryOpen((current) => !current)}
              >
                {historyOpen ? "Mostrar menos" : "Saber más"}

                <span aria-hidden="true">
                  {historyOpen ? "−" : "+"}
                </span>
              </button>

              <div
                id="founders-full-history"
                className="founders-full-history"
                hidden={!historyOpen}
              >
                <h3>La historia de nuestros comienzos</h3>

                <p>
                  En <strong>1990</strong>, la pastora Marilyn Finke
                  y Noemí Mendieta, quienes lideraban los Ministerios
                  Infantiles y Adolescentes de la Misión Panamericana
                  de Colombia en Medellín, iniciaron los primeros
                  contactos para crear un colegio cristiano que
                  acompañara la formación de los niños bajo los
                  principios y las verdades bíblicas.
                </p>

                <p>
                  Sus oraciones encontraron respuesta en{" "}
                  <strong>1991</strong>, cuando se recibió la
                  aprobación de PMU Interlife y del Municipio de
                  Medellín para iniciar la construcción de los
                  primeros bloques del colegio.
                </p>

                <p>
                  Las labores académicas comenzaron en{" "}
                  <strong>febrero de 1994</strong>, de acuerdo con
                  las disposiciones oficiales y la filosofía de
                  la educación cristiana. Se contó con{" "}
                  <strong>
                    63 estudiantes de preescolar y cinco docentes
                  </strong>
                  , bajo el liderazgo de la junta directiva
                  encabezada por los pastores Roberto y Marilyn
                  Finke, junto con un equipo interdisciplinario.
                </p>

                <p>
                  En <strong>1995</strong>, el colegio contaba con{" "}
                  <strong>364 estudiantes</strong> de preescolar
                  y básica primaria. En <strong>2001</strong>,
                  celebró su primera promoción de bachilleres.
                </p>

                <p>
                  Desde entonces, sus egresados han desarrollado
                  proyectos de vida fundamentados en principios y
                  valores cristianos. Muchos lideran procesos e
                  iniciativas que reflejan la visión del colegio
                  y dan continuidad al propósito de sus fundadores.
                </p>
              </div>
            </div>

            <blockquote className="founders-message">
              Un legado de fe que continúa formando vidas para
              Colombia y las naciones.
            </blockquote>

            <Link
              className="founders-button"
              to="/nuestro-colegio/mision-vision"
            >
              Conoce nuestra misión y visión
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}