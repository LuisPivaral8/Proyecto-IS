<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Conectar a la base de datos
$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // Cambia esto por tu usuario de RDS
$password = "root_0010"; // Cambia esto por tu contraseña de RDS
$dbname = "dbis"; // Cambia esto por el nombre de tu base de datos en RDS
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}

// Obtener datos desde el request
$data = json_decode(file_get_contents("php://input"));
if (isset($data->userId) && isset($data->username) && isset($data->password)) {
    $userId = $data->userId;
    $newUsername = $data->username;
    $newPassword = password_hash($data->password, PASSWORD_DEFAULT); // Asegurarse de que la contraseña esté hasheada

    // Actualizar el usuario en la base de datos
    $sql = "UPDATE usuarios SET username = ?, password = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $newUsername, $newPassword, $userId);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Perfil actualizado exitosamente"));
    } else {
        echo json_encode(array("success" => false, "message" => "Error al actualizar el perfil"));
    }
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Faltan datos"));
}

$conn->close();
?>
