import { Link } from "react-router-dom";
import "../assets/styles/footer.css";

const images = import.meta.glob<string>(
  "../assets/images/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const schoolLogo = images["../assets/images/logo-colegio.png"];

export default function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          {schoolLogo && (
            <img
              src={schoolLogo}
              alt="Escudo institucional CPCS"
              width="100"
              height="100"
              loading="lazy"
            />
          )}

          <div>
            <h2>Colegio Panamericano Colombo Sueco</h2>
            <p>
              Despierta, Refuerza y Ensancha
              Nuevas Cosas DIOS Hará. ISAÍAS 43:19
            </p>
          </div>
        </div>

        <div className="footer-info">
          <h3>Ubicación</h3>

          <address>
            Cra. 83 N.º 78-30
            <br />
            Robledo Diamante
            <br />
            Medellín
          </address>
        </div>

        <div className="footer-info">
          <h3>Horario de Atención</h3>

          <p>
            <strong>Lunes a jueves</strong>
            <br />
            7:00 a. m. – 12:00 del mediodía
            <br />
            1:00 p. m. – 3:00 p. m.
          </p>

          <p>
            <strong>Viernes</strong>
            <br />
            7:00 a. m. – 12:30 p. m.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Colegio Panamericano Colombo Sueco
        </p>

        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
        >
          Volver al inicio ↑
        </Link>
      </div>
    </footer>
  );
}