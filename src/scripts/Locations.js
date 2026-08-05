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
export const BRAND = {
  // TODO: correo publico de contacto. Si queda vacio, el navbar no lo pinta.
  email: "",

  social: {
    // Tomados del sitio actual, pendientes de confirmar con el cliente.
    yelp: "https://www.yelp.com/biz/tortas-manantial-avondale-3",
    facebook: "https://www.facebook.com/tortasmanantial/",
    instagram: "https://www.instagram.com/tortasmanantial",
  },
};

export const LOCATIONS = [
  {
    id: "mcdowell",
    name: { en: "Phoenix, McDowell", es: "Phoenix, McDowell" },
    street: "5950 W McDowell Rd #103-104",
    city: "Phoenix, AZ 85035",
    lat: 33.4644,
    lng: -112.1846,
    // TODO: verificar
    phone: "+16025550000",
    phoneLabel: "(602) 555-0000",
    orderUrl:
      "https://order.toasttab.com/online/tortas-manantial-phoenix-5950-west-mcdowell-road/",
    directionsUrl: "https://g.page/tortasmanantial-phoenix",
    pageUrl: "/locations/phoenix-mcdowell",
    hours: { open: "07:00", close: "23:00" },
  },
  {
    id: "indian-school",
    name: { en: "Avondale, Indian School", es: "Avondale, Indian School" },
    street: "10665 W Indian School Rd #A",
    city: "Avondale, AZ 85392",
    lat: 33.4948,
    lng: -112.2895,
    // TODO: verificar
    phone: "+16235550000",
    phoneLabel: "(623) 555-0000",
    orderUrl:
      "https://order.toasttab.com/online/tortas-manantial-indian-school-rd-10665-west-indian-school-road/",
    directionsUrl: "https://g.page/manantial-avondale107th",
    pageUrl: "/locations/avondale-indian-school",
    hours: { open: "08:00", close: "22:00" },
  },
  {
    id: "buckeye",
    name: { en: "Avondale, Buckeye", es: "Avondale, Buckeye" },
    street: "11435 W Buckeye Rd A108",
    city: "Avondale, AZ 85323",
    lat: 33.4256,
    lng: -112.3086,
    // TODO: verificar
    phone: "+16235550001",
    phoneLabel: "(623) 555-0001",
    orderUrl:
      "https://order.toasttab.com/online/tortas-manantial-buckeye-rd-11435-west-buckeye-road/",
    directionsUrl: "https://g.page/tortasmanantial-avondaleblvd",
    pageUrl: "/locations/avondale-buckeye",
    hours: { open: "08:00", close: "22:00" },
  },
  {
    id: "laveen",
    name: { en: "Laveen", es: "Laveen" },
    street: "5185 W Baseline Rd Unit 102",
    city: "Laveen Village, AZ 85339",
    lat: 33.3771,
    lng: -112.1697,
    // TODO: verificar
    phone: "+16025550001",
    phoneLabel: "(602) 555-0001",
    orderUrl:
      "https://order.toasttab.com/online/tortas-manantial-laveen-5185-west-baseline-road/",
    directionsUrl: "https://goo.gl/maps/6FRrsVQ5JSqksro26",
    pageUrl: "/locations/laveen",
    hours: { open: "08:00", close: "22:00" },
  },
];

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