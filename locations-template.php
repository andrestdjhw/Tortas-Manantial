<?php
/**
 * Template Name: Locations
 *
 * Seccion 2.2 del Copy & Brief de paginas internas.
 * El navbar y el footer son componentes de React.
 */

/* ==========================================================================
   MEDIOS DE ESTA PLANTILLA
   ========================================================================== */

$tm_img_hero = ''; // TODO: foto de fachada o de mostrador, formato apaisado

$tm_locations = tm_locations();

get_header(); ?>

<!-- ============================================================
     L0  HERO INTERNO
     Media pantalla, imagen con scrim. El video se reserva para la home.
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

  <div class="absolute inset-0 bg-carbon-500/60" aria-hidden="true"></div>

  <div class="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-40 sm:px-6">
    <p class="tm-eyebrow text-maiz-300">Four shops, one recipe</p>

    <h1 class="mt-4 font-display text-4xl leading-[1.05] text-hueso-100 sm:text-5xl">
      Locations and hours
    </h1>

    <p class="mt-5 max-w-xl text-lg text-hueso-100/90">
      Phoenix, Avondale and Laveen. Open seven days a week.
    </p>
  </div>
</section>

<!-- Migas de pan -->
<nav class="tm-weave" aria-label="Breadcrumb">
  <ol class="mx-auto flex max-w-7xl gap-2 px-4 py-3 text-xs text-carbon-200 sm:px-6">
    <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-maiz-300">Home</a></li>
    <li aria-hidden="true">/</li>
    <li class="text-hueso-100" aria-current="page">Locations</li>
  </ol>
</nav>

<!-- ============================================================
     L1  LOS CUATRO LOCALES
     ============================================================ -->
<section class="tm-tiles py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <ul class="grid gap-8 lg:grid-cols-2">
      <?php foreach ($tm_locations as $tm_location) :
        $tm_status = tm_location_status($tm_location); ?>
        <li class="flex flex-col overflow-hidden rounded-xl border border-hueso-400 bg-hueso-100 shadow-sm">
          <iframe
            src="<?php echo esc_url(tm_map_embed($tm_location)); ?>"
            title="Map of Tortas Manantial, <?php echo esc_attr($tm_location['name']['en']); ?>"
            class="tm-placeholder aspect-video w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>

          <div class="flex flex-1 flex-col p-6">
            <h2 class="font-display text-2xl text-carbon-400">
              <a href="<?php echo esc_url($tm_location['pageUrl']); ?>" class="hover:text-olivo-400">
                <?php echo esc_html($tm_location['name']['en']); ?>
              </a>
            </h2>

            <p class="mt-2 text-carbon-300">
              <?php echo esc_html($tm_location['street']); ?><br>
              <?php echo esc_html($tm_location['city']); ?>
            </p>

            <p class="mt-3 flex items-center gap-2 text-sm">
              <span class="inline-block h-2 w-2 shrink-0 rounded-full <?php echo $tm_status['isOpen'] ? 'bg-olivo-300' : 'bg-carbon-200'; ?>"></span>
              <span class="<?php echo $tm_status['isOpen'] ? 'text-olivo-400' : 'text-carbon-300'; ?>">
                <?php echo $tm_status['isOpen']
                  ? 'Open today until ' . esc_html($tm_status['closesAt'])
                  : 'Closed now, opens at ' . esc_html($tm_status['opensAt']); ?>
              </span>
            </p>

            <p class="mt-1 text-sm text-carbon-300">
              Every day, <?php echo esc_html($tm_status['opensAt']); ?> to <?php echo esc_html($tm_status['closesAt']); ?>
            </p>

            <div class="mt-6 grid grid-cols-3 gap-2">
              <a
                href="<?php echo esc_url($tm_location['orderUrl']); ?>"
                target="_blank" rel="noopener"
                data-tm-order="<?php echo esc_attr($tm_location['id']); ?>"
                data-tm-channel="toast"
                class="tm-btn tm-btn-relief tm-btn-primary flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
              >Order direct</a>

              <a
                href="<?php echo esc_url($tm_location['uberUrl']); ?>"
                target="_blank" rel="noopener"
                data-tm-order="<?php echo esc_attr($tm_location['id']); ?>"
                data-tm-channel="ubereats"
                class="tm-btn tm-btn-relief tm-btn-fresh flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
              >Uber Eats</a>

              <a
                href="tel:<?php echo esc_attr($tm_location['phone']); ?>"
                data-tm-phone="<?php echo esc_attr($tm_location['id']); ?>"
                class="tm-btn tm-btn-relief tm-btn-muted flex-col gap-1 px-2 py-2.5 text-[11px] leading-tight"
              >Call</a>
            </div>

            <div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-olivo-400">
              <a
                href="<?php echo esc_url($tm_location['directionsUrl']); ?>"
                target="_blank" rel="noopener"
                data-tm-directions="<?php echo esc_attr($tm_location['id']); ?>"
                class="underline-offset-4 hover:underline"
              >Get directions</a>

              <a href="<?php echo esc_url($tm_location['pageUrl']); ?>" class="underline-offset-4 hover:underline">
                About this shop
              </a>
            </div>
          </div>
        </li>
      <?php endforeach; ?>
    </ul>

    <div class="mt-12 rounded-xl bg-hueso-200 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p class="max-w-xl text-carbon-400">
        Not sure which one is closest? Open the order panel and we will sort
        them by distance for you.
      </p>
      <a
        href="#"
        data-tm-order-cta
        class="tm-btn tm-btn-relief tm-btn-primary mt-5 shrink-0 sm:mt-0"
      >Find my shop</a>
    </div>
  </div>
</section>

<?php
  /**
   * Schema. Una Organization con los cuatro locales como departamentos.
   * El schema Restaurant completo de cada uno vive en su propia pagina, que
   * es la que rankea por barrio.
   */
  $tm_schema = array(
    '@context'   => 'https://schema.org',
    '@type'      => 'ItemList',
    'itemListElement' => array(),
  );

  foreach ($tm_locations as $tm_index => $tm_location) {
    $tm_schema['itemListElement'][] = array(
      '@type'    => 'ListItem',
      'position' => $tm_index + 1,
      'item'     => array(
        '@type'   => 'Restaurant',
        'name'    => 'Tortas Manantial, ' . $tm_location['name']['en'],
        'url'     => home_url($tm_location['pageUrl']),
        'telephone' => $tm_location['phoneLabel'],
        'address' => array(
          '@type'          => 'PostalAddress',
          'streetAddress'  => $tm_location['street'],
          'addressLocality'=> $tm_location['city'],
        ),
        'servesCuisine' => 'Mexican',
      ),
    );
  }
?>

<script type="application/ld+json">
  <?php echo wp_json_encode($tm_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
</script>

<?php get_footer();