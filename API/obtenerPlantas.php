<?php
header("Access-Control-Allow-Origin: *"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Cabeceras permitidas
header("Content-Type: application/json; charset=UTF-8");

$connection = new mysqli('localhost', 'username', '', 'is');

if ($connection->connect_error) {
    die(json_encode(['error' => 'Error de conexión']));
}

$sql = "SELECT id, nombre_comun, nombre_cientifico FROM plantas";
$result = $connection->query($sql);

$plantas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $plantas[] = $row;
    }
}

echo json_encode(['data' => $plantas]);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Ejemplo de lógica para obtener plantas
    // Aquí iría tu código para conectarte a la base de datos y obtener las plantas
    echo json_encode(['data' => $plantas]);
} else {
    echo json_encode(['error' => 'Método no permitido']);
}

$connection->close();
?>
