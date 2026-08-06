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
       * El navbar arranca transparente SOLO donde hay hero a sangre por detras.
       * Se ata a la plantilla, no a is_front_page(): mientras la home siga
       * usando la plantilla por defecto, la barra nace solida y no tapa nada.
       *
       * Cuando entre otra plantilla con hero (por ejemplo las de ubicacion),
       * se agrega a este arreglo y listo.
       */
      $tm_hero_templates = array(
        'home-template.php',
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