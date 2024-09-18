CREATE DATABASE IF NOT EXISTS mydb;

USE mydb;

CREATE TABLE register (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  celular VARCHAR(20),
  documento VARCHAR(20)
);
SET GLOBAL host_cache_size=0;
