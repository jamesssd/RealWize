-- Create the RealWize_DB database --
CREATE DATABASE RealWize_DB;
USE RealWize_DB;

-- Create a schools table with the required fields --
CREATE TABLE Schools
(
	rankings int NOT NULL, 
    distance int NOT NULL,
);

--Create a Housing table to store home info from Zillow--
CREATE TABLE Housing 
(
    price int NOT NULL,
    last_price int NOT NULL,
    lot_size int NOT NULL,
    neighborhood varchar (300) NOT NULL,
    date_listed DATETIME, --?--
    rooms_amenities varchar (500) NOT NULL, 

);