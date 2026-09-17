import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./scripts/Navbar";
import Footer from "./scripts/Footer";
import SocialSidebar from "./scripts/SocialSidebar";
import ClubForm from "./scripts/ClubForm";
import CareersForm from "./scripts/CareersForm";
import CateringForm from "./scripts/CateringForm";
import CategoryCarousel from "./scripts/CategoryCarousel";
import TortaModal from "./scripts/TortaModal";
import initReveal from "./scripts/reveal";

/**
 * Montaje de los componentes React del tema.
 * Faltan ContactForm y Chatbot.
 */

const navbarMount = document.querySelector("#tm-navbar");

if (navbarMount) {
  ReactDOM.createRoot(navbarMount).render(<Navbar />);
}

const footerMount = document.querySelector("#tm-footer");

if (footerMount) {
  ReactDOM.createRoot(footerMount).render(<Footer />);
}

// Riel flotante de redes, fijo a la izquierda en toda la pagina.
const socialSidebarMount = document.querySelector("#tm-social-sidebar");

if (socialSidebarMount) {
  ReactDOM.createRoot(socialSidebarMount).render(<SocialSidebar />);
}

// Bloque 07 de la home. Version completa del alta al Tortas Club.
const clubMount = document.querySelector("#tm-club-form");

if (clubMount) {
  ReactDOM.createRoot(clubMount).render(<ClubForm />);
}

// Pagina /careers
const careersMount = document.querySelector("#tm-careers-form");

if (careersMount) {
  ReactDOM.createRoot(careersMount).render(<CareersForm />);
}

// Pagina /catering
const cateringMount = document.querySelector("#tm-catering-form");

if (cateringMount) {
  ReactDOM.createRoot(cateringMount).render(<CateringForm />);
}

// Bloque 01c de la home. Coverflow de categorias, avanza solo.
const categoryCarouselMount = document.querySelector("#tm-category-carousel");

if (categoryCarouselMount) {
  let items = [];

  try {
    items = JSON.parse(categoryCarouselMount.dataset.categories || "[]");
  } catch (error) {
    // Datos mal formados no deberian tumbar el resto de la pagina.
  }

  ReactDOM.createRoot(categoryCarouselMount).render(
    <CategoryCarousel items={items} />
  );
}

// Modal de ingredientes de "Every torta we make" (template-parts/
// tortas-grid.php). Ese parcial solo se llama una vez por plantilla,
// asi que un solo mount por pagina alcanza.
const tortaModalMount = document.querySelector("#tm-torta-modal");

if (tortaModalMount) {
  let tortaItems = [];

  try {
    tortaItems = JSON.parse(tortaModalMount.dataset.tortas || "[]");
  } catch (error) {
    // Datos mal formados no deberian tumbar el resto de la pagina.
  }

  ReactDOM.createRoot(tortaModalMount).render(
    <TortaModal items={tortaItems} orderUrl={tortaModalMount.dataset.orderUrl} />
  );
}

// Revelado con slide-in de los bloques marcados con [data-tm-reveal].
initReveal();