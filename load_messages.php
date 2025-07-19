// load_messages.php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "chat_db";

$conn = new mysqli($servername, $username, $password, $dbname);
$sql = "SELECT message FROM messages";
$result = $conn->query($sql);
$messages = [];

while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode($messages);
$conn->close();
?>
