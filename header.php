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
       * Plantillas cuyo contenido sube hasta el borde superior: no se les
       * imprime el espaciador y el hero pasa por detras del navbar.
       *
       * Ojo, esto no obliga a que la barra sea transparente. El componente
       * Navbar solo se vuelve transparente si encuentra [data-tm-hero] en el
       * DOM. Una plantilla puede estar aqui y no llevar ese atributo: es lo
       * que hay que hacer cuando el hero es claro, porque el texto del navbar
       * va en hueso y sobre un fondo claro no aprueba contraste.
       */
      $tm_hero_templates = array(
        'home-template.php',
        'locations-template.php',
        'our-story-template.php',
        'tortas-club-template.php',
        'careers-template.php',
      );

      $tm_has_hero = false;

      foreach ($tm_hero_templates as $tm_template) {
        if (is_page_template($tm_template)) {
          $tm_has_hero = true;
          break;
        }
      }
    ?>

    <div id="tm-navbar" data-transparent="<?php echo $tm_has_hero ? 'true' : 'false'; ?>"></div>

    <?php
      /**
       * Reserva de altura. Con hero no hace falta, porque el hero pasa por
       * debajo de la barra flotante. Sin hero si, o el contenido queda tapado.
       * Se suma el offset de la admin bar para que el calculo sirva tambien
       * con sesion iniciada.
       */
      if (!$tm_has_hero) : ?>
      <div style="height: calc(var(--tm-admin-h, 0px) + 9rem);" aria-hidden="true"></div>
    <?php endif; ?>

    <main id="main">