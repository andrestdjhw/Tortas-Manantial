/**
 * Locales y datos de marca en el front.
 *
 * La fuente de verdad es functions.php: tm_locations() y tm_brand(). Aqui
 * solo se leen de window.tmData, que PHP imprime antes del bundle. Este
 * archivo no guarda su propia copia de direcciones ni de enlaces: si algo
 * falta, hay que editarlo en functions.php.
 */

function readData(key) {
  return (
    (typeof window !== "undefined" && window.tmData && window.tmData[key]) ||
    null
  );
}

export const LOCATIONS = readData("locations") || [];

export const BRAND = (() => {
  const source = readData("brand") || {};

  return {
    email: source.email || "",
    social: source.social || {},
  };
})();

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
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((p) => p.type === "hour").value);
  const minute = Number(parts.find((p) => p.type === "minute").value);
  return hour * 60 + minute;
}

/** "07:00" -> "7am" / "22:00" -> "10pm". Formato corto, igual en los dos idiomas. */
export function formatHour(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${suffix}` : `${hour12}:${String(m).padStart(2, "0")}${suffix}`;
}

/**
 * Estado del local ahora mismo.
 * Devuelve { isOpen, opensAt, closesAt } con las horas ya formateadas.
 */
export function getStatus(location) {
  const now = nowInPhoenix();
  const open = toMinutes(location.hours.open);
  const close = toMinutes(location.hours.close);

  return {
    isOpen: now >= open && now < close,
    opensAt: formatHour(location.hours.open),
    closesAt: formatHour(location.hours.close),
  };
}

/** Distancia aproximada en millas. Solo se usa para ordenar, no se muestra. */
function distanceMiles(a, b) {
  const R = 3958.8;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Ordena los locales por cercania. Si no hay coordenadas, deja el orden original. */
export function sortByProximity(locations, coords) {
  if (!coords) return locations;

  return [...locations].sort(
    (a, b) => distanceMiles(coords, a) - distanceMiles(coords, b)
  );
}