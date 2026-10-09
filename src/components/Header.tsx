import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import SchoolMenu from "./SchoolMenu";
import "../assets/styles/header.css";

const navigation = [
  { label: "Niveles", href: "/#niveles" },
  { label: "Comunidad CPCS", href: "/#comunidad" },
  { label: "Q10", href: "https://cpcs.q10.com" },
  { label: "Intranet", href: "https://intranetcpcs.onrender.com/" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="header-nav" aria-label="Navegación principal">
        <Link
          className="header-brand"
          to="/"
          aria-label="CPCS — Inicio"
          onClick={closeMenu}
        >
          CPCS
        </Link>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? "Cerrar menú" : "Menú"}
        </button>

        <ul
          id="main-menu"
          className={`nav-list ${menuOpen ? "nav-list--open" : ""}`}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closeMenu();
              toggleRef.current?.focus();
            }
          }}
        >
          <li>
            <Link to="/admisiones" onClick={closeMenu}>
              Admisiones
            </Link>
          </li>

          {/* SchoolMenu ya incluye su propio li. */}
          <SchoolMenu key={location.key} onNavigate={closeMenu} />

          {navigation.map((item) => {
            const openInNewTab =
              item.label === "Q10" || item.label === "Intranet";

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  target={openInNewTab ? "_blank" : undefined}
                  rel={openInNewTab ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
