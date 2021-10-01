<?php

header("content-type: application/json");

$r_user = $_POST['rp_user'];
$r_pass = $_POST['rp_pass'];
$r_nomb = $_POST['rp_nom'];
$r_ape = $_POST['rp_ape'];

$conexion=mysqli_connect("localhost" ,"root" ,"mimamamemima", "myweb");
if (!$conexion) {
    header("HTTP/1.0 500");
    echo json_encode(["status" => "error", "message" => "no se pudo conectar a MySQL"]);
    exit;
}

$r_pass_cod = password_hash($r_pass, PASSWORD_DEFAULT, [15]);
// $r_pass_cod = convert_uuencode($r_pass);

$consulta = "SELECT * FROM users WHERE email='$r_user_cod'";
$resultado= mysqli_query($conexion, $consulta);
$filas = mysqli_num_rows($resultado);


if ($filas > 0) {
    echo json_encode(["status" => "error03", "message" => "usuario ya existe"]);
    exit;
} else {
    $graba = "INSERT INTO users (email, passw, first_name, last_name) 
              VALUES ('$r_user', '$r_pass_cod', '$r_nomb', '$r_ape')";
        
    if (mysqli_query($conexion, $graba)) {
            echo json_encode(["status" => "ok", "message" => "usuario registrado"]);
            exit;
    } else {
            echo json_encode(["status" => "error03", "message" =>"usuario ya existe"]);
            exit;
        }
    }

mysqli_close($conexion);

?>