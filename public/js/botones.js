// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

const buscfactTemplate = `
     
      <%var i = 1%>
      <% _.each(it, (fact) => { %>
      
      <nav class="carrito_fact">
      <h4>Factura numero : <%=i%>  ,Correspondiente a: <%=name%></h4>
      <textarea cols="95" rows="5"><%=fact.factura %>sadadd</textarea>
      <!--h4>Con un importe de: <%=total%>€</h4-->
      <%++i%>
      </nav>
      <%});%>
      
`;

const errorTemplate = `
      <nav class="carrito_fact">
      <h2><%=error%></h2>
      </nav>
`;


const Datos = (data) => {
    //console.log("dato de datos "+ data);
    console.log("valor en funcion datos"+data.value);
    console.log("datarows: "+data.rows);
  if(!data.error){
     $("#prueba").html(_.template(buscfactTemplate, {it:data.factura,name:data.name, fact: data.factura[0].factura,total :data.factura[0].total }));
    }else{
        $("#prueba").html(_.template(errorTemplate, {error:data.error}));
       // $("#prueba").html(_.template(resultTemplate, {name:data.name, fact: data.factura,total:data.total }));
    }
};



$(document).ready(() => {
    
  
  //   /* Request AJAX para que se calcule la tabla */
  //   $("#boton_buscar").click( () => {
  //     console.log("estamos en buscar");
  //     //console.log("valor de destino"+destino.value);
  //       $.get("/consultarbd", /* Request AJAX para que se calcule la tabla lo devuleve a app*/
  //         //{ input: destino.value },
  //         Datos,
  //         'json'
  //       );
  // });
  
  
  $("#boton_buscar").click( () => {
      console.log("estamos en buscar"+destino_index.value);
      //console.log("valor de destino"+destino.value);
       $.get('/buscar_destino',
        {
          localitation: destino_index.value
        },
        'json'
      );
  });

// $("#boton_buscar").click( () => {
//       console.log("estamos en buscar");
//       //console.log("valor de destino"+destino.value);
//         $.get("/users",Datos,'json');
//   });
   
   
   $("#botonEnviar").click( () => {
      console.log("estamos en boton enviar de registrarse");
      console.log("Valor del nombre"+name_user.value);
      console.log("Valor del destino"+destino.value);
      console.log("Valor del modelo"+modelo.value);
      
      $.get('/registro',
        {   name:name_user.value,
            modelo:modelo.value,
            localitation: destino.value
        },
        'json'
      );
   });
   

 });
})();
