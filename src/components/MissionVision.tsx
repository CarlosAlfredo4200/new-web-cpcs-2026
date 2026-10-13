import { Link } from "react-router-dom";
import SchoolParallax from "./SchoolParallax";
import { schoolPhoto } from "./schoolPhotos";
import "../assets/styles/our-school.css";

const missionPhoto = schoolPhoto("mision-colegio.jpg", "fondo_parallax_mision_vision.jpg");
const visionPhoto = schoolPhoto("vision-colegio.jpg", "3_primaria_georafia.png");
const backgroundPhoto = schoolPhoto("colegio-panorama.jpg", "fondo_parallax_mision_vision.jpg");

export default function MissionVision() {
  return (
    <main className="school-page">
      <div className="school-container">
        <Link to="/" className="school-back">← Volver al colegio</Link>
        <header className="school-heading">
          <span className="school-eyebrow">Nuestro colegio</span>
          <h1>Lo que nos inspira.</h1>
          <p>Nuestra misión y visión orientan la formación y el servicio de nuestra comunidad.</p>
        </header>
        <section className="school-split school-mission" aria-labelledby="school-mission-title">
          <div className="school-copy">
            <span className="school-eyebrow">Nuestro propósito</span>
            <h2 id="school-mission-title">Misión</h2>
            <p>El Colegio Panamericano Colombo Sueco, como extensión del Centro de Fe y Esperanza Central de Medellín, tiene como misión formar, educar y preparar a los integrantes de la comunidad educativa para desarrollar su carácter y sus facultades espirituales, mentales, físicas, sociales y culturales para que se desempeñen en cualquier área de la vida y puedan cumplir con el propósito de Dios para con ellos, y así tengan el gozo de servir en este mundo y un gozo superior en el venidero.</p>
          </div>
          <SchoolParallax src={missionPhoto} alt="Estudiantes del colegio en sus instalaciones" className="school-mission-photo">
            <span className="school-photo-tag">Formar · Educar · Preparar</span>
          </SchoolParallax>
        </section>
      </div>

      <section className="school-vision" aria-labelledby="school-vision-title">
        <SchoolParallax src={backgroundPhoto} alt="" className="school-vision-background" />
        <div className="school-container school-vision-content">
          <header className="school-vision-heading"><span className="school-eyebrow">Nuestro horizonte</span><h2 id="school-vision-title">Visión</h2></header>
          <div className="school-vision-panel">
            <SchoolParallax src={visionPhoto} alt="Comunidad educativa del colegio" className="school-vision-photo" />
            <div className="school-vision-copy">
              <span className="school-quote" aria-hidden="true">“</span>
              <blockquote>Formar líderes que sean testimonio de vida y de educación Cristocéntrica para Colombia y las naciones.</blockquote>
              <p className="school-vision-english" lang="en">Forming leaders who are a living testimony of life and Christ-centered education for Colombia and the nations.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="school-container school-bottom-link"><Link className="school-button" to="/nuestro-colegio/quienes-somos">Conoce nuestra historia →</Link></div>
    </main>
  );
}
