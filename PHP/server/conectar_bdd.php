<?php
$servername = "localhost"; //Servidor
$username = "admin"; //Usuario
$password = "1234"; //contraseña
$dbname = "calendario"; //Base de datos

function query($q){ //Funcion para ejecutar un query a la base de datos sin recibir respuesta
  try {
      global $servername, $username, $dbname, $password;
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $conn->exec($q);
      }
  catch(PDOException $e)
      {
      echo $sql . "<br>" . $e->getMessage(); //Error
      }

  $conn = null; // Cerrar conexion
}

function queryret($q){ //Funcion para ejecutar un query a la base de datos con respuesta
  try {
      global $servername, $username, $dbname, $password;
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $resultado=$conn->prepare($q);
      $resultado->execute();
      return $resultado;
      }
  catch(PDOException $e)
      {
      echo $sql . "<br>" . $e->getMessage(); //Error
      }

  $conn = null; //Cerrar conexion
}

?>
