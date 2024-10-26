<?php
header("Access-Control-Allow-Origin: *"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Cabeceras permitidas
header("Content-Type: application/json; charset=UTF-8");

// Conectar a la base de datos
$servername = "localhost";
$username = "root"; // Cambia esto si es necesario
$password = ""; // Cambia esto si es necesario
$dbname = "is"; // Cambia esto si es necesario

$conn = new mysqli($servername, $username, $password, $dbname);
$data = json_decode(file_get_contents("php://input"));

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}

// Preparar la consulta para obtener las plantas
$sql = "SELECT id, nombre_comun, nombre_cientifico FROM plantas";
$result = $conn->query($sql);

$plantas = array();

if ($result->num_rows > 0) {
    // Obtener los datos de las plantas
    while ($row = $result->fetch_assoc()) {
        $plantas[] = $row;
    }
    // Devolver los datos en formato JSON
    echo json_encode(array("success" => true, "data" => $plantas));
} else {
    // No se encontraron plantas
    echo json_encode(array("success" => true, "data" => [])); // También devolver una lista vacía
}

$conn->close();
?>
