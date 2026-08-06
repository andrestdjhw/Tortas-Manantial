<?php
/**
 * Template Name: Tortas Club
 *
 * Seccion 2.5 del Copy & Brief de paginas internas.
 *
 * TODO BLOQUEANTE: la mecanica del programa esta sin confirmar (pendiente 09
 * del brief maestro). Antes de publicar hay que cerrar como se acumulan y se
 * canjean los puntos, con que plataforma, y si los pedidos por app acumulan
 * o no. La letra chica de abajo es una promesa verificable: un cliente la
 * puede reclamar en el mostrador.
 */

/* ==========================================================================
   MEDIOS DE ESTA PLANTILLA
   ========================================================================== */

$tm_img_hero = tm_upload('2026/08/Tortas.webp');

get_header(); ?>

<!-- ============================================================
     C0  HERO
     Velo de carbon al 50%, no de maiz: con el velo amarillo la foto
     quedaba lavada. Al pasar a un scrim oscuro el texto tiene que ir en
     hueso, porque el carbon sobre foto no aprueba contraste en ningun
     punto.

     Ahora que el hero es oscuro si lleva data-tm-hero, asi que el navbar
     nace transparente igual que en Locations y Our Story.

     El pt-44 no es decorativo: esta plantilla esta en $tm_hero_templates
     de header.php, asi que no se imprime el espaciador y el hero sube
     hasta el borde. Ese padding es lo que deja libre la altura del navbar.
     ============================================================ -->
<section data-tm-hero class="relative flex min-h-[70svh] items-end overflow-hidden bg-carbon-400 pb-16 pt-44 lg:pb-24">
  <?php if ($tm_img_hero) : ?>
    <img
      src="<?php echo esc_url($tm_img_hero); ?>"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      fetchpriority="high"
    >
  <?php endif; ?>

  <div class="absolute inset-0 bg-carbon-500/50" aria-hidden="true"></div>

  <div class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
    <p class="tm-eyebrow text-maiz-300">Free to join</p>

    <h1 class="mt-4 font-display text-4xl leading-[1.05] text-hueso-100 sm:text-5xl">
      Tortas Club
    </h1>

    <p class="mt-5 max-w-xl text-lg text-hueso-100/90">
      The more you eat, the more you get back.
    </p>
  </div>
</section>

<!-- Migas de pan -->
<nav class="tm-weave" aria-label="Breadcrumb">
  <ol class="mx-auto flex max-w-7xl gap-2 px-4 py-3 text-xs text-carbon-200 sm:px-6">
    <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-maiz-300">Home</a></li>
    <li aria-hidden="true">/</li>
    <li class="text-hueso-100" aria-current="page">Tortas Club</li>
  </ol>
</nav>

<!-- ============================================================
     C1  COMO FUNCIONA
     ============================================================ -->
<section class="tm-tiles py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
      How it works
    </h2>

    <ol class="mt-12 grid gap-6 lg:grid-cols-3">
      <?php
        $tm_steps = array(
          array('Sign up in twenty seconds', 'Name, email, and the shop you visit most. That is it.'),
          array('Order direct and earn points on every order', 'In the shop or on this site. Both count.'),
          array('Redeem for food, drinks and birthday rewards', 'A free torta on your birthday, and specials before anyone else.'),
        );

        foreach ($tm_steps as $tm_index => $tm_step) : ?>
        <li class="rounded-xl border border-hueso-400 bg-hueso-100 p-6 shadow-sm">
          <p class="font-display text-4xl text-maiz-400"><?php echo esc_html($tm_index + 1); ?></p>
          <h3 class="mt-3 font-display text-xl text-carbon-400">
            <?php echo esc_html($tm_step[0]); ?>
          </h3>
          <p class="mt-2 text-carbon-300"><?php echo esc_html($tm_step[1]); ?></p>
        </li>
      <?php endforeach; ?>
    </ol>

    <p class="mt-8 max-w-2xl text-sm text-carbon-300">
      Points only count on direct orders, in the shop or on this site. Third
      party app orders do not earn.
    </p>
  </div>
</section>

<!-- ============================================================
     C2  ALTA
     Mismo componente React que el bloque 07 de la home.
     ============================================================ -->
<section class="bg-hueso-300 py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
    <div>
      <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
        Join the club
      </h2>
      <p class="mt-5 max-w-lg text-lg text-carbon-300">
        Free, and it takes about twenty seconds. We will only write when there
        is something worth writing about.
      </p>
    </div>

    <div class="rounded-2xl bg-carbon-400 p-6 text-hueso-100 sm:p-8">
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
     C3  PREGUNTAS DEL PROGRAMA
     ============================================================ -->
<section class="bg-hueso-200 py-16 lg:py-24">
  <div class="mx-auto max-w-3xl px-4 sm:px-6">
    <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
      About the program
    </h2>

    <?php
      $tm_faqs = array(
        array(
          'Does it cost anything?',
          'No. Joining is free and there is no minimum spend.',
        ),
        array(
          'Do app orders earn points?',
          'No. Only direct orders count, in the shop or on this site.',
        ),
        array(
          'Can I use my points at any location?',
          'Yes. One account works across all four shops.',
        ),
      );

      /**
       * TODO: agregar cuando el cliente confirme la mecanica.
       *   - How many points do I earn per dollar?
       *   - Do points expire?
       *   - How do I check my balance?
       *   - How do I unsubscribe?
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

<?php get_footer();