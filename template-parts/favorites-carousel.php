<?php
/**
 * Carrusel de productos (favoritos).
 *
 * Parcial compartido: la home lo usaba inline y ahora cada pagina interna
 * lo llama igual, antes de su CTA de cierre. Vive aparte porque son ~90
 * lineas de markup (la cinta en loop, el closure que arma cada tarjeta)
 * que no tenia sentido pegar cinco veces.
 *
 * Es autosuficiente a proposito: saca sus propios medios con tm_upload()
 * en vez de esperar variables del llamador, asi cualquier plantilla lo
 * puede pedir con un solo get_template_part(), sin preparar nada antes.
 *
 * $args opcionales (WP 5.5+):
 *   id          string  Ancla de la seccion. La home la usa para el
 *                        "See the menu" del hero (#favorites); las demas
 *                        paginas no necesitan una.
 *   full_height bool    true = min-h-svh + scroll-mt-24, como en la home.
 *                        false (default) = una banda compacta, que es lo
 *                        que pide una pagina interna metida entre otras
 *                        secciones.
 */

$tm_fc_id          = isset($args['id']) ? $args['id'] : '';
$tm_fc_full_height = !empty($args['full_height']);

$tm_fc_order_url = tm_default_order_url();
$tm_fc_bg        = tm_upload('2026/09/FondoVerde.png');

$tm_fc_favorites = array(
  array('Tortas',       'Toasted bread, layered high, the way it is done at home.',    tm_upload('2026/08/TortasTM.jpg')),
  array('Nachos',       'Loaded, shareable, and gone in five minutes.',                 tm_upload('2026/08/NachosTM.jpg')),
  array('Aguas Frescas','Real fruit, squeezed the same morning you drink it.',          tm_upload('2026/08/AguasM.webp')),
  array('Licuados',     'Mexican milkshakes, thick, cold and worth the brain freeze.',  tm_upload('2026/08/LicuadoM.webp')),
);

$tm_fc_render_favorite = function ($tm_index, $tm_item, $tm_order_url) {
  list($tm_name, $tm_desc, $tm_image) = $tm_item; ?>
  <li class="w-64 shrink-0 sm:w-72">
    <a
      href="<?php echo esc_url($tm_order_url); ?>"
      target="_blank" rel="noopener"
      data-tm-order="default" data-tm-channel="toast"
      class="tm-card-3d group relative flex h-full flex-col overflow-hidden rounded-xl border border-hueso-400 bg-hueso-100 shadow-sm"
    >
      <div class="tm-placeholder aspect-square overflow-hidden sm:aspect-4/5">
        <?php if ($tm_image) : ?>
          <img
            src="<?php echo esc_url($tm_image); ?>"
            alt="<?php echo esc_attr($tm_name); ?>"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
        <?php else : ?>
          <span class="tm-eyebrow flex h-full items-center justify-center text-carbon-200">
            <?php echo esc_html($tm_name); ?>
          </span>
        <?php endif; ?>
      </div>

      <div class="tm-card-3d__lift p-5">
        <h3 class="font-display text-xl text-carbon-400 group-hover:text-olivo-400">
          <?php echo esc_html($tm_name); ?>
        </h3>
        <p class="mt-1.5 text-sm text-carbon-300"><?php echo esc_html($tm_desc); ?></p>
      </div>
    </a>
  </li>
<?php };
?>
<section
  <?php if ($tm_fc_id) : ?>id="<?php echo esc_attr($tm_fc_id); ?>"<?php endif; ?>
  class="tm-tiles <?php echo $tm_fc_full_height ? 'min-h-svh scroll-mt-24 ' : ''; ?>py-16 lg:py-24"
>
  <?php if ($tm_fc_bg) : ?>
    <img
      src="<?php echo esc_url($tm_fc_bg); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="tm-tiles__bg"
    >
  <?php endif; ?>
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="max-w-2xl font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
      The ones everybody comes back for
    </h2>
    <p class="mt-3 max-w-xl text-carbon-300">
      Twenty five years of the same recipe, made fresh every single order.
    </p>
  </div>

  <!-- Cinta en loop continuo, y a proposito FUERA de la columna de
       texto de arriba: si se queda adentro del max-w-7xl, el corte de
       cada vuelta cae en medio del contenido y se nota feo. Aca corre
       de punta a punta de la seccion (el corte real queda en el borde
       de la pantalla, no en medio de la pagina), mismo criterio que la
       cinta de texto del hero. Dos pistas identicas; la segunda es
       una copia visual para que el loop no se note y lleva inert: son
       links reales (data-tm-order) y no queremos que el tab los visite
       dos veces ni que un lector de pantalla los anuncie doble. -->
  <div class="tm-cards-3d tm-marquee tm-marquee--cards mt-12">
    <ul class="tm-marquee__track gap-6 py-6 pr-6">
      <?php foreach ($tm_fc_favorites as $tm_fc_index => $tm_fc_item) : ?>
        <?php $tm_fc_render_favorite($tm_fc_index, $tm_fc_item, $tm_fc_order_url); ?>
      <?php endforeach; ?>
    </ul>
    <ul class="tm-marquee__track gap-6 py-6 pr-6" inert aria-hidden="true">
      <?php foreach ($tm_fc_favorites as $tm_fc_index => $tm_fc_item) : ?>
        <?php $tm_fc_render_favorite($tm_fc_index, $tm_fc_item, $tm_fc_order_url); ?>
      <?php endforeach; ?>
    </ul>
  </div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <a
      href="<?php echo esc_url($tm_fc_order_url); ?>"
      target="_blank" rel="noopener"
      data-tm-order="default" data-tm-channel="toast"
      class="tm-btn tm-btn-ghost-dark mt-12"
    >See the full menu</a>
  </div>
</section>
