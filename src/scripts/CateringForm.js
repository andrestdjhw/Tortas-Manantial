import React, { useState } from "react";
import { LOCATIONS } from "./locations";
import { IconArrow } from "./icons";

/**
 * Formulario de catering. Pagina /catering.
 *
 * Mismo mecanismo que CareersForm.js: guarda cada solicitud como entrada
 * privada en WordPress y dispara el hook tm_catering_inquiry. Cuando el
 * cliente diga a que correo o a que persona deben llegar estas, se
 * engancha ahi sin tocar este componente.
 */

const COPY = {
  en: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    eventDate: "Event date",
    guests: "Guest count",
    eventType: "Event type",
    pickType: "Pick one",
    eventTypes: ["Corporate", "Birthday", "Wedding", "Quinceañera", "Other"],
    location: "Closest shop",
    pick: "Pick a shop",
    details: "Tell us about your event",
    detailsHint: "Date flexibility, budget, dietary needs, anything helps",
    send: "Send request",
    sending: "Sending",
    success:
      "Got it. Someone from the team will call you back to talk details.",
    invalid: "Check the highlighted fields and try again.",
    failed: "Something went wrong on our end. Try again in a moment.",
  },
  es: {
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo",
    eventDate: "Fecha del evento",
    guests: "Número de invitados",
    eventType: "Tipo de evento",
    pickType: "Elige uno",
    eventTypes: ["Empresarial", "Cumpleaños", "Boda", "Quinceañera", "Otro"],
    location: "Local más cercano",
    pick: "Elige un local",
    details: "Cuéntanos de tu evento",
    detailsHint: "Flexibilidad de fecha, presupuesto, dietas especiales, lo que sea útil",
    send: "Enviar solicitud",
    sending: "Enviando",
    success: "Recibido. Alguien del equipo te llama para ver los detalles.",
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

export default function CateringForm() {
  const cfg = getConfig();
  const t = COPY[cfg.lang];

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    eventDate: "",
    guests: "",
    eventType: "",
    location: "",
    details: "",
    company: "", // honeypot, ver abajo
  });
  const [status, setStatus] = useState("idle");

  /* Un telefono se puede escribir de muchas formas; solo se exige que tenga
     al menos siete digitos. Validar mas que eso rechaza numeros validos. */
  const phoneValid = values.phone.replace(/\D/g, "").length >= 7;
  const nameValid = values.name.trim().length > 1;

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!nameValid || !phoneValid) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`${cfg.restUrl}catering`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": cfg.nonce,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("request failed");

      setStatus("success");
    } catch (error) {
      setStatus("failed");
    }
  }

  if (status === "success") {
    return (
      <p className="text-lg text-olivo-400" role="status">
        {t.success}
      </p>
    );
  }

  const fieldClass =
    "w-full rounded-lg border-2 border-hueso-400 bg-hueso-100 px-3 py-2.5 text-sm text-carbon-400 placeholder:text-carbon-200";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot. Invisible para una persona, irresistible para un bot.
          Si viene relleno, el endpoint responde ok y descarta el envio. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="tm-catering-company">Company</label>
        <input
          id="tm-catering-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="tm-catering-name" className="mb-1.5 block text-sm text-carbon-400">
          {t.name}
        </label>
        <input
          id="tm-catering-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={status === "invalid" && !nameValid}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tm-catering-phone" className="mb-1.5 block text-sm text-carbon-400">
            {t.phone}
          </label>
          <input
            id="tm-catering-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={status === "invalid" && !phoneValid}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="tm-catering-email" className="mb-1.5 block text-sm text-carbon-400">
            {t.email}
          </label>
          <input
            id="tm-catering-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tm-catering-date" className="mb-1.5 block text-sm text-carbon-400">
            {t.eventDate}
          </label>
          <input
            id="tm-catering-date"
            type="date"
            value={values.eventDate}
            onChange={(event) => update("eventDate", event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="tm-catering-guests" className="mb-1.5 block text-sm text-carbon-400">
            {t.guests}
          </label>
          <input
            id="tm-catering-guests"
            type="number"
            min="1"
            inputMode="numeric"
            value={values.guests}
            onChange={(event) => update("guests", event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tm-catering-type" className="mb-1.5 block text-sm text-carbon-400">
            {t.eventType}
          </label>
          <select
            id="tm-catering-type"
            value={values.eventType}
            onChange={(event) => update("eventType", event.target.value)}
            className={fieldClass}
          >
            <option value="">{t.pickType}</option>
            {t.eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tm-catering-location" className="mb-1.5 block text-sm text-carbon-400">
            {t.location}
          </label>
          <select
            id="tm-catering-location"
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
      </div>

      <div>
        <label htmlFor="tm-catering-details" className="mb-1.5 block text-sm text-carbon-400">
          {t.details}
        </label>
        <textarea
          id="tm-catering-details"
          rows={4}
          value={values.details}
          onChange={(event) => update("details", event.target.value)}
          placeholder={t.detailsHint}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="tm-btn tm-btn-relief tm-btn-primary mt-1 self-start disabled:opacity-70"
      >
        {status === "loading" ? t.sending : t.send}
        <IconArrow size={18} />
      </button>

      {(status === "invalid" || status === "failed") && (
        <p className="text-sm text-carbon-400" role="alert">
          {status === "invalid" ? t.invalid : t.failed}
        </p>
      )}
    </form>
  );
}
