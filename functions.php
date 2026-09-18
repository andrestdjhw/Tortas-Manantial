<?php

/**
 * Tortas Manantial, tema custom.
 * Tailwind CSS 4 + React via @wordpress/scripts.
 */

/* ==========================================================================
   MEDIOS
   Fuente unica de las URLs de la biblioteca de medios de WordPress.
   El tema no lleva carpeta /assets/: toda imagen entra por aqui.
   ========================================================================== */

/**
 * Ruta a un archivo de la biblioteca de medios.
 * Se arma con content_url() y no con el dominio, para que las mismas rutas
 * sirvan en local, staging y produccion sin tocar nada.
 */
function tm_upload($path) {
  return content_url('/uploads/' . ltrim($path, '/'));
}

function tm_media() {
  return array(
    // Logo de marca. Se usa tambien sobre carbon, ver nota en tm_load_assets.
    'logo'     => tm_upload('2026/08/TortasManantial.png'),

    // TODO: version en negativo para fondos oscuros. Mientras no exista, se
    // usa el mismo archivo en el navbar y el footer.
    'logo_neg' => tm_upload('2026/08/TortasManantial.png'),
  );
}

/* ==========================================================================
   MARCA
   Correo y redes. Vive en PHP y no en JS porque el schema del footer lo
   necesita en el HTML inicial, y no queremos dos fuentes de verdad.
   Se entrega al front por wp_localize_script.
   ========================================================================== */

function tm_brand() {
  return array(
    // Correo publico de contacto. Vacio = no se pinta en ningun lado.
    'email'  => 'hello@tortasmanantial.com',

    'social' => array(
      // Tomados del sitio actual, pendientes de confirmar con el cliente.
      'instagram' => 'https://www.instagram.com/tortasmanantial',
      'facebook'  => 'https://www.facebook.com/tortasmanantial/',
      'tiktok'    => 'https://www.tiktok.com/@tortasmanantial',
      // Reemplaza a Yelp por pedido del cliente. Es la ficha de Google
      // Maps del local (resenas y toda la info del negocio), no un link
      // de direcciones puntual como el de las tarjetas de locales.
      'google'    => 'https://www.google.com/maps/place/Tortas+Manantial/@33.4663745,-112.1890158,993m/data=!3m2!1e3!4b1!4m6!3m5!1s0x872b14ffbfa863e9:0xe256478d82a088f5!8m2!3d33.4663745!4d-112.1890158!16s%2Fg%2F1264dww6m?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D',
    ),
  );
}


/* ==========================================================================
   LOCALES
   Fuente unica de los cuatro locales. Vive en PHP porque las plantillas, el
   schema y las paginas de ubicacion lo necesitan en el HTML inicial. El front
   lo recibe por wp_localize_script y no mantiene su propia copia.

   TODO: verificar uno por uno los enlaces de Toast y de Uber Eats.
   TODO: reemplazar los telefonos por los reales.
   ========================================================================== */

function tm_locations() {
  return array(
    array(
      'id'            => 'mcdowell',
      'name'          => array('en' => 'Phoenix, McDowell', 'es' => 'Phoenix, McDowell'),
      'street'        => '5950 W McDowell Rd #103-104',
      'city'          => 'Phoenix, AZ 85035',
      'lat'           => 33.4644,
      'lng'           => -112.1846,
      'phone'         => '+16025550000',
      'phoneLabel'    => '(602) 555-0000',
      'orderUrl'      => 'https://order.toasttab.com/online/tortas-manantial-phoenix-5950-west-mcdowell-road/',
      'uberUrl'       => 'https://www.ubereats.com/store/tortas-manantial/QmSpagP0XnuilVUt3Scqvg?diningMode=PICKUP',
      'grubhubUrl'    => 'https://www.grubhub.com/restaurant/tortas-manantial-5950-w-mcdowell-rd-phoenix/14707008?pickup=true',
      'seamlessUrl'   => 'https://www.seamless.com/menu/tortas-manantial-5950-w-mcdowell-rd-phoenix/14707008?pickup=true',
      'directionsUrl' => 'https://g.page/tortasmanantial-phoenix',
      'pageUrl'       => '/locations/phoenix-mcdowell',
      'hours'         => array('open' => '07:00', 'close' => '23:00'),
    ),
    array(
      'id'            => 'indian-school',
      'name'          => array('en' => 'Avondale, Indian School', 'es' => 'Avondale, Indian School'),
      'street'        => '10665 W Indian School Rd #A',
      'city'          => 'Avondale, AZ 85392',
      'lat'           => 33.4948,
      'lng'           => -112.2895,
      'phone'         => '+16235550000',
      'phoneLabel'    => '(623) 555-0000',
      'orderUrl'      => 'https://order.toasttab.com/online/tortas-manantial-indian-school-rd-10665-west-indian-school-road/',
      'uberUrl'       => 'https://www.ubereats.com/store/tortas-manantial/kPb19xCRXEOPrwa4B7G-VA?diningMode=PICKUP',
      'grubhubUrl'    => 'https://www.grubhub.com/restaurant/tortas-manantial-10665-w-indian-school-rd-avondale/14713368?pickup=true',
      'seamlessUrl'   => 'https://www.seamless.com/menu/tortas-manantial-10665-w-indian-school-rd-avondale/14713368?pickup=true',
      'directionsUrl' => 'https://g.page/manantial-avondale107th',
      'pageUrl'       => '/locations/avondale-indian-school',
      'hours'         => array('open' => '08:00', 'close' => '22:00'),
    ),
    array(
      'id'            => 'buckeye',
      'name'          => array('en' => 'Avondale, Buckeye', 'es' => 'Avondale, Buckeye'),
      'street'        => '11435 W Buckeye Rd A108',
      'city'          => 'Avondale, AZ 85323',
      'lat'           => 33.4256,
      'lng'           => -112.3086,
      'phone'         => '+16235550001',
      'phoneLabel'    => '(623) 555-0001',
      'orderUrl'      => 'https://order.toasttab.com/online/tortas-manantial-buckeye-rd-11435-west-buckeye-road/',
      'uberUrl'       => 'https://www.ubereats.com/store/tortas-manantial/C406Hme-VCGz7xJerlFQQA?diningMode=PICKUP',
      'grubhubUrl'    => 'https://www.grubhub.com/restaurant/tortas-manantial-11435-w-buckeye-rd-105-avondale/14722184?pickup=true',
      'seamlessUrl'   => 'https://www.seamless.com/menu/tortas-manantial-11435-w-buckeye-rd-105-avondale/14722184?pickup=true',
      'directionsUrl' => 'https://g.page/tortasmanantial-avondaleblvd',
      'pageUrl'       => '/locations/avondale-buckeye',
      'hours'         => array('open' => '08:00', 'close' => '22:00'),
    ),
    array(
      'id'            => 'laveen',
      'name'          => array('en' => 'Laveen', 'es' => 'Laveen'),
      'street'        => '5185 W Baseline Rd Unit 102',
      'city'          => 'Laveen Village, AZ 85339',
      'lat'           => 33.3771,
      'lng'           => -112.1697,
      'phone'         => '+16025550001',
      'phoneLabel'    => '(602) 555-0001',
      'orderUrl'      => 'https://order.toasttab.com/online/tortas-manantial-laveen-5185-west-baseline-road/',
      'uberUrl'       => 'https://www.ubereats.com/store/tortas-manantial/n7AHrZzhUWa48cZKy4Kcng?diningMode=PICKUP',
      'grubhubUrl'    => 'https://www.grubhub.com/restaurant/tortas-manantial-5185-w-baseline-rd-laveen-village-phoenix/14719112?pickup=true',
      'seamlessUrl'   => 'https://www.seamless.com/menu/tortas-manantial-5185-w-baseline-rd-laveen-village-phoenix/14719112?pickup=true',
      'directionsUrl' => 'https://goo.gl/maps/6FRrsVQ5JSqksro26',
      'pageUrl'       => '/locations/laveen',
      'hours'         => array('open' => '08:00', 'close' => '22:00'),
    ),
  );
}



/* ==========================================================================
   EMAILJS
   Envio de los formularios de Careers y Catering. El public key de EmailJS
   esta pensado para vivir en el navegador (no es un secreto: EmailJS filtra
   el abuso por dominio permitido y limite de envios desde su panel, no
   ocultando esta clave), asi que sale por wp_localize_script igual que el
   resto de tmData. Cada formulario sigue guardando tambien una copia
   privada en WordPress (ver SOLICITUDES DE EMPLEO / CATERING mas abajo);
   ese guardado es best-effort y no bloquea el envio del correo, que es la
   notificacion que de verdad le llega al cliente.
   ========================================================================== */

function tm_emailjs() {
  return array(
    'serviceId'          => 'service_t0fhzsc',
    'publicKey'          => 'jAQ2M8-MeMH4_GEUF',
    'careersTemplateId'  => 'template_a7dw2rb',
    'cateringTemplateId' => 'template_t8o5q3p',
  );
}

/**
 * Enlace de pedido por defecto, el que usan el CTA del navbar y el item
 * "Menu". Apunta a un solo local (McDowell) para todos los visitantes.
 *
 * TODO: revisar esta decision. El brief enruta al local mas cercano antes de
 * mandar a Toast, porque un cliente de Laveen que llega aqui termina pidiendo
 * pickup a 20 millas de su casa. El panel de seleccion sigue existiendo y lo
 * abren los CTA de las plantillas; solo el del navbar va directo.
 */
function tm_default_order_url() {
  return 'https://order.toasttab.com/online/tortas-manantial-phoenix-5950-west-mcdowell-road';
}

/**
 * URL del mapa embebido de un local.
 *
 * Se arma con la direccion y no con lat/lng: la direccion viene del sitio
 * actual y es dato verificado, mientras que las coordenadas de tm_locations()
 * son aproximadas y solo se usan para ordenar por cercania.
 *
 * El parametro output=embed no necesita API key.
 */
function tm_map_embed($location) {
  $query = $location['street'] . ', ' . $location['city'];

  return 'https://www.google.com/maps?q=' . rawurlencode($query) . '&z=15&output=embed';
}

/**
 * Hora corta: "07:00" -> "7am", "22:00" -> "10pm".
 */
function tm_format_hour($hhmm) {
  $parts  = explode(':', $hhmm);
  $hour   = (int) $parts[0];
  $minute = (int) $parts[1];
  $suffix = $hour >= 12 ? 'pm' : 'am';
  $hour12 = $hour % 12 === 0 ? 12 : $hour % 12;

  return $minute === 0
    ? $hour12 . $suffix
    : $hour12 . ':' . str_pad((string) $minute, 2, '0', STR_PAD_LEFT) . $suffix;
}

/**
 * Estado del local ahora mismo, en hora de Phoenix.
 * Arizona no cambia con el horario de verano, por eso la zona es fija.
 */
function tm_location_status($location) {
  $now = new DateTime('now', new DateTimeZone('America/Phoenix'));
  $minutes = ((int) $now->format('G')) * 60 + ((int) $now->format('i'));

  $to_minutes = function ($hhmm) {
    $parts = explode(':', $hhmm);
    return ((int) $parts[0]) * 60 + ((int) $parts[1]);
  };

  $open  = $to_minutes($location['hours']['open']);
  $close = $to_minutes($location['hours']['close']);

  return array(
    'isOpen'   => $minutes >= $open && $minutes < $close,
    'opensAt'  => tm_format_hour($location['hours']['open']),
    'closesAt' => tm_format_hour($location['hours']['close']),
  );
}


/* ==========================================================================
   TIPOGRAFIA
   La fuente se encola aqui y no con @import dentro de index.css: un @import
   encadena dos peticiones, porque el navegador tiene que descargar y parsear
   el CSS antes de descubrir que necesita otra hoja.

   Los preconnect van con prioridad 0 en wp_head para que el handshake con
   gstatic empiece antes de que se pida el archivo.
   ========================================================================== */

function tm_font_preconnect() {
  echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
  echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}

add_action('wp_head', 'tm_font_preconnect', 0);

function tm_load_fonts() {
  wp_enqueue_style(
    'tm-fonts',
    /**
     * TODO: esta URL carga varias familias que ya no se usan (Arimo,
     * Electrolize) mas todos los pesos de las que si. Son bastantes
     * kilobytes de fuente para un sitio que se abre en el telefono.
     * Cuando se cierre la eleccion tipografica, recortar a lo que se
     * use de verdad. Por ejemplo, solo Barlow Condensed mas Inter:
     *
     * https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Inter:wght@400;500;600;700&display=swap
     */
    'https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Electrolize&family=Inter:wght@400;500;600;700&display=swap',
    array(),
    null
  );
}

add_action('wp_enqueue_scripts', 'tm_load_fonts');

/**
 * Version basada en filemtime, para que el navegador no sirva assets viejos
 * despues de cada build. Nunca cadenas fijas tipo '1.0'.
 */
function tm_asset_version($relative_path) {
  $absolute = get_theme_file_path($relative_path);

  return file_exists($absolute) ? (string) filemtime($absolute) : '1.0';
}

function tm_load_assets() {
  wp_enqueue_script(
    'tm-main-js',
    get_theme_file_uri('/build/index.js'),
    array('wp-element', 'react-jsx-runtime'),
    tm_asset_version('/build/index.js'),
    true
  );

  wp_enqueue_style(
    'tm-main-css',
    get_theme_file_uri('/build/index.css'),
    array(),
    tm_asset_version('/build/index.css')
  );

  $tm_img = tm_media();

  /**
   * TODO: 'altLangUrl' queda vacio hasta que se decida el mecanismo bilingue
   * (pendiente 04 del brief maestro).
   */
  wp_localize_script('tm-main-js', 'tmData', array(
    'homeUrl'        => home_url('/'),
    'logo'           => $tm_img['logo'],
    'logoLight'      => $tm_img['logo_neg'],
    'brand'          => tm_brand(),
    'locations'      => tm_locations(),
    'emailjs'        => tm_emailjs(),
    'orderUrl'       => tm_default_order_url(),
    'lang'           => substr(get_locale(), 0, 2) === 'es' ? 'es' : 'en',
    'altLangUrl'     => '',
    'restUrl'        => esc_url_raw(rest_url('tm/v1/')),
    'nonce'          => wp_create_nonce('wp_rest'),

    // Graficos de apoyo del footer, uno por esquina. El footer es React y
    // tm_upload() es PHP, asi que la unica forma de que el componente los
    // vea es mandarlos por aca, igual que el logo.
    'footerGraphics' => array(
      tm_upload('2026/09/06-Coco-Graphics-scaled.png'),
      tm_upload('2026/09/23-Coco-Graphics-scaled.png'),
      tm_upload('2026/09/22-Coco-Graphics-scaled.png'),
      tm_upload('2026/09/21-Coco-Graphics-scaled.png'),
    ),
  ));
}

add_action('wp_enqueue_scripts', 'tm_load_assets');

function tm_add_support() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
}

add_action('after_setup_theme', 'tm_add_support');

/**
 * Precarga del logo negativo: es lo primero que se ve sobre el video del hero.
 * No hace nada mientras la URL este vacia.
 */
function tm_preload_logo() {
  $tm_img = tm_media();

  if (empty($tm_img['logo_neg'])) {
    return;
  }

  printf(
    '<link rel="preload" as="image" href="%s" fetchpriority="high">' . "\n",
    esc_url($tm_img['logo_neg'])
  );
}

add_action('wp_head', 'tm_preload_logo', 1);

/* ==========================================================================
   TORTAS CLUB
   Captura de altas. Guarda cada correo como entrada privada para que nada
   se pierda mientras se decide la plataforma real del programa de lealtad
   (pendiente 09 del brief maestro). Cuando se elija, este callback pasa a
   enviar el alta a esa plataforma.
   ========================================================================== */

function tm_register_club_lead_type() {
  register_post_type('tm_club_lead', array(
    'label'           => 'Tortas Club',
    'public'          => false,
    'show_ui'         => true,
    'show_in_menu'    => true,
    'menu_icon'       => 'dashicons-email',
    'supports'        => array('title'),
    'capability_type' => 'post',
    'capabilities'    => array('create_posts' => 'do_not_allow'),
    'map_meta_cap'    => true,
  ));
}

add_action('init', 'tm_register_club_lead_type');


/* ==========================================================================
   SOLICITUDES DE EMPLEO
   Cada envio del formulario de /careers se guarda como entrada privada, para
   que nada se pierda mientras se decide a donde deben llegar.

   TODO: enganchar el hook tm_careers_application al correo o al sistema que
   el cliente confirme (pendiente del brief de paginas internas).
   ========================================================================== */

function tm_register_application_type() {
  register_post_type('tm_application', array(
    'label'           => 'Applications',
    'public'          => false,
    'show_ui'         => true,
    'show_in_menu'    => true,
    'menu_icon'       => 'dashicons-groups',
    'supports'        => array('title', 'editor'),
    'capability_type' => 'post',
    'capabilities'    => array('create_posts' => 'do_not_allow'),
    'map_meta_cap'    => true,
  ));
}

add_action('init', 'tm_register_application_type');

function tm_careers_application(WP_REST_Request $request) {
  // Honeypot: si viene relleno es un bot. Se responde ok y se descarta.
  if (!empty($request->get_param('company'))) {
    return rest_ensure_response(array('ok' => true));
  }

  $name     = sanitize_text_field((string) $request->get_param('name'));
  $phone    = sanitize_text_field((string) $request->get_param('phone'));
  $email    = sanitize_email((string) $request->get_param('email'));
  $location = sanitize_text_field((string) $request->get_param('location'));

  if ($name === '' || $phone === '' || $location === '') {
    return new WP_Error(
      'tm_missing_fields',
      'Name, phone and location are required.',
      array('status' => 400)
    );
  }

  $body = sprintf(
    "Phone: %s\nEmail: %s\nLocation: %s\nRole: %s\nAvailability: %s\n\n%s",
    $phone,
    $email,
    $location,
    sanitize_text_field((string) $request->get_param('role')),
    sanitize_text_field((string) $request->get_param('availability')),
    sanitize_textarea_field((string) $request->get_param('experience'))
  );

  $application_id = wp_insert_post(array(
    'post_type'    => 'tm_application',
    'post_title'   => $name . ', ' . $location,
    'post_content' => $body,
    'post_status'  => 'private',
  ));

  /**
   * Gancho para avisar al cliente. Cuando confirme el correo destino, aqui
   * va el wp_mail o la llamada al ATS.
   */
  do_action('tm_careers_application', $application_id, $request->get_params());

  return rest_ensure_response(array('ok' => true));
}

/* ==========================================================================
   SOLICITUDES DE CATERING
   Cada envio del formulario de /catering se guarda como entrada privada,
   mismo criterio que las solicitudes de empleo de arriba: nada se pierde
   mientras se decide a donde deben llegar.

   TODO: enganchar el hook tm_catering_inquiry al correo o a la persona que
   el cliente confirme.
   ========================================================================== */

function tm_register_catering_inquiry_type() {
  register_post_type('tm_catering_inquiry', array(
    'label'           => 'Catering',
    'public'          => false,
    'show_ui'         => true,
    'show_in_menu'    => true,
    'menu_icon'       => 'dashicons-food',
    'supports'        => array('title', 'editor'),
    'capability_type' => 'post',
    'capabilities'    => array('create_posts' => 'do_not_allow'),
    'map_meta_cap'    => true,
  ));
}

add_action('init', 'tm_register_catering_inquiry_type');

function tm_catering_inquiry(WP_REST_Request $request) {
  // Honeypot: si viene relleno es un bot. Se responde ok y se descarta.
  if (!empty($request->get_param('company'))) {
    return rest_ensure_response(array('ok' => true));
  }

  $name  = sanitize_text_field((string) $request->get_param('name'));
  $phone = sanitize_text_field((string) $request->get_param('phone'));
  $email = sanitize_email((string) $request->get_param('email'));

  if ($name === '' || $phone === '') {
    return new WP_Error(
      'tm_missing_fields',
      'Name and phone are required.',
      array('status' => 400)
    );
  }

  $body = sprintf(
    "Phone: %s\nEmail: %s\nEvent date: %s\nGuests: %s\nEvent type: %s\nClosest shop: %s\n\n%s",
    $phone,
    $email,
    sanitize_text_field((string) $request->get_param('eventDate')),
    sanitize_text_field((string) $request->get_param('guests')),
    sanitize_text_field((string) $request->get_param('eventType')),
    sanitize_text_field((string) $request->get_param('location')),
    sanitize_textarea_field((string) $request->get_param('details'))
  );

  $inquiry_id = wp_insert_post(array(
    'post_type'    => 'tm_catering_inquiry',
    'post_title'   => $name . ', ' . sanitize_text_field((string) $request->get_param('eventDate')),
    'post_content' => $body,
    'post_status'  => 'private',
  ));

  /**
   * Gancho para avisar al cliente. Cuando confirme el correo destino, aqui
   * va el wp_mail o la llamada al sistema que use para catering.
   */
  do_action('tm_catering_inquiry', $inquiry_id, $request->get_params());

  return rest_ensure_response(array('ok' => true));
}

function tm_register_routes() {
  register_rest_route('tm/v1', '/club', array(
    'methods'             => 'POST',
    'callback'            => 'tm_club_signup',
    'permission_callback' => '__return_true',
  ));

  register_rest_route('tm/v1', '/careers', array(
    'methods'             => 'POST',
    'callback'            => 'tm_careers_application',
    'permission_callback' => '__return_true',
  ));

  register_rest_route('tm/v1', '/catering', array(
    'methods'             => 'POST',
    'callback'            => 'tm_catering_inquiry',
    'permission_callback' => '__return_true',
  ));
}

add_action('rest_api_init', 'tm_register_routes');

function tm_club_signup(WP_REST_Request $request) {
  $email = sanitize_email((string) $request->get_param('email'));

  if (!is_email($email)) {
    return new WP_Error(
      'tm_invalid_email',
      'Invalid email address.',
      array('status' => 400)
    );
  }

  // Freno simple por IP, para que el formulario no sea un buzon abierto.
  $ip  = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '';
  $key = 'tm_club_' . md5($ip);

  if ($ip && (int) get_transient($key) > 5) {
    return new WP_Error(
      'tm_too_many',
      'Too many attempts. Try again later.',
      array('status' => 429)
    );
  }

  if ($ip) {
    set_transient($key, (int) get_transient($key) + 1, HOUR_IN_SECONDS);
  }

  // No se duplican altas.
  $existing = get_posts(array(
    'post_type'      => 'tm_club_lead',
    'post_status'    => 'private',
    'title'          => $email,
    'posts_per_page' => 1,
    'fields'         => 'ids',
  ));

  if (empty($existing)) {
    $lead_id = wp_insert_post(array(
      'post_type'   => 'tm_club_lead',
      'post_title'  => $email,
      'post_status' => 'private',
    ));

    if (!is_wp_error($lead_id)) {
      update_post_meta($lead_id, 'tm_source', sanitize_text_field((string) $request->get_param('source')));
    }
  }

  /**
   * Gancho para conectar la plataforma real del Tortas Club cuando se decida.
   */
  do_action('tm_club_signup', $email);

  return rest_ensure_response(array('ok' => true));
}