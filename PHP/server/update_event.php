<?php
  require("conectar_bdd.php"); //Se conecta con la base de datos y ejecuta el query
  $start = $_POST['start_date']; //Obtener los datos de POST
  $end = $_POST['end_date'];
  $hStart = $_POST['start_hour'];
  $hEnd = $_POST['end_hour'];
  $allDay = $_POST['all_day'];
  $id = $_POST['id'];

  if ($allDay=="true"){ //Verificar si es evento de dia entero
    $q="UPDATE eventos SET fInicio='".$start."'
    WHERE id='".$id."'"; //String del query
  }else{
    $q="UPDATE eventos SET fInicio='".$start."', fFin='".$end."', hInicio='".$hStart."', hFin='".$hEnd."'
    WHERE id='".$id."'"; //String del query
  };

  query($q); //Ejecucion del query
  
  $response['msg'] = 'OK';  //Respuesta al frontend
  echo json_encode($response);

 ?>
