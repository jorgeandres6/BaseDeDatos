<?php
  require("conectar_bdd.php"); //Se conecta con la base de datos y ejecuta el query
  session_start(); //Inicio de sesion
  $usuario=$_SESSION['usuario']; //Usuario de sesion
  $q="SELECT titulo, fInicio, fFin, hInicio, hFin, tDia, id FROM eventos WHERE usuario='".$usuario."'"; //String del query
  $response=queryret($q); //Ejecucion del query

  $fila = $response->fetchAll(PDO::FETCH_ASSOC); //Crear el array

  $resp['eventos'] = $fila; //Almacenar el array en un array asociativo para el frontend

  $resp['msg'] = 'OK'; //Respuesta al frontend
  echo json_encode($resp);

 ?>
