import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./scripts/Navbar";

/**
 * Montaje de los componentes React del tema.
 * Por ahora solo el Navbar. Footer, ContactForm y Chatbot entran aqui despues.
 */

const navbarMount = document.querySelector("#tm-navbar");

if (navbarMount) {
  // data-transparent lo pone header.php: true solo en la home, sobre el video del hero.
  const transparent = navbarMount.dataset.transparent === "true";

  ReactDOM.createRoot(navbarMount).render(<Navbar transparent={transparent} />);
}