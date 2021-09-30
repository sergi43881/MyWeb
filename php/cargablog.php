<?php

header("content-type: application/json");

$r_user = $_POST['b_user'];

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

$consulta = "SELECT * FROM posts WHERE user_cod = '$r_user' ORDER BY user_cod, id DESC";
 
$resultado= mysqli_query($conexion, $consulta);
for($x = 0 ; $x < mysqli_num_rows($resultado) ; $x++){
    $fila1 = mysqli_fetch_assoc($resultado);    
    $r_comen[] = $fila1['post_content'];
    $r_ahora[] = $fila1['creation_date'];
}
echo json_encode(["status" => "ok", "comentarios" => $r_comen, "tiempo" => $r_ahora]);

mysqli_close($conexion);

?>