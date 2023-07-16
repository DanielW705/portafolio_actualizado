"use strict";

(() => {
  particlesJS.load("particles-js", "./JS/assets/particlesjs-config.json");

  let animated_element = document.querySelector(".nombre_titulo");

  let to_animated_elements = document.querySelectorAll(
    ".cuerpo .vista .presentacion .cuerpo_panel p, .cuerpo .vista .presentacion .pie_de_pagina .area_navegacion .lista_componentes .opcion"
  );

  const recursividad_antiparalelismo = async (i) => {
    await sleep(1000);
    if (i < to_animated_elements.length) {
      let elemento_actual = to_animated_elements[i];
      elemento_actual.classList.remove("hidden_text");
      elemento_actual.classList.add(
        elemento_actual.classList.contains("texto_contacto")
          ? "text_animated_text_white_incomplete"
          : elemento_actual.classList.contains("seleccionado")
          ? "text_animated_text_blue"
          : "text_animated_text_white"
      );
      elemento_actual.addEventListener("animationend", (e) => {
        if (elemento_actual.dataset.last == undefined)
          change_class(elemento_actual, e);

        if (e.animationName != "typing_incomplete") {
          i++;
          recursividad_antiparalelismo(i);
        }
      });
    }
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const change_class = async (e, event) => {
    if (event.animationName != "typing_incomplete") {
      await sleep(1000);
      e.classList.add("stop_animation");
    }
  };
  animated_element.addEventListener("animationend", (e) => {
    change_class(animated_element, e);
    recursividad_antiparalelismo(0);
  });

  // animated_elements.forEach( element => {
  //   element.addEventListener("animationend", (e) => change_class(element, e)); })
})();
