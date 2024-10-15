<?php
header('Content-Type: application/json');

// Database connection parameters
$servidor = "localhost";
$usuario = "root";
$senha = ""; // Add your password if you have one
$dbname = "grupo505";

// Create connection
$cx = new mysqli($servidor, $usuario, $senha, $dbname);

// Check connection
if ($cx->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $cx->connect_error]));
}

if ($_POST) {
    $action = $_REQUEST['action'];

    switch ($action) {
        case 'showDB':
            $result = $cx->query("SHOW DATABASES");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            echo json_encode($rows);
            break;

        case 'showTables':
            $bd = $_POST['bd'];
            $cx->select_db($bd); // Select the database
            $result = $cx->query("SHOW TABLES");
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            echo json_encode($rows);
            break;

        default:
            echo json_encode(['error' => 'Invalid action']);
            break;
    }
} else {
    echo json_encode(['error' => 'No action specified']);
}

// Close connection
$cx->close();
?>
