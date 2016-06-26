var express = require('express'); // Express App include
var app = express();
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
//var tablesql = require('./models/mydb.sql');
//var user = app.models.mydb();
app.set('port', (process.env.PORT || 8080));

var connection = mysql.createConnection({ // Mysql Connection
    // //host : 'localhost',
    // host : '127.0.0.1',
    // port : '8080',
    // user : 'alu0100836059',
    // password : '',
    // database : 'dbsql',//base de datos a la que conecta(nombre workbench)
    host : process.env.IP,/*'localhost',*/
    user : process.env.C9_USER,/*'root',*/
    password : '',
    database : 'c9'
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));
console.log('Hola Mundo');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
//app.engine('html', require('ejs').renderFile);

// CREATE TABLE usuarios (
//   id int(11) NOT NULL AUTO_INCREMENT,
//   name varchar(50),
//     apellidos varchar(50),
//   location varchar(50),
//     modelo varchar(50),
//     zonas_accion varchar(50),
//     valoracion varchar(50),
//   PRIMARY KEY (id)
// ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;
//
// INSERT INTO employees (id, name, apellidos,location,modelo,zonas_accion,valoracion) VALUES
// (1, 'Carlos','Rodriguez' ,'Santa Cruz','Seat Panda','La Laguna','***/5'),
// (2, 'Kevin', 'Gonzalez','Adeje','Audi A4','El medano','**/5'),
// (3, 'Jim', 'Germany'),
// (4, 'Lesley', 'Scotland');
connection.connect(function(error){
   if(error){
     console.log(error);
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

app.get('/', (req, res) => {
  res.render('iniciarSesion',
  {title : 'Busqueda myapp' })
});


app.get('/registrarse', (req, res) => {
  res.render('registrarse',
  {title : 'Registrarse myapp' })
});

app.get('/index', (req, res) => {
  res.render('index',
  {title : 'iniciar myapp' })
});

app.get('/iniciarSesion', (req, res) => {
  res.render('iniciarSesion',
  {title : 'iniciarSesion myapp' })
});

app.get('/como_funciona', (req, res) => {
  res.render('como_funciona',
  {title : 'Como funciona myapp' })
});

app.get('/sobreNos', (req, res) => {
  res.render('sobreNos',
  {title: 'Información sobre nosotros'})
});

app.get('/consultarbd',function(req,res,next){
  console.log("Estamos en consultarbd");
  connection.query('SELECT * FROM usuarios',function(err,rows){//tabla creada usuarios y accdemos a la bd y mostramos users
  if(err) throw err;

  console.log('Data received from Db: mydbsql:\n');
  console.log("Rows"+rows);
    var aux;
    for (var i = 0; i <= rows.length; i++) {
      console.log("Usuario : "+rows[i].name+" con coche " + rows[i].coche+ " se mueve por la zona " + rows[i].location);
      res.json({rows:rows});
      return next();
     //res.send({rows:rows});
    };
  });
});


//Creating
// app.get('/crearuser',function(req,res){
//
//   var newuser = { name: 'Paco', location: 'El Medano' , coche:'Porsche 911'};
//   connection.query('INSERT INTO usuarios SET ?', newuser, function(err,res){
//     if(err) throw err;
//     console.log('Last insert ID:', res.insertId);
//     res.json(rows);
//   });
// });
//find

app.get('/busqueda',function(req,res,next){

  var finduser = { name: 'Pablo', location: 'Santa Cruz' , coche:'Seat Leon'};
  connection.query('SELECT name FROM usuarios WHERE name = ? AND location = ? ', [ 'Pablo', 'Santa Cruz'], function(err,rows){//finduser
    if(err) throw err;
    console.log('Last insert ID:', res.insertId);
    console.log("Usuario buscado: "+finduser.name+" con coche " + finduser.coche+ " se mueve por la zona " + finduser.location);
    res.json(rows);
    return next();
  });
});

//actualizar

// app.get('/actualizar',function(req,res){
//   var newlocation = { location : 'Adeje'};
// connection.query(
//   'UPDATE usuarios SET location = ? Where ID = ?',
//   [newlocation, 1],
//   function (err, result) {
//     if (err) throw err;
//
//     console.log('Changed ' + result.changedRows + ' rows');
//   });
// });


// http.listen(8080,function(){
// 	console.log("Connected & Listen to port 8080");
// });

app.listen(app.get('port'), () => {
    console.log(`Node mysql is running at localhost: ${app.get('port')}` );
});