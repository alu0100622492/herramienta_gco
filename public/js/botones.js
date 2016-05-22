// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

const Datos = (data) => {
    //console.log("dato de datos "+ data);
    console.log("valor en funcion datos"+data.value);
    console.log("datarows: "+data.rows);

};



$(document).ready(() => {
    console.log("estamos en botones");

    /* Request AJAX para que se calcule la tabla */
    $("#boton_buscar").click( () => {
      //console.log("valor de destino"+destino.value);
        $.get("/busqueda", /* Request AJAX para que se calcule la tabla lo devuleve a app*/
          //{ input: destino.value },
          Datos,
          'json'
        );
   });
 });

})();
