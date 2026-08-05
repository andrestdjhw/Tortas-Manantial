<?php

/**
 * Tortas Manantial, tema custom.
 * Tailwind CSS 4 + React via @wordpress/scripts.
 */

/* ==========================================================================
   MEDIOS
   Fuente unica de las URLs de la biblioteca de medios de WordPress.
   El tema no lleva carpeta /assets/: toda imagen entra por aqui.
   Se dejan vacias hasta tener las URLs reales; nada se rompe con valores
   vacios, cada consumidor tiene su fallback.
   ========================================================================== */

function tm_media() {
  return array(
    // TODO: URL del logo en positivo, para el navbar solido y las internas.
    'logo'     => '',

    // TODO: URL del logo en negativo, para el navbar sobre el video del hero.
    'logo_neg' => '',
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
   * Datos que el Navbar necesita de WordPress.
   *
   * TODO: 'altLangUrl' queda vacio hasta que se decida el mecanismo bilingue
   * (pendiente 04 del brief maestro). Mientras este vacio, el componente arma
   * la ruta con prefijo /es por su cuenta.
   */
  wp_localize_script('tm-main-js', 'tmData', array(
    'homeUrl'    => home_url('/'),
    'logo'       => $tm_img['logo'],
    'logoLight'  => $tm_img['logo_neg'],
    'lang'       => substr(get_locale(), 0, 2) === 'es' ? 'es' : 'en',
    'altLangUrl' => '',
  ));
}

add_action('wp_enqueue_scripts', 'tm_load_assets');

function tm_add_support() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));

  /**
   * El navbar es un componente de React, no un menu de WordPress.
   * Los links viven en COPY dentro de Navbar.js porque son bilingues y fijos.
   * Si el cliente pide editarlos desde el admin, se registra un menu aqui
   * y se pasa por wp_localize_script.
   */
}

add_action('after_setup_theme', 'tm_add_support');

/**
 * Precarga del logo negativo: es lo primero que se ve sobre el video del hero
 * y sin esto parpadea en la primera pintura.
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