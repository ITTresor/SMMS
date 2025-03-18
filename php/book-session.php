<?php
require 'config.php'; // Include database connection

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Retrieve form data
    $serviceType = $_GET['serviceType'];
    $service = $_GET['service'];
    $duration = $_GET['duration'];
    $date = $_GET['date'];
    $time = $_GET['time'];
    $name = $_GET['name'];
    $email = $_GET['email'];
    $phone = $_GET['tel'];
    $dob = $_GET['date-of-birth'];

    try {
        $conn->beginTransaction();

        // Insert into bookings table
        $stmt = $conn->prepare("INSERT INTO bookings (Service_type, Service, Duration, Date, Time, Names, Email, Phone, Date_of_birth, Status, Payment, Created_at) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', 'Pending', NOW())");
        $stmt->execute([$serviceType, $service, $duration, $date, $time, $name, $email, $phone, $dob]);

        // Get the last inserted ID
        $bookingId = $conn->lastInsertId();
        $userId = "BKU-" . $bookingId;

        // Insert notification
        $notificationStmt = $conn->prepare("INSERT INTO notification (User_id, Service, Content, Type, Status, Created_at) 
                                            VALUES (?, ?, ?, 'Booking', 'Unread', NOW())");
        $notificationContent = "User $name has booked a session for $service on $date at $time.";
        $notificationStmt->execute([$userId, $service, $notificationContent]);

        $conn->commit();
        echo "Booking successful!";
    } catch (Exception $e) {
        $conn->rollBack();
        echo "Booking failed: " . $e->getMessage();
    }
}
?>
