import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./scripts/Navbar";
import Footer from "./scripts/Footer";
import SocialSidebar from "./scripts/SocialSidebar";
import ClubForm from "./scripts/ClubForm";
import CareersForm from "./scripts/CareersForm";
import CateringForm from "./scripts/CateringForm";
import initReveal from "./scripts/reveal";

/**
 * Montaje de los componentes React del tema.
 * Faltan ContactForm y Chatbot.
 */

const navbarMount = document.querySelector("#tm-navbar");

if (navbarMount) {
  // data-transparent lo pone header.php: true solo donde hay hero a sangre.
  const transparent = navbarMount.dataset.transparent === "true";

  ReactDOM.createRoot(navbarMount).render(<Navbar transparent={transparent} />);
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

// Revelado con slide-in de los bloques marcados con [data-tm-reveal].
initReveal();