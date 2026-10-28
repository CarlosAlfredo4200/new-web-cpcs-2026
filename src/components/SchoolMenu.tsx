import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

import "../assets/styles/our-school.css";

type SchoolMenuProps = {
  onNavigate?: () => void;
};

export default function SchoolMenu({ onNavigate }: SchoolMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const active = location.pathname.startsWith("/nuestro-colegio/");

  // Cierra al hacer clic fuera del desplegable.
  useEffect(() => {
    if (!open) return;

    const handleOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutside);

    return () => {
      document.removeEventListener("pointerdown", handleOutside);
    };
  }, [open]);

  const handleNavigate = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <li
      ref={menuRef}
      className="school-menu"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          setOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;

        // Mantiene abierto si el teclado está dentro del submenú.
        const focusedElement = document.activeElement;
        const submenu = event.currentTarget.querySelector(".school-submenu");

        if (
          focusedElement instanceof Node &&
          submenu?.contains(focusedElement)
        ) {
          return;
        }

        setOpen(false);
      }}
      onBlur={(event) => {
        const nextElement = event.relatedTarget;

        if (
          !(nextElement instanceof Node) ||
          !event.currentTarget.contains(nextElement)
        ) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          buttonRef.current?.focus();
        }

        if (event.key === "ArrowDown" && event.target === buttonRef.current) {
          event.preventDefault();
          setOpen(true);

          window.requestAnimationFrame(() => {
            menuRef.current
              ?.querySelector<HTMLAnchorElement>(".school-submenu a")
              ?.focus();
          });
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`school-menu-toggle ${
          active ? "school-menu-toggle--active" : ""
        }`}
        aria-expanded={open}
        aria-controls="school-submenu"
        onClick={(event) => {
          // Con mouse ya se abrió al entrar.
          // Con teclado o toque alterna entre abierto y cerrado.
          const mouseInteraction =
            event.detail > 0 &&
            window.matchMedia("(hover: hover) and (pointer: fine)").matches;

          if (mouseInteraction) {
            setOpen(true);
          } else {
            setOpen((current) => !current);
          }
        }}
      >
        Nuestro colegio
        <FaCheck size={20} color="#f2c438" aria-hidden="true" />
      </button>

      <ul id="school-submenu" className="school-submenu" hidden={!open}>
        <li>
          <Link
            to="/nuestro-colegio/quienes-somos"
            onClick={handleNavigate}
            aria-current={
              location.pathname === "/nuestro-colegio/quienes-somos"
                ? "page"
                : undefined
            }
          >
            Quiénes somos
          </Link>
        </li>

        <li>
          <Link
            to="/nuestro-colegio/mision-vision"
            onClick={handleNavigate}
            aria-current={
              location.pathname === "/nuestro-colegio/mision-vision"
                ? "page"
                : undefined
            }
          >
            Misión y visión
          </Link>
        </li>
        
        <li>
          <Link
            to="/nuestro-colegio/misioneros"
            onClick={handleNavigate}
            aria-current={
              location.pathname === "/nuestro-colegio/misioneros"
                ? "page"
                : undefined
            }
          >
            Obra Misionera
          </Link>
        </li>
        

      
      </ul>
    </li>
  );
}
