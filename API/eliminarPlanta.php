<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
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

// Obtener el ID de la planta a eliminar desde la consulta
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Consulta para eliminar la planta
    $sql = "DELETE FROM plantas WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Planta eliminada con éxito"));
    } else {
        echo json_encode(array("success" => false, "message" => "Error al eliminar la planta"));
    }

    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "ID inválido"));
}

$conn->close();
?>
