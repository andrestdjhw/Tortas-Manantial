</main>

    <div id="tm-footer"></div>

    <?php
      /**
       * Schema Organization. Se imprime desde PHP y no desde React para que
       * este en el HTML inicial. El schema Restaurant por local va en cada
       * plantilla de ubicacion, no aqui.
       */
      $tm_brand = tm_brand();
      $tm_img   = tm_media();

      $tm_schema = array(
        '@context' => 'https://schema.org',
        '@type'    => 'Organization',
        'name'     => 'Tortas Manantial',
        'url'      => home_url('/'),
        'sameAs'   => array_values(array_filter($tm_brand['social'])),
      );

      if (!empty($tm_img['logo'])) {
        $tm_schema['logo'] = $tm_img['logo'];
      }

      if (!empty($tm_brand['email'])) {
        $tm_schema['email'] = $tm_brand['email'];
      }
    ?>

    <script type="application/ld+json">
      <?php echo wp_json_encode($tm_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>
    </script>

    <?php wp_footer(); ?>
  </body>
</html>