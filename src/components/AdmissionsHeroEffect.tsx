import type { CSSProperties } from "react";

type AdmissionsHeroEffectProps = {
  paused: boolean;
};

// Posiciones variadas y estables: no cambian al renderizar.
const stars = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 23 + 7) % 100}%`,
  size: `${2 + (index % 3)}px`,
  duration: `${3 + (index % 4)}s`,
  delay: `${-(index % 7)}s`,
}));

export default function AdmissionsHeroEffect({
  paused,
}: AdmissionsHeroEffectProps) {
  return (
    <div
      className={`hero-admissions-effect ${
        paused ? "hero-admissions-effect--paused" : ""
      }`}
    >
      <div className="hero-admissions-stars" aria-hidden="true">
        {stars.map((star, index) => (
          <i
            key={index}
            style={
              {
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                "--star-duration": star.duration,
                "--star-delay": star.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>

     <div className="hero-admissions-art">
  <div className="hero-admissions-floating">
    <p className="hero-admissions-announcement">
      ADMISIONES ABIERTAS
    </p>

    <p className="hero-admissions-number">2027</p>

    <p className="hero-admissions-welcome">
      ¡Te esperamos!
    </p>
  </div>
</div>
    </div>
  );
}