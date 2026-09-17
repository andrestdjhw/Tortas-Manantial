import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconBag, IconClose } from "./icons";

/**
 * Modal de ingredientes de "Every torta we make" (template-parts/
 * tortas-grid.php). Un solo componente, montado una vez por pagina,
 * que escucha clicks en document por delegacion en vez de que cada
 * tarjeta traiga su propio listener: las dos cintas del marquee
 * duplican cada boton para el loop continuo (una copia normal y una
 * inert para lectores de pantalla), asi que delegar en document evita
 * tener que distinguir cual copia disparo el click.
 *
 * createPortal a document.body: el marquee vive dentro de un
 * contenedor con overflow-hidden (necesario para que las cintas
 * corten limpio en el borde), y un modal position:fixed ahi adentro
 * corre el riesgo de heredar un nuevo contenedor de posicionamiento si
 * algun ancestro le agrega transform/filter mas adelante. El portal lo
 * saca de esa cadena por completo.
 */

export default function TortaModal({ items, orderUrl }) {
  const [openSlug, setOpenSlug] = useState(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  const active = items.find((item) => item.slug === openSlug) || null;

  useEffect(() => {
    function onClick(event) {
      const trigger = event.target.closest("[data-tm-torta]");
      if (!trigger) return;

      triggerRef.current = trigger;
      setOpenSlug(trigger.dataset.tmTorta);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpenSlug(null);
        if (triggerRef.current) triggerRef.current.focus();
      }
    }

    function onPointerDown(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpenSlug(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    // pointerdown y no click: click tambien dispararia el listener de
    // delegacion de arriba si el mismo evento reabriera otra tarjeta,
    // asi que cerrar un paso antes evita que los dos se pisen.
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [active]);

  if (!active) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-carbon-500/70 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={active.name}
        className="tm-modal-panel relative w-full max-w-md overflow-hidden rounded-2xl bg-hueso-100 shadow-2xl"
      >
        <button
          type="button"
          onClick={() => {
            setOpenSlug(null);
            if (triggerRef.current) triggerRef.current.focus();
          }}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full bg-hueso-100/90 p-2 text-carbon-400 shadow-md transition-colors hover:text-olivo-400"
        >
          <IconClose size={20} />
        </button>

        {active.image && (
          <div className="flex items-center justify-center bg-hueso-200 px-8 pb-6 pt-10">
            <img
              src={active.image}
              alt={`${active.name} torta`}
              className="w-52 drop-shadow-[0_15px_18px_rgba(43,43,43,0.2)]"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl leading-tight text-carbon-400">
              {active.name}
            </h3>
            {active.price && (
              <p className="shrink-0 font-display text-2xl leading-tight text-accent-hover">
                {active.price}
              </p>
            )}
          </div>

          {active.ingredients && (
            <p className="mt-3 text-carbon-300">{active.ingredients}</p>
          )}

          <a
            href={orderUrl}
            target="_blank"
            rel="noopener"
            data-tm-order="default"
            data-tm-channel="toast"
            className="tm-btn tm-btn-relief tm-btn-primary mt-6 w-full justify-center"
          >
            <IconBag size={18} />
            Order direct
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
