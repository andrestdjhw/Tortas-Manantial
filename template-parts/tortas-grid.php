<?php
/**
 * Vitrina de "Every torta we make" (dos cintas en loop, sentidos opuestos).
 *
 * Parcial compartido: nacio en la home y ahora Tortas Club la pide tambien
 * en el lugar donde antes iba el carrusel de favoritos (ver
 * template-parts/favorites-carousel.php). Sin precio ni link individual
 * porque no hay una pagina de menu con ancla por producto todavia, asi que
 * el CTA de abajo manda al menu completo, igual que el resto del sitio.
 *
 * Autosuficiente a proposito, mismo criterio que favorites-carousel.php:
 * saca sus propios medios con tm_upload() en vez de esperar variables del
 * llamador.
 *
 * $args opcionales (WP 5.5+):
 *   id  string  Ancla de la seccion. La home la usa para el "See the
 *                menu" del hero (#menu); las demas paginas no necesitan
 *                una.
 */

$tm_tg_id         = isset($args['id']) ? $args['id'] : '';
$tm_tg_order_url = tm_default_order_url();

/**
 * Recortes sin fondo (PNG con alpha real, mismo criterio que el resto
 * del sitio), reemplazan las fotos de estudio con fondo blanco de
 * antes. Jamón y Pavo comparten una sola foto (asi la mando el
 * cliente, un solo archivo "JamonPavo..."), mismo caso que Nachos &
 * Fries en el bloque de categorias.
 *
 * Precio e ingredientes salen del menu real de Toast (la pagina de
 * pedido de la sucursal de McDowell), asi que el modal de cada torta
 * (TortaModal, ver src/scripts) muestra lo mismo que un cliente ve ahi
 * antes de ordenar. "Pierna con Piña" no existe como item aparte en
 * Toast -- ahi es la misma composicion que "Hawaiiana" (pierna +
 * piña), asi que comparten descripcion.
 */
$tm_tg_tortas = array(
  array(
    'Cubana', tm_upload('2026/09/TortaCubanaRecortada-scaled.png'), '$12.90',
    'Savory pulled pork, ham and melted American cheese, with lettuce, avocado, tomato, onion, jalapeños and mayo.',
  ),
  array(
    'Asadera', tm_upload('2026/09/TortaAsaderaRecortada-scaled.png'), '$14.00',
    '8oz of carne asada with melted queso asadero, grilled onions, raw white onion, cilantro, avocado and mayo. Grilled "a la plancha" (on the griddle), not oven roasted.',
  ),
  array(
    'Jamón', tm_upload('2026/09/TortaJamonPavoRecortada-scaled.png'), '$12.10',
    'Sliced ham and cheese, with lettuce, avocado, tomato, onion, jalapeños and mayo.',
  ),
  array(
    'Pavo', tm_upload('2026/09/TortaJamonPavoRecortada-scaled.png'), '$12.10',
    'Sliced turkey, with lettuce, avocado, tomato, onion, jalapeños and mayo.',
  ),
  array(
    'Pierna', tm_upload('2026/09/TortaPiernaRecortada-scaled.png'), '$12.10',
    'Savory pulled pork, with lettuce, avocado, tomato, onion, jalapeños and mayo.',
  ),
  array(
    'Pierna con Piña', tm_upload('2026/09/PiernaPinaRecortada-scaled.png'), '$13.40',
    'Savory pulled pork with pineapple slices, lettuce, avocado, tomato, onion, jalapeños and mayo.',
  ),
  array(
    'Pollo en Escabeche', tm_upload('2026/09/PolloEscabecheRecortada-scaled.png'), '$12.35',
    'Pickled shredded chicken in a tangy oil-and-vinegar mixture with seasonings, lettuce, avocado, tomato, onion, jalapeños and mayo.',
  ),
  array(
    'Pollo Rojo', tm_upload('2026/09/TortaPolloRojoRecortada-scaled.png'), '$12.35',
    'Shredded chicken in a savory tomato-based red sauce, with lettuce, avocado, tomato, onion, jalapeños and mayo.',
  ),
  array(
    'Hawaiana', tm_upload('2026/09/TortaHawaianaRecortada-scaled.png'), '$13.40',
    'Savory pulled pork with pineapple slices, lettuce, avocado, tomato, onion, jalapeños and mayo.',
  ),
  array(
    'Vegetariana', tm_upload('2026/09/TortaVegetarianaRecortada-scaled.png'), '$12.10',
    'No meat: lettuce, avocado, tomato, onion, jalapeños, cheese and mayo.',
  ),
);

// Dos renglones de cinco, cada uno su propia cinta en loop continuo, en
// sentidos opuestos (ver .tm-marquee--tortas). Se parte a la mitad en vez
// de leer filas de un grid porque cada renglon necesita su propio par de
// pistas duplicadas.
$tm_tg_row1 = array_slice($tm_tg_tortas, 0, 5);
$tm_tg_row2 = array_slice($tm_tg_tortas, 5, 5);

// Un slug por torta (sin acentos/espacios) para conectar el boton de
// cada tarjeta con su entrada en el JSON que lee TortaModal.
$tm_tg_slug = function ($tm_name) {
  return sanitize_title($tm_name);
};

/**
 * $tm_is_duplicate: esta pista es la copia "de relleno" del loop
 * infinito (ver mas abajo), no la que un lector de pantalla debe leer.
 * Antes esa copia iba con inert, que ademas de sacarla del arbol de
 * accesibilidad tambien le apaga el click -- funcionaba bien cuando
 * adentro solo habia imagen y texto sueltos, pero ahora que cada
 * torta es un boton, la mitad de lo que el usuario ve en pantalla en
 * cualquier momento (el loop alterna cual copia esta visible) quedaba
 * muerta al click. Ahora la copia sigue oculta para lectores de
 * pantalla (aria-hidden en el <ul>) y fuera del tab con tabindex="-1",
 * pero el click si funciona.
 */
$tm_tg_render_torta = function ($tm_torta, $tm_is_duplicate = false) use ($tm_tg_slug) {
  list($tm_torta_name, $tm_torta_image, $tm_torta_price, $tm_torta_ingredients) = $tm_torta; ?>
  <li class="w-52 shrink-0 sm:w-64 lg:w-72">
    <!-- Boton, no solo <li>: asi abre el modal con teclado igual que con
         mouse, sin tener que agregarle tabindex/onclick a un elemento
         que no es interactivo por naturaleza. Sin card ni caja en la
         foto: es un recorte sin fondo (PNG con alpha real), mismo
         criterio que el resto de los recortes del sitio -- nada de
         object-cover ni aspect-square forzado (eso le cortaria pedazos
         al recorte), solo drop-shadow siguiendo el contorno real de la
         torta. -->
    <button
      type="button"
      data-tm-torta="<?php echo esc_attr($tm_tg_slug($tm_torta_name)); ?>"
      <?php if ($tm_is_duplicate) : ?>tabindex="-1"<?php endif; ?>
      class="tm-card-bouncy block w-full cursor-pointer text-left"
    >
      <img
        src="<?php echo esc_url($tm_torta_image); ?>"
        alt="<?php echo esc_attr($tm_torta_name); ?> torta"
        loading="lazy"
        class="w-full drop-shadow-[0_15px_18px_rgba(43,43,43,0.2)]"
      >
      <p class="mt-3 text-center text-base font-semibold text-carbon-400">
        <?php echo esc_html($tm_torta_name); ?>
      </p>
    </button>
  </li>
<?php };

// Mismos datos de arriba, aplanados para el modal (TortaModal.js): un
// solo array de objetos {slug, name, image, price, ingredients} en vez
// de que el componente tenga que reconstruir la forma desde $tm_tg_row1/2.
$tm_tg_modal_items = array_map(function ($tm_torta) use ($tm_tg_slug) {
  list($tm_name, $tm_image, $tm_price, $tm_ingredients) = $tm_torta;

  return array(
    'slug'        => $tm_tg_slug($tm_name),
    'name'        => $tm_name,
    'image'       => $tm_image,
    'price'       => $tm_price,
    'ingredients' => $tm_ingredients,
  );
}, $tm_tg_tortas);
?>
<section
  <?php if ($tm_tg_id) : ?>id="<?php echo esc_attr($tm_tg_id); ?>"<?php endif; ?>
  class="scroll-mt-24 bg-hueso-100 py-16 lg:py-24"
>
  <!-- Antes llevaba el mosaico de Estampado.png de fondo (.tm-tiles con
       el velo al 93%, ver .tm-tiles--pattern); el cliente pidio quitarlo
       del todo y dejar la seccion en blanco liso, como cambio global:
       este parcial es compartido (home y /tortas-club), asi que un solo
       cambio aqui les llega a las dos. -->
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="max-w-2xl tm-section-title">
      Every torta we make
    </h2>
    <p class="mt-3 max-w-xl text-carbon-300">
      Ten fillings, one bolillo, made the same way since the year 2000.
    </p>
  </div>

  <!-- Igual que .tm-marquee--cards: las cintas van fuera del max-w-7xl, a
       todo el ancho de la seccion, para que el corte de cada vuelta caiga
       en el borde real de la pantalla. Renglon 1 de derecha a izquierda
       (sentido normal de .tm-marquee__track), renglon 2 al reves con
       --reverse. -->
  <div class="tm-marquee tm-marquee--tortas mt-12">
    <ul class="tm-marquee__track gap-6 pr-6">
      <?php foreach ($tm_tg_row1 as $tm_torta) : $tm_tg_render_torta($tm_torta); endforeach; ?>
    </ul>
    <ul class="tm-marquee__track gap-6 pr-6" aria-hidden="true">
      <?php foreach ($tm_tg_row1 as $tm_torta) : $tm_tg_render_torta($tm_torta, true); endforeach; ?>
    </ul>
  </div>

  <div class="tm-marquee tm-marquee--tortas mt-4">
    <ul class="tm-marquee__track tm-marquee__track--reverse gap-6 pr-6">
      <?php foreach ($tm_tg_row2 as $tm_torta) : $tm_tg_render_torta($tm_torta); endforeach; ?>
    </ul>
    <ul class="tm-marquee__track tm-marquee__track--reverse gap-6 pr-6" aria-hidden="true">
      <?php foreach ($tm_tg_row2 as $tm_torta) : $tm_tg_render_torta($tm_torta, true); endforeach; ?>
    </ul>
  </div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="mt-10 text-center">
      <a
        href="<?php echo esc_url($tm_tg_order_url); ?>"
        target="_blank" rel="noopener"
        data-tm-order="default" data-tm-channel="toast"
        class="tm-btn tm-btn-ghost-dark"
      >See the full menu</a>
    </div>
  </div>
</section>

<!-- Modal de ingredientes por torta. Vive fuera del <section> pero
     dentro del parcial: un solo mount por pagina (este parcial solo se
     llama una vez por plantilla), escucha clicks en cualquier
     [data-tm-torta] via delegacion de eventos, asi que no le importa si
     el boton que lo dispara esta en la primera pista o en su copia
     duplicada del loop (ver nota en $tm_tg_render_torta sobre por que
     esa copia ya no lleva inert). -->
<div
  id="tm-torta-modal"
  data-tortas="<?php echo esc_attr(wp_json_encode($tm_tg_modal_items, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)); ?>"
  data-order-url="<?php echo esc_url($tm_tg_order_url); ?>"
></div>
