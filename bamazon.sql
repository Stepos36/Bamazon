DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(100) NOT NULL,
 department_name VARCHAR(100) NOT NULL,
 price DECIMAL(11,2) NOT NULL,
 stock_quantity INT(16) NULL,
 PRIMARY KEY (id)
);
