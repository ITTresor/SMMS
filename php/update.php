<?php
header('Content-Type: application/json');
require 'database.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['Id']) || !isset($input['field']) || !isset($input['value'])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$field = ($input['field'] === 'Status') ? 'Status' : 'Payment';
$sql = "UPDATE bookings SET $field = ? WHERE Id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $input['value'], $input['Id']);
$success = $stmt->execute();

$stmt->close();
$conn->close();

echo json_encode(["success" => $success]);
?>
