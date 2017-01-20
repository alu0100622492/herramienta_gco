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

app.get('/principal', (req, res) => {
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

//Donde podemos ver todos los usuarios

app.get('/consultarbd',function(req,res,next){
  console.log("Estamos en consultarbd");
  connection.query('SELECT * FROM usuarios',function(err,rows){//tabla creada usuarios y accdemos a la bd y mostramos users
  if(err) throw err;

  console.log('Data received from Db: mydbsql:\n');
  console.log("Rows"+rows);
    var aux;
    for (var i = 0; i < rows.length; i++) {
      console.log("Usuario : "+rows[i].name+" con coche " + rows[i].coche+ " se mueve por la zona " + rows[i].location);
    }
    for (var i = 0; i < rows.length; i++) {
      console.log("Usuario : "+rows[i].name+" con coche " + rows[i].coche+ " se mueve por la zona " + rows[i].location);
      res.json({rows:rows});
      return next();
     //res.send({rows:rows});
    };
  });
});




//Iniciar Sesion
app.get('/inicio',function(req,res){
  console.log("Localizacion en inicio nombre "+req.query.name);
  console.log("Localizacion en inicio correo "+req.query.correo);
  console.log("Localizacion en inicio pass "+req.query.pass);
  var nombre = req.query.name;

  if(!nombre){
       console.log("El user NO EXISTE IIIFFF else");
       res.render('registrarse',{title:'Registrese'});
  }else{
       console.log("EN EL ELSE")
       connection.query('SELECT * FROM usuarios WHERE name = ? ', [nombre], function(err,rows){//findestino
                if(err) throw err;

          console.log("Longitud de rows"+rows.length);
                if(rows.length > 0){
                    console.log("El usuario existe y es"+rows[0].name);
                    res.render('index',{title:'Bienvenido'});
                }else{
                    console.log("El user NO EXISTE");
                    res.render('registrarse',{title:'Registrese'});
                }
       });
  }

});


//Registro
app.get('/registro',function(req,res,next){
  console.log("valor del nombre en registrarse: "+ req.query.name);
  console.log("valor del modelo en registrarse: "+ req.query.modelo);
  console.log("valor de localizacion en registrarse: "+ req.query.localitation);
  if(!req.query.name){
    console.log("No hay valores");
  }else{
  var newuser = { name: req.query.name, location: req.query.localitation , coche:req.query.modelo};
    connection.query('INSERT INTO usuarios SET ?', newuser, function(err,rows){
    if(err) throw err;
    console.log('Last insert ID:', rows.insertId);

    });
  }
   res.render('index',{title:'Bienvenido'});

});


//ejemplo de find
app.get('/busqueda',function(req,res,next){

  var finduser = { name: 'Pablo', location: 'Santa Cruz' , coche:'Seat Leon'};
  connection.query('SELECT name FROM usuarios WHERE name = ? AND location = ? ', [ 'Pablo', 'Santa Cruz'], function(err,rows){//finduser
    if(err) throw err;
    console.log('Last insert ID:', rows.insertId);
    console.log("Usuario buscado: "+finduser.name+" con coche " + finduser.coche+ " se mueve por la zona " + finduser.location);
    res.json(rows);
    return next();
  });
});






//buscar destino en index
app.get('/buscar_destino',function(req,res){
  console.log("Localizacion en buscar destino "+req.query.localitation);
  var findlocalitation = {  location: req.query.localitation };

  connection.query('SELECT * FROM usuarios WHERE location = ? ', [req.query.localitation], function(err,rows){//findestino
    if(err) throw err;
    console.log("Longitud de rows"+rows.length)
    console.log("Usuario buscado: "+rows[0].name+" con coche " + rows[0].coche+ " se mueve por la zona " + rows[0].location);
    // res.json(rows);
    // return next();
  res.send({todo:rows, num_elem: rows.length});
  });
});


app.listen(app.get('port'), () => {
    console.log(`Node mysql is running at localhost ${app.get('port')} ` );
});
