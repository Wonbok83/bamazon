DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	itemid integer(10) NOT NULL AUTO_INCREMENT,
	productname varchar(30),
    departmentname varchar(30),
	price integer(100) ,
    stockquantity integer(100),
	PRIMARY KEY (itemid)
); 

INSERT INTO products (productname, departmentname,price,stockquantity)
VALUES ("2.5 engine", "engine_department",400,20);
INSERT INTO products ( productname, departmentname,price,stockquantity)
VALUES ("brake", "brake_department",100,21);
INSERT INTO products ( productname, departmentname,price,stockquantity)
VALUES ("wheel", "wheel_department",100,80);
INSERT INTO products ( productname, departmentname,price,stockquantity)
VALUES ("air_back", "safety_department",30,100);
INSERT INTO products ( productname, departmentname,price,stockquantity)
VALUES ("A/C", "A/C_department",10,10);
INSERT INTO products ( productname, departmentname,price,stockquantity)
VALUES ("dashboard", "electric_department",40,20);
INSERT INTO products ( productname, departmentname,price,stockquantity)
VALUES ("car", "sales_department",30,10);
INSERT INTO products ( productname, departmentname,price,stockquantity)
VALUES ("seat", "interior_department",100,30);
INSERT INTO products ( productname, departmentname,price,stockquantity)
VALUES ("light", "electric_department",30,20);
INSERT INTO products ( productname, departmentname,price,stockquantity)
VALUES ("transmission", "engine_department",90,18);


SELECT * FROM bamazon_DB.products;