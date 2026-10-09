import '../assets/styles/footer.css'

const images = import.meta.glob<string>(
  '../assets/images/*.{png,jpg,jpeg,webp,svg}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

const schoolLogo = images['../assets/images/logo-colegio.png']

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
            <h2>Colegio Panamericano Colombosueco</h2>
            <p>
              "Despierta, refuerza y ensancha nuevas cosas DIOS hará"
            </p>
          </div>
        </div>

        <div className="footer-info">
          <h3>Ubicación</h3>
          <address>
            Cra. 83 N.° 78-30
            <br />
            Robledo Diamante
            <br />
            Medellín
          </address>
        </div>

        <div className="footer-info">
          <h3>Horario de atención</h3>
          <p>Lunes a viernes</p>
          <p>8:00 a. m. – 3:00 p. m.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Colegio Panamericano Colombosueco
        </p>
        <a href="#inicio">Volver al inicio ↑</a>
      </div>
    </footer>
  )
}