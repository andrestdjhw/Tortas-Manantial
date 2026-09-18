import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BRAND,
  LOCATIONS,
  getStatus,
  sortByProximity,
} from "./locations";
import {
  IconBadgeCheck,
  IconBag,
  IconClose,
  IconFacebook,
  IconGoogle,
  IconInstagram,
  IconMenu,
  IconMoped,
  IconPhone,
  IconPin,
  IconTikTok,
  IconUtensils,
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
      { label: "Tortas Club", href: "/tortas-club" },
      { label: "Locations", href: "/locations" },
      { label: "Our Story", href: "/our-story" },
    ],
    cta: "Order Pickup",
    ctaShort: "Pickup",
    ctaDelivery: "Order Delivery",
    panelTitle: "Where are you eating today?",
    panelTitleDelivery: "Which location is delivering?",
    panelClose: "Close",
    closest: "Closest to you",
    openUntil: (h) => `Open until ${h}`,
    opensAt: (h) => `Closed now, opens at ${h}`,
    order: "Order",
    orderDirect: "Order direct",
    noFees: "Direct orders skip the app fees.",
    deliveryNote: "Delivery orders go through each app's own checkout.",
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
      { label: "Tortas Club", href: "/tortas-club" },
      { label: "Ubicaciones", href: "/locations" },
      { label: "Nuestra Historia", href: "/our-story" },
    ],
    cta: "Ordena para Recoger",
    ctaShort: "Recoger",
    ctaDelivery: "Pide a Domicilio",
    panelTitle: "¿Dónde comes hoy?",
    panelTitleDelivery: "¿Qué local te va a entregar?",
    panelClose: "Cerrar",
    closest: "El más cerca de ti",
    openUntil: (h) => `Abierto hasta las ${h}`,
    opensAt: (h) => `Ahora cerrado, abre a las ${h}`,
    order: "Ordena",
    orderDirect: "Ordena directo",
    noFees: "Ordenar directo evita las comisiones de la app.",
    deliveryNote: "Los pedidos a domicilio se hacen desde cada app.",
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

function LocationPanel({ t, locations, nearestId, onClose, triggerRef, mode }) {
  const isDelivery = mode === "delivery";
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
      aria-label={isDelivery ? t.panelTitleDelivery : t.panelTitle}
      className="tm-location-panel fixed inset-x-3 z-[60] max-h-[80svh] overflow-y-auto rounded-2xl border border-white/15 bg-black/75 p-4 text-hueso-100 shadow-2xl backdrop-blur-xl backdrop-saturate-150 sm:absolute sm:inset-x-auto sm:right-0 sm:w-[26rem] sm:p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold leading-snug">
          {isDelivery ? t.panelTitleDelivery : t.panelTitle}
        </h2>
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
              <div className="rounded-xl border border-white/10 bg-black/50 p-3.5">
                {isNearest && (
                  <p className="tm-eyebrow mb-1.5 flex items-center gap-1 text-accent-hover-soft">
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

                <div
                  className={`mt-3 grid gap-2 ${
                    isDelivery ? "grid-cols-3" : "grid-cols-2"
                  }`}
                >
                  {isDelivery ? (
                    <>
                      <a
                        ref={
                          isNearest || location.id === locations[0].id
                            ? firstLinkRef
                            : null
                        }
                        href={location.grubhubUrl}
                        target="_blank"
                        rel="noopener"
                        data-tm-order={location.id}
                        data-tm-channel="grubhub"
                        className="tm-btn tm-btn-relief tm-btn-relief-on-dark tm-btn-grubhub flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
                      >
                        <IconUtensils size={18} />
                        <span>Grubhub</span>
                      </a>

                      <a
                        href={location.seamlessUrl}
                        target="_blank"
                        rel="noopener"
                        data-tm-order={location.id}
                        data-tm-channel="seamless"
                        className="tm-btn tm-btn-relief tm-btn-relief-on-dark tm-btn-seamless flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
                      >
                        <IconBadgeCheck size={18} />
                        <span>Seamless</span>
                      </a>

                      <a
                        href={location.uberUrl}
                        target="_blank"
                        rel="noopener"
                        data-tm-order={location.id}
                        data-tm-channel="ubereats"
                        className="tm-btn tm-btn-relief tm-btn-relief-on-dark tm-btn-ubereats flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
                      >
                        <IconBag size={18} />
                        <span>Uber Eats</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        ref={
                          isNearest || location.id === locations[0].id
                            ? firstLinkRef
                            : null
                        }
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
                        href={`tel:${location.phone}`}
                        data-tm-phone={location.id}
                        className="tm-btn tm-btn-relief tm-btn-relief-on-dark tm-btn-muted flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
                        aria-label={`${t.call} ${location.name[t.langKey]}`}
                      >
                        <IconPhone size={18} />
                        <span>{t.call}</span>
                      </a>
                    </>
                  )}
                </div>

                <p className="mt-2 text-center text-[11px] text-carbon-200">
                  {isDelivery ? t.deliveryNote : t.noFees}
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

export default function Navbar() {
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

  const [menuOpen, setMenuOpen] = useState(false);
  /* null | "pickup" | "delivery": que panel de local esta abierto, si hay uno. */
  const [activePanel, setActivePanel] = useState(null);
  const [coords, setCoords] = useState(null);
  const [askedForLocation, setAskedForLocation] = useState(false);

  const ctaRef = useRef(null);
  const deliveryCtaRef = useRef(null);

  useScrollLock(menuOpen || Boolean(activePanel));

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
      setActivePanel("pickup");
      requestLocation();
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [requestLocation]);

  /**
   * Abre el panel de seleccion de local. La usa directo el CTA del
   * navbar (ver mas abajo) y tambien cualquier CTA de las plantillas
   * .php marcado con data-tm-order-cta (por ahora solo el cierre de
   * /locations, "Find my shop") via el listener de arriba -- dos
   * caminos al mismo resultado, uno adentro del componente y otro por
   * delegacion de eventos para markup que React no controla.
   */
  function openPanel(mode) {
    setMenuOpen(false);
    setActivePanel(mode);
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-maiz-300 focus:px-4 focus:py-2 focus:font-bold focus:text-hueso-100"
      >
        {t.skip}
      </a>

      {/* Una sola fila, siempre solida y siempre pegada arriba: sin la
          transparencia que llevaba sobre el hero, sin la fila superior
          que colapsaba al hacer scroll y sin la insignia animada que
          bajaba al centro (esas tres cosas se quitaron por pedido del
          cliente). El logo pasa a la izquierda, al lugar que antes
          ocupaba el geotag; el geotag se saco de aca, pero sigue
          disponible en el menu movil. */}
      <header className="tm-header tm-header-solid fixed inset-x-0 z-50 shadow-lg">
        {/* Elementos de apoyo, mismas graficas del footer, no hacia
            falta pedir mas URLs. */}
        {cfg.footerGraphics[0] && (
          <img
            src={cfg.footerGraphics[0]}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-1/2 hidden w-10 -translate-y-1/2 opacity-20 xl:block"
          />
        )}
        {cfg.footerGraphics[1] && (
          <img
            src={cfg.footerGraphics[1]}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 hidden w-10 -translate-y-1/2 opacity-20 xl:block"
          />
        )}

        {/* grid en movil (3 columnas: relleno invisible / logo / hamburguesa,
            el mismo ancho a los lados para que el logo quede centrado de
            verdad), flex de siempre desde lg: ahi ya no hace falta
            centrar nada, el layout vuelve a logo-izquierda + links +
            CTA-derecha con justify-between. */}
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[2.5rem_1fr_2.5rem] items-center gap-4 px-4 sm:px-6 lg:flex lg:justify-between">
          {/* Relleno invisible, mismo ancho que la hamburguesa: sin esto
              el logo se centra respecto de un renglon donde solo el lado
              derecho pesa (la hamburguesa) y queda corrido hacia la
              izquierda. Solo existe en movil. */}
          <div aria-hidden="true" className="lg:hidden" />

          {/* Logo, centrado en movil, izquierda desde lg */}
          <a
            href={cfg.homeUrl}
            aria-label={t.home}
            className="flex w-full shrink-0 items-center justify-center lg:w-auto lg:justify-start"
          >
            {cfg.logo ? (
              <img
                src={cfg.logo}
                alt="Tortas Manantial"
                width="200"
                height="60"
                className="h-14 w-auto sm:h-16"
              />
            ) : (
              <span className="font-display text-lg font-bold leading-none text-carbon-400 sm:text-xl">
                Tortas Manantial
              </span>
            )}
          </a>

          {/* Links, desde lg. Ya no se parten en dos mitades con un
              hueco al centro: eso era para dejarle sitio a la insignia
              que bajaba ahi, y esa animacion se quito. */}
          <nav
            className="hidden lg:flex lg:items-center lg:gap-7"
            aria-label={t.langKey === "es" ? "Principal" : "Primary"}
          >
            {t.links.map((link) => (
              <a
                key={link.href}
                {...linkProps(link)}
                className="relative text-[1.05rem] font-medium text-carbon-400 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-olivo-400 after:transition-all hover:text-olivo-400 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + hamburguesa, derecha */}
          <div className="flex w-full shrink-0 items-center justify-end gap-3 lg:w-auto lg:justify-normal">
            {/* Los dos div se quedan siempre montados aunque el boton este
                oculto en movil: de ahi cuelga el panel de cada uno, y el de
                pickup ademas lo puede disparar cualquier data-tm-order-cta
                de la pagina, no solo su boton.

                Ninguno de los dos botones va directo a un link: por pedido
                del cliente, cada uno abre su propio panel de seleccion de
                local (mismo patron que "Find my shop" en el cierre de
                /locations), asi el usuario ve sus 4 opciones ordenadas por
                cercania en vez de caer siempre en el local de McDowell.
                openPanel(mode) hace lo mismo que el listener de
                data-tm-order-cta para el modo "pickup", solo que sin pasar
                por el evento de click en document: estos botones ya viven
                dentro del componente que tiene el estado. */}
            <div className="relative">
              <button
                ref={ctaRef}
                type="button"
                onClick={() => openPanel("pickup")}
                className="tm-btn tm-btn-relief tm-btn-primary hidden px-5 py-3 text-[1.05rem] lg:inline-flex"
              >
                <IconBag size={18} />
                {t.cta}
              </button>

              {activePanel === "pickup" && (
                <LocationPanel
                  t={t}
                  locations={ordered}
                  nearestId={nearestId}
                  onClose={() => setActivePanel(null)}
                  triggerRef={ctaRef}
                  mode="pickup"
                />
              )}
            </div>

            <div className="relative">
              <button
                ref={deliveryCtaRef}
                type="button"
                onClick={() => openPanel("delivery")}
                className="tm-btn tm-btn-relief tm-btn-fresh hidden px-5 py-3 text-[1.05rem] lg:inline-flex"
              >
                <IconMoped size={18} />
                {t.ctaDelivery}
              </button>

              {activePanel === "delivery" && (
                <LocationPanel
                  t={t}
                  locations={ordered}
                  nearestId={nearestId}
                  onClose={() => setActivePanel(null)}
                  triggerRef={deliveryCtaRef}
                  mode="delivery"
                />
              )}
            </div>

            {/* Hamburguesa, solo movil */}
            <button
              type="button"
              onClick={() => {
                setActivePanel(null);
                setMenuOpen((open) => !open);
              }}
              aria-expanded={menuOpen}
              aria-controls="tm-mobile-menu"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              className="rounded-lg p-2 text-carbon-400 lg:hidden"
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
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
                    className="block py-5 font-display text-2xl text-hueso-100 transition-colors hover:text-accent-hover-soft"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="border-b border-white/10">
                <a
                  href="/careers"
                  onClick={() => setMenuOpen(false)}
                  className="block py-5 font-display text-2xl text-hueso-100 transition-colors hover:text-accent-hover-soft"
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
                className="flex items-center gap-1.5 text-sm text-hueso-100 transition-colors hover:text-accent-hover-soft"
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
                className="flex items-center gap-2 text-sm text-hueso-100 transition-colors hover:text-accent-hover-soft"
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
                      className="block text-hueso-100 transition-colors hover:text-accent-hover-soft"
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