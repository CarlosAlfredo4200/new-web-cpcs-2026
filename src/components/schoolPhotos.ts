const images = import.meta.glob<string>(
  "../assets/images/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

export function schoolPhoto(...names: string[]) {
  return names
    .map((name) => images[`../assets/images/${name}`])
    .find(Boolean);
}