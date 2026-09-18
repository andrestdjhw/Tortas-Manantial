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

$tm_img_hero    = tm_upload('2026/09/OurStoryBannerNew-scaled.jpg');
$tm_img_recipe  = tm_upload('2026/08/Tortas.webp');

$tm_locations = tm_locations();

$tm_img_facets_bg = tm_upload('2026/09/TortasFondo.png'); // Fondo de la barra de cierre (antes tm-facets).
$tm_img_club_bg = $tm_img_facets_bg; // Mismo fondo, ahora tambien detras de Tortas Club (bloque 07, se movio aca desde la home).

// Graficos de apoyo a los costados del FAQ. Mismo par en Tortas Club y en
// el home original. Los bloques 07/10/11 de abajo se movieron aca desde
// home-template.php por pedido del cliente (el 02, Barra de valor, se
// quito de aca despues: quedaba redundante con S5 REENGANCHE).
$tm_img_faq_left  = tm_upload('2026/09/02-Coco-Graphics-scaled.png');
$tm_img_faq_right = tm_upload('2026/09/03-Coco-Graphics-scaled.png');

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
    <p class="tm-eyebrow text-accent-hover-soft">Since 2000</p>

    <h1 class="mt-4 max-w-3xl font-display uppercase text-4xl leading-[1.05] text-hueso-100 sm:text-5xl">
      Twenty five years of the same recipe
    </h1>
  </div>
</section>

<!-- Migas de pan -->
<nav class="relative bg-carbon-400" aria-label="Breadcrumb">
  <img
    src="<?php echo esc_url(tm_upload('2026/09/22-Coco-Graphics-scaled.png')); ?>"
    alt=""
    aria-hidden="true"
    loading="lazy"
    class="pointer-events-none absolute -left-2 top-1/2 hidden w-14 -translate-y-1/2 rotate-3 opacity-20 sm:block"
  >
  <ol class="relative mx-auto flex max-w-7xl gap-2 px-4 py-3 text-xs text-carbon-200 sm:px-6">
    <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-accent-hover-soft">Home</a></li>
    <li aria-hidden="true">/</li>
    <li class="text-hueso-100" aria-current="page">Our Story</li>
  </ol>
</nav>

<!-- ============================================================
     S2  LA RECETA NO CAMBIO
     Antes iba precedida de una S1 (barra angosta, solo texto, "In the
     year 2000...") que el cliente pidio quitar e integrar aqui, en la
     columna de texto, parafraseada: ahora es el primer parrafo, antes
     del que ya hablaba del crecimiento de la ciudad, asi que la
     historia sigue en orden (arranca el negocio -> despues crece).
     ============================================================ -->
<section class="bg-hueso-200">
  <div class="grid lg:grid-cols-2">
    <div data-tm-reveal="left" class="tm-placeholder min-h-64 lg:min-h-136">
      <?php if ($tm_img_recipe) : ?>
        <img
          src="<?php echo esc_url($tm_img_recipe); ?>"
          alt="A torta made to order"
          loading="lazy"
          class="h-full w-full object-cover"
        >
      <?php endif; ?>
    </div>

    <div data-tm-reveal="right" class="flex items-center px-4 py-16 sm:px-10 lg:py-24">
      <div class="max-w-lg">
        <h2 class="tm-section-title">
          The recipe did not change. The city did.
        </h2>
        <p class="mt-5 text-lg text-carbon-300">
          It started in the year 2000 with one shop in Phoenix, on a plan
          that was simple and a little naive: make the torta the way it is
          made at home, charge a fair price, and see who shows up.
        </p>
        <p class="mt-4 text-lg text-carbon-300">
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
     07  TORTAS CLUB
     Se movio aca desde home-template.php (bloques 07, 10, 11 y 02) por
     pedido del cliente: todo lo que iba despues de Instagram en la
     home. Misma banda grande en maiz de siempre.
     TODO: el campo de celular no se publica hasta cerrar el registro
     A2P 10DLC (pendiente del brief).
     ============================================================ -->
<section class="relative isolate overflow-hidden bg-maiz-300 py-16 text-carbon-400 lg:py-24">
  <?php if ($tm_img_club_bg) : ?>
    <img
      src="<?php echo esc_url($tm_img_club_bg); ?>"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
    >
  <?php endif; ?>

  <div class="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
    <div data-tm-reveal="left" class="rounded-2xl bg-hueso-100/90 p-8 shadow-xl backdrop-blur-sm">
      <p class="tm-eyebrow">Tortas Club</p>
      <h2 class="mt-4 tm-section-title">
        Eat here often? Start getting paid for it
      </h2>
      <p class="mt-5 max-w-lg text-lg">
        Points on every order, $5 off on your birthday, a free torta at 150
        points, and first word on new items and specials. Free to join,
        takes about twenty seconds.
      </p>
    </div>

    <div data-tm-reveal="right" class="tm-levitate rounded-2xl bg-carbon-400 p-6 text-hueso-100 sm:p-8">
      <div id="tm-club-form"></div>

      <noscript>
        <p class="text-sm">
          Sign up at the counter on your next visit, or call your closest shop.
        </p>
      </noscript>
    </div>
  </div>
</section>

<!-- ============================================================
     10  TRABAJA CON NOSOTROS
     Degradado gris de carbon (.tm-carbon-gradient), ahora el mismo en
     toda seccion del sitio que llevaba fondo plano en carbon-400.
     ============================================================ -->
<section class="tm-carbon-gradient py-14">
  <div class="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
    <p class="text-lg font-bold text-hueso-100">
      We are hiring at all four locations. No experience needed for most roles.
    </p>
    <a href="/careers" class="tm-btn tm-btn-relief tm-btn-primary shrink-0">Apply now</a>
  </div>
</section>

<!-- ============================================================
     11  PREGUNTAS FRECUENTES
     Acordeon nativo: funciona sin JavaScript y las respuestas estan
     en el HTML aunque este cerrado, para que Google las lea.
     Las preguntas pendientes de confirmar con el cliente estan
     listadas en el TODO de abajo, no publicadas a medias.
     ============================================================ -->
<section class="relative overflow-hidden bg-hueso-200 py-16 lg:py-24">
  <?php if ($tm_img_faq_left) : ?>
    <img
      src="<?php echo esc_url($tm_img_faq_left); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="pointer-events-none absolute left-0 top-1/2 hidden w-36 -translate-y-1/2 xl:block xl:w-48"
    >
  <?php endif; ?>
  <?php if ($tm_img_faq_right) : ?>
    <img
      src="<?php echo esc_url($tm_img_faq_right); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="pointer-events-none absolute right-0 top-1/2 hidden w-36 -translate-y-1/2 xl:block xl:w-48"
    >
  <?php endif; ?>
  <div class="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
    <h2 class="tm-section-title">
      Questions we get a lot
    </h2>

    <?php
      /**
       * El horario se arma desde tm_locations(), no se escribe a mano:
       * si cambia un horario en functions.php, esta respuesta cambia sola.
       */
      $tm_hours_lines = array();

      foreach ($tm_locations as $tm_loc) {
        $tm_st = tm_location_status($tm_loc);
        $tm_hours_lines[] = sprintf(
          '%s: %s to %s',
          $tm_loc['name']['en'],
          $tm_st['opensAt'],
          $tm_st['closesAt']
        );
      }

      $tm_faqs = array(
        array(
          'Do you deliver?',
          'Yes. Order direct on this site for pickup or delivery, or find us on Uber Eats. Ordering direct is the option that helps the shop most.',
        ),
        array(
          'What are your hours?',
          'We are open seven days a week. ' . implode('. ', $tm_hours_lines) . '.',
        ),
        array(
          'Where are you located?',
          'Four shops across the west Valley: Phoenix on West McDowell Road, Avondale on Indian School Road, Avondale on Buckeye Road, and Laveen on West Baseline Road. Each one has its own page with directions and hours.',
        ),
        array(
          'Can I order ahead for pickup?',
          'Yes. Pick your shop, place the order on this site, and it will be bagged and waiting when you arrive. On a busy Friday night that saves you the line.',
        ),
        array(
          'Why order direct instead of through an app?',
          'Third party apps charge the shop a commission on every order. Ordering direct keeps that money with the family, and direct orders are the ones that earn Tortas Club points.',
        ),
        array(
          'What is the Tortas Club?',
          'Our free loyalty program. You earn points on every direct order, get $5 off on your birthday, a free torta once you reach 150 points, and hear about new items before anyone else. Signing up takes about twenty seconds.',
        ),
        array(
          'What exactly is a torta?',
          'A Mexican sandwich on a special made bread, layered generously and oven toasted to perfection. Our tortas follow a secret family recipe that has not changed since the year 2000.',
        ),
        array(
          'Are you hiring?',
          'Almost always, at all four locations. Kitchen, counter and management roles. Most of them need no previous experience, just the willingness to learn.',
        ),
      );

      /**
       * TODO: estas quedan fuera hasta que el cliente confirme. Son las que
       * mas se preguntan, asi que conviene cerrarlas pronto:
       *   - Is the menu the same at every location?
       *   - Do you cater or take large group orders?
       *   - Do you have vegetarian options?
       *   - Do you serve breakfast? (McDowell abre a las 7am)
       *   - Is there parking / dine in at every shop?
       */
    ?>

    <div class="mt-10 divide-y divide-hueso-400 border-y border-hueso-400">
      <?php foreach ($tm_faqs as $tm_faq) : ?>
        <details class="group py-5">
          <summary class="flex cursor-pointer items-center justify-between gap-4 font-semibold text-carbon-400 marker:content-none">
            <?php echo esc_html($tm_faq[0]); ?>
            <span class="shrink-0 text-olivo-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p class="mt-3 text-carbon-300"><?php echo esc_html($tm_faq[1]); ?></p>
        </details>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php
  /**
   * Schema FAQPage. Se imprime desde el mismo arreglo que pinta el acordeon,
   * asi no se puede desincronizar lo que se ve de lo que se indexa.
   */
  $tm_faq_schema = array(
    '@context'   => 'https://schema.org',
    '@type'      => 'FAQPage',
    'mainEntity' => array_map(function ($tm_faq) {
      return array(
        '@type'          => 'Question',
        'name'           => $tm_faq[0],
        'acceptedAnswer' => array(
          '@type' => 'Answer',
          'text'  => $tm_faq[1],
        ),
      );
    }, $tm_faqs),
  );
?>

<script type="application/ld+json">
  <?php echo wp_json_encode($tm_faq_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
</script>

<!-- ============================================================
     S5  REENGANCHE
     Pagina narrativa, asi que cierra con el club y no con el pedido.
     ============================================================ -->
<section class="relative isolate overflow-hidden bg-maiz-300 py-16 text-carbon-400 lg:py-20">
  <?php if ($tm_img_facets_bg) : ?>
    <img
      src="<?php echo esc_url($tm_img_facets_bg); ?>"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
    >
  <?php endif; ?>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
    <div class="rounded-2xl bg-hueso-100/90 p-8 shadow-xl backdrop-blur-sm">
      <h2 class="max-w-xl tm-section-title">
        Come see what twenty five years tastes like
      </h2>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a href="/menu" class="tm-btn tm-btn-relief tm-btn-primary">
          See the menu
        </a>
        <a href="/locations" class="tm-btn tm-btn-ghost-dark">
          Find your location
        </a>
      </div>
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