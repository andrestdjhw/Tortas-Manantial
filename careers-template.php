<?php
/**
 * Template Name: Careers
 *
 * Seccion 2.6 del Copy & Brief de paginas internas.
 * Reemplaza la pagina "Apply Now" del sitio actual de Wix (/general-9).
 */

/* ==========================================================================
   MEDIOS DE ESTA PLANTILLA
   ========================================================================== */

$tm_img_team = ''; // TODO: foto del equipo real, en el local, trabajando.
                   // Nada de stock: es lo que hace creible la pagina.

$tm_locations = tm_locations();

get_header(); ?>

<!-- ============================================================
     K0  HERO EN OLIVO
     Hero de color plano, sin foto. Es la unica pagina del sistema que
     conserva ese tratamiento y sirve de respiro entre paginas
     fotograficas.

     La plantilla esta en $tm_hero_templates de header.php para que no se
     imprima el espaciador, pero la seccion NO lleva data-tm-hero: sobre
     olivo el texto del navbar en hueso da 3.4:1 y no aprueba contraste,
     asi que la barra se queda solida.
     ============================================================ -->
<section class="relative isolate overflow-hidden bg-olivo-400 pb-16 pt-44 text-hueso-100 lg:pb-24">
  <div
    class="tm-facets [--tm-facet-bg:var(--color-olivo-400)] [--tm-facet-glow:color-mix(in_srgb,var(--color-maiz-300)_10%,transparent)] [--tm-facet-line:color-mix(in_srgb,var(--color-hueso-100)_10%,transparent)] [--tm-facet-shape:color-mix(in_srgb,var(--color-carbon-500)_35%,transparent)]"
    aria-hidden="true"
  ></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
    <p class="tm-eyebrow text-maiz-300">We are hiring</p>

    <h1 class="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
      Work with us
    </h1>

    <p class="mt-5 max-w-xl text-lg text-hueso-100/90">
      Four shops, one team. We hire for attitude and teach the rest.
    </p>
  </div>
</section>

<!-- Migas de pan -->
<nav class="tm-weave" aria-label="Breadcrumb">
  <ol class="mx-auto flex max-w-7xl gap-2 px-4 py-3 text-xs text-carbon-200 sm:px-6">
    <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-maiz-300">Home</a></li>
    <li aria-hidden="true">/</li>
    <li class="text-hueso-100" aria-current="page">Careers</li>
  </ol>
</nav>

<!-- ============================================================
     K1  LOS PUESTOS
     ============================================================ -->
<section class="tm-tiles py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
      What we hire for
    </h2>
    <p class="mt-3 max-w-2xl text-carbon-300">
      Flexible shifts, a family atmosphere, and a kitchen where people actually
      stay. Tell us which location works for you and we will call you.
    </p>

    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <?php
        $tm_roles = array(
          array('Kitchen', 'Prep, grill and assembly. Most people start here and no experience is needed.'),
          array('Counter', 'Taking orders, packing pickup and keeping the line moving.'),
          array('Shift lead', 'Running a shift end to end. Usually someone who already worked the counter.'),
          array('Management', 'Running a shop: team, inventory and the day to day.'),
        );

        foreach ($tm_roles as $tm_role) : ?>
        <li class="rounded-xl border border-hueso-400 bg-hueso-100 p-6 shadow-sm">
          <h3 class="font-display text-xl text-carbon-400"><?php echo esc_html($tm_role[0]); ?></h3>
          <p class="mt-2 text-sm text-carbon-300"><?php echo esc_html($tm_role[1]); ?></p>
        </li>
      <?php endforeach; ?>
    </ul>

    <p class="mt-8 max-w-2xl text-sm text-carbon-300">
      <!-- TODO: confirmar con el cliente si hay requisitos de edad, idioma o
           documentacion que convenga decir aqui, para no hacer perder el
           tiempo a nadie. -->
      Openings change by location. If you do not see your shop below, apply
      anyway and we will keep your application on file.
    </p>
  </div>
</section>

<!-- ============================================================
     K2  DONDE
     ============================================================ -->
<section class="bg-hueso-200 py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
      Four shops across the west Valley
    </h2>

    <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <?php foreach ($tm_locations as $tm_location) : ?>
        <li class="rounded-xl border border-hueso-400 bg-hueso-100 p-5">
          <h3 class="font-display text-lg text-carbon-400">
            <?php echo esc_html($tm_location['name']['en']); ?>
          </h3>
          <p class="mt-1.5 text-sm text-carbon-300">
            <?php echo esc_html($tm_location['street']); ?><br>
            <?php echo esc_html($tm_location['city']); ?>
          </p>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<!-- ============================================================
     K3  FOTO DEL EQUIPO Y FORMULARIO
     ============================================================ -->
<section class="bg-hueso-300">
  <div class="grid lg:grid-cols-2">
    <div class="tm-placeholder min-h-64 lg:min-h-[36rem]">
      <?php if ($tm_img_team) : ?>
        <img
          src="<?php echo esc_url($tm_img_team); ?>"
          alt="The team at Tortas Manantial"
          loading="lazy"
          class="h-full w-full object-cover"
        >
      <?php endif; ?>
    </div>

    <div class="flex items-center px-4 py-16 sm:px-10 lg:py-24">
      <div class="w-full max-w-lg">
        <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
          Apply now
        </h2>
        <p class="mt-3 text-carbon-300">
          It takes a couple of minutes. No resume needed.
        </p>

        <div id="tm-careers-form" class="mt-8"></div>

        <noscript>
          <p class="mt-8 text-carbon-300">
            Ask for an application at the counter of the shop closest to you,
            or call and we will take your information over the phone.
          </p>
        </noscript>
      </div>
    </div>
  </div>
</section>

<?php
  $tm_schema = array(
    '@context'    => 'https://schema.org',
    '@type'       => 'WebPage',
    'name'        => 'Careers at Tortas Manantial',
    'url'         => home_url('/careers'),
    'description' => 'Kitchen, counter, shift lead and management roles across four shops in Phoenix, Avondale and Laveen.',
  );

  /**
   * TODO: cuando el cliente confirme vacantes concretas, cambiar por schema
   * JobPosting por puesto. Requiere titulo, fecha de publicacion, tipo de
   * empleo y ubicacion, y sin datos reales no se debe publicar: un
   * JobPosting inventado se indexa en Google for Jobs.
   */
?>

<script type="application/ld+json">
  <?php echo wp_json_encode($tm_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
</script>

<?php get_footer();