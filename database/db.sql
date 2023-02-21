

/*** Esta plantilla se utiliza para crear la respectiva base de datos para que sus tipos de datos coincidan con las lineas
de codigo, ¡¡¡SE DEBE SEGUIR ESTRICTAMENTE PARA NO CAMBIAR EL NOMBRE DE LAS VARIABLES!!! ***/


CREATE DATABASE database_links;

USE database_links; /*Nombre Principal de nuestra database*/

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,  
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users           /*tabla de usuarios en la cual van a ser registrados cuando se loggeen*/
    ADD PRIMARY KEY (id);


ALTER TABLE users 
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
    

ALTER TABLE users
    ADD perfil VARCHAR (20) NOT NULL;

DESCRIBE users;

CREATE TABLE atletas_CAR (   /*Tabla de atletas en la cual van a ser registrados con sus respectivos datos*/

    id INT (11) NOT NULL,
    title VARCHAR (150) NOT NULL,
    documento VARCHAR (15) NOT NULL,
    nombre_completo VARCHAR (30) NOT NULL,
    direccion VARCHAR (20) NOT NULL,
    fecha_nacimiento VARCHAR (20) NOT NULL,
    lugar_residencia VARCHAR (20) NOT NULL,
    modalidad VARCHAR (20) NOT NULL, 
    nivel_estudio VARCHAR (20) NOT NULL,
    maximo_logro VARCHAR (20) NOT NULL,
    minoria_etnica VARCHAR (20) NOT NULL,
    exento_cobro  VARCHAR (20) NOT NULL, 
    genero VARCHAR (20) NOT NULL,
    lugar_procedencia VARCHAR (20) NOT NULL,
    actividad_economica VARCHAR (20) NOT NULL,
    correo VARCHAR (255) NOT NULL,
    nombre_entrenador VARCHAR (30) NOT NULL,
    valor INT (20) NOT NULL,
    description TEXT,
    user_id INT (11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)


);