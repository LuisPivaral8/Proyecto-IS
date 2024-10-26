<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Conectar a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "is";
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
