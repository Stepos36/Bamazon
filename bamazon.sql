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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Jack Link’s Beef Jerky, Sweet & Hot, 16 Ounce', 'Groceries', 12.98, 150),('Jack Link’s Beef Jerky, Original Flavor, 16 Ounce', 'Groceries', 16.99, 1000),('Web Design with HTML, CSS, JavaScript and jQuery Set', 'Books', 31.49, 8000),("Lacoste Men's Essentials Cotton Crew Neck T-Shirt, Black, Large (Pack of 3)", "Men's Clothes", 39.34, 1500),("Lacoste Men's 3 Pack Cotton Stretch Boxer Brief, Black, M", "Men's Clothes", 42.50, 850),("AXE Body Wash for Men, Apollo, 16 oz", "Bath and shower gels", 3.97, 10000),("Men's Health", "Magazines", 6.00, 50000),('HP Touch 15t Sleek High Performance Laptop in Gold 7th Gen Intel i7 up to 3.5GHz 15.6"HD 1TB 8GB WiFi HDMI (Certified Refurbished)', "Electronics", 509.99, 310),("Podravka Vegeta Soup and Seasoning Mix Can, 250g", "Groceries", 6.15, 4300),("Samsung Gear IconX (2018 Edition) Bluetooth Cord-free Fitness Earbuds, w/ On-board 4Gb MP3 Player (US Version with Warranty) - Black", "Phones and accessories", 169.97, 650)