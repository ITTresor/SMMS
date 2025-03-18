<?php
// Include database connection
require_once("database.php");

// Get JSON data from request
$data = json_decode(file_get_contents("php://input"), true);

// Validate received data
if (!isset($data['id']) || !isset($data['newStatus'])) {
    echo json_encode(["success" => false, "message" => "Invalid input data."]);
    exit;
}

$id = intval($data['id']); // Ensure ID is an integer
$newStatus = htmlspecialchars($data['newStatus']); // Sanitize status input

// Update booking status in the database
$sql = "UPDATE bookings SET Status = ? WHERE Id = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("si", $newStatus, $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Status updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update status."]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Database error."]);
}

// Close database connection
$conn->close();
?>
