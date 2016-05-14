var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var connection = mysql.createConnection({ // Mysql Connection
    //host : 'localhost',
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'usuarios',
    port : 3306
});

connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
//---------------------------------------probando base d datos con las siguientes entradas
// CREATE TABLE employees (
//   id int(11) NOT NULL AUTO_INCREMENT,
//   name varchar(50),
//   location varchar(50),
//   PRIMARY KEY (id)
// ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;
//
// INSERT INTO employees (id, name, location) VALUES
// (1, 'Jasmine', 'Australia'),
// (2, 'Jay', 'India'),
// (3, 'Jim', 'Germany'),
// (4, 'Lesley', 'Scotland');

connection.query('SELECT * FROM employees',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
  for (var i = 0; i < rows.length; i++) {
    console.log(rows[i].name);
  };

});
//Creating
// var employee = { name: 'Winnie', location: 'Australia' };
// connection.query('INSERT INTO employees SET ?', employee, function(err,res){
//   if(err) throw err;
//
//   console.log('Last insert ID:', res.insertId);
// });
//Updating
connection.query(
  'UPDATE employees SET location = ? Where ID = ?',
  ["South Africa", 7],
  function (err, result) {
    if (err) throw err;

    console.log('Changed ' + result.changedRows + ' rows');
  }
);
//destroying
connection.query(
  'DELETE FROM employees WHERE id = ?',
  [12,13],
  function (err, result) {
    if (err) throw err;

    console.log('Deleted ' + result.affectedRows + ' rows');
  }
);


//---------------------------------------------------------

console.log('Hola Mundo');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
app.get('/',function(req,res){
	var data = {
		"Data":"",
    "conductor1":""//,
    // "coches": "Usuarios de la aplicacion SHACAR",
    //             "car": [
    //                 {
    //                     "modelo": "Seat Panda",
    //                     "nombre": "Carlos",
    //                     "apellido": "Rodriguez",
    //                     "rutinas": ["S.C - La Laguna (Campus Anchieta)", "La Laguna - Santa Cruz (Plaza España)"],
    //                     "otros_viajeros": ["David Hunter","Ana Dominguez"],
    //                     "zonas_accion": ["La Laguna","Santa Cruz"],
    //                     "valoracion": "***/5",
    //                     "opciones":[{
    //                       "fumar": ["No"],
    //                       "comer": ["Sí"],
    //                       "musica":["Si"]
    //                     }]
    //                 },
    //           ],
    //           "hola":"ei"
	};
	data["Data"] = "Ejemplo consulta BD mySQL...";
  data["conductor1"] =  ["1","2","3"];

	res.json(data);
});

app.get('/usuarios',function(req,res){
    var data = {
        "error":1,
        "Usuarios":"manolito"
    };
connection.query("SELECT * from usuarios",function(err, rows, fields){
  console.log("valor de fields"+fields);
        if(rows.length != 0){
            data["error"] = 0;
            data["Usuarios"] = rows;
            res.json(data);
        }else{
			console.log(data);
            data["Usuarios"] = 'No books Found..';
            res.json(data);
        }
    });
});
//Creating
// var employee = { name: 'Winnie', location: 'Australia' , coche:"Audi A3"};
// connection.query('INSERT INTO usuarios SET ?', employee, function(err,res){
//   if(err) throw err;
//
//   console.log('Last insert ID:', res.insertId);
// });

connection.query('SELECT * FROM usuarios',function(err,rows){
  if(err) throw err;
  //
  // for( var i=0; i< contenido.car.length; i++){ //tamanio del json entero que en nuestro caso sera 3
	//     for( var j=0; j< contenido.car[i].rutinas.length; j++){//como es x destino nos interesan las rutinas de los conductores
  //
  //  			 console.log("¿ ",destino," = ",contenido.car[i].rutinas[j]," ?");

  console.log('Data received from Db:\n');
  console.log(rows);
  for (var i = 0; i < rows.length; i++) {
    console.log(rows[i].nombre);
  };

});

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});
