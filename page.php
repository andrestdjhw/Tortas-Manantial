<?php
/**
 * Plantilla generica para paginas sueltas de WordPress: Privacy Policy,
 * Terms and Conditions, y cualquier otra pagina que no tenga su propio
 * Template Name. Sin hero, asi que header.php ya se encarga de reservar
 * el alto de la barra y de dejar el navbar en su version solida (ver
 * $tm_hero_templates en header.php).
 */

get_header(); ?>

<!-- Migas de pan -->
<nav class="tm-weave" aria-label="Breadcrumb">
  <ol class="mx-auto flex max-w-7xl gap-2 px-4 py-3 text-xs text-carbon-200 sm:px-6">
    <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-accent-hover-soft">Home</a></li>
    <li aria-hidden="true">/</li>
    <li class="text-hueso-100" aria-current="page"><?php the_title(); ?></li>
  </ol>
</nav>

<article class="bg-hueso-100 py-16 lg:py-24">
  <div class="mx-auto max-w-3xl px-4 sm:px-6">
    <?php while (have_posts()) : the_post(); ?>
      <h1 class="font-display uppercase text-4xl leading-tight text-carbon-400 sm:text-5xl">
        <?php the_title(); ?>
      </h1>

      <div class="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:text-carbon-400 prose-p:text-carbon-300 prose-li:text-carbon-300 prose-a:text-olivo-400 prose-strong:text-carbon-400">
        <?php the_content(); ?>
      </div>
    <?php endwhile; ?>
  </div>
</article>

<?php get_footer();
