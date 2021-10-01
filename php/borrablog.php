<?php

header("content-type: application/json");

$r_user = $_POST['b_user'];
$r_texto = $_POST['b_texte'];

$conexion=mysqli_connect("localhost" ,"root" ,"mimamamemima", "myweb");
if (!$conexion) {
    header("HTTP/1.0 500");
    echo json_encode(["status" => "error", "message" => "no se pudo conectar a MySQL"]);
    exit;
}

$consulta = "SELECT * FROM users WHERE email='$r_user'";                 // recupera codigo email
$resultado= mysqli_query($conexion, $consulta);
$fila1 = mysqli_fetch_assoc($resultado);
$r_user = $fila1['id'];

$borra = "UPDATE posts SET log_erase = '1' WHERE user_cod = '$r_user' AND creation_date = '$r_texto'";
if (mysqli_query($conexion, $borra)) {
    echo json_encode(["status" => "ok", "message" => "comentario borrado"]);
}

mysqli_close($conexion);

?>