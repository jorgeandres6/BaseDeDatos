<?php
  require("conectar_bdd.php"); //Se conecta con la base de datos y ejecuta el query
  $psw1=password_hash('1234',PASSWORD_DEFAULT); //Encriptacion de las contraseñas
  $psw2=password_hash('abcd',PASSWORD_DEFAULT);
  $psw3=password_hash('asdf',PASSWORD_DEFAULT);
  $preambulo = "INSERT INTO usuarios (nombre, apellido, correo, fechaNac, password) VALUES"; //Query string
  $user1 = "('Juan','Perez','juan@beta.com','1990-21-04','".$psw1."');"; //Usuario1
  $user2 = "('Angelica','Suarez','angelica@beta.com','2000-03-02','".$psw2."');"; //Ususario 2
  $user3 = "('Ximena','Teran','ximena@beta.com','1988-15-12','".$psw3."')"; //Usuario 3
  $queryFin = $preambulo.$user1.$preambulo.$user2.$preambulo.$user3; //Unir el string del $queryFin
  query($queryFin); //Ejecutar el query
?>
