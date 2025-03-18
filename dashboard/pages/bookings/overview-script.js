document.addEventListener("DOMContentLoaded", function () {
    function createChart(ctx, chartType, labels, data, colors, title) {
        return new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace("0.6", "1")),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: "top" },
                    tooltip: { enabled: true }
                }
            }
        });
    }

    // Booking Report (Pie Chart)
    const bookingData = [50, 40, 30, 20];
    let bookingChart = createChart(
        document.getElementById("bookingReportChart").getContext("2d"),
        "pie",
        ["Sauna", "Massage", "Facial", "Body Scrub"],
        bookingData,
        ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
        "Bookings Distribution"
    );

    // Function to update info-container with booking details
    function updateBookingInfo() {
        const totalBookings = bookingData.reduce((total, current) => total + current, 0);
        const bookingOverview = `
            <h3>Overview</h3>
            <p><strong>Total Bookings:</strong> ${totalBookings}</p>
            <ul>
                <li><strong>Sauna:</strong> ${bookingData[0]} bookings (${((bookingData[0] / totalBookings) * 100).toFixed(2)}%)</li>
                <li><strong>Massage:</strong> ${bookingData[1]} bookings (${((bookingData[1] / totalBookings) * 100).toFixed(2)}%)</li>
                <li><strong>Facial:</strong> ${bookingData[2]} bookings (${((bookingData[2] / totalBookings) * 100).toFixed(2)}%)</li>
                <li><strong>Body Scrub:</strong> ${bookingData[3]} bookings (${((bookingData[3] / totalBookings) * 100).toFixed(2)}%)</li>
            </ul>
        `;
        document.getElementById("bookinginfo").innerHTML = bookingOverview;
    }

    // Update the booking info when the page loads
    updateBookingInfo();
});
