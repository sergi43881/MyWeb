<?php

header("content-type: application/json");

$r_user = $_POST['b_user'];
$r_comen = $_POST['b_comen'];
$r_ahora = $_POST['b_data'];

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

$graba = "INSERT INTO posts (user_cod, post_content, creation_date)  
              VALUES ('$r_user', '$r_comen', '$r_ahora')";              // graba post
        
if (mysqli_query($conexion, $graba)) {
    echo json_encode(["status" => "ok", "message" => "comentario registrado"]);
    exit;
} else {
    echo mysqli_error($conexion);
    echo json_encode(["status" => "error05", "message" => mysqli_error($conexion)]);
    exit;
}

mysqli_close($conexion);

?>