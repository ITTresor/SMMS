<?php
header('Content-Type: application/json');
require 'database.php';

$sql = "SELECT Id, Names, Email, Phone, Status, Payment FROM bookings";
$result = $conn->query($sql);

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}

$conn->close();
echo json_encode($bookings);
?>
