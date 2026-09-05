/**
 * Revelado al hacer scroll para bloques marcados con [data-tm-reveal].
 * Vainilla y no React: las secciones que lo usan (los bloques de dos
 * columnas de la home, por ahora) son PHP puro, no hay arbol de React
 * que las monte.
 *
 * El CSS (ver .tm-reveal en index.css) deja el bloque corrido hacia su
 * costado y en opacity:0; esto le agrega .tm-reveal-visible mientras el
 * bloque esta en pantalla y se la quita cuando sale, asi que la entrada
 * se repite cada vez que se vuelve a pasar por la seccion, en cualquier
 * direccion del scroll. Nunca se deja de observar.
 */
export default function initReveal() {
  const targets = document.querySelectorAll("[data-tm-reveal]");

  if (!targets.length) {
    return;
  }

  // Menos movimiento: el CSS ya deja todo visible de entrada, asi que
  // ni vale la pena montar el observer.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("tm-reveal-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((target) => observer.observe(target));
}
