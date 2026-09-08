<?php
/**
 * Template Name: Home
 *
 * Bloques 01 a 11 del Copy & Brief de la homepage.
 * El navbar (00) y el footer (12) son componentes de React.
 */

/* ==========================================================================
   MEDIOS DE ESTA PLANTILLA
   URLs de la biblioteca de medios de WordPress. Vacias hasta tenerlas.
   Cada bloque tiene su fallback, asi que la pagina no se rompe.
   ========================================================================== */

$tm_img_hero_video   = tm_upload('2026/08/TortasManantialHeroCompressed.mp4');
$tm_img_hero_poster  = ''; // TODO: primer frame del video. Sin el, el hero se
                           // ve en carbon plano hasta que el video empieza.
$tm_img_fresh        = tm_upload('2026/08/Tortas.webp');
$tm_img_story        = tm_upload('2026/08/TMFachada.webp');
/**
 * TODO: reemplazar por el feed real de Instagram (fotos y clips propios).
 * Mientras tanto son 4 tarjetas, no 6: con el mismo video repetido, 6
 * copias se notaban demasiado y ademas dejaban cada tarjeta chica. Con
 * 4 la grilla tiene menos columnas y cada una sale mas grande.
 */
$tm_img_ig_video     = tm_upload('2026/09/4LocacionesListas.mp4');
$tm_img_ig_1         = $tm_img_ig_video;
$tm_img_ig_2         = $tm_img_ig_video;
$tm_img_ig_3         = $tm_img_ig_video;
$tm_img_ig_4         = $tm_img_ig_video;

$tm_img_bg           = tm_upload('2026/09/FondoVerde.png'); // Fondo de las secciones .tm-tiles.
// Mismo video-loop del hero de /locations, ahora de fondo del bloque 06.
$tm_img_locations_video  = tm_upload('2026/09/PhoenixSkyline-1.mp4');
$tm_img_locations_poster = tm_upload('2026/09/LocationsMejorada.png'); // Se ve mientras carga el video.
$tm_img_club_bg      = tm_upload('2026/09/TortasFondo.png'); // Fondo de la banda en maiz de Tortas Club.
$tm_img_facets_bg    = tm_upload('2026/09/TortasFondo.png'); // Mismo fondo, ahora en la barra de cierre (antes tm-facets).

// Graficos de apoyo a los costados del FAQ. Mismo par en Tortas Club.
$tm_img_faq_left     = tm_upload('2026/09/02-Coco-Graphics-scaled.png');
$tm_img_faq_right    = tm_upload('2026/09/03-Coco-Graphics-scaled.png');

// Mismo grafico de apoyo, ahora como acento en la esquina del panel de
// texto de los bloques 04 y 05 (el otro lado de cada uno es foto, ahi no
// entra un acento sin taparla).
$tm_img_fresh_bg     = tm_upload('2026/09/FondoAguasFrescas.png'); // Fondo del panel de texto de 04.
$tm_img_story_accent_bl = tm_upload('2026/09/06-Coco-Graphics-scaled.png'); // Abajo-izquierda.
$tm_img_story_accent_tl = tm_upload('2026/09/05-Coco-Graphics-scaled.png'); // Arriba-izquierda.
$tm_img_story_accent_tr = tm_upload('2026/09/21-Coco-Graphics-scaled.png'); // Arriba-derecha.
$tm_img_story_accent_br = tm_upload('2026/09/22-Coco-Graphics-scaled.png'); // Abajo-derecha.

// Acentos de esquina del bloque 09 (Instagram), ahora que su fondo es
// gris liso en vez del mosaico de .tm-tiles.
$tm_img_ig_accent_tl = tm_upload('2026/09/06-Coco-Graphics-scaled.png'); // Arriba-izquierda.
$tm_img_ig_accent_tr = tm_upload('2026/09/22-Coco-Graphics-scaled.png'); // Arriba-derecha.
$tm_img_ig_accent_bl = tm_upload('2026/09/02-Coco-Graphics-scaled.png'); // Abajo-izquierda.
$tm_img_ig_accent_br = tm_upload('2026/09/21-Coco-Graphics-scaled.png'); // Abajo-derecha.

$tm_locations = tm_locations();

/**
 * Enlace de pedido de toda la pagina. Los CTA de la home van directo a Toast
 * en vez de abrir el panel de seleccion de local.
 *
 * TODO: revisar. Manda a todos al local de McDowell sin importar donde esten,
 * y los enlaces de menu salen del sitio, que es el hallazgo numero 1 de la
 * auditoria del sitio de Wix. El panel de seleccion sigue existiendo en el
 * componente Navbar por si se decide volver a el.
 */
$tm_order_url = tm_default_order_url();

get_header(); ?>

<!-- ============================================================
     01  HERO
     El video y los scrims van sin z-index negativo a proposito: un hijo
     en z negativo se pinta por debajo del fondo de su propio contenedor,
     y el bg-carbon-400 de la seccion lo taparia. El orden lo dan el orden
     del markup y el z-10 del contenido.
     ============================================================ -->
<section data-tm-hero class="relative flex min-h-[calc(100svh-3rem)] items-center overflow-hidden bg-carbon-400">
  <?php if ($tm_img_hero_video) : ?>
    <video
      class="absolute inset-0 h-full w-full object-cover"
      autoplay muted loop playsinline
      preload="auto"
      aria-hidden="true"
      <?php if ($tm_img_hero_poster) : ?>poster="<?php echo esc_url($tm_img_hero_poster); ?>"<?php endif; ?>
    >
      <source src="<?php echo esc_url($tm_img_hero_video); ?>" type="video/mp4">
    </video>
  <?php elseif ($tm_img_hero_poster) : ?>
    <img
      src="<?php echo esc_url($tm_img_hero_poster); ?>"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      fetchpriority="high"
    >
  <?php endif; ?>

  <!-- Un solo scrim parejo: con el texto centrado ya no hay un lado
       "de texto" que necesite mas velo que el otro. Subido de 55% a 70%
       por pedido del cliente: el video de fondo le restaba lectura al
       texto blanco. -->
  <div class="absolute inset-0 bg-carbon-500/70" aria-hidden="true"></div>

  <div class="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-40 text-center sm:px-6">
    <div class="mx-auto max-w-2xl">
      <p class="tm-eyebrow text-maiz-300">Family owned in Phoenix since 2000</p>

      <!-- 40% mas grande que el tamano original en cada punto de quiebre
           (2rem/3rem/3.75rem -> 2.8rem/4.2rem/5.25rem), por pedido del
           cliente. tm-levitate-text le agrega el sube-y-baja con sombra
           que respira (ver src/index.css), version para texto suelto de
           .tm-levitate. -->
      <h1 class="tm-levitate-text mt-4 font-display text-[2.8rem] leading-[1.08] text-hueso-100 sm:text-[4.2rem] lg:text-[5.25rem]">
        The torta that tastes <span class="whitespace-nowrap">like home</span>
      </h1>

      <p class="mx-auto mt-5 max-w-xl text-lg text-hueso-100/90">
        Fresh bread, real sazón, made to order. Four neighborhood shops across
        Phoenix, Avondale and Laveen, open seven days a week.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="<?php echo esc_url($tm_order_url); ?>"
          target="_blank" rel="noopener"
          data-tm-order="default" data-tm-channel="toast"
          class="tm-btn tm-btn-relief tm-btn-primary tm-btn-primary-on-dark"
        >
          Order direct
        </a>
        <a href="#favorites" class="tm-btn tm-btn-ghost-light">
          See the menu
        </a>
      </div>

      <p class="mt-4 text-sm text-hueso-100/75">
        Order direct and your money stays with the family, not the app.
      </p>
    </div>
  </div>
</section>

<!-- ============================================================
     01b  CINTA MARQUEE
     Cierra el hero. Su alto (3rem) se descuenta del alto del hero, asi
     que hero y cinta juntos ocupan exactamente el viewport.
     ============================================================ -->
<div class="tm-marquee h-12 items-center bg-carbon-400" aria-hidden="true">
  <?php for ($tm_i = 0; $tm_i < 2; $tm_i++) : ?>
    <div class="tm-marquee__track">
      <?php for ($tm_j = 0; $tm_j < 4; $tm_j++) : ?>
        <span class="tm-eyebrow px-6 text-maiz-300">Every order made fresh</span>
        <span class="tm-eyebrow px-6 text-hueso-100">Hecho al momento</span>
      <?php endfor; ?>
    </div>
  <?php endfor; ?>
</div>

<!-- ============================================================
     03b  TODAS LAS TORTAS
     Parcial compartido, ver template-parts/tortas-grid.php. Tortas Club
     tambien la pide, en el lugar donde antes iba el carrusel de favoritos.
     ============================================================ -->
<?php get_template_part('template-parts/tortas-grid'); ?>

<!-- ============================================================
     08  RESENAS
     ============================================================ -->
<section class="bg-hueso-200 py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
      What the neighborhood says
    </h2>
    <p class="mt-3 text-carbon-300">Real reviews from our four shops.</p>

    <!-- Widget de Trustindex (plugin wp-reviews-plugin-for-google), jala
         las resenas de Google directo, asi que no hay testimonios a mano
         que mantener ni rotar aca. no-registration=google: no pide que el
         negocio se registre en Trustindex, solo lee lo publico. -->
    <div class="mt-12">
      <?php echo do_shortcode('[trustindex no-registration=google]'); ?>
    </div>

    <div class="mt-12 rounded-xl bg-hueso-300 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p class="max-w-xl text-carbon-400">
        Been here before? Leave us a review. It takes a minute and it helps a
        family business more than you think.
      </p>
      <a
        href="<?php echo esc_url($tm_locations[0]['directionsUrl']); ?>"
        target="_blank" rel="noopener"
        class="tm-btn tm-btn-relief tm-btn-primary mt-5 shrink-0 sm:mt-0"
      >Write a review</a>
    </div>
  </div>
</section>

<!-- ============================================================
     06  UBICACIONES
     Fondo gris liso (bg-carbon-100) por pedido del cliente: con cuatro
     mapas de Google adentro de las tarjetas, el mosaico de palmeras de
     .tm-tiles le restaba limpieza a la seccion. Ahora en su lugar va el
     mismo video-loop del hero de /locations (PhoenixSkyline-1.mp4), con
     scrim oscuro parejo para el texto: las tarjetas de local ya son
     opacas (bg-hueso-200), asi que solo el titulo y el hueco entre
     tarjetas necesitan el velo.
     ============================================================ -->
<section id="locations" class="relative isolate overflow-hidden min-h-svh scroll-mt-24 bg-carbon-400 py-16 lg:py-24">
  <?php if ($tm_img_locations_video) : ?>
    <video
      class="absolute inset-0 h-full w-full object-cover"
      autoplay muted loop playsinline
      preload="none"
      aria-hidden="true"
      <?php if ($tm_img_locations_poster) : ?>poster="<?php echo esc_url($tm_img_locations_poster); ?>"<?php endif; ?>
    >
      <source src="<?php echo esc_url($tm_img_locations_video); ?>" type="video/mp4">
    </video>
  <?php elseif ($tm_img_locations_poster) : ?>
    <img
      src="<?php echo esc_url($tm_img_locations_poster); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover"
    >
  <?php endif; ?>

  <div class="absolute inset-0 bg-carbon-500/60" aria-hidden="true"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="font-display text-3xl leading-tight text-hueso-100 sm:text-4xl">
      Find the one closest to you
    </h2>
    <p class="mt-3 text-hueso-100/80">
      Four shops across Phoenix, Avondale and Laveen. Open seven days a week.
    </p>

    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <?php foreach ($tm_locations as $tm_index => $tm_location) :
        $tm_status = tm_location_status($tm_location); ?>
        <li
          data-tm-reveal="top"
          style="transition-delay: <?php echo esc_attr($tm_index * 0.1); ?>s"
          class="flex flex-col overflow-hidden rounded-xl border border-hueso-400 bg-hueso-200 shadow-xl shadow-carbon-500/10"
        >
          <!-- Mapa del local. loading="lazy" es obligatorio aqui: son cuatro
               iframes de terceros en la misma pagina y sin esto se cargan
               los cuatro antes de que nadie los vea. -->
          <iframe
            src="<?php echo esc_url(tm_map_embed($tm_location)); ?>"
            title="Map of Tortas Manantial, <?php echo esc_attr($tm_location['name']['en']); ?>"
            class="tm-placeholder aspect-4/3 w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>

          <div class="flex flex-1 flex-col p-5">
          <h3 class="font-display text-xl text-carbon-400">
            <a href="<?php echo esc_url($tm_location['pageUrl']); ?>" class="hover:text-olivo-400">
              <?php echo esc_html($tm_location['name']['en']); ?>
            </a>
          </h3>

          <p class="mt-2 text-sm text-carbon-300">
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

          <div class="mt-5 grid grid-cols-3 gap-2 pt-1">
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

          <a
            href="<?php echo esc_url($tm_location['directionsUrl']); ?>"
            target="_blank" rel="noopener"
            data-tm-directions="<?php echo esc_attr($tm_location['id']); ?>"
            class="mt-3 text-sm font-semibold text-olivo-400 underline-offset-4 hover:underline"
          >Get directions</a>
          </div>
        </li>
      <?php endforeach; ?>
    </ul>

    <a href="/locations" class="tm-btn tm-btn-ghost-light mt-12">See all locations and hours</a>
  </div>
</section>

<!-- ============================================================
     03  LOS FAVORITOS
     Parcial compartido, ver template-parts/favorites-carousel.php.
     full_height + id porque esta es la seccion a la que apunta el
     "See the menu" del hero (#favorites); en las demas paginas el
     mismo parcial se pide sin esos dos args.
     ============================================================ -->
<?php
  get_template_part('template-parts/favorites-carousel', null, array(
    'id'          => 'favorites',
    'full_height' => true,
  ));
?>

<!-- ============================================================
     09  INSTAGRAM
     Fondo gris oscuro liso por pedido del cliente, ya no el mosaico de
     palmeras de .tm-tiles; despues paso a .tm-carbon-gradient junto con
     el resto de las secciones en carbon-400 del sitio. El texto y el
     CTA pasan a tinta clara (tm-btn-ghost-light) para seguir aprobando
     contraste encima. Los acentos de esquina son los mismos graficos y
     el mismo criterio que el panel oscuro del bloque 05 (opacity-20,
     solo desde lg).
     ============================================================ -->
<section class="tm-carbon-gradient relative overflow-hidden py-16 lg:py-24">
  <?php if ($tm_img_ig_accent_tl) : ?>
    <img
      src="<?php echo esc_url($tm_img_ig_accent_tl); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="pointer-events-none absolute -left-8 -top-8 hidden w-32 -rotate-6 opacity-20 lg:block xl:w-40"
    >
  <?php endif; ?>
  <?php if ($tm_img_ig_accent_tr) : ?>
    <img
      src="<?php echo esc_url($tm_img_ig_accent_tr); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="pointer-events-none absolute -right-8 -top-8 hidden w-32 rotate-6 opacity-20 lg:block xl:w-40"
    >
  <?php endif; ?>
  <?php if ($tm_img_ig_accent_bl) : ?>
    <img
      src="<?php echo esc_url($tm_img_ig_accent_bl); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="pointer-events-none absolute -bottom-8 -left-8 hidden w-40 opacity-20 lg:block xl:w-52"
    >
  <?php endif; ?>
  <?php if ($tm_img_ig_accent_br) : ?>
    <img
      src="<?php echo esc_url($tm_img_ig_accent_br); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="pointer-events-none absolute -bottom-8 -right-8 hidden w-40 opacity-20 lg:block xl:w-52"
    >
  <?php endif; ?>
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
    <div class="sm:flex sm:items-end sm:justify-between sm:gap-6">
      <div>
        <h2 class="font-display text-3xl leading-tight text-hueso-100 sm:text-4xl">
          Tag us, we are watching
        </h2>
        <p class="mt-3 text-hueso-100/75">@tortasmanantial</p>
      </div>

      <a
        href="https://www.instagram.com/tortasmanantial"
        target="_blank" rel="noopener"
        class="tm-btn tm-btn-ghost-light mt-6 sm:mt-0"
      >Follow us</a>
    </div>

    <ul class="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <?php
        $tm_ig = array($tm_img_ig_1, $tm_img_ig_2, $tm_img_ig_3, $tm_img_ig_4);

        foreach ($tm_ig as $tm_ig_index => $tm_ig_image) : ?>
        <li
          data-tm-reveal="top"
          style="transition-delay: <?php echo esc_attr($tm_ig_index * 0.07); ?>s"
          class="tm-placeholder aspect-4/5 overflow-hidden rounded-lg"
        >
          <?php if ($tm_ig_image && str_ends_with($tm_ig_image, '.mp4')) : ?>
            <video
              class="h-full w-full object-cover"
              autoplay muted loop playsinline
              preload="none"
              aria-hidden="true"
            >
              <source src="<?php echo esc_url($tm_ig_image); ?>" type="video/mp4">
            </video>
          <?php elseif ($tm_ig_image) : ?>
            <img
              src="<?php echo esc_url($tm_ig_image); ?>"
              alt=""
              loading="lazy"
              class="h-full w-full object-cover"
            >
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<!-- ============================================================
     04  HECHO AL MOMENTO
     ============================================================ -->
<section class="bg-hueso-200">
  <div class="grid lg:grid-cols-2">
    <div data-tm-reveal="left" class="tm-placeholder min-h-64 lg:min-h-[32rem]">
      <?php if ($tm_img_fresh) : ?>
        <img
          src="<?php echo esc_url($tm_img_fresh); ?>"
          alt="Bread going on the grill"
          loading="lazy"
          class="h-full w-full object-cover"
        >
      <?php endif; ?>
    </div>

    <div data-tm-reveal="right" class="relative overflow-hidden flex items-center justify-center bg-hueso-200 px-4 py-16 text-center sm:px-10 lg:py-24">
      <?php if ($tm_img_fresh_bg) : ?>
        <img
          src="<?php echo esc_url($tm_img_fresh_bg); ?>"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover"
        >
      <?php endif; ?>
      <div class="relative z-10 max-w-lg rounded-2xl bg-hueso-100/90 p-8 shadow-xl backdrop-blur-sm">
        <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
          Every order made fresh
        </h2>
        <p class="mt-5 text-lg text-carbon-300">
          Nothing sits under a lamp. The bread hits the grill when you order,
          the fruit gets cut the same morning, and the sazón has not changed
          since the year 2000. That is the whole trick, and there is no
          shortcut to it.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     05  HISTORIA CORTA
     TODO: copy provisional. Se reescribe con la historia real de la
     familia (pendiente 02 del brief maestro). El panel oscuro pasa a
     .tm-carbon-gradient junto con el resto de las secciones en
     carbon-400 del sitio.
     ============================================================ -->
<section class="bg-hueso-300">
  <div class="grid lg:grid-cols-2">
    <!-- Texto a la izquierda -->
    <div data-tm-reveal="left" class="tm-carbon-gradient relative overflow-hidden flex items-center justify-center px-4 py-16 text-center sm:px-10 lg:py-24">
      <?php if ($tm_img_story_accent_tl) : ?>
        <img
          src="<?php echo esc_url($tm_img_story_accent_tl); ?>"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="pointer-events-none absolute -left-8 -top-8 hidden w-32 -rotate-6 opacity-20 lg:block xl:w-40"
        >
      <?php endif; ?>
      <?php if ($tm_img_story_accent_tr) : ?>
        <img
          src="<?php echo esc_url($tm_img_story_accent_tr); ?>"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="pointer-events-none absolute -right-8 -top-8 hidden w-32 rotate-6 opacity-20 lg:block xl:w-40"
        >
      <?php endif; ?>
      <?php if ($tm_img_story_accent_bl) : ?>
        <img
          src="<?php echo esc_url($tm_img_story_accent_bl); ?>"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="pointer-events-none absolute -bottom-8 -left-8 hidden w-40 opacity-20 lg:block xl:w-52"
        >
      <?php endif; ?>
      <?php if ($tm_img_story_accent_br) : ?>
        <img
          src="<?php echo esc_url($tm_img_story_accent_br); ?>"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="pointer-events-none absolute -bottom-8 -right-8 hidden w-40 opacity-20 lg:block xl:w-52"
        >
      <?php endif; ?>
      <div class="relative z-10 max-w-lg">
        <p class="tm-eyebrow text-maiz-300">Since 2000</p>
        <h2 class="mt-4 font-display text-3xl leading-tight text-hueso-100 sm:text-4xl">
          One family, one recipe, four neighborhoods
        </h2>
        <p class="mt-5 text-lg text-hueso-100/80">
          We opened one small shop in Phoenix with a family recipe and a lot of
          nerve. Twenty five years later there are four of us across the west
          Valley, and the recipe has not moved an inch. What grew was the number
          of families who call this their spot.
        </p>
        <a href="/our-story" class="tm-btn tm-btn-ghost-light mt-8">Read our story</a>
      </div>
    </div>

    <!-- Imagen a sangre, toda la mitad derecha.
         En movil va debajo del texto, no encima: la historia es lo que
         justifica la foto, no al reves. -->
    <div data-tm-reveal="right" class="tm-placeholder order-last min-h-64 lg:min-h-[32rem]">
      <?php if ($tm_img_story) : ?>
        <img
          src="<?php echo esc_url($tm_img_story); ?>"
          alt="The family behind Tortas Manantial"
          loading="lazy"
          class="h-full w-full object-cover"
        >
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- ============================================================
     07  TORTAS CLUB
     La unica banda grande en maiz de toda la home. Si el color se
     repite, deja de ser una senal.
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
      <h2 class="mt-4 font-display text-3xl leading-tight sm:text-4xl">
        Eat here often? Start getting paid for it
      </h2>
      <p class="mt-5 max-w-lg text-lg">
        Points on every order, a free torta on your birthday, and first word on
        new items and specials. Free to join, takes about twenty seconds.
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
    <h2 class="font-display text-3xl leading-tight text-carbon-400 sm:text-4xl">
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
          'Our free loyalty program. You earn points on every direct order, get a free torta on your birthday, and hear about new items before anyone else. Signing up takes about twenty seconds.',
        ),
        array(
          'What exactly is a torta?',
          'A Mexican sandwich on bolillo bread, toasted on the grill and layered generously. Ours follow a family recipe that has not changed since we opened in the year 2000.',
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
     02  BARRA DE VALOR DEL PEDIDO DIRECTO
     Va al final de la pagina: es el ultimo argumento antes de salir.
     Conserva el numero 02 del Copy & Brief para no romper la referencia.
     TODO BLOQUEANTE: la columna 1 promete "mismo precio, sin recargo".
     No publicar hasta confirmar la politica de precio por canal.
     Si el precio directo no es igual al del local, cambiar por
     "No third party fees" y quitar la promesa de precio.
     ============================================================ -->
<section class="relative isolate overflow-hidden bg-maiz-300 py-16 text-carbon-400">
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
      <p class="tm-eyebrow">Order here, not there</p>

      <div class="mt-6 grid gap-6 sm:grid-cols-3">
        <p class="text-lg font-semibold">Same price, no app markup</p>
        <p class="text-lg font-semibold">Ready faster, straight from our kitchen</p>
        <p class="text-lg font-semibold">Every order earns Tortas Club points</p>
      </div>

      <a
        href="<?php echo esc_url($tm_order_url); ?>"
        target="_blank" rel="noopener"
        data-tm-order="default" data-tm-channel="toast"
        class="tm-btn tm-btn-relief tm-btn-primary mt-8"
      >
        Start your order
      </a>
    </div>
  </div>
</section>

<?php get_footer();