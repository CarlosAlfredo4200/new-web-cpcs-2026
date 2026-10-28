import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const distDirectory = path.join(projectRoot, "dist");

const routes = [
  "contacto",
  "admisiones",
  "costos-educativos",
  "nuestro-colegio/quienes-somos",
  "nuestro-colegio/mision-vision",
  "nuestro-colegio/misioneros",
];

const html = await readFile(
  path.join(distDirectory, "index.html"),
  "utf8",
);

for (const route of routes) {
  const directory = path.join(distDirectory, route);

  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html, "utf8");

  console.log(`Página generada: /${route}/index.html`);
}