import React, { useState } from "react";
import { BRAND, LOCATIONS } from "./locations";
import {
  IconArrow,
  IconChevron,
  IconFacebook,
  IconGoogle,
  IconInstagram,
  IconMail,
  IconPhone,
  IconTikTok,
} from "./icons";

/* ------------------------------------------------------------------ */
/*  Copy                                                               */
/*  Bloque 12 del Copy & Brief de la homepage.                         */
/* ------------------------------------------------------------------ */

const COPY = {
  en: {
    locations: "Locations",
    explore: "Explore",
    club: "Tortas Club",
    follow: "Follow",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "Our Story", href: "/our-story" },
      { label: "Tortas Club", href: "/tortas-club" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    clubPitch:
      "Deals, points and a free torta on your birthday. Free to join.",
    emailLabel: "Email address",
    emailPlaceholder: "you@email.com",
    join: "Join",
    joining: "Joining",
    success: "You are in. Check your email for your welcome reward.",
    invalid: "That email does not look right. Check it and try again.",
    failed: "Something went wrong on our end. Try again in a moment.",
    tagline: "Family owned in Phoenix since 2000.",
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
    rights: "All rights reserved.",
    siteBy: "Site by",
    google: "Tortas Manantial on Google",
    facebook: "Tortas Manantial on Facebook",
    instagram: "Tortas Manantial on Instagram",
    tiktok: "Tortas Manantial on TikTok",
    emailUs: "Email us",
  },
  es: {
    locations: "Ubicaciones",
    explore: "Explora",
    club: "Tortas Club",
    follow: "Síguenos",
    links: [
      { label: "Menú", href: "/menu" },
      { label: "Nuestra Historia", href: "/our-story" },
      { label: "Tortas Club", href: "/tortas-club" },
      { label: "Trabaja con Nosotros", href: "/careers" },
      { label: "Contacto", href: "/contact" },
    ],
    clubPitch:
      "Promociones, puntos y una torta gratis en tu cumpleaños. Es gratis.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@correo.com",
    join: "Únete",
    joining: "Enviando",
    success: "Ya quedaste. Revisa tu correo para tu recompensa de bienvenida.",
    invalid: "Ese correo no se ve bien. Revísalo e inténtalo otra vez.",
    failed: "Algo falló de nuestro lado. Inténtalo en un momento.",
    tagline: "Negocio de familia en Phoenix desde el 2000.",
    legal: [
      { label: "Aviso de Privacidad", href: "/privacy-policy" },
      { label: "Términos", href: "/terms" },
    ],
    rights: "Todos los derechos reservados.",
    siteBy: "Sitio por",
    google: "Tortas Manantial en Google",
    facebook: "Tortas Manantial en Facebook",
    instagram: "Tortas Manantial en Instagram",
    tiktok: "Tortas Manantial en TikTok",
    emailUs: "Escríbenos",
  },
};

const AGENCY = {
  name: "828 Marketing Solutions",
  url: "https://www.828marketingsolutions.com",
};

function getConfig() {
  const cfg = typeof window !== "undefined" ? window.tmData || {} : {};

  return {
    lang: cfg.lang === "es" ? "es" : "en",
    restUrl: cfg.restUrl || "",
    nonce: cfg.nonce || "",
    footerGraphics: Array.isArray(cfg.footerGraphics) ? cfg.footerGraphics : [],
  };
}

function getBrand() {
  const source = BRAND || {};

  return {
    email: source.email || "",
    social: source.social || {},
  };
}

/* ------------------------------------------------------------------ */
/*  Columna colapsable                                                 */
/*  Acordeon en movil, siempre abierta desde lg.                       */
/* ------------------------------------------------------------------ */

function Column({ title, id, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 lg:border-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between py-4 text-left lg:cursor-default lg:py-0"
      >
        <span className="tm-eyebrow text-maiz-300">{title}</span>
        <span
          className={`text-carbon-200 transition-transform lg:hidden ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <IconChevron size={18} />
        </span>
      </button>

      <div
        id={id}
        className={`pb-5 lg:block lg:pb-0 lg:pt-4 ${open ? "block" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Alta al Tortas Club                                                */
/*  Un solo campo. La version completa, con celular y local, vive en   */
/*  el bloque 07 de la home y en /tortas-club.                         */
/* ------------------------------------------------------------------ */

function ClubSignup({ t, cfg }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`${cfg.restUrl}club`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": cfg.nonce,
        },
        body: JSON.stringify({ email: email.trim(), source: "footer" }),
      });

      if (!response.ok) throw new Error("request failed");

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("failed");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-olivo-200" role="status">
        {t.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mb-3 text-sm text-carbon-200">{t.clubPitch}</p>

      <label htmlFor="tm-club-email" className="sr-only">
        {t.emailLabel}
      </label>

      <div className="flex gap-2">
        <input
          id="tm-club-email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder={t.emailPlaceholder}
          aria-invalid={status === "invalid"}
          aria-describedby={status === "invalid" ? "tm-club-error" : undefined}
          className={`min-w-0 flex-1 rounded-lg border-2 bg-carbon-500 px-3 py-2.5 text-sm text-hueso-100 placeholder:text-carbon-300 ${
            status === "invalid" ? "border-olivo-400" : "border-carbon-300"
          }`}
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="tm-btn tm-btn-relief tm-btn-primary tm-btn-primary-on-dark shrink-0 text-sm disabled:opacity-70"
        >
          {status === "loading" ? t.joining : t.join}
          <IconArrow size={16} />
        </button>
      </div>

      {(status === "invalid" || status === "failed") && (
        <p id="tm-club-error" className="mt-2 text-sm text-carbon-200" role="alert">
          {status === "invalid" ? t.invalid : t.failed}
        </p>
      )}
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Grafico de apoyo, uno por esquina                                  */
/*  Puramente decorativos: aria-hidden, sin pointer-events, y ocultos  */
/*  hasta lg, que es donde el footer tiene margen de sobra para no     */
/*  pisar las columnas.                                                */
/* ------------------------------------------------------------------ */

function CornerGraphic({ src, className }) {
  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute hidden w-32 opacity-15 lg:block xl:w-40 ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const cfg = getConfig();
  const brand = getBrand();
  const t = { ...COPY[cfg.lang], langKey: cfg.lang };

  const socialLinks = [
    { key: "instagram", name: "Instagram", href: brand.social.instagram, label: t.instagram, Icon: IconInstagram },
    { key: "facebook", name: "Facebook", href: brand.social.facebook, label: t.facebook, Icon: IconFacebook },
    { key: "tiktok", name: "TikTok", href: brand.social.tiktok, label: t.tiktok, Icon: IconTikTok },
    { key: "google", name: "Google", href: brand.social.google, label: t.google, Icon: IconGoogle },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="tm-carbon-gradient relative overflow-hidden text-hueso-100">
      <CornerGraphic src={cfg.footerGraphics[0]} className="left-0 top-0" />
      <CornerGraphic src={cfg.footerGraphics[1]} className="right-0 top-0" />
      <CornerGraphic src={cfg.footerGraphics[2]} className="bottom-0 left-0" />
      <CornerGraphic src={cfg.footerGraphics[3]} className="bottom-0 right-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
        <div className="grid gap-0 lg:grid-cols-4 lg:gap-10">
          {/* Ubicaciones. Enlazan a la pagina del local, nunca a Toast:
              la pagina de ubicacion es la que rankea. */}
          <Column title={t.locations} id="tm-footer-locations">
            <ul className="flex flex-col gap-3">
              {LOCATIONS.map((location) => (
                <li key={location.id}>
                  <a
                    href={location.pageUrl}
                    className="group block text-sm transition-colors hover:text-maiz-300"
                  >
                    <span className="font-semibold">
                      {location.name[t.langKey]}
                    </span>
                    <span className="block text-carbon-200 group-hover:text-carbon-100">
                      {location.street}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column title={t.explore} id="tm-footer-explore">
            <ul className="flex flex-col gap-3">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-maiz-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column title={t.club} id="tm-footer-club">
            <ClubSignup t={t} cfg={cfg} />
          </Column>

          <Column title={t.follow} id="tm-footer-follow">
            <ul className="flex flex-col gap-3">
              {socialLinks.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2.5 text-sm transition-colors hover:text-maiz-300"
                  >
                    <item.Icon size={21} />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}

              {brand.email && (
                <li>
                  <a
                    href={`mailto:${brand.email}`}
                    className="flex items-center gap-2.5 text-sm transition-colors hover:text-maiz-300"
                  >
                    <IconMail size={18} />
                    <span>{brand.email}</span>
                  </a>
                </li>
              )}

              <li>
                <a
                  href={`tel:${LOCATIONS[0].phone}`}
                  data-tm-phone={LOCATIONS[0].id}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-maiz-300"
                >
                  <IconPhone size={18} />
                  <span>{LOCATIONS[0].phoneLabel}</span>
                </a>
              </li>
            </ul>
          </Column>
        </div>

        {/* Cierre */}
        <div className="mt-10 border-t border-white/10 pt-6 lg:mt-14">
          <p className="font-display text-lg text-maiz-300">{t.tagline}</p>

          <div className="mt-5 flex flex-col gap-4 text-xs text-carbon-200 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {t.legal.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-hueso-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
              <p>
                © {new Date().getFullYear()} Tortas Manantial. {t.rights}
              </p>

              <p>
                {t.siteBy}{" "}
                <a
                  href={AGENCY.url}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-carbon-100 transition-colors hover:text-maiz-300"
                >
                  {AGENCY.name}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}