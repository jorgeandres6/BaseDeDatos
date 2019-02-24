<?php
  require("conectar_bdd.php");//Se conecta con la base de datos y ejecuta el query
  session_start(); //Inicio de sesion
  $usuario=$_SESSION['usuario'];  //Usuario de sesion
  $start = $_POST['start_date']; //Obtener los datos de POST
  $end = $_POST['end_date'];
  $hStart = $_POST['start_hour'];
  $hEnd = $_POST['end_hour'];
  $allDay = $_POST['all_day'];
  $titulo = $_POST['title'];

  if ($allDay=="true"){ //Verificar si es evento de dia entero
    $q="SELECT id FROM eventos WHERE usuario='".$usuario."' AND titulo='".$titulo."' AND fInicio='".$start."' AND tDia='1'"; //String del query
  }else{
    $q="SELECT id FROM eventos
    WHERE usuario='".$usuario."' AND titulo='".$titulo."' AND fInicio='".$start."' AND tDia='0' AND FfIN='".$end."' AND hInicio='".$hStart."' AND hFin='".$hEnd."'"; //String del query
  };

  $id=queryret($q); //Ejecucion del query

  $id2=$id->fetch(); //Crear el array

  echo json_encode($id2); //Respuesta al frontend

 ?>
