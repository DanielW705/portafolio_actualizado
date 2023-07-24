"use strict";

(() => {

  // Se carga primero las particulas
  particlesJS.load("particles-js", "./JS/assets/particlesjs-config.json");

  // Se selecciona el primer titulo que esta animado
  let animated_element = document.querySelector(".nombre_titulo");
  
  // Se selecciona todos los elementos que se vana a animar
  let to_animated_elements = document.querySelectorAll(
    ".cuerpo .vista .presentacion .cuerpo_panel p, .cuerpo .vista .presentacion .pie_de_pagina .area_navegacion .lista_componentes .opcion, .cuerpo .vista .informacion .cabecera_pagina .area_navegacion .lista_componentes .opcion, .cuerpo .vista .informacion .cuerpo_panel .card .titulo_nombre, .cuerpo .vista .informacion .cuerpo_panel .card .message span"
  );

  // Se inicia una duncion que permite dormir el proceso de ejecucion
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  console.log(to_animated_elements);

  // Una funcion que evita que se haga de manera paralela la asignacion de animaciones de golpe y animaar uno por uno los elementos html
  const recursividad_antiparalelismo = async (i) => {
    
    // Espera a que termine la primera animacion
    await sleep(1000);
    
    // revisa que el contador sea menor a la cantidad de elementos a animar
    if (i < to_animated_elements.length) {

      // lee cual es el nuevo elemento
      let elemento_actual = to_animated_elements[i];
      // Le quita un estilo que los hace desaparecer para que la animacion se vea mejor
      elemento_actual.classList.remove("hidden_text");
      // Se le agregara la animacion dependiendo del tipo de texto
      elemento_actual.classList.add(
        // Si es uno de contacto se agregara la animacion que un pedazo es texto blanco y el otro es azul
        elemento_actual.classList.contains("texto_contacto")
          ? "text_animated_text_white_incomplete"
          // Sino se buscara si solo es texto blanco
          : elemento_actual.classList.contains("seleccionado")
          ? "text_animated_text_blue"
          // En caso contrario es texto en blanco
          : "text_animated_text_white"
      );
        // Agregamos un escucha para escuchar el elemento que esta actualmente animado
      elemento_actual.addEventListener("animationend", (e) => {
      
        // Se revisa que no sea el ultimo elemento
        if (elemento_actual.dataset.last == undefined)
        // Se cambia la clase para que este deje de estar animado  
        change_class(elemento_actual, e);

        // Si este evento no se escribe todo completo no seguira 
        if (e.animationName != "typing_incomplete") {
          // Se suma el contador
          i++;
          // Se vuelve a invocar a la funcion
          recursividad_antiparalelismo(i);
        }
      // Si no es un span este no regresara a su forma original <<inline>>
        if (elemento_actual.tagName === "SPAN")
        // se le agrega la clase
          elemento_actual.classList.add("return_inline");
      });

      // console.log(elemento_actual.tagName);
    }
  };
// Funcion para cambiar de clase, esta es sincrona y recibe dos parametros, el elemento y el evento
  const change_class = async (e, event) => {
    // Si es animacion incompleta, hasta que se acomplete se detiene la animacion    
    if (event.animationName != "typing_incomplete") {

      // Se duerme un segundo
      await sleep(1000);
      
      // Agrega la clase
      e.classList.add("stop_animation");
    }
  };
  // Iniciamos el escucha del primer evento 
  animated_element.addEventListener("animationend", (e) => {
    
    change_class(animated_element, e);
    
    recursividad_antiparalelismo(0);
  });
})();
