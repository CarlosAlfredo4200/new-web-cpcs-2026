import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "../assets/styles/our-school.css";

// Coloca este componente dentro del ul.nav-list del Header.
export default function SchoolMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const location = useLocation();
  const active = location.pathname.startsWith("/nuestro-colegio/");
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  const navigate = () => { setOpen(false); onNavigate?.(); };
  return (
    <li className="school-menu" ref={ref}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          setOpen(false);
          ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
        }
      }}>
      <button type="button" className={`school-menu-toggle${active ? " school-menu-toggle--active" : ""}`}
        aria-expanded={open} aria-controls="school-submenu" onClick={() => setOpen((current) => !current)}>
        Nuestro colegio <span aria-hidden="true">
          <FaCheck   
            size={20}
            color="yellow"/>
            </span>
      </button>
      <ul id="school-submenu" className="school-submenu" hidden={!open}>
        <li><Link to="/nuestro-colegio/quienes-somos" onClick={navigate} aria-current={location.pathname === "/nuestro-colegio/quienes-somos" ? "page" : undefined}>Quiénes somos</Link></li>
        <li><Link to="/nuestro-colegio/mision-vision" onClick={navigate} aria-current={location.pathname === "/nuestro-colegio/mision-vision" ? "page" : undefined}>Misión y visión</Link></li>
      </ul>
    </li>
  );
}
