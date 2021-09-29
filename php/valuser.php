<?php

header("content-type: application/json");

$v_user = $_POST['e_user'];
$v_pass = $_POST['e_pass'];

$conexion=mysqli_connect("localhost" ,"root" ,"mimamamemima", "myweb");
if (!$conexion) {
    header("HTTP/1.0 500");
    echo json_encode(["status" => "error", "message" => "no se pudo conectar a MySQL"]);
    exit;
}

$consulta = "SELECT * FROM users WHERE email='$v_user'";
$resultado=mysqli_query($conexion, $consulta);
$filas = mysqli_num_rows($resultado);
$fila1 = mysqli_fetch_assoc($resultado);
$nomb = $fila1['first_name'];
$pass = $fila1['passw'];

mysqli_close($conexion);

if ($filas > 0) {
    if(password_verify($v_pass, $pass)) {    
        echo json_encode(["status" => "ok", "nomcli" => $nomb]);
        exit;
    } else {
        echo json_encode(["status" => "error02", "message" => "Password incorrecta"]);
      exit;
    }
} else {
    echo json_encode(["status" => "error01", "message" => "usuario NO encontrado"]);
    exit;
}

?>