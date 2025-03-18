<?php
$host = "localhost"; // Change if your DB is hosted elsewhere
$dbname = "SMMS"; // Replace with your database name
$username = "root"; // Default XAMPP MySQL username
$password = ""; // Default XAMPP MySQL password (empty)

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
