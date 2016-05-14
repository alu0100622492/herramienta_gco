// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it





$(document).ready(() => {
    console.log("estamos en botones");

    /* Request AJAX para que se calcule la tabla */
    $("#destino").click( () => {
      console.log("valor de destino"+destino.value);
        $.get("/csv", /* Request AJAX para que se calcule la tabla lo devuleve a app*/
          { input: destino.value },
          fillTable,
          'json'
        );
   });
 });

})();
