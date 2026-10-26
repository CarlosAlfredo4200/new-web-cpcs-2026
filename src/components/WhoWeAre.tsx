import { Link } from "react-router-dom";
import SchoolParallax from "./SchoolParallax";
import { schoolPhoto } from "./schoolPhotos";
import "../assets/styles/our-school.css";

const communityPhoto = schoolPhoto("quienes_somos.jpg");
const historyPhoto = schoolPhoto("historia.jpg");
const milestones = [
  { year: "1990", text: "Primeros contactos para crear un colegio cristiano." },
  { year: "1991", text: "Aprobaciones para iniciar la construcción." },
  { year: "1994", text: "Inicio de clases con 63 estudiantes de preescolar y cinco docentes." },
  { year: "1995", text: "364 estudiantes en preescolar y básica primaria." },
  { year: "2001", text: "Primera promoción de bachilleres." },
];

export default function WhoWeAre() {
  return (
    <main className="school-page">
      <div className="school-container">
        <Link to="/" className="school-back">← Volver al colegio</Link>
        <header className="school-heading">
          <span className="school-eyebrow">Nuestro colegio</span>
          <h1>Un propósito que nos une</h1>
          
        </header>

        <section className="school-split" aria-labelledby="school-identity-title">
          <div className="school-copy">
            <span className="school-eyebrow">Nuestra identidad</span>
            <h2 id="school-identity-title">Quiénes somos</h2>
            <p>El Colegio Panamericano Colombo Sueco es una institución cristiana evangélica, privada, mixta y sin ánimo de lucro que ofrece educación en preescolar, primaria y bachillerato. Pertenece al Centro de Fe y Esperanza Central de Medellín, de la Misión Panamericana de Colombia.</p>
            <p>Formamos líderes con una educación Cristocéntrica para servir a Dios, a Colombia y a las naciones. Integramos el desarrollo académico y profesional con la formación espiritual, moral, familiar y ciudadana. El colegio está afiliado a OBED, ACSI y ADECOPRIA.</p>
            <Link to="/nuestro-colegio/mision-vision" className="school-button">Nuestra misión y visión <span aria-hidden="true">→</span></Link>
          </div>
          <SchoolParallax src={communityPhoto} alt="Comunidad educativa del Colegio Panamericano Colombo Sueco" className="school-identity-photo">
            <span className="school-photo-tag">Educación con propósito</span>
          </SchoolParallax>
        </section>
      </div>

      <section className="school-history" aria-labelledby="school-history-title">
        <div className="school-container school-split school-split--history">
          <SchoolParallax src={historyPhoto} alt="Instalaciones del Colegio Panamericano Colombo Sueco" className="school-history-photo">
            <div className="school-history-stamp"><strong>1994</strong><span>Inicio de labores académicas</span></div>
          </SchoolParallax>
          <div className="school-copy">
            <span className="school-eyebrow">Nuestras raíces</span>
            <h2 id="school-history-title">Una historia que<br />se sigue escribiendo</h2>
            <p>En 1990, los ministerios infantiles y adolescentes del Centro de Fe y Esperanza Central de Medellín, con la pastora Marilyn Finke y Noemí Mendieta, impulsaron la creación de un colegio basado en principios bíblicos.</p>
            <p>En 1991 se recibieron las aprobaciones de PMU INTERLIFE y del Municipio de Medellín para iniciar la construcción. Las clases comenzaron en febrero de 1994 con 63 estudiantes de preescolar y cinco docentes, bajo el liderazgo de los pastores Roberto y Marilyn Finke y un equipo interdisciplinario.</p>
            <p>En 1995, el colegio contaba con 364 estudiantes de preescolar y primaria; en 2001 celebró su primera promoción de bachilleres. Desde sus orígenes, acompaña proyectos de vida fundamentados en principios y valores cristianos.</p>
          </div>
        </div>
        <ol className="school-timeline school-container" aria-label="Hitos de nuestra historia">
          {milestones.map((item) => <li key={item.year}><strong>{item.year}</strong><p>{item.text}</p></li>)}
        </ol>
      </section>
      <div className="school-container school-bottom-link"><Link className="school-button" to="/admisiones">Conoce el proceso de admisiones →</Link></div>
    </main>
  );
}
