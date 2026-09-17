<?php
/**
 * Template Name: Home
 *
 * Bloques del Copy & Brief de la homepage. Los numeros de bloque no se
 * corrieron al mover o quitar secciones (siguen sin corresponder 1 a 1
 * con el orden real en pantalla), asi que se puede ubicar cada una en
 * el documento externo aunque cambien de lugar entre plantillas.
 * Bloques 07 (Tortas Club), 10 (Trabaja con Nosotros), 11 (FAQ) y 02
 * (Barra de valor) se movieron a our-story-template.php por pedido del
 * cliente, todo lo que va despues del bloque 09 (Instagram) en home.
 * El navbar (00) y el footer (12) son componentes de React.
 */

/* ==========================================================================
   MEDIOS DE ESTA PLANTILLA
   URLs de la biblioteca de medios de WordPress. Vacias hasta tenerlas.
   Cada bloque tiene su fallback, asi que la pagina no se rompe.
   ========================================================================== */

$tm_video_hero = tm_upload('2026/09/TortasManantialHeroCompressedSinAnimacion.mp4'); // Fondo del hero, en vez del remolino .tm-hero-swirl.

/**
 * Bloque 09b, CATERING Y TORTAS CLUB. Barra angosta despues de Instagram
 * que solo empuja a la pagina propia de cada una (/catering,
 * /tortas-club); ninguna de las dos repite el formulario completo aca.
 * Las fotos son las mismas que ya usa cada pagina propia como foto
 * principal, para no pedirle una tercera foto al cliente para lo mismo.
 */
$tm_img_catering_promo = tm_upload('2026/09/BannerJobApplication-scaled.webp'); // Foto generica de catering (la pagina /catering ahora usa su propio slideshow en C2).
$tm_img_club_promo     = tm_upload('2026/09/Catering1-scaled.jpg'); // Foto para la vitrina de Tortas Club, por pedido del cliente.
$tm_img_catering_club_bg = tm_upload('2026/09/TortasFondo.png'); // Mismo fondo que llevan los bloques de formulario (K3 de /careers, C2 de /catering, etc.), por pedido del cliente.

// Graficos de apoyo a los costados del FAQ de cierre. Mismo par que usa
// el FAQ de /our-story.
$tm_img_faq_left  = tm_upload('2026/09/02-Coco-Graphics-scaled.png');
$tm_img_faq_right = tm_upload('2026/09/03-Coco-Graphics-scaled.png');

/**
 * Bloque 12, TRABAJA CON NOSOTROS. Cierra la home con el formulario de
 * aplicacion, foto del equipo a un lado igual que en /careers (K3):
 * mismo criterio, misma foto, para que la promesa "trabaja con nosotros"
 * se vea igual sin importar donde el visitante la encuentre primero.
 */
$tm_img_job_team = tm_upload('2026/09/tortasmanantialteamweb.png');
$tm_img_job_bg   = tm_upload('2026/09/TortasFondo.png'); // Mismo fondo detras del formulario que en /careers.

/**
 * Bloque 01c, CATEGORIAS. Fotos recortadas sin fondo, una por categoria.
 * Nachos y Fries comparten una sola foto (asi la mando el cliente, un
 * archivo "NACHOS_FRIES..."), asi que esas dos categorias se unieron en
 * "Nachos & Fries" mas abajo en vez de repetir la misma imagen dos veces
 * bajo nombres distintos.
 */
$tm_img_cat_tortas       = tm_upload('2026/09/TortasCategorySection-scaled.png');
$tm_img_cat_sandwiches   = tm_upload('2026/09/SANDWICHES_Category_Section-scaled.png');
$tm_img_cat_nachos_fries = tm_upload('2026/09/NACHOS_FRIES_Category_Section--scaled.png');
$tm_img_cat_desserts     = tm_upload('2026/09/DESERTS_Category_Section-scaled.png');
$tm_img_cat_aguas        = tm_upload('2026/09/AGUAS_FRESCAS_Category_Section-scaled.png');
$tm_img_cat_licuados     = tm_upload('2026/09/LICUADOS_Category_Section-scaled.png');
$tm_img_cat_jugos        = tm_upload('2026/09/JUGOS_Category_Section-scaled.png');


$tm_img_bg           = tm_upload('2026/09/FondoVerde.png'); // Fondo de las secciones .tm-tiles.
// Mismo video-loop del hero de /locations, ahora de fondo del bloque 06.
$tm_img_locations_video  = tm_upload('2026/09/PhoenixSkyline-1.mp4');
$tm_img_locations_poster = tm_upload('2026/09/LocationsMejorada.png'); // Se ve mientras carga el video.

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
     Video de fondo (en vez de .tm-hero-swirl, el remolino gris/blanco
     de antes) con un velo oscuro encima (filtro overlay) para que el
     texto siga leyendose parejo sin importar que tan clara o ocupada
     salga cada escena del video. Al volver a fondo oscuro, el texto
     vuelve a tinta clara y los botones recuperan el modificador
     "-on-dark"/"-light" que usan el resto de los heroes oscuros del
     sitio (our-story, tortas-club, locations).
     ============================================================ -->
<section data-tm-hero class="relative flex min-h-[calc(100svh-3rem)] items-center overflow-hidden bg-carbon-400">
  <?php if ($tm_video_hero) : ?>
    <video
      class="absolute inset-0 h-full w-full object-cover"
      autoplay muted loop playsinline
      preload="auto"
      aria-hidden="true"
    >
      <source src="<?php echo esc_url($tm_video_hero); ?>" type="video/mp4">
    </video>
  <?php endif; ?>

  <!-- Filtro oscuro (velo), por pedido del cliente: sin esto el texto
       claro pierde contraste en las escenas mas iluminadas del video. -->
  <div class="absolute inset-0 bg-carbon-500/60" aria-hidden="true"></div>

  <div class="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6">
    <!-- Centrado a todo lo ancho, ya no en 2 columnas: el cliente quito
         la foto que iba a la derecha (antes un slideshow, balanceaba el
         texto alineado a la izquierda), asi que el bloque entero pasa a
         centrado, en vez de quedarse pegado a la izquierda sin nada del
         otro lado. -->
    <div class="mx-auto max-w-2xl text-center">
      <p class="tm-eyebrow text-accent-hover-soft">Family owned in Phoenix since 2000</p>

      <!-- 40% mas grande que el tamano original en cada punto de quiebre
           (2rem/3rem/3.75rem -> 2.8rem/4.2rem/5.25rem), por pedido del
           cliente. tm-levitate-text le agrega el sube-y-baja con sombra
           que respira (ver src/index.css), version para texto suelto de
           .tm-levitate. "Torta Shop," en el tono claro de acento
           (--color-accent-hover-soft): el verde exacto del hover de los
           botones pierde contraste sobre el video oscuro, mismo criterio
           que el resto del texto claro-sobre-oscuro del sitio.

           uppercase + font-black (peso 900, ver functions.php) + tracking
           tight: tratamiento tipo poster que pidio el cliente con una
           referencia, mismo espiritu que "H1 - Black 900" de esa
           referencia pero con nuestro copy. -->
      <h1 class="tm-levitate-text mt-4 font-display text-[2.8rem] font-black uppercase leading-[1.05] tracking-tight text-hueso-100 sm:text-[4.2rem] lg:text-[5.25rem]">
        Your Local <span class="text-accent-hover-soft">Torta Shop,</span> every order <span class="whitespace-nowrap">made fresh</span>
      </h1>

      <p class="mx-auto mt-5 max-w-xl text-lg text-hueso-100/85">
        Fresh bread, real sazón, made to order. Four neighborhood shops across
        Phoenix, Avondale and Laveen, open seven days a week.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="<?php echo esc_url($tm_order_url); ?>"
          target="_blank" rel="noopener"
          data-tm-order="default" data-tm-channel="toast"
          class="tm-btn tm-btn-relief tm-btn-primary"
        >
          Order direct
        </a>
        <a href="#menu" class="tm-btn tm-btn-ghost-light">
          See the menu
        </a>
      </div>

      <p class="mt-4 text-sm text-hueso-100/70">
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
<div class="tm-marquee tm-ribbon-bevel h-12 items-center" aria-hidden="true">
  <?php for ($tm_i = 0; $tm_i < 2; $tm_i++) : ?>
    <div class="tm-marquee__track">
      <?php for ($tm_j = 0; $tm_j < 4; $tm_j++) : ?>
        <span class="tm-eyebrow px-6 text-maiz-300">Every order made fresh</span>
        <span class="tm-eyebrow px-6 text-olivo-400">Hecho al momento</span>
      <?php endfor; ?>
    </div>
  <?php endfor; ?>
</div>

<!-- ============================================================
     01c  CATEGORIAS
     Seccion nueva, no viene del Copy & Brief original. Una foto
     recortada sin fondo por categoria (nada de tarjeta ni object-cover
     alrededor, mismo criterio que la foto del hero).

     Carrusel "coverflow" (una centrada y grande, dos a cada lado mas
     chicas, avanza sola cada 2 segundos) en vez de la fila con scroll
     de antes, por pedido del cliente con una referencia. Es un
     componente de React (CategoryCarousel, ver src/scripts) y no PHP +
     CSS porque necesita sabor cual item esta al centro en cada momento
     para decidir el tamano/opacidad de los demas. Los datos van en un
     atributo JSON en vez de tm_upload() por item repetido en el markup.
     ============================================================ -->
<section class="overflow-hidden pt-16 pb-8 lg:pt-24 lg:pb-12">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="max-w-2xl tm-section-title">
      Menu highlights
    </h2>
    <p class="mt-3 max-w-xl text-carbon-300">
      Fresh favorites from across our menu.
    </p>
  </div>

  <?php
    $tm_categories = array(
      array('name' => 'Tortas', 'image' => $tm_img_cat_tortas),
      array('name' => 'Sandwiches', 'image' => $tm_img_cat_sandwiches),
      array('name' => 'Nachos & Fries', 'image' => $tm_img_cat_nachos_fries),
      array('name' => 'Desserts', 'image' => $tm_img_cat_desserts),
      array('name' => 'Aguas Frescas', 'image' => $tm_img_cat_aguas),
      array('name' => 'Licuados', 'image' => $tm_img_cat_licuados),
      array('name' => 'Jugos', 'image' => $tm_img_cat_jugos),
    );
  ?>
  <div
    id="tm-category-carousel"
    class="mt-4"
    data-categories="<?php echo esc_attr(wp_json_encode($tm_categories, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)); ?>"
  ></div>

  <div class="mx-auto max-w-7xl px-4 text-center sm:px-6">
    <a
      href="<?php echo esc_url($tm_order_url); ?>"
      target="_blank" rel="noopener"
      data-tm-order="default" data-tm-channel="toast"
      class="tm-btn tm-btn-relief tm-btn-primary mt-2"
    >See Full Menu</a>
  </div>
</section>

<!-- ============================================================
     09b  CATERING Y TORTAS CLUB
     Barra angosta, no vitrina grande: dos mitades separadas por una
     linea vertical (solo desde sm, en movil se apilan y la linea se
     vuelve horizontal), cada una con su titulo en verde, una linea de
     apoyo, un boton rojo y su foto. Reemplazo los dos bloques 01d/01e
     que iban justo despues del hero, y de ahi paso a vivir despues de
     Instagram; el cliente termino de pedir que se quedara justo despues
     de la primera seccion real del hero (01c Categorias) en vez de mas
     abajo. Mismos enlaces y fotos de siempre, solo cambia donde vive.

     Fondo en TortasFondo.png, mismo criterio que los bloques de
     formulario del sitio (K3 de /careers, C2 de /catering, "Trabaja con
     nosotros" de esta misma pagina): la textura va a sangre detras y el
     contenido vive en una tarjeta clara semitransparente encima, para
     que el texto siga siendo legible sobre una foto ocupada.

     El padding de la seccion crecio en varias rondas antes de este
     fondo (llego a pt-32/pb-44/lg:pt-40/lg:pb-60); con la tarjeta
     encima de una textura visible, ese mismo padding se leia como
     demasiado margen vacio alrededor de la tarjeta, no como una
     seccion "grande". Se recorto de vuelta a algo mas cercano al
     original y el contenedor paso de max-w-7xl a max-w-[100rem]: la
     tarjeta ahora ocupa mas del ancho de la seccion, asi que el hueco
     a los lados (entre la tarjeta y el borde real de la pantalla)
     tambien se nota menos.
     ============================================================ -->
<section class="relative isolate overflow-hidden pt-10 pb-14 lg:pt-14 lg:pb-20">
  <?php if ($tm_img_catering_club_bg) : ?>
    <img
      src="<?php echo esc_url($tm_img_catering_club_bg); ?>"
      alt=""
      aria-hidden="true"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover"
    >
  <?php endif; ?>

  <div class="relative z-10 mx-auto max-w-[100rem] px-4 sm:px-6">
    <div class="rounded-2xl bg-hueso-100/90 p-6 shadow-xl backdrop-blur-sm sm:p-10">
      <div class="grid gap-10 divide-y divide-carbon-200 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-y-0">
        <!-- flex flex-wrap solo en movil (una sola columna, si no cabe
             la foto se baja sin problema); desde sm pasa a grid de 2
             columnas (1fr + auto): el texto ya no puede empujar toda la
             fila a un wrap, se envuelve el solo dentro de su columna.
             Sin esto, "Good food for every occasion." (mas largo que el
             subtitulo de Tortas Club) hacia que la foto de Catering se
             bajara de renglon y la de Tortas Club no, un lado se veia
             distinto del otro. -->
        <div data-tm-reveal="left" class="flex flex-wrap items-center justify-between gap-6 sm:grid sm:grid-cols-[1fr_auto] sm:pr-10">
          <div>
            <h3 class="tm-section-title">
              Catering
            </h3>
            <p class="tm-eyebrow mt-3 text-carbon-300">Good food for every occasion.</p>
            <a href="/catering" class="tm-btn tm-btn-relief tm-btn-primary mt-6 inline-flex items-center gap-2">
              Start your order
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          <!-- w y h fijos (no w-auto + max-w-[]): con w-auto el ancho
               salia de la proporcion natural de cada foto a esa altura,
               y como esta foto y la de Tortas Club no comparten
               proporcion, una quedaba mucho mas ancha que la otra -- se
               notaba en que una se bajaba de renglon (flex-wrap) y la
               otra no. Con w fijo las dos ocupan la misma caja exacta
               (object-cover recorta lo que sobre) y el bloque se ve
               simetrico. -->
          <?php if ($tm_img_catering_promo) : ?>
            <img
              src="<?php echo esc_url($tm_img_catering_promo); ?>"
              alt="Catering trays from Tortas Manantial"
              loading="lazy"
              class="h-52 w-68 shrink-0 rounded-lg object-cover shadow-lg sm:h-64 sm:w-84"
            >
          <?php endif; ?>
        </div>

        <div data-tm-reveal="right" class="flex flex-wrap items-center justify-between gap-6 pt-10 sm:grid sm:grid-cols-[1fr_auto] sm:pl-10 sm:pt-0">
          <div>
            <h3 class="tm-section-title">
              Tortas Club
            </h3>
            <p class="tm-eyebrow mt-3 text-carbon-300">Good food goes further.</p>
            <a href="/tortas-club" class="tm-btn tm-btn-relief tm-btn-primary mt-6 inline-flex items-center gap-2">
              Join now
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          <?php if ($tm_img_club_promo) : ?>
            <img
              src="<?php echo esc_url($tm_img_club_promo); ?>"
              alt="Food from Tortas Manantial"
              loading="lazy"
              class="h-52 w-68 shrink-0 rounded-lg object-cover shadow-lg sm:h-64 sm:w-84"
            >
          <?php endif; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     08  RESENAS
     ============================================================ -->
<section class="bg-hueso-200 py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 class="tm-section-title">
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
    <h2 class="tm-section-title-inverse text-hueso-100">
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
        <h2 class="tm-section-title-inverse text-hueso-100">
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

    <!-- Feed real de Instagram via el plugin Trustindex (Widgets for
         Social Photo Feed), mismo criterio que el widget de resenas de
         Google del bloque 08 (do_shortcode en vez de tarjetas a mano).
         Reemplaza la grilla de 4 placeholders con el mismo video
         repetido que iba aca antes. -->
    <div class="mt-10" data-tm-reveal="top">
      <?php echo do_shortcode('[trustindex-feed-instagram]'); ?>
    </div>
  </div>
</section>

<!-- ============================================================
     03b  TODAS LAS TORTAS
     Parcial compartido, ver template-parts/tortas-grid.php. Tortas Club
     tambien la pide. Se movio al final de la pagina (antes iba justo
     despues del hero) por pedido del cliente. id="menu" porque esta
     sigue siendo la seccion a la que apunta el "See the menu" del hero
     (#menu) -- el ancla funciona igual sin importar donde caiga la
     seccion en la pagina.
     ============================================================ -->
<?php get_template_part('template-parts/tortas-grid', null, array('id' => 'menu')); ?>

<!-- ============================================================
     11  PREGUNTAS FRECUENTES
     Cierra la home, despues del grid de tortas, por pedido del cliente.
     Mismo acordeon nativo (funciona sin JavaScript, las respuestas
     quedan en el HTML aunque este cerrado) y el mismo set de preguntas
     que el FAQ de /our-story: son las preguntas del sitio completo, no
     algo especifico de la historia de la familia, asi que tiene sentido
     que vivan en las dos paginas.
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
     12  TRABAJA CON NOSOTROS (FORMULARIO)
     Cierre de la pagina, foto del equipo a la izquierda y formulario a
     la derecha, mismo patron que K3 de /careers (misma foto, mismo
     fondo detras de la tarjeta del formulario).
     ============================================================ -->
<section class="bg-hueso-300">
  <div class="grid lg:grid-cols-2">
    <!-- Fondo blanco liso (bg-hueso-100 en vez de tm-placeholder), pero la
         foto vuelve a llenar la caja a sangre (h-full w-full object-cover)
         como antes. -->
    <div data-tm-reveal="left" class="min-h-64 bg-hueso-100 lg:min-h-144">
      <?php if ($tm_img_job_team) : ?>
        <img
          src="<?php echo esc_url($tm_img_job_team); ?>"
          alt="The team at Tortas Manantial"
          loading="lazy"
          class="h-full w-full object-cover"
        >
      <?php endif; ?>
    </div>

    <div data-tm-reveal="right" class="relative isolate flex items-center justify-center overflow-hidden px-4 py-16 sm:px-10 lg:py-24">
      <?php if ($tm_img_job_bg) : ?>
        <img
          src="<?php echo esc_url($tm_img_job_bg); ?>"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover"
        >
      <?php endif; ?>

      <div class="relative z-10 w-full max-w-lg rounded-2xl bg-hueso-100/90 p-8 shadow-xl backdrop-blur-sm">
        <p class="tm-eyebrow">We are hiring</p>
        <h2 class="mt-4 tm-section-title">
          Work with us
        </h2>
        <p class="mt-3 text-carbon-300">
          Four shops, one team. It takes a couple of minutes, no resume needed.
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

<?php get_footer();