<?php
  require("conectar_bdd.php"); //Se conecta con la base de datos y ejecuta el query
  session_start(); //Iniciar sesion
  $usuario=$_SESSION['usuario']; //Usuario de la sesion
  $start = $_POST['start_date']; // Obtener datos de POST
  $end = $_POST['end_date'];
  $hStart = $_POST['start_hour'];
  $hEnd = $_POST['end_hour'];
  $allDay = $_POST['all_day'];
  $titulo = $_POST['title'];

  if ($allDay=="true"){ //Verificar si es un evento de dia completo
    $q="DELETE FROM eventos WHERE usuario='".$usuario."' AND titulo='".$titulo."' AND fInicio='".$start."' AND tDia='1'"; //String del query
  }else{
    $q="DELETE FROM eventos
    WHERE usuario='".$usuario."' AND titulo='".$titulo."' AND fInicio='".$start."' AND tDia='0' AND FfIN='".$end."' AND hInicio='".$hStart."' AND hFin='".$hEnd."'"; //String del query
  };

  query($q); //Ejecucion del query

  $resp['msg'] = 'OK'; //Respuesta al frontend
  echo json_encode($resp);

 ?>
