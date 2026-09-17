import React, { useEffect, useState } from "react";
import { BRAND } from "./locations";
import { IconFacebook, IconGoogle, IconInstagram, IconTikTok } from "./icons";

/**
 * Riel flotante de redes sociales, pegado al borde derecho de la
 * ventana mientras se hace scroll (antes iba a la izquierda, se cambio
 * por pedido del cliente). Vive aparte de Navbar y Footer porque
 * su logica de aparicion es distinta a la de ambos: no depende de si hay
 * scroll (como el navbar) ni esta atado al pie de pagina, sino de si el
 * hero de la plantilla ya salio de la vista.
 *
 * Botones sueltos en vez de una sola pastilla (referencia: el riel de
 * cliconstructions.com), y se activa recien cuando el hero termina de
 * salir de pantalla: encima del hero se pisaba con el CTA del video, asi
 * que aparece justo cuando ya no compite con nada.
 *
 * Oculto por debajo de sm: en un telefono angosto un riel fijo a un
 * costado se come espacio de lectura que ahi no sobra.
 */

const COPY = {
  en: {
    follow: "Follow us",
    google: "Tortas Manantial on Google",
    facebook: "Tortas Manantial on Facebook",
    instagram: "Tortas Manantial on Instagram",
    tiktok: "Tortas Manantial on TikTok",
  },
  es: {
    follow: "Síguenos",
    google: "Tortas Manantial en Google",
    facebook: "Tortas Manantial en Facebook",
    instagram: "Tortas Manantial en Instagram",
    tiktok: "Tortas Manantial en TikTok",
  },
};

function getConfig() {
  const cfg = typeof window !== "undefined" ? window.tmData || {} : {};

  return {
    lang: cfg.lang === "es" ? "es" : "en",
  };
}

function getBrand() {
  const source = BRAND || {};

  return {
    social: source.social || {},
  };
}

export default function SocialSidebar() {
  const cfg = getConfig();
  const brand = getBrand();
  const t = COPY[cfg.lang];

  /* Sin hero (careers, catering...) no hay nada que "pasar", asi que
     arranca visible. Con hero, un IntersectionObserver avisa cuando ya
     no queda ni un pixel de el en pantalla: threshold 0 es justo ese
     momento, ni antes ni despues. */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-tm-hero]");

    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  /* Color de fondo fijo, el de marca de cada red (no solo al hover, ver
     .tm-social-icon en index.css). Instagram es degradado, asi es su
     marca; las demas son su color solido oficial. Van con bg-[] porque
     son valores de marca exactos, no tonos de la paleta del sitio. */
  const links = [
    {
      key: "google",
      href: brand.social.google,
      label: t.google,
      Icon: IconGoogle,
      swatch: "bg-[#4285F4]",
    },
    {
      key: "facebook",
      href: brand.social.facebook,
      label: t.facebook,
      Icon: IconFacebook,
      swatch: "bg-[#1877F2]",
    },
    {
      key: "instagram",
      href: brand.social.instagram,
      label: t.instagram,
      Icon: IconInstagram,
      swatch: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]",
    },
    {
      key: "tiktok",
      href: brand.social.tiktok,
      label: t.tiktok,
      Icon: IconTikTok,
      swatch: "bg-black",
    },
  ].filter((item) => Boolean(item.href));

  if (!links.length) return null;

  return (
    <nav
      aria-label={t.follow}
      className={`fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 transition-all duration-500 ease-out sm:flex lg:right-6 ${
        visible
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-6 opacity-0"
      }`}
    >
      <ul className="flex flex-col items-center gap-3">
        {links.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener"
              aria-label={item.label}
              className={`tm-social-icon flex h-14 w-14 items-center justify-center rounded-full text-hueso-100 shadow-lg ${item.swatch}`}
            >
              <item.Icon size={24} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
