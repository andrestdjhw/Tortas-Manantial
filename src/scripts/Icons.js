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

/** Bolsa de pedido, para el canal directo y para Uber Eats. */
export function IconBag({ size = 18, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...base}>
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

/** Cubiertos cruzados, para el boton de Grubhub. */
export function IconUtensils({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M7 3v6.5a1.8 1.8 0 0 0 3.6 0V3" />
      <path d="M8.8 3v18" />
      <path d="M17 3c-1.4 0-2.5 1.7-2.5 5.2 0 2.4 1 3.6 2 4.1v9.2" />
    </svg>
  );
}

/** Sello con check, para el boton de Seamless. */
export function IconBadgeCheck({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M12 3.2l2 1.7 2.6-.4 1 2.4 2.4 1-.4 2.6 1.7 2-1.7 2 .4 2.6-2.4 1-1 2.4-2.6-.4-2 1.7-2-1.7-2.6.4-1-2.4-2.4-1 .4-2.6L3.2 12l1.7-2-.4-2.6 2.4-1 1-2.4 2.6.4z" />
      <path d="M8.8 12.2l2.1 2.1 4.3-4.3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Marcas sociales                                                    */
/*  Instagram, Facebook, TikTok y el storefront de Google Business     */
/*  Profile: los mismos trazos que paso el cliente.                    */
/* ------------------------------------------------------------------ */

export function IconInstagram({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 00-2.13 1.38A5.88 5.88 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13a5.88 5.88 0 002.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 002.13-1.38 5.88 5.88 0 001.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 00-1.38-2.13A5.88 5.88 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
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
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

/** Storefront con "G": el icono real de Google Business Profile, no el
 *  logo generico de Google. Es al que apunta el link (la ficha del
 *  negocio), asi que es el que hay que reconocer de un vistazo. */
export function IconGoogle({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 50 50"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M 9.2832031 4 C 7.488935 4 5.9052102 5.2051958 5.4277344 6.9355469 L 2 19.365234 L 2 19.5 C 2 23.078268 4.9217323 26 8.5 26 C 10.813035 26 12.845511 24.77516 13.998047 22.945312 C 15.146939 24.778014 17.180833 26 19.5 26 C 21.819167 26 23.853061 24.778014 25.001953 22.945312 C 26.154489 24.77516 28.186965 26 30.5 26 C 32.813993 26 34.847721 24.77447 36 22.943359 C 37.152279 24.77447 39.186007 26 41.5 26 C 45.078268 26 48 23.078268 48 19.5 L 48 19.365234 L 44.570312 6.9355469 C 44.092963 5.2056548 42.509782 4 40.714844 4 L 9.2832031 4 z M 9.2832031 6 L 14.851562 6 L 13.197266 18 L 4.4511719 18 L 7.3554688 7.46875 C 7.5959929 6.597101 8.3794712 6 9.2832031 6 z M 26 6 L 33.128906 6 L 34.783203 18 L 26 18 L 26 6 z M 15 18 L 24 18 L 24 19.5 C 24 19.668891 24.012611 19.834272 24.025391 20 L 15 20 L 15 19.5 L 15 18 z M 36.802734 18 L 45.548828 18 L 45.984375 19.580078 C 45.981749 19.724009 45.951091 19.859765 45.935547 20 L 37.050781 20 C 37.032383 19.833631 37 19.67153 37 19.5 L 37 19.431641 L 36.802734 18 z M 4.0644531 20 L 12.949219 20 C 12.699714 22.256206 10.826202 24 8.5 24 C 6.175282 24 4.3143567 22.254621 4.0644531 20 z M 26.099609 20 L 34.900391 20 C 34.642986 22.247621 32.820142 24 30.5 24 C 28.179858 24 26.357014 22.247621 26.099609 20 z M 14 25.974609 C 12.517 27.235609 10.599 28 8.5 28 C 6.845 28 5.306 27.519172 4 26.701172 L 4 43 C 4 44.654 5.346 46 7 46 L 43 46 C 44.654 46 46 44.654 46 43 L 46 26.701172 C 44.694 27.519172 43.155 28 41.5 28 C 39.401 28 37.483 27.235609 36 25.974609 C 34.517 27.235609 32.599 28 30.5 28 C 28.401 28 26.483 27.235609 25 25.974609 C 23.517 27.235609 21.599 28 19.5 28 C 17.401 28 15.483 27.235609 14 25.974609 z M 35.5 29 C 37.546 29 39.372453 29.952547 40.564453 31.435547 L 39.132812 32.867188 C 38.314813 31.740187 36.996 31 35.5 31 C 33.019 31 31 33.019 31 35.5 C 31 37.981 33.019 40 35.5 40 C 37.453 40 39.102609 38.742 39.724609 37 L 36 37 L 36 35 L 41.974609 35 C 41.986609 35.166 42 35.331 42 35.5 C 42 39.084 39.084 42 35.5 42 C 31.916 42 29 39.084 29 35.5 C 29 31.916 31.916 29 35.5 29 z" />
    </svg>
  );
}

export function IconTikTok({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.36a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.4z" />
    </svg>
  );
}