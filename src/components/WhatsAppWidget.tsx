import { useRef, useState } from "react";
import "../assets/styles/whatsapp-widget.css";

// Coloca aquí el WhatsApp institucional:
// código de país + número, sin espacios ni el signo +.
const WHATSAPP_NUMBER = "573011774167";

const MESSAGE =
  "Hola, quisiera recibir información del Colegio Panamericano Colombosueco.";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z" />
      <path d="M8 7.5c-.8 1.2.2 3.4 2 5.2s4 2.8 5.2 2l1-1.3-2.5-1.3-.9.9c-1.2-.6-2.2-1.6-2.8-2.8l.9-.9-1.3-2.5Z" />
    </svg>
  );
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  const chatUrl = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(MESSAGE)}`
    : undefined;

  const closePanel = () => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <aside
      className="whatsapp-widget"
      aria-label="Contacto por WhatsApp"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          closePanel();
        }
      }}
    >
      {isOpen && (
        <div
          id="whatsapp-panel"
          className="whatsapp-panel"
          role="region"
          aria-labelledby="whatsapp-title"
        >
          <div className="whatsapp-header">
            <div className="whatsapp-header-brand">
              <WhatsAppIcon />
              <h2 id="whatsapp-title">WhatsApp</h2>
            </div>

            <button
              type="button"
              className="whatsapp-close"
              aria-label="Cerrar ventana de WhatsApp"
              onClick={closePanel}
            >
              ×
            </button>
          </div>

          <div className="whatsapp-body">
            <div className="whatsapp-message">
              <p>Hola 👋</p>
              <p>¿Cómo podemos ayudarte hoy?</p>
            </div>

            {chatUrl ? (
              <a
                className="whatsapp-start"
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Iniciar chat
                <WhatsAppIcon />
              </a>
            ) : (
              <span className="whatsapp-pending">
                Número de contacto pendiente
              </span>
            )}
          </div>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        className="whatsapp-toggle"
        aria-label={
          isOpen ? "Cerrar contacto por WhatsApp" : "Abrir contacto por WhatsApp"
        }
        aria-expanded={isOpen}
        aria-controls={isOpen ? "whatsapp-panel" : undefined}
        onClick={() => setIsOpen((current) => !current)}
      >
        <WhatsAppIcon />
      </button>
    </aside>
  );
}