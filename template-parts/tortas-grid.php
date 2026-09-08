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
 */

$tm_tg_order_url = tm_default_order_url();

$tm_tg_tortas = array(
  array('Cubana',             tm_upload('2026/09/TortaCubana--scaled.jpg')),
  array('Asadera',            tm_upload('2026/09/TortaAsadera-scaled.jpg')),
  array('Jamón',              tm_upload('2026/09/TortaJamon-scaled.jpg')),
  array('Pavo',               tm_upload('2026/09/TortaPavo-scaled.jpg')),
  array('Pierna',             tm_upload('2026/09/TortaPierna-scaled.jpg')),
  array('Pierna con Piña',    tm_upload('2026/09/TortaPiernaPina--scaled.jpg')),
  array('Pollo en Escabeche', tm_upload('2026/09/TortaPolloEscabeche--scaled.jpg')),
  array('Pollo Rojo',         tm_upload('2026/09/TortaPolloRojo-scaled.jpg')),
  array('Hawaiana',           tm_upload('2026/09/TortaHawaiiana--scaled.jpg')),
  array('Vegetariana',        tm_upload('2026/09/TortaVegetariana-scaled.jpg')),
);

// Dos renglones de cinco, cada uno su propia cinta en loop continuo, en
// sentidos opuestos (ver .tm-marquee--tortas). Se parte a la mitad en vez
// de leer filas de un grid porque cada renglon necesita su propio par de
// pistas duplicadas.
$tm_tg_row1 = array_slice($tm_tg_tortas, 0, 5);
$tm_tg_row2 = array_slice($tm_tg_tortas, 5, 5);

$tm_tg_render_torta = function ($tm_torta) {
  list($tm_torta_name, $tm_torta_image) = $tm_torta; ?>
  <li class="w-52 shrink-0 sm:w-64 lg:w-72">
    <div class="tm-placeholder aspect-square overflow-hidden rounded-xl border border-hueso-400 shadow-xl shadow-carbon-500/10">
      <img
        src="<?php echo esc_url($tm_torta_image); ?>"
        alt="<?php echo esc_attr($tm_torta_name); ?> torta"
        loading="lazy"
        class="h-full w-full object-cover"
      >
    </div>
    <p class="mt-3 text-center text-base font-semibold text-carbon-400">
      <?php echo esc_html($tm_torta_name); ?>
    </p>
  </li>
<?php };
?>
<section
  class="tm-tiles tm-tiles--pattern py-16 lg:py-24"
  style="background-image: url('<?php echo esc_url(tm_upload('2026/09/Estampado.png')); ?>'); background-repeat: repeat; background-size: 2400px 1200px;"
>
  <!-- Estampado.png es un mosaico de verdad (la imagen ya viene disenada
       para repetirse sin costura), asi que va como background-repeat de
       la seccion y no como <img class="tm-tiles__bg"> a sangre (esa clase
       estira UNA imagen a lo cover, no repite un tile). .tm-tiles--pattern
       sube el velo de .tm-tiles (::after) al 93%: un dibujo de lineas
       distrae mas que una foto a la misma opacidad, y a este nivel el
       estampado queda de fondo presente sin pelearse con el texto. -->
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="max-w-2xl font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
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
    <ul class="tm-marquee__track gap-6 pr-6" inert aria-hidden="true">
      <?php foreach ($tm_tg_row1 as $tm_torta) : $tm_tg_render_torta($tm_torta); endforeach; ?>
    </ul>
  </div>

  <div class="tm-marquee tm-marquee--tortas mt-4">
    <ul class="tm-marquee__track tm-marquee__track--reverse gap-6 pr-6">
      <?php foreach ($tm_tg_row2 as $tm_torta) : $tm_tg_render_torta($tm_torta); endforeach; ?>
    </ul>
    <ul class="tm-marquee__track tm-marquee__track--reverse gap-6 pr-6" inert aria-hidden="true">
      <?php foreach ($tm_tg_row2 as $tm_torta) : $tm_tg_render_torta($tm_torta); endforeach; ?>
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
