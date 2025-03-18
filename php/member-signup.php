<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'config.php'; // Ensure config.php exists and connects to the database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //echo "<pre>";
    //print_r($_POST);  // Debugging: See what data is being received
    //echo "</pre>";

    // Capture form data
    $names = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $dob = $_POST['date-of-birth'] ?? '';
    $membership = $_POST['membership'] ?? 'Bronze';
    $duration = $_POST['duration'] ?? '6 months';
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Secure password

    if (empty($names) || empty($email) || empty($phone) || empty($dob) || empty($_POST['password'])) {
        die("❌ Error: Missing required fields");
    }

    try {
        // Insert into membership table
        $stmt = $conn->prepare("INSERT INTO membership (Names, Email, Phone, Date_of_birth, Type, Duration, Password, Payment, Status) 
                                VALUES (:names, :email, :phone, :dob, :type, :duration, :password, 'Pending', 'Active')");
        $stmt->execute([
            ':names' => $names,
            ':email' => $email,
            ':phone' => $phone,
            ':dob' => $dob,
            ':type' => ucfirst($membership),
            ':duration' => ucfirst($duration),
            ':password' => $password
        ]);

        // Get last inserted ID
        $userId = $conn->lastInsertId();
        $formattedUserId = "MBR-" . $userId;

        // Insert into notification table
        $notifyStmt = $conn->prepare("INSERT INTO notification (User_id, Service, Content, Type, Status) 
                                      VALUES (:user_id, 'Membership', 'User has signed up for a membership.', 'Booking', 'Unread')");
        $notifyStmt->execute([':user_id' => $formattedUserId]);

        echo "<h3 style='color:green;'>✔ Registration successful!</h3>";
    } catch (PDOException $e) {
        echo "<h3 style='color:red;'>❌ Error: " . $e->getMessage() . "</h3>";
    }
} else {
    echo "<h3 style='color:red;'>❌ No POST data received!</h3>";
}
?>
