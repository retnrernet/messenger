// save_message.php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "chat_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $message = $conn->real_escape_string($data->message);
    $sql = "INSERT INTO messages (message) VALUES ('$message')";
    $conn->query($sql);
}

$conn->close();
?>
