var express = require('express'); // Express App include
var app = express();
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var connection = mysql.createConnection({ // Mysql Connection
    //host : 'localhost',
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'mydbsql',
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + 'public'));

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


app.get('/', (req, res) => {
  res.render('index',
  {title : 'Busqueda myapp' })
});




console.log('Hola Mundo');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
app.get('/prueba',function(req,res){
	var data = {
		"Data":"",

	};
	data["Data"] = "Ejemplo consulta BD mySQL...";
	res.json(data);
});

app.get('/usuarios',function(req,res){
    var data = {
        "error":1,
        "Usuarios":""
    };
connection.query("SELECT * from usuarios",function(err, rows, fields){
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

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});
