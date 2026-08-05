import React from "react";

/**
 * Iconos inline. Trazo de 1.75 para que se lean bien a 20px sobre video.
 * Todos son decorativos: el texto que los acompana lleva el significado,
 * por eso van con aria-hidden.
 */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export function IconMenu({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function IconClose({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconPin({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M12 21c4-4.5 6-7.8 6-10.5a6 6 0 1 0-12 0C6 13.2 8 16.5 12 21z" />
      <circle cx="12" cy="10.5" r="2.25" />
    </svg>
  );
}

export function IconPhone({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  );
}

export function IconChevron({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M7 10l5 5 5-5" />
    </svg>
  );
}

export function IconArrow({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconMail({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3.8 7l7.1 5.2c.66.48 1.54.48 2.2 0L20.2 7" />
    </svg>
  );
}

/** Bolsa de pedido, para el canal directo. */
export function IconBag({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M5.4 8h13.2l-1 11.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8z" />
      <path d="M8.8 8V6.4a3.2 3.2 0 0 1 6.4 0V8" />
    </svg>
  );
}

/** Moto de reparto, para el canal de terceros. */
export function IconMoped({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <circle cx="6" cy="17.5" r="2.6" />
      <circle cx="18" cy="17.5" r="2.6" />
      <path d="M8.6 17.5h6.8" />
      <path d="M18 14.9V9.4a2 2 0 0 0-2-2h-1.6" />
      <path d="M3.6 6h2.2a3 3 0 0 1 3 3v5.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Marcas sociales                                                    */
/*  Instagram y Facebook son fieles al glifo oficial.                  */
/*  TODO: cambiar el de Yelp por el SVG oficial de sus brand           */
/*  resources. Yelp es estricto con el uso de su marca y el de abajo   */
/*  es una aproximacion geometrica para no dejar el hueco vacio.       */
/* ------------------------------------------------------------------ */

export function IconInstagram({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.25" />
      <circle cx="12" cy="12" r="4.15" />
      <circle cx="17.35" cy="6.65" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

export function IconYelp({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M11.4 2.3c.75-.24 1.5.3 1.5 1.07v8.05c0 1.06-1.3 1.56-2 .78L6.15 7.4c-.5-.56-.33-1.44.35-1.77z" />
      <path d="M9.55 13.35c.7-.36 1.5.2 1.4 .98l-.5 4.02c-.1.83-1.13 1.16-1.7.55l-2.7-2.9c-.5-.55-.3-1.44.38-1.78z" />
      <path d="M13.85 13.6c-.5-.6.03-1.5.8-1.36l4.05.75c.8.15 1.1 1.16.5 1.72l-2.9 2.7c-.55.5-1.42.3-1.7-.42z" />
      <path d="M14.35 10.5c-.8.08-1.3-.83-.83-1.48l2.4-3.3c.5-.68 1.55-.55 1.86.23l1.35 3.4c.3.77-.27 1.6-1.1 1.68z" />
      <path d="M9.3 20.15c.35-.72 1.42-.63 1.65.13l.9 3.05c.05.17-.1.33-.27.28l-2.4-.7c-.35-.1-.5-.5-.34-.83z" />
    </svg>
  );
}