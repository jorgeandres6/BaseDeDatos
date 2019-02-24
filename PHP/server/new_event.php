<?php
  require("conectar_bdd.php"); //Se conecta con la base de datos y ejecuta el query
  session_start(); //Inicio de sesion
  $usuario=$_SESSION['usuario']; //Usuario de sesion
  $titulo=$_POST['titulo']; //Obtener los datos de POST
  $fInicio=$_POST['start_date'];
  $fFin=$_POST['end_date'];
  $hInicio=$_POST['start_hour'];
  $hFin=$_POST['end_hour'];
  $tDia=$_POST['allDay'];
  $id=$_POST['id'];

  if ($tDia){ //Verificar si es evento de dia completo
    $start=$fInicio;
    $end="";
  }else{
    $start=$fInicio." ".$hInicio;
    $end=$fFin." ".$hFin;
  };


  $q="INSERT INTO eventos (usuario, id, titulo, fInicio, fFin, hInicio, hFin, tDia)
  VALUES ('".$usuario."','".$id."','".$titulo."','".$fInicio."','".$fFin."','".$hInicio."','".$hFin."',".$tDia.")"; //String del query

  query($q); //Ejecutar el query

  $response['msg'] = 'OK'; //Respuesta al frontend
  echo json_encode($response);
 ?>
