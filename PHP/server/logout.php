<?php
  session_start(); //Inicio de sesion
  session_unset(); //Eliminar datos de sesion
  session_destroy(); //Destruir sesiom

  header('Location: ../client/index.html'); //Redirigir a la pagina de login

 ?>
