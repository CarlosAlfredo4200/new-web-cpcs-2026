import { Link } from "react-router-dom";
import "../assets/styles/admissions.css";

const admissionsLinks = {
  newStudents: "https://cpcs.q10.com/Preinscripcion",
  reservation: "https://cpcs.q10.com/SolicitudesInstitucionales/NuevaSolicitud",
  status: "https://cpcs.q10.com/SolicitudesInstitucionales/ConsultarSolicitud",
};

const values = [
  {
    icon: "✝",
    title: "Valores y Fe",
    description: "Formación fundamentada en la Palabra de Dios.",
  },
  {
    icon: "🎓",
    title: "Excelencia Académica",
    description: "Aprendizaje acompañado de esfuerzo y disciplina.",
  },
  {
    icon: "🤝",
    title: "Disciplina y Respeto",
    description: "Valores que fortalecen la convivencia.",
  },
  {
    icon: "🌱",
    title: "Formación Integral",
    description: "Acompañamiento para crecer con propósito.",
  },
];

export default function Admissions() {
  return (
    <section
      id="admisiones"
      className="admissions"
      aria-labelledby="admissions-title"
    >
      <div className="admissions-container">
        <Link className="admissions-back" to="/">
          <span aria-hidden="true">←</span>
          Volver al inicio del colegio
        </Link>

        <header className="admissions-heading">
          <span className="admissions-eyebrow">
            Una nueva etapa comienza aquí
          </span>

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
              {/* Edificio / colegio */}
              <path d="M10 68V28L40 12l30 16v40" />

              {/* Techo */}
              <path d="M6 28L40 8l34 20" />

              {/* Puerta principal */}
              <path d="M31 68V48h18v20" />

              {/* Ventanas */}
              <rect x="18" y="35" width="8" height="8" rx="1" />
              <rect x="54" y="35" width="8" height="8" rx="1" />

              {/* Estudiante */}
              <circle cx="40" cy="32" r="5" />
              <path d="M40 37v10" />
              <path d="M34 42l6 5 6-5" />

              {/* Flecha de ingreso */}
              <path d="M18 58h8" />
              <path d="M23 53l5 5-5 5" />

              {/* Línea inferior */}
              <path d="M5 68h70" />
            </svg>

            <h1 id="admissions-title">Admisiones 2027</h1>
          </div>
        </header>

        {/* Video a la izquierda y propuesta educativa a la derecha. */}
        <div className="admissions-intro">
          <div className="admissions-video">
            <iframe
              src="https://www.youtube.com/embed/Oy20XZLnQAc"
              title="Presentación de admisiones del Colegio Panamericano Colombosueco"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="admissions-copy">
            <span className="admissions-year">Año académico 2027</span>

            <h2>Formación Integral Con Propósito</h2>

            <p>
              Acompañamos a familias que buscan una educación con excelencia
              académica, disciplina, valores y respeto, fundamentada en la
              Palabra de Dios.
            </p>

            <ul className="admissions-values">
              {values.map((value) => (
                <li className="admissions-value" key={value.title}>
                  <span className="admissions-value-icon" aria-hidden="true">
                    {value.icon}
                  </span>

                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Opciones para estudiantes nuevos y antiguos. */}
        <div className="admissions-options">
          <article
            className="admissions-card admissions-card--new"
            aria-labelledby="admissions-new-title"
          >
            <span className="admissions-card-label">Estudiantes nuevos</span>

            <h2 id="admissions-new-title">Comienza Tu Camino Con Nosotros</h2>

            <p>
              Si tu hijo o hija ingresa por primera vez al colegio, inicia el
              proceso completando la preinscripción en nuestra plataforma Q10.
            </p>

            <a
              className="admissions-button"
              href={admissionsLinks.newStudents}
              target="_blank"
              rel="noopener noreferrer"
            >
              Iniciar preinscripción
              <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article
            className="admissions-card admissions-card--returning"
            aria-labelledby="admissions-returning-title"
          >
            <span className="admissions-card-label">Estudiantes antiguos</span>

            <h2 id="admissions-returning-title">Sigamos Creciendo Juntos</h2>

            <p>
              Si tu hijo o hija ya hace parte de nuestra comunidad, realiza la
              reserva de cupo o consulta el estado de tu solicitud en Q10.
            </p>

            <div className="admissions-card-actions">
              <a
                className="admissions-button admissions-button--yellow"
                href={admissionsLinks.reservation}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar cupo
                <span aria-hidden="true">↗</span>
              </a>

              <a
                className="admissions-button admissions-button--outline"
                href={admissionsLinks.status}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar solicitud
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>

         
      </div>
    </section>
  );
}
