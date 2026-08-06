<?php
/**
 * Template Name: Our Story
 *
 * Seccion 2.4 del Copy & Brief de paginas internas.
 *
 * TODO BLOQUEANTE: todo el copy de esta pagina es provisional. Se reescribe
 * con la historia real de la familia (pendiente 02 del brief maestro):
 * nombres de los fundadores, la anecdota del primer local, de donde viene
 * la receta y que significa "Manantial". Sin eso esta pagina cumple pero no
 * diferencia, que es justo la palanca que el reporte identifica como la
 * principal.
 */

/* ==========================================================================
   MEDIOS DE ESTA PLANTILLA
   ========================================================================== */

$tm_img_hero    = tm_upload('2026/08/TMFachada.webp');
$tm_img_recipe  = tm_upload('2026/08/Tortas.webp');
$tm_img_family  = ''; // TODO: foto de la familia o del equipo
$tm_img_archive = ''; // TODO: material de archivo del negocio, si existe.
                      // Aunque sea de baja resolucion sirve: en blanco y
                      // negro se convierte en un activo de marca.

$tm_locations = tm_locations();

get_header(); ?>

<!-- ============================================================
     S0  HERO INTERNO
     ============================================================ -->
<section data-tm-hero class="relative flex min-h-[60svh] items-end overflow-hidden bg-carbon-400">
  <?php if ($tm_img_hero) : ?>
    <img
      src="<?php echo esc_url($tm_img_hero); ?>"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      fetchpriority="high"
    >
  <?php endif; ?>

  <div class="absolute inset-0 bg-carbon-500/65" aria-hidden="true"></div>

  <div class="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-40 sm:px-6">
    <p class="tm-eyebrow text-maiz-300">Since 2000</p>

    <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-hueso-100 sm:text-5xl">
      Twenty five years of the same recipe
    </h1>
  </div>
</section>

<!-- Migas de pan -->
<nav class="tm-weave" aria-label="Breadcrumb">
  <ol class="mx-auto flex max-w-7xl gap-2 px-4 py-3 text-xs text-carbon-200 sm:px-6">
    <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-maiz-300">Home</a></li>
    <li aria-hidden="true">/</li>
    <li class="text-hueso-100" aria-current="page">Our Story</li>
  </ol>
</nav>

<!-- ============================================================
     S1  INTRO
     Ancho de lectura corto: esta es la pagina con mas texto seguido
     del sitio y la que mas lo necesita.
     ============================================================ -->
<section class="tm-glow py-16 lg:py-24">
  <div class="mx-auto max-w-2xl px-4 sm:px-6">
    <p class="font-display text-2xl leading-snug text-carbon-400 sm:text-3xl">
      In the year 2000 we opened one shop in Phoenix. The plan was simple and a
      little naive: make the torta the way it is made at home, charge a fair
      price, and see who shows up.
    </p>
  </div>
</section>

<!-- ============================================================
     S2  LA RECETA NO CAMBIO
     ============================================================ -->
<section class="bg-hueso-200">
  <div class="grid lg:grid-cols-2">
    <div class="tm-placeholder min-h-64 lg:min-h-[34rem]">
      <?php if ($tm_img_recipe) : ?>
        <img
          src="<?php echo esc_url($tm_img_recipe); ?>"
          alt="A torta made to order"
          loading="lazy"
          class="h-full w-full object-cover"
        >
      <?php endif; ?>
    </div>

    <div class="flex items-center px-4 py-16 sm:px-10 lg:py-24">
      <div class="max-w-lg">
        <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
          The recipe did not change. The city did.
        </h2>
        <p class="mt-5 text-lg text-carbon-300">
          Phoenix grew. The west Valley filled up with families. We opened in
          Avondale, then on Buckeye, then in Laveen. What stayed the same is
          the part that matters: the bread goes on the grill when you order,
          the fruit gets cut that morning, and nobody in this kitchen has ever
          been told to speed it up at the cost of doing it right.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     S3  QUE QUEREMOS DECIR CON FRESCO
     ============================================================ -->
<section class="tm-tiles py-16 lg:py-24">
  <div class="mx-auto max-w-2xl px-4 sm:px-6">
    <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
      What we mean by fresh
    </h2>
    <p class="mt-5 text-lg text-carbon-300">
      Fresh is not a word we put on a wall. It is a decision that costs us time
      on every single order, and it is the reason people who moved out of the
      neighborhood still drive back.
    </p>

    <?php if ($tm_img_archive) : ?>
      <figure class="mt-10">
        <img
          src="<?php echo esc_url($tm_img_archive); ?>"
          alt="The first Tortas Manantial shop"
          loading="lazy"
          class="w-full rounded-xl grayscale"
        >
        <figcaption class="mt-3 text-sm text-carbon-300">
          <!-- TODO: pie de foto con el ano y el local -->
        </figcaption>
      </figure>
    <?php endif; ?>
  </div>
</section>

<!-- ============================================================
     S4  HECHO PARA LA GENTE QUE NOS HIZO
     ============================================================ -->
<section class="bg-hueso-300">
  <div class="grid lg:grid-cols-2">
    <div class="tm-glow flex items-center px-4 py-16 [--tm-glow-color:var(--color-maiz-200)] sm:px-10 lg:py-24">
      <div class="max-w-lg">
        <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
          Made for the people who made us
        </h2>
        <p class="mt-5 text-lg text-carbon-300">
          Most of our customers have been coming for years. Some brought their
          kids, and now those kids order for themselves. That is the whole
          business. Everything else is details.
        </p>
      </div>
    </div>

    <div class="tm-placeholder order-last min-h-64 lg:min-h-[34rem]">
      <?php if ($tm_img_family) : ?>
        <img
          src="<?php echo esc_url($tm_img_family); ?>"
          alt="The team behind Tortas Manantial"
          loading="lazy"
          class="h-full w-full object-cover"
        >
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- ============================================================
     S5  REENGANCHE
     Pagina narrativa, asi que cierra con el club y no con el pedido.
     ============================================================ -->
<section class="relative isolate overflow-hidden bg-carbon-400 py-16 text-hueso-100 lg:py-20">
  <div class="tm-facets" aria-hidden="true"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="max-w-xl font-display text-3xl leading-tight sm:text-4xl">
      Come see what twenty five years tastes like
    </h2>

    <div class="mt-8 flex flex-wrap items-center gap-3">
      <a href="/menu" class="tm-btn tm-btn-relief tm-btn-primary tm-btn-primary-on-dark">
        See the menu
      </a>
      <a href="/locations" class="tm-btn tm-btn-ghost-light">
        Find your location
      </a>
    </div>
  </div>
</section>

<?php
  $tm_schema = array(
    '@context'      => 'https://schema.org',
    '@type'         => 'AboutPage',
    'name'          => 'Our Story',
    'url'           => home_url('/our-story'),
    'mainEntity'    => array(
      '@type'         => 'Organization',
      'name'          => 'Tortas Manantial',
      'foundingDate'  => '2000',
      'foundingLocation' => array(
        '@type' => 'Place',
        'name'  => 'Phoenix, Arizona',
      ),
      'numberOfEmployees' => null,
    ),
  );

  // Se limpian las claves vacias antes de imprimir
  $tm_schema['mainEntity'] = array_filter($tm_schema['mainEntity'], function ($tm_value) {
    return $tm_value !== null;
  });
?>

<script type="application/ld+json">
  <?php echo wp_json_encode($tm_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
</script>

<?php get_footer();