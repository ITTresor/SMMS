document.addEventListener("DOMContentLoaded", function () {
    fetchBookings();
});

function fetchBookings() {
    fetch("../../../php/fetch-bookings.php") // Ensure correct path
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data); // Debugging output

            const tableBody = document.getElementById("booking-table");
            tableBody.innerHTML = ""; // Clear existing data

            if (data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='5'>No bookings found.</td></tr>";
                return;
            }

            data.forEach(booking => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><span class="clickable" onclick="showDetails('${booking.Email}', '${booking.Phone}', '${booking.Date_of_birth}')">${booking.Names}</span></td>
                    <td>${booking.Service_type}</td>
                    <td>${booking.Service}</td>
                    <td>${booking.DateTime}</td>
                    <td><span class="status" onclick="changeStatus(${booking.Id}, '${booking.Status}')">${booking.Status}</span></td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching bookings:", error));
}

// Show user details when clicking on the name
function showDetails(email, phone, dob) {
    document.getElementById("user-email").textContent = email;
    document.getElementById("user-phone").textContent = phone;
    document.getElementById("user-dob").textContent = dob;
    document.getElementById("user-details").style.display = "block";
}

// Change status when clicking on it
function changeStatus(bookingId, currentStatus) {
    let newStatus = prompt("Enter new status (Pending, Confirmed, Cancelled, Completed):", currentStatus);
    if (newStatus && newStatus !== currentStatus) {
        fetch("update-status.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: bookingId, status: newStatus }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Status updated successfully!");
                fetchBookings(); // Refresh data
            } else {
                alert("Failed to update status.");
            }
        })
        .catch(error => console.error("Error updating status:", error));
    }
}
