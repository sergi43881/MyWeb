<?php

header("content-type: application/json");

$usuario=$_POST['e_user'];
$clave=$_POST['e_pass'];

$conexion=new mysqli("localhost" ,"root" ,"mimamamemima", "myweb");
if (!$conexion) {
    header("HTTP/1.0 500");
    echo json_encode(["status" => "error", "message" => "no se pudo conectar a MySQL"]);
    exit;
}

$consulta = "SELECT * FROM users WHERE email='$usuario'";// and password='$clave'";
$resultado=$conexion->query($consulta);
var_dump($resultado->fetch_row());

$resultado->close();
//$filas = mysqli_num_rows($resultado);
var_dump($resultado);

if ($resultado->num_rows > 0) {
    echo json_encode(["status" => "ok", "nomcli" => $resultado]);
}else {
    echo json_encode(["status" => "error", "message" => "usuario NO encontrado"]);
}

mysqli_close($conexion);
exit;

?>