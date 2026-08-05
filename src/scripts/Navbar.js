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
  IconInstagram,
  IconMail,
  IconMenu,
  IconMoped,
  IconPhone,
  IconPin,
  IconYelp,
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
      { label: "Menu", href: "/menu" },
      { label: "Locations", href: "/locations" },
      { label: "Our Story", href: "/our-story" },
      { label: "Tortas Club", href: "/tortas-club" },
    ],
    cta: "Order Direct",
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
    yelp: "Tortas Manantial on Yelp",
    facebook: "Tortas Manantial on Facebook",
    instagram: "Tortas Manantial on Instagram",
  },
  es: {
    skip: "Saltar al contenido",
    home: "Tortas Manantial, inicio",
    links: [
      { label: "Menú", href: "/menu" },
      { label: "Ubicaciones", href: "/locations" },
      { label: "Nuestra Historia", href: "/our-story" },
      { label: "Tortas Club", href: "/tortas-club" },
    ],
    cta: "Ordena Directo",
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
    yelp: "Tortas Manantial en Yelp",
    facebook: "Tortas Manantial en Facebook",
    instagram: "Tortas Manantial en Instagram",
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

  function openPanel() {
    setMenuOpen(false);
    setPanelOpen(true);
    requestLocation();
  }

  const ordered = sortByProximity(LOCATIONS, coords);
  const nearestId = coords ? ordered[0].id : null;

  /* El local de la franja de utilidad: el mas cercano si hay permiso,
     si no, el primero que este abierto ahora mismo. */
  const utilityLocation =
    ordered.find((location) => getStatus(location).isOpen) || ordered[0];
  const utilityStatus = getStatus(utilityLocation);

  /* Transparente solo donde hay hero, y solo hasta pasar el umbral de scroll. */
  const isTransparent = transparent && heroPresent && !scrolled && !menuOpen;
  const showUtility = !scrolled;

  /* Redes disponibles. Las que no tengan URL simplemente no aparecen. */
  const socialLinks = [
    { key: "yelp", href: brand.social.yelp, label: t.yelp, Icon: IconYelp },
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
        className={`tm-header fixed inset-x-0 z-50 transition-colors duration-300 ${
          isTransparent ? "bg-transparent" : "bg-carbon-400 shadow-lg"
        }`}
      >
        {/* Franja de utilidad. Colapsa al hacer scroll. */}
        <div
          className={`overflow-hidden border-b border-white/10 transition-all duration-300 ${
            showUtility ? "h-9 opacity-100" : "h-0 opacity-0"
          } ${isTransparent ? "border-white/20" : "bg-carbon-500"}`}
          aria-hidden={!showUtility}
        >
          <div className="mx-auto grid h-9 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 text-xs text-hueso-100 sm:gap-4 sm:px-6">
            {/* Izquierda: telefono y correo. En movil el telefono se queda
                solo con el icono, si no no cabe nada mas. */}
            <div className="flex shrink-0 items-center gap-4">
              <a
                href={`tel:${utilityLocation.phone}`}
                data-tm-phone={utilityLocation.id}
                aria-label={`${t.call} ${utilityLocation.phoneLabel}`}
                className="flex shrink-0 items-center gap-1.5 transition-colors hover:text-maiz-300"
              >
                <IconPhone size={14} />
                <span className="hidden sm:inline">
                  {utilityLocation.phoneLabel}
                </span>
              </a>

              {brand.email && (
                <a
                  href={`mailto:${brand.email}`}
                  aria-label={t.emailAria}
                  className="hidden min-w-0 items-center gap-1.5 transition-colors hover:text-maiz-300 md:flex"
                >
                  <IconMail size={14} />
                  <span className="truncate">{brand.email}</span>
                </a>
              )}
            </div>

            {/* Centro: geotag del local abierto o mas cercano.
                Es la unica columna flexible, asi que es la que trunca.
                En movil solo cabe el nombre del local. */}
            <a
              href={utilityLocation.pageUrl}
              className="flex min-w-0 items-center justify-center gap-1.5 transition-colors hover:text-maiz-300"
            >
              <IconPin size={14} />

              <span className="truncate sm:hidden">
                {utilityLocation.name[t.langKey]}
              </span>

              <span className="hidden truncate sm:inline">
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

            {/* Derecha: redes. Solo se pintan las que tengan URL. */}
            <ul
              className="flex shrink-0 items-center justify-end gap-3"
              aria-label={t.social}
            >
              {socialLinks.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={item.label}
                    className="block transition-colors hover:text-maiz-300"
                  >
                    <item.Icon size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra principal */}
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <a
            href={cfg.homeUrl}
            className="shrink-0"
            aria-label={t.home}
          >
            {cfg.logoLight ? (
              <img
                src={cfg.logoLight}
                alt="Tortas Manantial"
                width="150"
                height="44"
                className="h-9 w-auto sm:h-11"
              />
            ) : (
              /* Fallback tipografico mientras tm_media() no tenga la URL del logo. */
              <span className="font-serif text-lg font-bold leading-none text-hueso-100 sm:text-xl">
                Tortas Manantial
              </span>
            )}
          </a>

          {/* Links, centro, desde lg */}
          <nav
            className="hidden lg:block"
            aria-label={t.langKey === "es" ? "Principal" : "Primary"}
          >
            <ul className="flex items-center gap-7">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative text-sm font-semibold text-hueso-100 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-maiz-300 after:transition-all hover:text-maiz-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA, idioma y hamburguesa */}
          <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              ref={ctaRef}
              type="button"
              onClick={() => (panelOpen ? setPanelOpen(false) : openPanel())}
              aria-expanded={panelOpen}
              aria-haspopup="dialog"
              className="tm-btn tm-btn-relief tm-btn-primary tm-btn-primary-on-dark text-sm"
            >
              {t.cta}
            </button>

            <button
              type="button"
              onClick={() => {
                setPanelOpen(false);
                setMenuOpen((open) => !open);
              }}
              aria-expanded={menuOpen}
              aria-controls="tm-mobile-menu"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              className="-mr-2 rounded-lg p-2 text-hueso-100 lg:hidden"
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>

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
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-5 font-serif text-2xl text-hueso-100 transition-colors hover:text-maiz-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="border-b border-white/10">
                <a
                  href="/careers"
                  onClick={() => setMenuOpen(false)}
                  className="block py-5 font-serif text-2xl text-hueso-100 transition-colors hover:text-maiz-300"
                >
                  {t.langKey === "es" ? "Trabaja con Nosotros" : "Careers"}
                </a>
              </li>
            </ul>
          </nav>

          <p className="border-t border-white/10 px-6 py-6 text-sm text-carbon-200">
            {t.tagline}
          </p>
        </div>
      )}
    </>
  );
}