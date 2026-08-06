import React, { useState } from "react";
import { LOCATIONS } from "./locations";
import { IconArrow } from "./icons";

/**
 * Formulario de empleo. Pagina /careers.
 *
 * Guarda cada solicitud como entrada privada en WordPress y dispara el hook
 * tm_careers_application. Cuando el cliente diga a que correo o a que sistema
 * deben llegar, se engancha ahi sin tocar este componente.
 */

const COPY = {
  en: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    location: "Preferred location",
    pick: "Pick a shop",
    role: "Role",
    pickRole: "Pick a role",
    availability: "Availability",
    availabilityHint: "Days and hours that work for you",
    experience: "Experience, optional",
    send: "Send application",
    sending: "Sending",
    success:
      "Got it. If there is an opening at that location we will call you within the week.",
    invalid: "Check the highlighted fields and try again.",
    failed: "Something went wrong on our end. Try again in a moment.",
    roles: ["Kitchen", "Counter", "Shift lead", "Management", "Any of them"],
  },
  es: {
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo",
    location: "Local de preferencia",
    pick: "Elige un local",
    role: "Puesto",
    pickRole: "Elige un puesto",
    availability: "Disponibilidad",
    availabilityHint: "Días y horas que te funcionan",
    experience: "Experiencia, opcional",
    send: "Enviar solicitud",
    sending: "Enviando",
    success:
      "Recibido. Si hay vacante en ese local te llamamos durante la semana.",
    invalid: "Revisa los campos marcados e inténtalo otra vez.",
    failed: "Algo falló de nuestro lado. Inténtalo en un momento.",
    roles: ["Cocina", "Mostrador", "Encargado de turno", "Gerencia", "Cualquiera"],
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

export default function CareersForm() {
  const cfg = getConfig();
  const t = COPY[cfg.lang];

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    role: "",
    availability: "",
    experience: "",
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

    if (!nameValid || !phoneValid || !values.location) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`${cfg.restUrl}careers`, {
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
        <label htmlFor="tm-careers-company">Company</label>
        <input
          id="tm-careers-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="tm-careers-name" className="mb-1.5 block text-sm text-carbon-400">
          {t.name}
        </label>
        <input
          id="tm-careers-name"
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
          <label htmlFor="tm-careers-phone" className="mb-1.5 block text-sm text-carbon-400">
            {t.phone}
          </label>
          <input
            id="tm-careers-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={status === "invalid" && !phoneValid}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="tm-careers-email" className="mb-1.5 block text-sm text-carbon-400">
            {t.email}
          </label>
          <input
            id="tm-careers-email"
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
          <label htmlFor="tm-careers-location" className="mb-1.5 block text-sm text-carbon-400">
            {t.location}
          </label>
          <select
            id="tm-careers-location"
            value={values.location}
            onChange={(event) => update("location", event.target.value)}
            aria-invalid={status === "invalid" && !values.location}
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

        <div>
          <label htmlFor="tm-careers-role" className="mb-1.5 block text-sm text-carbon-400">
            {t.role}
          </label>
          <select
            id="tm-careers-role"
            value={values.role}
            onChange={(event) => update("role", event.target.value)}
            className={fieldClass}
          >
            <option value="">{t.pickRole}</option>
            {t.roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tm-careers-availability" className="mb-1.5 block text-sm text-carbon-400">
          {t.availability}
        </label>
        <input
          id="tm-careers-availability"
          type="text"
          value={values.availability}
          onChange={(event) => update("availability", event.target.value)}
          placeholder={t.availabilityHint}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="tm-careers-experience" className="mb-1.5 block text-sm text-carbon-400">
          {t.experience}
        </label>
        <textarea
          id="tm-careers-experience"
          rows={4}
          value={values.experience}
          onChange={(event) => update("experience", event.target.value)}
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