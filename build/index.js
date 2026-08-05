/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/Navbar.js"
/*!*******************************!*\
  !*** ./src/scripts/Navbar.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navbar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _locations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locations */ "./src/scripts/locations.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons */ "./src/scripts/icons.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




/* ------------------------------------------------------------------ */
/*  Copy                                                               */
/*  Sale tal cual del bloque 00 del Copy & Brief de la homepage.       */
/* ------------------------------------------------------------------ */

const COPY = {
  en: {
    skip: "Skip to content",
    home: "Tortas Manantial, home",
    links: [{
      label: "Menu",
      href: "/menu"
    }, {
      label: "Locations",
      href: "/locations"
    }, {
      label: "Our Story",
      href: "/our-story"
    }, {
      label: "Tortas Club",
      href: "/tortas-club"
    }],
    cta: "Order Direct",
    panelTitle: "Where are you eating today?",
    panelClose: "Close",
    closest: "Closest to you",
    openUntil: h => `Open until ${h}`,
    opensAt: h => `Closed now, opens at ${h}`,
    order: "Order",
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
    instagram: "Tortas Manantial on Instagram"
  },
  es: {
    skip: "Saltar al contenido",
    home: "Tortas Manantial, inicio",
    links: [{
      label: "Menú",
      href: "/menu"
    }, {
      label: "Ubicaciones",
      href: "/locations"
    }, {
      label: "Nuestra Historia",
      href: "/our-story"
    }, {
      label: "Tortas Club",
      href: "/tortas-club"
    }],
    cta: "Ordena Directo",
    panelTitle: "¿Dónde comes hoy?",
    panelClose: "Cerrar",
    closest: "El más cerca de ti",
    openUntil: h => `Abierto hasta las ${h}`,
    opensAt: h => `Ahora cerrado, abre a las ${h}`,
    order: "Ordena",
    utility: (name, h) => `Abierto hasta las ${h} en ${name}`,
    call: "Llama",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    tagline: "Negocio de familia en Phoenix desde el 2000.",
    otherLang: "English",
    otherLangAria: "View this site in English",
    emailAria: "Escríbenos",
    social: "Síguenos",
    yelp: "Tortas Manantial en Yelp",
    facebook: "Tortas Manantial en Facebook",
    instagram: "Tortas Manantial en Instagram"
  }
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
  const source = _locations__WEBPACK_IMPORTED_MODULE_1__.BRAND || {};
  return {
    email: source.email || "",
    social: source.social || {}
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
    altLangUrl: cfg.altLangUrl || ""
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
  return cfg.lang === "es" ? path.replace(/^\/es(\/|$)/, "/") || "/" : `/es${path}`;
}

/** Bloquea el scroll del body mientras hay una capa abierta. */
function useScrollLock(active) {
  ;(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
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

function LocationPanel({
  t,
  locations,
  nearestId,
  onClose,
  triggerRef
}) {
  const panelRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const firstLinkRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    ref: panelRef,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": t.panelTitle,
    className: "tm-location-panel fixed inset-x-3 z-[60] max-h-[80svh] overflow-y-auto rounded-2xl border border-carbon-500 bg-carbon-400 p-4 text-hueso-100 shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:w-[26rem] sm:p-5",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "mb-4 flex items-start justify-between gap-4",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
        className: "text-lg font-bold leading-snug",
        children: t.panelTitle
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
        type: "button",
        onClick: () => {
          onClose();
          if (triggerRef.current) triggerRef.current.focus();
        },
        className: "-m-2 rounded-lg p-2 text-carbon-200 transition-colors hover:text-hueso-100",
        "aria-label": t.panelClose,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.IconClose, {
          size: 20
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("ul", {
      className: "flex flex-col gap-2",
      children: locations.map(location => {
        const status = (0,_locations__WEBPACK_IMPORTED_MODULE_1__.getStatus)(location);
        const isNearest = location.id === nearestId;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "rounded-xl bg-carbon-500 p-3.5",
            children: [isNearest && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
              className: "tm-eyebrow mb-1.5 flex items-center gap-1 text-maiz-300",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.IconPin, {
                size: 14
              }), t.closest]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
              className: "font-bold leading-tight",
              children: location.name[t.langKey]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
              className: "mt-0.5 text-sm text-carbon-200",
              children: location.street
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
              className: "mt-2 flex items-center gap-1.5 text-sm",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                className: `inline-block h-2 w-2 shrink-0 rounded-full ${status.isOpen ? "bg-olivo-300" : "bg-carbon-300"}`,
                "aria-hidden": "true"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                className: status.isOpen ? "text-hueso-100" : "text-carbon-200",
                children: status.isOpen ? t.openUntil(status.closesAt) : t.opensAt(status.opensAt)
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "mt-3 flex items-center gap-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("a", {
                ref: isNearest || location.id === locations[0].id ? firstLinkRef : null,
                href: location.orderUrl,
                target: "_blank",
                rel: "noopener",
                "data-tm-order": location.id,
                className: "tm-btn tm-btn-primary tm-btn-primary-on-dark flex-1 text-sm",
                children: [t.order, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.IconArrow, {
                  size: 16
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                href: `tel:${location.phone}`,
                "data-tm-phone": location.id,
                className: "tm-btn border-2 border-carbon-300 px-3 text-sm text-hueso-100 transition-colors hover:border-hueso-100",
                "aria-label": `${t.call} ${location.name[t.langKey]}`,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.IconPhone, {
                  size: 16
                })
              })]
            })]
          })
        }, location.id);
      })
    })]
  });
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

function Navbar({
  transparent = false
}) {
  const cfg = getConfig();
  const brand = getBrand();
  const t = {
    ...COPY[cfg.lang],
    langKey: cfg.lang
  };
  const [scrolled, setScrolled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [menuOpen, setMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [panelOpen, setPanelOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [coords, setCoords] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [askedForLocation, setAskedForLocation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [heroPresent, setHeroPresent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const ctaRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  /**
   * Red de seguridad. PHP dice si la plantilla deberia tener hero, pero la
   * barra solo se vuelve transparente si el hero existe de verdad en el DOM.
   * Sin esto, cualquier plantilla mal marcada deja el logo blanco sobre fondo
   * blanco y la barra tapando el contenido.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setHeroPresent(Boolean(document.querySelector("[data-tm-hero]")));
  }, []);

  /* Estado de scroll. El brief fija el umbral en 80px. */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let frame = null;
    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        frame = null;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  useScrollLock(menuOpen || panelOpen);

  /* Geolocalizacion: solo se pide cuando el usuario abre el panel, nunca al cargar. */
  const requestLocation = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (askedForLocation || !navigator.geolocation) return;
    setAskedForLocation(true);
    navigator.geolocation.getCurrentPosition(position => setCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }), () => {
      /* Sin permiso se queda el orden por defecto. No se avisa nada. */
    }, {
      timeout: 5000,
      maximumAge: 600000
    });
  }, [askedForLocation]);
  function openPanel() {
    setMenuOpen(false);
    setPanelOpen(true);
    requestLocation();
  }
  const ordered = (0,_locations__WEBPACK_IMPORTED_MODULE_1__.sortByProximity)(_locations__WEBPACK_IMPORTED_MODULE_1__.LOCATIONS, coords);
  const nearestId = coords ? ordered[0].id : null;

  /* El local de la franja de utilidad: el mas cercano si hay permiso,
     si no, el primero que este abierto ahora mismo. */
  const utilityLocation = ordered.find(location => (0,_locations__WEBPACK_IMPORTED_MODULE_1__.getStatus)(location).isOpen) || ordered[0];
  const utilityStatus = (0,_locations__WEBPACK_IMPORTED_MODULE_1__.getStatus)(utilityLocation);

  /* Transparente solo donde hay hero, y solo hasta pasar el umbral de scroll. */
  const isTransparent = transparent && heroPresent && !scrolled && !menuOpen;
  const showUtility = !scrolled;

  /* Redes disponibles. Las que no tengan URL simplemente no aparecen. */
  const socialLinks = [{
    key: "yelp",
    href: brand.social.yelp,
    label: t.yelp,
    Icon: _icons__WEBPACK_IMPORTED_MODULE_2__.IconYelp
  }, {
    key: "facebook",
    href: brand.social.facebook,
    label: t.facebook,
    Icon: _icons__WEBPACK_IMPORTED_MODULE_2__.IconFacebook
  }, {
    key: "instagram",
    href: brand.social.instagram,
    label: t.instagram,
    Icon: _icons__WEBPACK_IMPORTED_MODULE_2__.IconInstagram
  }].filter(item => Boolean(item.href));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
      href: "#main",
      className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-maiz-300 focus:px-4 focus:py-2 focus:font-bold focus:text-carbon-400",
      children: t.skip
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("header", {
      className: `tm-header fixed inset-x-0 z-50 transition-colors duration-300 ${isTransparent ? "bg-transparent" : "bg-carbon-400 shadow-lg"}`,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: `overflow-hidden border-b border-white/10 transition-all duration-300 ${showUtility ? "h-9 opacity-100" : "h-0 opacity-0"} ${isTransparent ? "border-white/20" : "bg-carbon-500"}`,
        "aria-hidden": !showUtility,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mx-auto grid h-9 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 text-xs text-hueso-100 sm:gap-4 sm:px-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "flex shrink-0 items-center gap-4",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("a", {
              href: `tel:${utilityLocation.phone}`,
              "data-tm-phone": utilityLocation.id,
              "aria-label": `${t.call} ${utilityLocation.phoneLabel}`,
              className: "flex shrink-0 items-center gap-1.5 transition-colors hover:text-maiz-300",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.IconPhone, {
                size: 14
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                className: "hidden sm:inline",
                children: utilityLocation.phoneLabel
              })]
            }), brand.email && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("a", {
              href: `mailto:${brand.email}`,
              "aria-label": t.emailAria,
              className: "hidden min-w-0 items-center gap-1.5 transition-colors hover:text-maiz-300 md:flex",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.IconMail, {
                size: 14
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                className: "truncate",
                children: brand.email
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("a", {
            href: utilityLocation.pageUrl,
            className: "flex min-w-0 items-center justify-center gap-1.5 transition-colors hover:text-maiz-300",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.IconPin, {
              size: 14
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "truncate sm:hidden",
              children: utilityLocation.name[t.langKey]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "hidden truncate sm:inline",
              children: utilityStatus.isOpen ? t.utility(utilityLocation.name[t.langKey], utilityStatus.closesAt) : `${utilityLocation.name[t.langKey]}, ${t.opensAt(utilityStatus.opensAt)}`
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: `inline-block h-1.5 w-1.5 shrink-0 rounded-full ${utilityStatus.isOpen ? "bg-olivo-300" : "bg-carbon-300"}`,
              "aria-hidden": "true"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("ul", {
            className: "flex shrink-0 items-center justify-end gap-3",
            "aria-label": t.social,
            children: socialLinks.map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                href: item.href,
                target: "_blank",
                rel: "noopener",
                "aria-label": item.label,
                className: "block transition-colors hover:text-maiz-300",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(item.Icon, {
                  size: 15
                })
              })
            }, item.key))
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
          href: cfg.homeUrl,
          className: "shrink-0",
          "aria-label": t.home,
          children: cfg.logoLight ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
            src: cfg.logoLight,
            alt: "Tortas Manantial",
            width: "150",
            height: "44",
            className: "h-9 w-auto sm:h-11"
          }) :
          /*#__PURE__*/
          /* Fallback tipografico mientras tm_media() no tenga la URL del logo. */
          (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "font-serif text-lg font-bold leading-none text-hueso-100 sm:text-xl",
            children: "Tortas Manantial"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("nav", {
          className: "hidden lg:block",
          "aria-label": t.langKey === "es" ? "Principal" : "Primary",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("ul", {
            className: "flex items-center gap-7",
            children: t.links.map(link => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                href: link.href,
                className: "relative text-sm font-semibold text-hueso-100 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-maiz-300 after:transition-all hover:text-maiz-300 hover:after:w-full",
                children: link.label
              })
            }, link.href))
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "relative flex shrink-0 items-center gap-2 sm:gap-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
            ref: ctaRef,
            type: "button",
            onClick: () => panelOpen ? setPanelOpen(false) : openPanel(),
            "aria-expanded": panelOpen,
            "aria-haspopup": "dialog",
            className: "tm-btn tm-btn-primary tm-btn-primary-on-dark text-sm",
            children: t.cta
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
            type: "button",
            onClick: () => {
              setPanelOpen(false);
              setMenuOpen(open => !open);
            },
            "aria-expanded": menuOpen,
            "aria-controls": "tm-mobile-menu",
            "aria-label": menuOpen ? t.closeMenu : t.openMenu,
            className: "-mr-2 rounded-lg p-2 text-hueso-100 lg:hidden",
            children: menuOpen ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.IconClose, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.IconMenu, {})
          })]
        }), panelOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(LocationPanel, {
          t: t,
          locations: ordered,
          nearestId: nearestId,
          onClose: () => setPanelOpen(false),
          triggerRef: ctaRef
        })]
      })]
    }), menuOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      id: "tm-mobile-menu",
      className: "tm-mobile-menu fixed inset-x-0 bottom-0 z-40 flex flex-col bg-carbon-400 pt-28 lg:hidden",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("nav", {
        className: "flex-1 overflow-y-auto px-6",
        "aria-label": t.langKey === "es" ? "Principal, móvil" : "Primary, mobile",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("ul", {
          className: "flex flex-col",
          children: [t.links.map(link => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            className: "border-b border-white/10",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
              href: link.href,
              onClick: () => setMenuOpen(false),
              className: "block py-5 font-serif text-2xl text-hueso-100 transition-colors hover:text-maiz-300",
              children: link.label
            })
          }, link.href)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            className: "border-b border-white/10",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
              href: "/careers",
              onClick: () => setMenuOpen(false),
              className: "block py-5 font-serif text-2xl text-hueso-100 transition-colors hover:text-maiz-300",
              children: t.langKey === "es" ? "Trabaja con Nosotros" : "Careers"
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
        className: "border-t border-white/10 px-6 py-6 text-sm text-carbon-200",
        children: t.tagline
      })]
    })]
  });
}

/***/ },

/***/ "./src/scripts/icons.js"
/*!******************************!*\
  !*** ./src/scripts/icons.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconArrow: () => (/* binding */ IconArrow),
/* harmony export */   IconChevron: () => (/* binding */ IconChevron),
/* harmony export */   IconClose: () => (/* binding */ IconClose),
/* harmony export */   IconFacebook: () => (/* binding */ IconFacebook),
/* harmony export */   IconInstagram: () => (/* binding */ IconInstagram),
/* harmony export */   IconMail: () => (/* binding */ IconMail),
/* harmony export */   IconMenu: () => (/* binding */ IconMenu),
/* harmony export */   IconPhone: () => (/* binding */ IconPhone),
/* harmony export */   IconPin: () => (/* binding */ IconPin),
/* harmony export */   IconYelp: () => (/* binding */ IconYelp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


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
  focusable: "false"
};
function IconMenu({
  size = 24
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...base,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M3.5 7h17M3.5 12h17M3.5 17h17"
    })
  });
}
function IconClose({
  size = 24
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...base,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M6 6l12 12M18 6L6 18"
    })
  });
}
function IconPin({
  size = 20
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...base,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M12 21c4-4.5 6-7.8 6-10.5a6 6 0 1 0-12 0C6 13.2 8 16.5 12 21z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("circle", {
      cx: "12",
      cy: "10.5",
      r: "2.25"
    })]
  });
}
function IconPhone({
  size = 18
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...base,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"
    })
  });
}
function IconChevron({
  size = 18
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...base,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M7 10l5 5 5-5"
    })
  });
}
function IconArrow({
  size = 18
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...base,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M4 12h15M13 6l6 6-6 6"
    })
  });
}
function IconMail({
  size = 18
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...base,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect", {
      x: "3",
      y: "5.5",
      width: "18",
      height: "13",
      rx: "2.5"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M3.8 7l7.1 5.2c.66.48 1.54.48 2.2 0L20.2 7"
    })]
  });
}

/* ------------------------------------------------------------------ */
/*  Marcas sociales                                                    */
/*  Instagram y Facebook son fieles al glifo oficial.                  */
/*  TODO: cambiar el de Yelp por el SVG oficial de sus brand           */
/*  resources. Yelp es estricto con el uso de su marca y el de abajo   */
/*  es una aproximacion geometrica para no dejar el hueco vacio.       */
/* ------------------------------------------------------------------ */

function IconInstagram({
  size = 18
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    ...base,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect", {
      x: "2.75",
      y: "2.75",
      width: "18.5",
      height: "18.5",
      rx: "5.25"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("circle", {
      cx: "12",
      cy: "12",
      r: "4.15"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("circle", {
      cx: "17.35",
      cy: "6.65",
      r: "0.9",
      fill: "currentColor",
      stroke: "none"
    })]
  });
}
function IconFacebook({
  size = 18
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-hidden": "true",
    focusable: "false",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"
    })
  });
}
function IconYelp({
  size = 18
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-hidden": "true",
    focusable: "false",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M11.4 2.3c.75-.24 1.5.3 1.5 1.07v8.05c0 1.06-1.3 1.56-2 .78L6.15 7.4c-.5-.56-.33-1.44.35-1.77z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M9.55 13.35c.7-.36 1.5.2 1.4 .98l-.5 4.02c-.1.83-1.13 1.16-1.7.55l-2.7-2.9c-.5-.55-.3-1.44.38-1.78z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M13.85 13.6c-.5-.6.03-1.5.8-1.36l4.05.75c.8.15 1.1 1.16.5 1.72l-2.9 2.7c-.55.5-1.42.3-1.7-.42z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M14.35 10.5c-.8.08-1.3-.83-.83-1.48l2.4-3.3c.5-.68 1.55-.55 1.86.23l1.35 3.4c.3.77-.27 1.6-1.1 1.68z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M9.3 20.15c.35-.72 1.42-.63 1.65.13l.9 3.05c.05.17-.1.33-.27.28l-2.4-.7c-.35-.1-.5-.5-.34-.83z"
    })]
  });
}

/***/ },

/***/ "./src/scripts/locations.js"
/*!**********************************!*\
  !*** ./src/scripts/locations.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BRAND: () => (/* binding */ BRAND),
/* harmony export */   LOCATIONS: () => (/* binding */ LOCATIONS),
/* harmony export */   formatHour: () => (/* binding */ formatHour),
/* harmony export */   getStatus: () => (/* binding */ getStatus),
/* harmony export */   sortByProximity: () => (/* binding */ sortByProximity)
/* harmony export */ });
/**
 * Fuente unica de verdad de los cuatro locales.
 *
 * TODO PENDIENTE 1: reemplazar los enlaces de Toast por los verificados uno por uno.
 * TODO PENDIENTE 2: reemplazar los telefonos. Si el cliente usa un solo numero
 *                   central, poner el mismo en los cuatro y dejar la nota en el brief.
 *
 * Todo lo demas (direcciones y horarios) sale del sitio actual y ya esta
 * pendiente de validacion del cliente antes de publicar.
 */

/**
 * Datos de la marca, no de un local en particular.
 * El correo y las redes viven aqui porque el navbar, el footer y las paginas
 * de contacto los van a necesitar igual.
 */
const BRAND = {
  // TODO: correo publico de contacto. Si queda vacio, el navbar no lo pinta.
  email: "",
  social: {
    // Tomados del sitio actual, pendientes de confirmar con el cliente.
    yelp: "https://www.yelp.com/biz/tortas-manantial-avondale-3",
    facebook: "https://www.facebook.com/tortasmanantial/",
    instagram: "https://www.instagram.com/tortasmanantial"
  }
};
const LOCATIONS = [{
  id: "mcdowell",
  name: {
    en: "Phoenix, McDowell",
    es: "Phoenix, McDowell"
  },
  street: "5950 W McDowell Rd #103-104",
  city: "Phoenix, AZ 85035",
  lat: 33.4644,
  lng: -112.1846,
  // TODO: verificar
  phone: "+16025550000",
  phoneLabel: "(602) 555-0000",
  orderUrl: "https://order.toasttab.com/online/tortas-manantial-phoenix-5950-west-mcdowell-road/",
  directionsUrl: "https://g.page/tortasmanantial-phoenix",
  pageUrl: "/locations/phoenix-mcdowell",
  hours: {
    open: "07:00",
    close: "23:00"
  }
}, {
  id: "indian-school",
  name: {
    en: "Avondale, Indian School",
    es: "Avondale, Indian School"
  },
  street: "10665 W Indian School Rd #A",
  city: "Avondale, AZ 85392",
  lat: 33.4948,
  lng: -112.2895,
  // TODO: verificar
  phone: "+16235550000",
  phoneLabel: "(623) 555-0000",
  orderUrl: "https://order.toasttab.com/online/tortas-manantial-indian-school-rd-10665-west-indian-school-road/",
  directionsUrl: "https://g.page/manantial-avondale107th",
  pageUrl: "/locations/avondale-indian-school",
  hours: {
    open: "08:00",
    close: "22:00"
  }
}, {
  id: "buckeye",
  name: {
    en: "Avondale, Buckeye",
    es: "Avondale, Buckeye"
  },
  street: "11435 W Buckeye Rd A108",
  city: "Avondale, AZ 85323",
  lat: 33.4256,
  lng: -112.3086,
  // TODO: verificar
  phone: "+16235550001",
  phoneLabel: "(623) 555-0001",
  orderUrl: "https://order.toasttab.com/online/tortas-manantial-buckeye-rd-11435-west-buckeye-road/",
  directionsUrl: "https://g.page/tortasmanantial-avondaleblvd",
  pageUrl: "/locations/avondale-buckeye",
  hours: {
    open: "08:00",
    close: "22:00"
  }
}, {
  id: "laveen",
  name: {
    en: "Laveen",
    es: "Laveen"
  },
  street: "5185 W Baseline Rd Unit 102",
  city: "Laveen Village, AZ 85339",
  lat: 33.3771,
  lng: -112.1697,
  // TODO: verificar
  phone: "+16025550001",
  phoneLabel: "(602) 555-0001",
  orderUrl: "https://order.toasttab.com/online/tortas-manantial-laveen-5185-west-baseline-road/",
  directionsUrl: "https://goo.gl/maps/6FRrsVQ5JSqksro26",
  pageUrl: "/locations/laveen",
  hours: {
    open: "08:00",
    close: "22:00"
  }
}];

/** Arizona no cambia con el horario de verano, asi que la zona es fija. */
const TZ = "America/Phoenix";
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Minutos transcurridos hoy en hora de Phoenix, sin importar donde este el usuario. */
function nowInPhoenix() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  const hour = Number(parts.find(p => p.type === "hour").value);
  const minute = Number(parts.find(p => p.type === "minute").value);
  return hour * 60 + minute;
}

/** "07:00" -> "7am" / "22:00" -> "10pm". Formato corto, igual en los dos idiomas. */
function formatHour(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${suffix}` : `${hour12}:${String(m).padStart(2, "0")}${suffix}`;
}

/**
 * Estado del local ahora mismo.
 * Devuelve { isOpen, opensAt, closesAt } con las horas ya formateadas.
 */
function getStatus(location) {
  const now = nowInPhoenix();
  const open = toMinutes(location.hours.open);
  const close = toMinutes(location.hours.close);
  return {
    isOpen: now >= open && now < close,
    opensAt: formatHour(location.hours.open),
    closesAt: formatHour(location.hours.close)
  };
}

/** Distancia aproximada en millas. Solo se usa para ordenar, no se muestra. */
function distanceMiles(a, b) {
  const R = 3958.8;
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Ordena los locales por cercania. Si no hay coordenadas, deja el orden original. */
function sortByProximity(locations, coords) {
  if (!coords) return locations;
  return [...locations].sort((a, b) => distanceMiles(coords, a) - distanceMiles(coords, b));
}

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "react-dom/client"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = window["ReactDOM"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "react-dom/client");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/Navbar */ "./src/scripts/Navbar.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Montaje de los componentes React del tema.
 * Por ahora solo el Navbar. Footer, ContactForm y Chatbot entran aqui despues.
 */

const navbarMount = document.querySelector("#tm-navbar");
if (navbarMount) {
  // data-transparent lo pone header.php: true solo en la home, sobre el video del hero.
  const transparent = navbarMount.dataset.transparent === "true";
  react_dom_client__WEBPACK_IMPORTED_MODULE_1___default().createRoot(navbarMount).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_scripts_Navbar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    transparent: transparent
  }));
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map