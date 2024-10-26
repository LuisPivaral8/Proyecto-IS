<?php
header("Access-Control-Allow-Origin: *"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Cabeceras permitidas
header("Content-Type: application/json; charset=UTF-8");

// Conexión a la base de datos (ajusta los valores según tu configuración)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "is";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']));
}

// Obtener los datos enviados
$data = json_decode(file_get_contents("php://input"), true);
$nombre_comun = $data['nombre_comun'];
$nombre_cientifico = $data['nombre_cientifico'];
$descripcion = $data['descripcion'];
$fecha_creacion = $data['fecha_creacion'];

//VALIDAR QUE NO HAYAN CAMPOS VACIOS
if($nombre_comun.length() > 1){
    $sql = "INSERT INTO plantas (nombre_comun, nombre_cientifico, descripcion, fecha_creacion)
        VALUES ('$nombre_comun', '$nombre_cientifico', '$descripcion', '$fecha_creacion')";

    // Ejecutar la consulta
    if ($conn->query($sql) === TRUE) {
        
        echo json_encode(['success' => true, 'message' => 'Planta agregada exitosamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al agregar la planta']);
        
    }


} else {
    echo json_encode(['success' => false, 'message' => 'Error al agregar la planta']);  
}
// Preparar la consulta SQL


// Cerrar conexión
$conn->close();
?>
