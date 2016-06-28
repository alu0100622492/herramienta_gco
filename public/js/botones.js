// See http://en.wikipedia.org/wiki/Comma-separated_values
((exports) => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

function validar_email( ) {
    var x = document.getElementById("correo").value;
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(x) )
        alert("Error: La dirección de correo " + x + " es incorrecta.");
}


const Datos = (contenido) => {
    console.log("LONGITUD "+ contenido.num_elem);
    console.log("Valor de DATA DATOS "+ contenido);
    console.log("valor de localizacion en 0"+contenido.todo[0].name);
    
    $("#titleprueba1").width('70%').append(
							"<div>"
						 +"<table >"
                            +"<tr>"
                            +"<td>"+"<B>Chofer</B>"+"</td>"
                            +"<td>"+"<B>Vehiculo</B>"+"</td>"
                            +"<td>"+"<B>ZONA</B>"+"</td>"
                            +"</tr>"
                         +"</table>"
                         +"</div>"
				 		);
    
    for( var i=0; i < contenido.num_elem; i++){
        if(!contenido.todo[i].coche)
        contenido.todo[i].coche="Sin coche";
					$("#prueba").width('70%').append(
							"<div>"
						 +"<table>"
                            +"<tr>"
                            +"<td>"+contenido.todo[i].name+"</td>"
                            +"<td>"+contenido.todo[i].coche+"</td>"
                            +"<td>"+ contenido.todo[i].location+"</td>"
                            +"</tr>"
                         +"</table>"
                         +"</div>"
				 		);
			 
    }

};



$(document).ready(() => {
    
  
  
  $("#botoniniciar").click( () => {
      
      console.log("Valor del nombre"+name_user1.value);
      console.log("Valor del destino"+correo.value);
      console.log("Valor del modelo"+pass.value);
      if(!name_user1.value){
          console.log("Sin valor");
      }else{
      $.get('/inicio',
        {   name:name_user1.value,
            correo:correo.value,
            pass: pass.value
        },
        'json'
      );
      }
   });
  
   
   //boton registrarse
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
   
   //boton buscar y generar tabla
   $("#boton_buscar").click( () => {
      console.log("estamos en buscar"+destino_index.value);
      //console.log("valor de destino"+destino.value);
       $.get('/buscar_destino',
        {
          localitation: destino_index.value
        },
        Datos,
        'json'
      );
  });

   

 });
 exports.validar_email=validar_email;
})(this);
