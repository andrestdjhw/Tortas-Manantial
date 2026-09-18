<?php
/**
 * Template Name: Catering
 *
 * Pagina nueva, no viene del Copy & Brief original. Reemplaza el link
 * "Menu" del navbar por pedido del cliente (ese link salia del sitio
 * hacia Toast; catering necesitaba una pagina propia adentro).
 *
 * Misma estructura que careers-template.php: hero con tarjeta sobre foto,
 * migas, tarjetas de apoyo, vitrina de producto y foto+formulario al
 * cierre. TODO BLOQUEANTE: falta confirmar con el cliente si hay minimo
 * de personas, zonas de entrega y tiempo de anticipacion, para no
 * prometer algo que despues no se cumple.
 */

/* ==========================================================================
   MEDIOS DE ESTA PLANTILLA
   ========================================================================== */

// Slideshow del bloque C2, por pedido del cliente (antes una sola foto
// estatica). Crossfade en CSS puro, ver .tm-slideshow en src/index.css.
$tm_img_catering_slides = array_values(array_filter(array(
  tm_upload('2026/09/Catering1-scaled.jpg'),
  tm_upload('2026/09/Catering2-scaled.jpg'),
  tm_upload('2026/09/Catering3-scaled.jpg'),
)));

$tm_img_bg = tm_upload('2026/09/FondoVerde.png'); // Fondo de las secciones .tm-tiles.
$tm_img_hero_bg = tm_upload('2026/09/TortasFondo.png'); // Fondo del hero.
$tm_img_form_bg = $tm_img_hero_bg; // Mismo fondo, ahora detras del formulario de C3.

get_header(); ?>

<!-- ============================================================
     C0  HERO
     Mismo tratamiento que el hero de /careers: TortasFondo.png de fondo
     con el texto en tarjeta (bg-hueso-100/90 backdrop-blur-sm) porque la
     foto es una textura ocupada de sandwiches.
     ============================================================ -->
<section class="relative isolate overflow-hidden bg-olivo-400 pb-16 pt-44 text-carbon-400 lg:pb-24">
  <?php if ($tm_img_hero_bg) : ?>
    <img
      src="<?php echo esc_url($tm_img_hero_bg); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover"
    >
  <?php endif; ?>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
    <div class="max-w-xl rounded-2xl bg-hueso-100/90 p-8 shadow-xl backdrop-blur-sm">
      <p class="tm-eyebrow">Catering</p>

      <h1 class="mt-4 font-display uppercase text-4xl leading-[1.05] sm:text-5xl">
        Feed the whole crew
      </h1>

      <p class="mt-5 text-lg text-carbon-300">
        Trays of tortas, nachos and aguas frescas, made the same day you need
        them. Tell us about your event and we will call you with a quote.
      </p>
    </div>
  </div>
</section>

<!-- Migas de pan -->
<nav class="relative bg-carbon-400" aria-label="Breadcrumb">
  <img
    src="<?php echo esc_url(tm_upload('2026/09/03-Coco-Graphics-scaled.png')); ?>"
    alt=""
    aria-hidden="true"
    loading="lazy"
    class="pointer-events-none absolute -right-2 top-1/2 hidden w-14 -translate-y-1/2 rotate-3 opacity-20 sm:block"
  >
  <ol class="relative mx-auto flex max-w-7xl gap-2 px-4 py-3 text-xs text-carbon-200 sm:px-6">
    <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-accent-hover-soft">Home</a></li>
    <li aria-hidden="true">/</li>
    <li class="text-hueso-100" aria-current="page">Catering</li>
  </ol>
</nav>

<!-- ============================================================
     C1  BUENO PARA
     ============================================================ -->
<section class="tm-tiles py-16 lg:py-24">
  <?php if ($tm_img_bg) : ?>
    <img
      src="<?php echo esc_url($tm_img_bg); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="tm-tiles__bg"
    >
  <?php endif; ?>
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="tm-section-title">
      Good for any size crowd
    </h2>
    <p class="mt-3 max-w-2xl text-carbon-300">
      Same recipe, same kitchen, just more of it. Pick a shop, tell us the
      headcount, and we handle the rest.
    </p>

    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <?php
        $tm_catering_types = array(
          array('Corporate lunch', 'Trays dropped off on time, ready to serve straight from the box.'),
          array('Birthday & quinceañera', 'A spread the whole family actually wants to eat.'),
          array('Weddings & showers', 'Bigger orders, same bread made fresh the day of.'),
          array('Office catering', 'Standing orders for the team, weekly or one time.'),
        );

        foreach ($tm_catering_types as $tm_catering_index => $tm_catering_type) : ?>
        <li
          data-tm-reveal="top"
          style="transition-delay: <?php echo esc_attr($tm_catering_index * 0.1); ?>s"
          class="tm-card-bouncy rounded-xl bg-maiz-300 p-6 text-hueso-100 shadow-sm"
        >
          <h3 class="font-display text-xl text-hueso-100"><?php echo esc_html($tm_catering_type[0]); ?></h3>
          <p class="mt-2 text-sm text-hueso-100/80"><?php echo esc_html($tm_catering_type[1]); ?></p>
        </li>
      <?php endforeach; ?>
    </ul>

    <p class="mt-8 max-w-2xl text-sm text-carbon-300">
      <!-- TODO: confirmar minimo de personas, zonas de entrega y tiempo de
           anticipacion antes de publicar numeros concretos aqui. -->
      Orders of any size are welcome. The bigger the order, the more notice
      helps us make sure everything is ready when you need it.
    </p>
  </div>
</section>

<!-- ============================================================
     C2  FOTO Y FORMULARIO
     Mismo tratamiento que K3 de /careers: fondo en TortasFondo.png con
     el formulario en tarjeta encima. Va antes de la vitrina de tortas
     por pedido del cliente (antes iba despues). La foto de la izquierda
     ahora es un slideshow de 3 fotos de catering (antes una sola foto
     fija), crossfade puro en CSS: ver .tm-slideshow en src/index.css.
     ============================================================ -->
<section class="bg-hueso-300">
  <div class="grid lg:grid-cols-2">
    <div data-tm-reveal="left" class="tm-placeholder tm-shine-loop relative overflow-hidden min-h-64 lg:min-h-144">
      <?php if ($tm_img_catering_slides) : ?>
        <div class="tm-slideshow">
          <?php foreach ($tm_img_catering_slides as $tm_slide_index => $tm_slide_src) : ?>
            <img
              src="<?php echo esc_url($tm_slide_src); ?>"
              alt="<?php echo $tm_slide_index === 0 ? 'A catering spread from Tortas Manantial' : ''; ?>"
              <?php echo $tm_slide_index === 0 ? '' : 'aria-hidden="true"'; ?>
              loading="<?php echo $tm_slide_index === 0 ? 'eager' : 'lazy'; ?>"
              style="animation-delay: <?php echo esc_attr($tm_slide_index * 7); ?>s"
              class="tm-slideshow__img"
            >
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>

    <div data-tm-reveal="right" class="relative isolate flex items-center justify-center overflow-hidden px-4 py-16 sm:px-10 lg:py-24">
      <?php if ($tm_img_form_bg) : ?>
        <img
          src="<?php echo esc_url($tm_img_form_bg); ?>"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover"
        >
      <?php endif; ?>

      <div class="relative z-10 w-full max-w-lg rounded-2xl bg-hueso-100/90 p-8 shadow-xl backdrop-blur-sm">
        <h2 class="tm-section-title">
          Request a quote
        </h2>
        <p class="mt-3 text-carbon-300">
          Tell us about your event. No commitment, just a callback with a
          price.
        </p>

        <div id="tm-catering-form" class="mt-8"></div>

        <noscript>
          <p class="mt-8 text-carbon-300">
            Call your closest shop and ask for catering, or stop by and ask at
            the counter.
          </p>
        </noscript>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     C1b  TODAS LAS TORTAS
     Parcial compartido, ver template-parts/tortas-grid.php.
     ============================================================ -->
<?php get_template_part('template-parts/tortas-grid'); ?>

<?php
  $tm_schema = array(
    '@context'    => 'https://schema.org',
    '@type'       => 'WebPage',
    'name'        => 'Catering at Tortas Manantial',
    'url'         => home_url('/catering'),
    'description' => 'Catering trays of tortas, nachos and aguas frescas for corporate events, birthdays, quinceañeras and weddings across four shops in Phoenix, Avondale and Laveen.',
  );
?>

<script type="application/ld+json">
  <?php echo wp_json_encode($tm_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
</script>

<?php get_footer();
