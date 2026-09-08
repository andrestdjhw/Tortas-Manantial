import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BRAND,
  LOCATIONS,
  getStatus,
  sortByProximity,
} from "./locations";
import {
  IconBag,
  IconClose,
  IconFacebook,
  IconGoogle,
  IconInstagram,
  IconMail,
  IconMenu,
  IconMoped,
  IconPhone,
  IconPin,
  IconTikTok,
} from "./icons";

/* ------------------------------------------------------------------ */
/*  Copy                                                               */
/*  Sale tal cual del bloque 00 del Copy & Brief de la homepage.       */
/* ------------------------------------------------------------------ */

const COPY = {
  en: {
    skip: "Skip to content",
    home: "Tortas Manantial, home",
    links: [
      { label: "Catering", href: "/catering" },
      { label: "Locations", href: "/locations" },
      { label: "Our Story", href: "/our-story" },
      { label: "Tortas Club", href: "/tortas-club" },
    ],
    cta: "Order Direct",
    ctaShort: "Order",
    panelTitle: "Where are you eating today?",
    panelClose: "Close",
    closest: "Closest to you",
    openUntil: (h) => `Open until ${h}`,
    opensAt: (h) => `Closed now, opens at ${h}`,
    order: "Order",
    orderDirect: "Order direct",
    noFees: "Direct orders skip the app fees.",
    utility: (name, h) => `Open until ${h} at ${name}`,
    call: "Call",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    tagline: "Family owned in Phoenix since 2000.",
    otherLang: "Español",
    otherLangAria: "Ver este sitio en español",
    emailAria: "Email us",
    social: "Follow us",
    google: "Tortas Manantial on Google",
    facebook: "Tortas Manantial on Facebook",
    instagram: "Tortas Manantial on Instagram",
    tiktok: "Tortas Manantial on TikTok",
  },
  es: {
    skip: "Saltar al contenido",
    home: "Tortas Manantial, inicio",
    links: [
      { label: "Catering", href: "/catering" },
      { label: "Ubicaciones", href: "/locations" },
      { label: "Nuestra Historia", href: "/our-story" },
      { label: "Tortas Club", href: "/tortas-club" },
    ],
    cta: "Ordena Directo",
    ctaShort: "Ordena",
    panelTitle: "¿Dónde comes hoy?",
    panelClose: "Cerrar",
    closest: "El más cerca de ti",
    openUntil: (h) => `Abierto hasta las ${h}`,
    opensAt: (h) => `Ahora cerrado, abre a las ${h}`,
    order: "Ordena",
    orderDirect: "Ordena directo",
    noFees: "Ordenar directo evita las comisiones de la app.",
    utility: (name, h) => `Abierto hasta las ${h} en ${name}`,
    call: "Llamar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    tagline: "Negocio de familia en Phoenix desde el 2000.",
    otherLang: "English",
    otherLangAria: "View this site in English",
    emailAria: "Escríbenos",
    social: "Síguenos",
    google: "Tortas Manantial en Google",
    facebook: "Tortas Manantial en Facebook",
    instagram: "Tortas Manantial en Instagram",
    tiktok: "Tortas Manantial en TikTok",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * BRAND normalizado. Si locations.js todavia no lo exporta, o llega
 * incompleto, el navbar se pinta igual y solo se omiten los enlaces que
 * falten. Un dato de contacto ausente no puede tumbar la navegacion.
 */
function getBrand() {
  const source = BRAND || {};

  return {
    email: source.email || "",
    social: source.social || {},
  };
}

/**
 * Datos inyectados desde functions.php via wp_localize_script.
 * Las URLs de imagen vienen de tm_media() y apuntan a la biblioteca de medios
 * de WordPress. Mientras esten vacias, cada consumidor usa su fallback.
 */
function getConfig() {
  const cfg = typeof window !== "undefined" ? window.tmData || {} : {};
  return {
    homeUrl: cfg.homeUrl || "/",
    logo: cfg.logo || "",
    logoLight: cfg.logoLight || cfg.logo || "",
    lang: cfg.lang === "es" ? "es" : "en",
    altLangUrl: cfg.altLangUrl || "",
    orderUrl: cfg.orderUrl || "",
    footerGraphics: Array.isArray(cfg.footerGraphics) ? cfg.footerGraphics : [],
  };
}

/**
 * Arma la URL del idioma alterno.
 *
 * Ahora mismo no se usa: el selector de idioma salio del navbar y va a vivir
 * en su propio componente. Se deja aqui porque ese componente lo va a
 * necesitar, y porque el pendiente 04 del brief maestro (mecanismo bilingue)
 * sigue abierto. Mientras PHP no entregue altLangUrl, arma la ruta con
 * prefijo /es, que es la opcion recomendada en el brief.
 */
// eslint-disable-next-line no-unused-vars
function buildAltLangUrl(cfg) {
  if (cfg.altLangUrl) return cfg.altLangUrl;

  const path = window.location.pathname;
  return cfg.lang === "es"
    ? path.replace(/^\/es(\/|$)/, "/") || "/"
    : `/es${path}`;
}

/** Bloquea el scroll del body mientras hay una capa abierta. */
function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}

/* ------------------------------------------------------------------ */
/*  Panel de seleccion de local                                        */
/* ------------------------------------------------------------------ */

function LocationPanel({ t, locations, nearestId, onClose, triggerRef }) {
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (firstLinkRef.current) firstLinkRef.current.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        if (triggerRef.current) triggerRef.current.focus();
      }
    }

    function onPointerDown(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [onClose, triggerRef]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.panelTitle}
      className="tm-location-panel fixed inset-x-3 z-[60] max-h-[80svh] overflow-y-auto rounded-2xl border border-carbon-500 bg-carbon-400 p-4 text-hueso-100 shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:w-[26rem] sm:p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold leading-snug">{t.panelTitle}</h2>
        <button
          type="button"
          onClick={() => {
            onClose();
            if (triggerRef.current) triggerRef.current.focus();
          }}
          className="-m-2 rounded-lg p-2 text-carbon-200 transition-colors hover:text-hueso-100"
          aria-label={t.panelClose}
        >
          <IconClose size={20} />
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {locations.map((location) => {
          const status = getStatus(location);
          const isNearest = location.id === nearestId;

          return (
            <li key={location.id}>
              <div className="rounded-xl bg-carbon-500 p-3.5">
                {isNearest && (
                  <p className="tm-eyebrow mb-1.5 flex items-center gap-1 text-maiz-300">
                    <IconPin size={14} />
                    {t.closest}
                  </p>
                )}

                <p className="font-bold leading-tight">
                  {location.name[t.langKey]}
                </p>
                <p className="mt-0.5 text-sm text-carbon-200">
                  {location.street}
                </p>

                <p className="mt-2 flex items-center gap-1.5 text-sm">
                  <span
                    className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                      status.isOpen ? "bg-olivo-300" : "bg-carbon-300"
                    }`}
                    aria-hidden="true"
                  />
                  <span className={status.isOpen ? "text-hueso-100" : "text-carbon-200"}>
                    {status.isOpen
                      ? t.openUntil(status.closesAt)
                      : t.opensAt(status.opensAt)}
                  </span>
                </p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <a
                    ref={isNearest || location.id === locations[0].id ? firstLinkRef : null}
                    href={location.orderUrl}
                    target="_blank"
                    rel="noopener"
                    data-tm-order={location.id}
                    data-tm-channel="toast"
                    className="tm-btn tm-btn-relief tm-btn-primary tm-btn-primary-on-dark flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
                  >
                    <IconBag size={18} />
                    <span>{t.orderDirect}</span>
                  </a>

                  <a
                    href={location.uberUrl}
                    target="_blank"
                    rel="noopener"
                    data-tm-order={location.id}
                    data-tm-channel="ubereats"
                    className="tm-btn tm-btn-relief tm-btn-relief-on-dark tm-btn-fresh flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
                  >
                    <IconMoped size={18} />
                    <span>Uber Eats</span>
                  </a>

                  <a
                    href={`tel:${location.phone}`}
                    data-tm-phone={location.id}
                    className="tm-btn tm-btn-relief tm-btn-relief-on-dark tm-btn-muted flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
                    aria-label={`${t.call} ${location.name[t.langKey]}`}
                  >
                    <IconPhone size={18} />
                    <span>{t.call}</span>
                  </a>
                </div>

                <p className="mt-2 text-center text-[11px] text-carbon-200">
                  {t.noFees}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

export default function Navbar({ transparent = false }) {
  const cfg = getConfig();

  /**
   * Los links con external: true no apuntan a una ruta del sitio sino al
   * enlace de pedido de Toast, que llega desde PHP. Se resuelve aqui para
   * que el copy no tenga que repetir la URL.
   */
  function linkProps(link) {
    if (!link.external) return { href: link.href };

    return {
      href: cfg.orderUrl,
      target: "_blank",
      rel: "noopener",
      "data-tm-order": "default",
      "data-tm-channel": "toast",
    };
  }

  const brand = getBrand();
  const t = { ...COPY[cfg.lang], langKey: cfg.lang };

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [askedForLocation, setAskedForLocation] = useState(false);
  const [heroPresent, setHeroPresent] = useState(false);

  const ctaRef = useRef(null);

  /**
   * Red de seguridad. PHP dice si la plantilla deberia tener hero, pero la
   * barra solo se vuelve transparente si el hero existe de verdad en el DOM.
   * Sin esto, cualquier plantilla mal marcada deja el logo blanco sobre fondo
   * blanco y la barra tapando el contenido.
   */
  useEffect(() => {
    setHeroPresent(Boolean(document.querySelector("[data-tm-hero]")));
  }, []);

  /* Estado de scroll. El brief fija el umbral en 80px. */
  useEffect(() => {
    let frame = null;

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        frame = null;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useScrollLock(menuOpen || panelOpen);

  /* Geolocalizacion: solo se pide cuando el usuario abre el panel, nunca al cargar. */
  const requestLocation = useCallback(() => {
    if (askedForLocation || !navigator.geolocation) return;
    setAskedForLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) =>
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      () => {
        /* Sin permiso se queda el orden por defecto. No se avisa nada. */
      },
      { timeout: 5000, maximumAge: 600000 }
    );
  }, [askedForLocation]);

  /**
   * Cualquier CTA de las plantillas .php marcado con data-tm-order-cta abre
   * este panel en vez de navegar. Asi el flujo de pedido es siempre el mismo
   * y se respeta la regla de los tres toques del brief.
   *
   * Va despues de requestLocation a proposito: const no se puede leer antes
   * de su declaracion, ni siquiera en el arreglo de dependencias.
   */
  useEffect(() => {
    function onClick(event) {
      const target = event.target;
      if (!target || typeof target.closest !== "function") return;

      const trigger = target.closest("[data-tm-order-cta]");
      if (!trigger) return;

      event.preventDefault();
      setMenuOpen(false);
      setPanelOpen(true);
      requestLocation();
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [requestLocation]);

  /**
   * El panel ya no lo abre el CTA del navbar, que ahora va directo a Toast.
   * Sigue vivo y lo abren los CTA de las plantillas marcados con
   * data-tm-order-cta (hero de la home, cierre de Locations).
   */
  function openPanel() {
    setMenuOpen(false);
    setPanelOpen(true);
    requestLocation();
  }

  const ordered = sortByProximity(LOCATIONS, coords);
  const hasLocations = ordered.length > 0;
  const nearestId = coords && hasLocations ? ordered[0].id : null;

  /* El local de la franja de utilidad: el mas cercano si hay permiso,
     si no, el primero que este abierto ahora mismo. */
  const utilityLocation = hasLocations
    ? ordered.find((location) => getStatus(location).isOpen) || ordered[0]
    : null;
  const utilityStatus = utilityLocation ? getStatus(utilityLocation) : null;

  /* Transparente solo donde hay hero, y solo hasta pasar el umbral de scroll. */
  const isTransparent = transparent && heroPresent && !scrolled && !menuOpen;
  /* La fila superior lleva el logo, asi que se muestra siempre que no haya
     scroll, aunque falte el geotag. */
  const showTopRow = !scrolled;

  /* Tinta del contenido del navbar: hueso sobre el hero (isTransparent),
     carbon sobre el fondo claro solido. Un solo lugar para decidirlo en
     vez de repetir el ternario en cada link. */
  const navTone = isTransparent ? "text-hueso-100" : "text-carbon-400";
  const navHover = isTransparent ? "hover:text-maiz-300" : "hover:text-olivo-400";
  const navUnderline = isTransparent ? "after:bg-maiz-300" : "after:bg-olivo-400";
  const topRowLogo = isTransparent ? cfg.logoLight : cfg.logo;

  /* Redes disponibles. Las que no tengan URL simplemente no aparecen. */
  const socialLinks = [
    { key: "google", href: brand.social.google, label: t.google, Icon: IconGoogle },
    {
      key: "facebook",
      href: brand.social.facebook,
      label: t.facebook,
      Icon: IconFacebook,
    },
    {
      key: "instagram",
      href: brand.social.instagram,
      label: t.instagram,
      Icon: IconInstagram,
    },
    {
      key: "tiktok",
      href: brand.social.tiktok,
      label: t.tiktok,
      Icon: IconTikTok,
    },
  ].filter((item) => Boolean(item.href));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-maiz-300 focus:px-4 focus:py-2 focus:font-bold focus:text-carbon-400"
      >
        {t.skip}
      </a>

      <header
        className={`tm-header fixed inset-x-0 z-50 transition-shadow duration-300 ${
          isTransparent ? "" : "shadow-lg"
        }`}
      >
        {/* Fondo en degradado, capa aparte y no background del header:
            un background-image no hace fundido via transition-colors (eso
            solo anima background-color), asi que el fundido de "aparece al
            scrollear" sale de animar la opacity de esta capa en vez del
            fondo directo. */}
        <span
          aria-hidden="true"
          className={`tm-header-solid pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 ${
            isTransparent ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Elementos de apoyo, solo con el fondo claro puesto: sobre el
            hero compiten con la foto, aca tienen aire de sobra en los
            gutters del contenedor ancho. Reusan las mismas graficas del
            footer, no hacia falta pedir mas URLs. */}
        {!isTransparent && cfg.footerGraphics[0] && (
          <img
            src={cfg.footerGraphics[0]}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-1/2 hidden w-10 -translate-y-1/2 opacity-20 xl:block"
          />
        )}
        {!isTransparent && cfg.footerGraphics[1] && (
          <img
            src={cfg.footerGraphics[1]}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 hidden w-10 -translate-y-1/2 opacity-20 xl:block"
          />
        )}

        {/* ------------------------------------------------------------
            Fila superior. Telefono y correo a la izquierda, logo al centro,
            redes a la derecha. Colapsa completa al hacer scroll.
            ------------------------------------------------------------ */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            showTopRow ? "h-20 opacity-100" : "h-0 opacity-0"
          } ${
            isTransparent
              ? "border-b border-white/20"
              : "border-b border-carbon-400/10 bg-hueso-200/70"
          }`}
          aria-hidden={!showTopRow}
        >
          <div className={`mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 text-xs sm:gap-4 sm:px-6 ${navTone}`}>
            {/* Izquierda: telefono y correo. Oculto en movil: el telefono
                se muda al menu de pantalla completa y a la barra fija de
                abajo (ver tm-mobile-cta-bar), asi que aca solo hace falta
                desde lg. */}
            <div className="hidden min-w-0 items-center gap-4 lg:flex">
              {utilityLocation && (
                <a
                  href={`tel:${utilityLocation.phone}`}
                  data-tm-phone={utilityLocation.id}
                  aria-label={`${t.call} ${utilityLocation.phoneLabel}`}
                  className={`flex shrink-0 items-center gap-1.5 transition-colors ${navHover}`}
                >
                  <IconPhone size={14} />
                  <span className="hidden sm:inline">
                    {utilityLocation.phoneLabel}
                  </span>
                </a>
              )}

              {brand.email && (
                <a
                  href={`mailto:${brand.email}`}
                  aria-label={t.emailAria}
                  className={`hidden min-w-0 items-center gap-1.5 transition-colors md:flex ${navHover}`}
                >
                  <IconMail size={14} />
                  <span className="truncate">{brand.email}</span>
                </a>
              )}
            </div>

            {/* Centro: logo en reposo. col-start-2 explicito porque en
                movil el telefono y las redes de los costados estan en
                display:none: sin el, el grid los saca de la fila de
                acomodo automatico y el logo cae en la primera columna
                libre (la 1) en vez de quedarse en el medio. */}
            <a
              href={cfg.homeUrl}
              aria-label={t.home}
              tabIndex={showTopRow ? 0 : -1}
              className="col-start-2 flex shrink-0 items-center justify-center"
            >
              {topRowLogo ? (
                <img
                  src={topRowLogo}
                  alt="Tortas Manantial"
                  width="200"
                  height="60"
                  className="h-14 w-auto sm:h-16"
                />
              ) : (
                <span className={`font-display text-lg font-bold leading-none sm:text-xl ${navTone}`}>
                  Tortas Manantial
                </span>
              )}
            </a>

            {/* Derecha: redes. Solo se pintan las que tengan URL. Oculto en
                movil, se muda al menu de pantalla completa. */}
            <ul
              className="hidden shrink-0 items-center justify-end gap-3 lg:flex"
              aria-label={t.social}
            >
              {socialLinks.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={item.label}
                    tabIndex={showTopRow ? 0 : -1}
                    className={`block transition-colors ${navHover}`}
                  >
                    <item.Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ------------------------------------------------------------
            Barra principal. Geotag a la izquierda, links al centro,
            CTA a la derecha.
            ------------------------------------------------------------ */}
        {/* Rejilla de tres columnas con laterales iguales (1fr cada una).
              Con justify-between los links se corrian del centro segun lo
              largo que fuera el geotag, y la insignia, que va en left-1/2,
              nunca coincidia con el hueco. */}
          <div className="relative mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
          {/* Geotag del local abierto o mas cercano.
              Va a Maps (directionsUrl), no a pageUrl: el icono es un pin y
              lo que la gente espera al tocarlo es como llegar, no la ficha
              del local (esa ya esta en el link "Locations" del menu).
              Oculto en movil, se muda al menu de pantalla completa. */}
          {utilityLocation ? (
            <a
              href={utilityLocation.directionsUrl}
              target="_blank"
              rel="noopener"
              data-tm-directions={utilityLocation.id}
              className={`col-start-1 hidden min-w-0 items-center gap-1.5 text-[0.9rem] transition-colors sm:text-[1.05rem] lg:flex ${navTone} ${navHover}`}
            >
              <IconPin size={15} />

              {/* Un solo texto: esta "a" solo se muestra desde lg (ver
                  className de arriba), asi que la version corta que
                  llevaba para movil ya no aplica. */}
              <span className="truncate">
                {utilityStatus.isOpen
                  ? t.utility(
                      utilityLocation.name[t.langKey],
                      utilityStatus.closesAt
                    )
                  : `${utilityLocation.name[t.langKey]}, ${t.opensAt(
                      utilityStatus.opensAt
                    )}`}
              </span>

              <span
                className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                  utilityStatus.isOpen ? "bg-olivo-300" : "bg-carbon-300"
                }`}
                aria-hidden="true"
              />
            </a>
          ) : (
            <span />
          )}

          {/* Links, centro, desde lg.
              Van partidos en dos mitades con un hueco al centro: es donde
              baja la insignia al hacer scroll. El hueco se abre y se cierra
              con ella, asi que sin scroll los links quedan juntos. */}
          <nav
            className="hidden lg:col-start-2 lg:flex lg:items-center lg:justify-self-center"
            aria-label={t.langKey === "es" ? "Principal" : "Primary"}
          >
            {/* Mitad izquierda, anclada a la derecha de su columna */}
            <ul className="flex w-52 items-center justify-end gap-7">
              {t.links.slice(0, Math.ceil(t.links.length / 2)).map((link) => (
                <li key={link.href}>
                  <a
                    {...linkProps(link)}
                    className={`relative text-[1.05rem] font-semibold transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:transition-all hover:after:w-full ${navTone} ${navHover} ${navUnderline}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}

            </ul>

            {/* Hueco de la insignia. Se abre al hacer scroll, que es cuando
                el circulo baja a ocuparlo. */}
            <div
              aria-hidden="true"
              className={`shrink-0 transition-all duration-300 ${
                scrolled ? "w-28" : "w-8"
              }`}
            />

            {/* Mitad derecha, anclada a la izquierda de su columna */}
            <ul className="flex w-52 items-center justify-start gap-7">
              {t.links.slice(Math.ceil(t.links.length / 2)).map((link) => (
                <li key={link.href}>
                  <a
                    {...linkProps(link)}
                    className={`relative text-[1.05rem] font-semibold transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:transition-all hover:after:w-full ${navTone} ${navHover} ${navUnderline}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA. Oculto en movil (se muda al menu de pantalla completa y a
              la barra fija de abajo, ver tm-mobile-cta-bar); desde lg ocupa
              la columna derecha, junto a los links. El div se queda
              siempre montado aunque el boton este oculto: de ahi cuelga el
              panel de local, y ese panel lo puede disparar cualquier
              data-tm-order-cta de la pagina, no solo este boton. */}
          <div className="relative col-start-2 justify-self-center lg:col-start-3 lg:justify-self-end">
            <a
              ref={ctaRef}
              href={cfg.orderUrl}
              target="_blank"
              rel="noopener"
              data-tm-order="default"
              data-tm-channel="toast"
              className={`tm-btn tm-btn-relief tm-btn-primary hidden px-5 py-3 text-[1.05rem] lg:inline-flex ${
                isTransparent ? "tm-btn-primary-on-dark" : ""
              }`}
            >
              {t.cta}
            </a>

            {panelOpen && (
              <LocationPanel
                t={t}
                locations={ordered}
                nearestId={nearestId}
                onClose={() => setPanelOpen(false)}
                triggerRef={ctaRef}
              />
            )}
          </div>

          {/* Hamburguesa, pegada al borde derecho */}
          <button
            type="button"
            onClick={() => {
              setPanelOpen(false);
              setMenuOpen((open) => !open);
            }}
            aria-expanded={menuOpen}
            aria-controls="tm-mobile-menu"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            className={`col-start-3 -mr-2 justify-self-end rounded-lg p-2 lg:hidden ${navTone}`}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>

          {/* ------------------------------------------------------------
              Insignia. Al hacer scroll el logo se encierra en un circulo
              anclado al borde SUPERIOR de la barra, asi que la mitad de
              abajo asoma y la de arriba queda dentro. Colgado del borde
              inferior se veia suelto sobre el hero.

              Es un segundo elemento y no el mismo logo de la fila de arriba:
              mover un nodo entre dos contenedores con layouts distintos no
              se puede animar de forma estable.

              El circulo se arma como una torta en corte: dos rodajas
              (.tm-torta-slice) asoman detras en diagonal, y el logo
              "posa" en el circulo del frente. Las rodajas van como
              hermanas del link y no como pseudo-elementos suyos porque
              un pseudo-elemento no puede pintarse detras del propio
              fondo de su dueno, que es justo el truco que hacia
              funcionar esto con box-shadow. Con hermanas, el fondo
              opaco del link de encima las tapa salvo en el borde que
              asoma, que es el efecto que buscamos.
              ------------------------------------------------------------ */}
          <div
            aria-hidden="true"
            className={`tm-logo-badge-wrap absolute left-1/2 top-0 z-10 h-20 w-20 -translate-x-1/2 lg:h-24 lg:w-24 ${
              scrolled ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <span className="tm-torta-slice tm-torta-slice--bottom"></span>
            <span className="tm-torta-slice tm-torta-slice--filling"></span>

            <a
              href={cfg.homeUrl}
              aria-label={t.home}
              aria-hidden={!scrolled}
              tabIndex={scrolled ? 0 : -1}
              className={`tm-logo-badge absolute inset-0 flex items-center justify-center rounded-full p-3.5 ${
                scrolled ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              {cfg.logoLight ? (
                <img
                  src={cfg.logoLight}
                  alt=""
                  width="200"
                  height="60"
                  className="h-auto w-full"
                />
              ) : (
                <span className="text-center font-display text-xs font-bold leading-none text-hueso-100">
                  TM
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      {/* Menu movil a pantalla completa */}
      {menuOpen && (
        <div
          id="tm-mobile-menu"
          className="tm-mobile-menu fixed inset-x-0 bottom-0 z-40 flex flex-col bg-carbon-400 pt-28 lg:hidden"
        >
          <nav
            className="flex-1 overflow-y-auto px-6"
            aria-label={t.langKey === "es" ? "Principal, móvil" : "Primary, mobile"}
          >
            <ul className="flex flex-col">
              {t.links.map((link) => (
                <li key={link.href} className="border-b border-white/10">
                  <a
                    {...linkProps(link)}
                    onClick={() => setMenuOpen(false)}
                    className="block py-5 font-display text-2xl text-hueso-100 transition-colors hover:text-maiz-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="border-b border-white/10">
                <a
                  href="/careers"
                  onClick={() => setMenuOpen(false)}
                  className="block py-5 font-display text-2xl text-hueso-100 transition-colors hover:text-maiz-300"
                >
                  {t.langKey === "es" ? "Trabaja con Nosotros" : "Careers"}
                </a>
              </li>
            </ul>
          </nav>

          {/* Lo que se saco de la barra compacta en movil (geotag, CTA,
              telefono y redes) vive aca ahora: sigue disponible, solo que
              adentro del menu en vez de compitiendo por espacio arriba. */}
          <div className="flex flex-col gap-5 border-t border-white/10 px-6 py-6">
            {utilityLocation && (
              <a
                href={utilityLocation.directionsUrl}
                target="_blank"
                rel="noopener"
                data-tm-directions={utilityLocation.id}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1.5 text-sm text-hueso-100 transition-colors hover:text-maiz-300"
              >
                <IconPin size={15} />
                <span className="truncate">
                  {utilityStatus.isOpen
                    ? t.utility(utilityLocation.name[t.langKey], utilityStatus.closesAt)
                    : `${utilityLocation.name[t.langKey]}, ${t.opensAt(utilityStatus.opensAt)}`}
                </span>
                <span
                  className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                    utilityStatus.isOpen ? "bg-olivo-300" : "bg-carbon-300"
                  }`}
                  aria-hidden="true"
                />
              </a>
            )}

            <a
              href={cfg.orderUrl}
              target="_blank"
              rel="noopener"
              data-tm-order="default"
              data-tm-channel="toast"
              onClick={() => setMenuOpen(false)}
              className="tm-btn tm-btn-relief tm-btn-primary tm-btn-primary-on-dark w-full"
            >
              {t.cta}
            </a>

            {utilityLocation && (
              <a
                href={`tel:${utilityLocation.phone}`}
                data-tm-phone={utilityLocation.id}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-hueso-100 transition-colors hover:text-maiz-300"
              >
                <IconPhone size={16} />
                {utilityLocation.phoneLabel}
              </a>
            )}

            {socialLinks.length > 0 && (
              <ul className="flex items-center gap-4" aria-label={t.social}>
                {socialLinks.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener"
                      aria-label={item.label}
                      className="block text-hueso-100 transition-colors hover:text-maiz-300"
                    >
                      <item.Icon size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="border-t border-white/10 px-6 py-6 text-sm text-carbon-200">
            {t.tagline}
          </p>
        </div>
      )}

      {/* Barra de CTAs fija, solo en movil. Estatica: a diferencia del
          resto de la barra, no colapsa con el scroll ni depende del hero,
          siempre esta ahi para las dos acciones que mas importan. Se
          oculta mientras el menu esta abierto, porque el menu ya trae su
          propio boton de pedido y de telefono (ver arriba) y las dos
          barras pegadas al fondo se pisaban. */}
      {!menuOpen && (
        <div className="tm-mobile-cta-bar fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 lg:hidden">
          {utilityLocation && (
            <a
              href={`tel:${utilityLocation.phone}`}
              data-tm-phone={utilityLocation.id}
              className="flex items-center justify-center gap-2 border-r border-carbon-400/10 bg-hueso-100 py-4 text-sm font-bold text-carbon-400"
            >
              <IconPhone size={16} />
              {t.call}
            </a>
          )}

          <a
            href={cfg.orderUrl}
            target="_blank"
            rel="noopener"
            data-tm-order="default"
            data-tm-channel="toast"
            className="flex items-center justify-center gap-2 bg-carbon-400 py-4 text-sm font-bold text-hueso-100"
          >
            <IconBag size={16} />
            {t.ctaShort}
          </a>
        </div>
      )}
    </>
  );
}