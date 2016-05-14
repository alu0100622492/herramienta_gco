use mydbsql;

CREATE TABLE usuarios (
   id int(11) NOT NULL AUTO_INCREMENT,
   name varchar(50),
   location varchar(50),
	 coche varchar(50),
   PRIMARY KEY (id)
 ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

 INSERT INTO usuarios (id, name, location, coche) VALUES
 (1, 'Kevin', 'La Laguna','Audi A4'),
 (2, 'Pablo', 'Santa Cruz','Seat Leon'),
 (3, 'Pedro', 'La Laguna','Skoda Fabia');
