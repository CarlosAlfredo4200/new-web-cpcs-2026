import { Link } from "react-router-dom";

import "../assets/styles/hero.css";
import HeroCarousel from "./HeroCarousel";

// Busca únicamente el logo institucional.
const logos = import.meta.glob<string>(
  "../assets/images/logo-colegio.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const schoolLogo = Object.values(logos)[0];

const quickLinks = [
  { label: "Nuestro colegio", href: "#nuestro-colegio" },
  { label: "Niveles", href: "#niveles" },
  { label: "Comunidad CPCS", href: "#comunidad" },
  { label: "Contáctanos", href: "/contacto" },
];

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      {/* Fotografías que cambian y hacen zoom. */}
      <HeroCarousel />

      {/* Panel institucional fijo. */}
      <div className="hero-branding">
        <h1 id="hero-title" className="hero-title">
          Colegio Panamericano Colombosueco
        </h1>

        <div className="hero-divider" aria-hidden="true" />

        <p className="hero-slogan">
          "Formar líderes que sean testimonio de vida y de educación
          Cristocéntrica para Colombia y las naciones"
        </p>

        {schoolLogo ? (
          <img
            className="hero-logo"
            src={schoolLogo}
            alt="Escudo institucional CPCS"
            width="180"
            height="180"
          />
        ) : (
          <div className="hero-logo-placeholder">Logo CPCS</div>
        )}

        <Link className="hero-admissions" to="/admisiones">
          Admisiones 2027
        </Link>
      </div>

      <nav className="hero-links" aria-label="Accesos destacados">
        {quickLinks.map((link) => {
          const className =
            link.href === "/contacto" ? "hero-contact" : undefined;

          const content = (
            <>
              <span>{link.label}</span>
              <span aria-hidden="true">↗</span>
            </>
          );

          return link.href.startsWith("/") ? (
            <Link key={link.href} to={link.href} className={className}>
              {content}
            </Link>
          ) : (
            <a key={link.href} href={link.href} className={className}>
              {content}
            </a>
          );
        })}
      </nav>
    </section>
  );
}
