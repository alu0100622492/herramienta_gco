# Proyecto Final De GCO
## Boceto de la herramienta



### Autor
* Noé Campos
[Página web](http://dsi1516.github.io/Practica1/)

## Usar sql en cloud 9
``````````````
To verify your hostname, you can connect to the mysql cli and show the host by running the following commands:

mysql-ctl cli
Once connected to the mysql shell, run the following:

select @@hostname;
Importing data into your database
To import existing data into your database run following commands:

mysql-ctl cli
You are now in the MySQL environment and can start the import:

mysql> use c9
mysql> source PATH_TO_SQL_FILE.sql
To verify that everything got imported run:

mysql> show tables;
```
