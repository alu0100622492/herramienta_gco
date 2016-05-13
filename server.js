var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var connection = mysql.createConnection({ // Mysql Connection
    host : 'localhost',
    user : 'root',
    password : 'isauya2016',
    database : 'pruebanode',
});
console.log('Hola Mundo');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
app.get('/',function(req,res){
	var data = {
		"Data":""
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
