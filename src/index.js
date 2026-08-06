import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./scripts/Navbar";
import Footer from "./scripts/Footer";
import ClubForm from "./scripts/ClubForm";

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

// Bloque 07 de la home. Version completa del alta al Tortas Club.
const clubMount = document.querySelector("#tm-club-form");

if (clubMount) {
  ReactDOM.createRoot(clubMount).render(<ClubForm />);
}