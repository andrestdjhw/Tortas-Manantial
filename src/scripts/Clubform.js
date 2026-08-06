import React, { useState } from "react";
import { LOCATIONS } from "./locations";
import { IconArrow } from "./icons";

/**
 * Alta completa al Tortas Club. Bloque 07 de la home y pagina /tortas-club.
 * La version de un solo campo vive en el Footer.
 *
 * TODO: el campo de celular esta desactivado hasta cerrar el registro
 * A2P 10DLC y elegir proveedor de mensajeria. Publicar el campo sin el
 * texto de consentimiento aprobado es un problema de cumplimiento, no de
 * diseno. Cambiar SMS_ENABLED a true cuando este listo.
 */
const SMS_ENABLED = false;

const COPY = {
  en: {
    firstName: "First name",
    email: "Email",
    mobile: "Mobile number",
    home: "Home location",
    pick: "Pick your shop",
    join: "Join the club",
    joining: "Joining",
    consent:
      "I agree to receive marketing texts from Tortas Manantial at the number provided. Message and data rates may apply. Reply STOP to unsubscribe.",
    success: "You are in. Check your email for your welcome reward.",
    invalid: "Check the highlighted fields and try again.",
    failed: "Something went wrong on our end. Try again in a moment.",
  },
  es: {
    firstName: "Nombre",
    email: "Correo",
    mobile: "Celular",
    home: "Local que visitas",
    pick: "Elige tu local",
    join: "Únete al club",
    joining: "Enviando",
    consent:
      "Acepto recibir mensajes de texto promocionales de Tortas Manantial al número que proporcione. Pueden aplicar tarifas de mensajes y datos. Responde STOP para cancelar.",
    success: "Ya quedaste. Revisa tu correo para tu recompensa de bienvenida.",
    invalid: "Revisa los campos marcados e inténtalo otra vez.",
    failed: "Algo falló de nuestro lado. Inténtalo en un momento.",
  },
};

function getConfig() {
  const cfg = typeof window !== "undefined" ? window.tmData || {} : {};

  return {
    lang: cfg.lang === "es" ? "es" : "en",
    restUrl: cfg.restUrl || "",
    nonce: cfg.nonce || "",
  };
}

export default function ClubForm() {
  const cfg = getConfig();
  const t = COPY[cfg.lang];

  const [values, setValues] = useState({
    firstName: "",
    email: "",
    mobile: "",
    location: "",
    consent: false,
  });
  const [status, setStatus] = useState("idle");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim());

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!emailValid || !values.firstName.trim()) {
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
        body: JSON.stringify({
          email: values.email.trim(),
          firstName: values.firstName.trim(),
          location: values.location,
          source: "home",
        }),
      });

      if (!response.ok) throw new Error("request failed");

      setStatus("success");
    } catch (error) {
      setStatus("failed");
    }
  }

  if (status === "success") {
    return (
      <p className="text-lg text-olivo-200" role="status">
        {t.success}
      </p>
    );
  }

  const fieldClass =
    "w-full rounded-lg border-2 border-carbon-300 bg-carbon-500 px-3 py-2.5 text-sm text-hueso-100 placeholder:text-carbon-300";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="tm-club-first" className="mb-1.5 block text-sm">
          {t.firstName}
        </label>
        <input
          id="tm-club-first"
          type="text"
          autoComplete="given-name"
          value={values.firstName}
          onChange={(event) => update("firstName", event.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="tm-club-mail" className="mb-1.5 block text-sm">
          {t.email}
        </label>
        <input
          id="tm-club-mail"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          className={fieldClass}
        />
      </div>

      {SMS_ENABLED && (
        <div>
          <label htmlFor="tm-club-mobile" className="mb-1.5 block text-sm">
            {t.mobile}
          </label>
          <input
            id="tm-club-mobile"
            type="tel"
            autoComplete="tel"
            value={values.mobile}
            onChange={(event) => update("mobile", event.target.value)}
            className={fieldClass}
          />

          <label className="mt-3 flex items-start gap-2.5 text-xs text-carbon-200">
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(event) => update("consent", event.target.checked)}
              className="mt-0.5 shrink-0"
            />
            <span>{t.consent}</span>
          </label>
        </div>
      )}

      <div>
        <label htmlFor="tm-club-location" className="mb-1.5 block text-sm">
          {t.home}
        </label>
        <select
          id="tm-club-location"
          value={values.location}
          onChange={(event) => update("location", event.target.value)}
          className={fieldClass}
        >
          <option value="">{t.pick}</option>
          {LOCATIONS.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name[cfg.lang]}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="tm-btn tm-btn-relief tm-btn-primary tm-btn-primary-on-dark mt-1 disabled:opacity-70"
      >
        {status === "loading" ? t.joining : t.join}
        <IconArrow size={18} />
      </button>

      {(status === "invalid" || status === "failed") && (
        <p className="text-sm text-carbon-200" role="alert">
          {status === "invalid" ? t.invalid : t.failed}
        </p>
      )}
    </form>
  );
}