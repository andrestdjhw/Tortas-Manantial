<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <?php
      /**
       * El navbar ya no se vuelve transparente en ningun lado (antes lo
       * hacia sobre el hero de estas plantillas); se quedo solo la otra
       * mitad de lo que resolvia esta lista: que plantillas suben su
       * contenido hasta el borde superior sin el espaciador generico de
       * abajo, porque ya traen su propio padding-top pensado para
       * despejar la barra fija (el hero, o el bloque que haga sus veces).
       */
      $tm_hero_templates = array(
        'home-template.php',
        'locations-template.php',
        'our-story-template.php',
        'tortas-club-template.php',
        'careers-template.php',
        'catering-template.php',
      );

      $tm_has_hero = false;

      foreach ($tm_hero_templates as $tm_template) {
        if (is_page_template($tm_template)) {
          $tm_has_hero = true;
          break;
        }
      }
    ?>

    <div id="tm-navbar"></div>

    <!-- Riel de redes sociales, fijo a la izquierda. Mismo criterio de
         montaje que el navbar: un div vacio que React llena, position:fixed
         asi que no le importa donde caiga en el DOM. -->
    <div id="tm-social-sidebar"></div>

    <?php
      /**
       * Reserva de altura para las plantillas que no traen su propio
       * padding-top: el navbar es fixed (sale del flujo), asi que sin
       * esto su primer bloque de contenido queda tapado debajo de la
       * barra. Su alto es una sola fila (--tm-header-h, 5rem) desde que
       * se quito la fila superior que colapsaba con el scroll. Se suma
       * el offset de la admin bar para que el calculo sirva tambien con
       * sesion iniciada.
       */
      if (!$tm_has_hero) : ?>
      <div style="height: calc(var(--tm-admin-h, 0px) + 5rem);" aria-hidden="true"></div>
    <?php endif; ?>

    <main id="main">