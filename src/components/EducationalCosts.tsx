import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiFilter, FiRefreshCw } from "react-icons/fi";
import costs from "../content/educational-costs.json";
import "../assets/styles/educational-costs.css";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function EducationalCosts() {
  const [stratum, setStratum] = useState("todos");
  const [grade, setGrade] = useState("todos");
  const filtered = costs.tarifas
    .filter(
      (row) =>
        (stratum === "todos" || row.estrato === Number(stratum)) &&
        (grade === "todos" || row.grado === grade),
    )
    .sort(
      (a, b) =>
        costs.grados.indexOf(a.grado) - costs.grados.indexOf(b.grado) ||
        a.estrato - b.estrato,
    );

  return (
    <main className="costs-page">
      <div className="costs-container">
        <Link className="costs-back" to="/">
          <FiArrowLeft aria-hidden="true" /> Volver al colegio
        </Link>
        <header className="costs-heading">
          <div className="costs-title">
            <FiBookOpen aria-hidden="true" />
            <h1>Costos Educativos</h1>
          </div>
          <p className="costs-resolution">
            Liquidación tarifas año {costs.anio} según Resolución{" "}
            {costs.resolucion} del {costs.fechaResolucion}
          </p>
          <span className="costs-increase">
            Incremento del{" "}
            {String(costs.incrementoPorcentaje).replace(".", ",")} %
          </span>
        </header>

        <section className="costs-filters" aria-labelledby="costs-filter-title">
          <div className="costs-filter-heading">
            <FiFilter aria-hidden="true" />
            <h2 id="costs-filter-title">Encuentra Tu Tarifa</h2>
          </div>
          <div className="costs-filter-grid">
            <fieldset className="costs-strata">
              <legend>1. Selecciona el estrato</legend>
              <div className="costs-chips">
                {["todos", "1", "2", "3", "4", "5", "6"].map((value) => (
                  <button
                    type="button"
                    key={value}
                    aria-pressed={stratum === value}
                    onClick={() => setStratum(value)}
                  >
                    {value === "todos" ? "Todos" : value}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="costs-grade">
              <label htmlFor="costs-grade">2. Selecciona el grado</label>
              <select
                id="costs-grade"
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
              >
                <option value="todos">Todos los grados</option>
                {costs.grados.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="costs-reset"
            type="button"
            onClick={() => {
              setStratum("todos");
              setGrade("todos");
            }}
          >
            <FiRefreshCw aria-hidden="true" /> Restablecer filtros
          </button>
        </section>

        <section
          className="costs-results"
          aria-labelledby="costs-results-title"
        >
          <div className="costs-results-heading">
            <h2 id="costs-results-title">TARIFAS {costs.anio}</h2>
            <p role="status">
              {filtered.length}{" "}
              {filtered.length === 1 ? "resultado" : "resultados"}
            </p>
          </div>

          {filtered.length ? (
            <div
              className="costs-table-scroll"
              tabIndex={0}
              role="region"
              aria-label="Tabla de tarifas, desliza horizontalmente para consultar todas las columnas"
            >
              <table className="costs-table">
                <caption>
                  Costos educativos por grado y estrato — {costs.anio}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Grado</th>
                    <th scope="col">Estrato</th>
                    <th scope="col">Matrícula</th>
                    <th scope="col">
                      Pensión mensual <small>10 mensualidades</small>
                    </th>
                    <th scope="col">Otros cobros</th>
                    <th scope="col">Total reportado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={`${row.grado}-${row.estrato}`}>
                      <th scope="row">{row.grado}</th>
                      <td>
                        <span className="costs-stratum-badge">
                          {row.estrato}
                        </span>
                      </td>
                      <td>{currency.format(row.matricula)}</td>
                      <td>{currency.format(row.pensionMensual)}</td>
                      <td>{currency.format(row.otrosCobros)}</td>
                      <td className="costs-total">
                        {currency.format(row.totalReportado)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="costs-empty">
              <h3>No hay una tarifa registrada para esta selección</h3>
              <p>Prueba otros filtros o consulta con el colegio.</p>
              <Link to="/contacto">
                Consultar disponibilidad de la tarifa →
              </Link>
            </div>
          )}
        </section>
        <aside className="costs-contact">
          <div>
            <h2>Conoce Nuestros Beneficios Económicos</h2>
            <p>
              Consulta con Tesorería los beneficios sobre
              pensiones, otros beneficios y sus condiciones.
            </p>
          </div>

          <a
            href={`https://wa.me/573007272959?text=${encodeURIComponent(
              "Hola, quisiera información sobre los costos educativos y los beneficios económicos del colegio.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar con Tesorería por WhatsApp ↗
          </a>
        </aside>
      </div>
    </main>
  );
}
