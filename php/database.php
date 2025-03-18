<?php
$host = "localhost"; // Change if your database is hosted elsewhere
$username = "root";  // Change if you have set a different username
$password = "";      // Change if you have set a password
$database = "SMMS"; // Replace with your actual database name

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
