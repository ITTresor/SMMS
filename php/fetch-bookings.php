<?php
require 'config.php'; // Ensure database connection

header("Content-Type: application/json");

try {
    $stmt = $conn->prepare("SELECT Id, Names, Service_type, Service, CONCAT(Date, ' ', Time) AS DateTime, Status, Email, Phone, Date_of_birth, Payment, Created_at, Date, Time FROM bookings WHERE Payment = 'Paid'");
    $stmt->execute();
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($bookings);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
