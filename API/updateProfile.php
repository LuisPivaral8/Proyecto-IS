<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}

$data = json_decode(file_get_contents("php://input"));
if (isset($data->userId) && isset($data->username) && isset($data->password)) {
    $userId = $data->userId;
    $newUsername = $data->username;
    $newPassword = password_hash($data->password, PASSWORD_DEFAULT);

    $sql = "UPDATE Usuarios SET username = ?, password = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $newUsername, $newPassword, $userId);

    if ($stmt->execute()) {
        // Actualizar la sesión con el nuevo username
        $_SESSION['username'] = $newUsername;

        echo json_encode(array("success" => true, "message" => "Perfil actualizado exitosamente"));
    } else {
        echo json_encode(array("success" => false, "message" => "Error al actualizar el perfil"));
    }
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Faltan datos"));
}

$conn->close();
