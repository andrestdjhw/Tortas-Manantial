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

function tm_media() {
  return array(
    // TODO: URL del logo en positivo, para fondos claros.
    'logo'     => '',

    // TODO: URL del logo en negativo, para el navbar y el footer en carbon.
    'logo_neg' => '',
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
    // TODO: correo publico de contacto. Vacio = no se pinta en ningun lado.
    'email'  => '',

    'social' => array(
      // Tomados del sitio actual, pendientes de confirmar con el cliente.
      'instagram' => 'https://www.instagram.com/tortasmanantial',
      'facebook'  => 'https://www.facebook.com/tortasmanantial/',
      'yelp'      => 'https://www.yelp.com/biz/tortas-manantial-avondale-3',
    ),
  );
}

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
    'homeUrl'    => home_url('/'),
    'logo'       => $tm_img['logo'],
    'logoLight'  => $tm_img['logo_neg'],
    'brand'      => tm_brand(),
    'lang'       => substr(get_locale(), 0, 2) === 'es' ? 'es' : 'en',
    'altLangUrl' => '',
    'restUrl'    => esc_url_raw(rest_url('tm/v1/')),
    'nonce'      => wp_create_nonce('wp_rest'),
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

function tm_register_routes() {
  register_rest_route('tm/v1', '/club', array(
    'methods'             => 'POST',
    'callback'            => 'tm_club_signup',
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