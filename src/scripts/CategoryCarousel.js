import React, { useEffect, useRef, useState } from "react";

/**
 * Carrusel "coverflow" del bloque 01c (categorias): una imagen grande al
 * centro y dos a cada lado, mas chicas y apagadas segun que tan lejos
 * quedan del centro, avanzando sola cada 2 segundos. Es React y no CSS
 * puro porque necesita saber cual es "el centro" en todo momento para
 * decidir el tamano/opacidad de cada una de las demas, algo que un
 * .tm-marquee (piezas iguales, en loop parejo) no resuelve.
 *
 * Los datos llegan por un atributo data-categories en JSON en vez de
 * window.tmData: son especificos de esta seccion de esta plantilla, no
 * config del sitio completo que el resto de los componentes necesite.
 */

const STEP_VW = 26; // separacion horizontal entre un slot y el siguiente
const STEP_VW_COMPACT = 100; // en movil, empuja del todo a los vecinos fuera de pantalla
const AUTOPLAY_MS = 2000;

/** Distancia circular mas corta entre dos indices (puede salir negativa). */
function circularDistance(index, active, total) {
  let raw = index - active;
  raw = ((raw % total) + total) % total; // 0..total-1
  if (raw > total / 2) raw -= total;
  return raw;
}

export default function CategoryCarousel({ items }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  /* Debajo de "sm" (640px, el mismo quiebre en el que las imagenes
     tambien cambian de tamano) solo cabe un producto por pantalla sin
     que se amontonen: los vecinos se empujan fuera de la vista en vez
     de asomar a medias al lado, por pedido del cliente. */
  const [compact, setCompact] = useState(false);
  const total = items.length;
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotionRef.current || total < 2) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, total]);

  if (!total) return null;

  return (
    <div
      className="relative h-104 w-full sm:h-128 lg:h-152"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {items.map((item, index) => {
        const distance = circularDistance(index, active, total);
        const absDistance = Math.abs(distance);
        const isCenter = absDistance === 0;
        const hidden = absDistance >= 3;

        const scale = isCenter ? 1 : absDistance === 1 ? 0.8 : absDistance === 2 ? 0.62 : 0.45;
        const opacity = isCenter ? 1 : absDistance === 1 ? 0.9 : absDistance === 2 ? 0.6 : 0;
        const offset = distance * (compact ? STEP_VW_COMPACT : STEP_VW);
        /* Los de al lado llevan un blur (en vez del gris + brillo bajo de
           antes, por pedido del cliente) para que se lean como "fuera de
           foco, vienen en camino" y no compitan con el centro, que es el
           unico nitido. Mas fuerte mientras mas lejos del centro. Solo en
           la imagen, no en el boton completo: si el blur tapara tambien
           el nombre, el de los lados quedaria ilegible. */
        const imageFilter = isCenter ? "none" : absDistance === 1 ? "blur(2px)" : "blur(4px)";

        return (
          <button
            key={item.name}
            type="button"
            onClick={() => setActive(index)}
            aria-label={item.name}
            aria-current={isCenter}
            tabIndex={hidden ? -1 : 0}
            className="absolute left-1/2 top-0 flex w-84 shrink-0 flex-col items-center text-center transition-[transform,opacity] duration-700 ease-out sm:w-108 lg:w-132"
            style={{
              transform: `translateX(-50%) translateX(${offset}vw) scale(${scale})`,
              transformOrigin: "top center",
              opacity,
              zIndex: 10 - absDistance,
              pointerEvents: hidden ? "none" : "auto",
            }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full drop-shadow-[0_15px_18px_rgba(43,43,43,0.2)] transition-[filter] duration-700 ease-out"
                style={{ filter: imageFilter }}
              />
            )}
            {/* Nombre solo en el item central, por pedido del cliente: los
                que estan en cola quedan sin titulo, la foto sola alcanza
                para leerse como "viene en camino". aria-label de arriba
                sigue anunciando el nombre a lectores de pantalla aunque
                no se muestre. */}
            {isCenter && (
              <p className="mt-1 font-display text-[2.1rem] font-bold text-carbon-400 sm:text-[2.625rem]">
                {item.name}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
