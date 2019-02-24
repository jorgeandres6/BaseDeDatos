<?php
require("conectar_bdd.php"); //Se conecta con la base de datos y ejecuta el query

$usuario = $_POST["username"]; //Obtener los datos de POST
$psw = $_POST["password"];

$q = "SELECT password FROM usuarios WHERE correo='".$usuario."'"; //String del query

 $pass=queryret($q); //Ejecutar el query

 $pass2=$pass->fetch(); //Crear el array

 $passfin=json_encode($pass2); //Convertir a formato JSON

 if (password_verify($psw,$pass2['password'])){ //Revisar si la contraseña coincide con la encriptada
   $response['msg'] = 'OK';
   session_start(); //Iniciar sesion
   $_SESSION['usuario']=$usuario; //Guardar el nombre de usuario en la sesion
 };

echo json_encode($response); //Responder al frontend

 ?>
