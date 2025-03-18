document.addEventListener("DOMContentLoaded", function () {
    // Sample Booking Data
    const bookings = [
        { customer: "John Doe", amount: "$100", status: "Pending" },
        { customer: "Jane Smith", amount: "$150", status: "Paid" },
        { customer: "Michael Johnson", amount: "$200", status: "Pending" },
        { customer: "Chris Lee", amount: "$250", status: "Paid" },
        { customer: "Emily Davis", amount: "$300", status: "Pending" },
        { customer: "David Harris", amount: "$120", status: "Paid" },
        { customer: "David Harry", amount: "$230", status: "Paid" }
    ];

    const reportTableBody = document.getElementById("reportTable").getElementsByTagName("tbody")[0];
    const filterStatusSelect = document.getElementById("filterStatus");
    const totalBookingsElement = document.getElementById("totalBookings");
    const paidBookingsElement = document.getElementById("paidBookings");
    const pendingBookingsElement = document.getElementById("pendingBookings");
    const totalRevenueElement = document.getElementById("totalRevenue");
    const downloadReportBtn = document.getElementById("downloadReportBtn");

    let bookingPieChart, revenueBarChart;

    function renderReport(filterStatus = "") {
        reportTableBody.innerHTML = "";
        let filteredBookings = bookings;

        if (filterStatus) {
            filteredBookings = bookings.filter(booking => booking.status.toLowerCase() === filterStatus.toLowerCase());
        }

        let totalRevenue = 0;
        let paidCount = 0, pendingCount = 0;
        let paidRevenue = 0, pendingRevenue = 0;

        filteredBookings.forEach(booking => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.customer}</td>
                <td>${booking.amount}</td>
                <td>${booking.status}</td>
            `;
            reportTableBody.appendChild(row);

            const amount = parseFloat(booking.amount.replace('$', '').replace(',', ''));
            totalRevenue += amount;

            if (booking.status === "Paid") {
                paidCount++;
                paidRevenue += amount;
            } else {
                pendingCount++;
                pendingRevenue += amount;
            }
        });

        // Update summary statistics
        totalBookingsElement.textContent = filteredBookings.length;
        paidBookingsElement.textContent = paidCount;
        pendingBookingsElement.textContent = pendingCount;
        totalRevenueElement.textContent = `$${totalRevenue.toFixed(2)}`;

        // Update charts
        updateCharts(paidCount, pendingCount, paidRevenue, pendingRevenue);
    }

    function updateCharts(paidCount, pendingCount, paidRevenue, pendingRevenue) {
        const pieCtx = document.getElementById("bookingPieChart").getContext("2d");
        const barCtx = document.getElementById("revenueBarChart").getContext("2d");

        if (bookingPieChart) bookingPieChart.destroy();
        if (revenueBarChart) revenueBarChart.destroy();

        bookingPieChart = new Chart(pieCtx, {
            type: "pie",
            data: {
                labels: ["Paid", "Pending"],
                datasets: [{
                    data: [paidCount, pendingCount],
                    backgroundColor: ["#27ae60", "#e74c3c"]
                }]
            },
            options: { responsive: true }
        });

        revenueBarChart = new Chart(barCtx, {
            type: "bar",
            data: {
                labels: ["Paid Revenue", "Pending Revenue"],
                datasets: [{
                    label: "Revenue ($)",
                    data: [paidRevenue, pendingRevenue],
                    backgroundColor: ["#3498db", "#f1c40f"]
                }]
            },
            options: { responsive: true }
        });
    }

    filterStatusSelect.addEventListener("change", function () {
        renderReport(filterStatusSelect.value);
    });

    downloadReportBtn.addEventListener("click", function () {
        const filteredBookings = filterStatusSelect.value
            ? bookings.filter(booking => booking.status.toLowerCase() === filterStatusSelect.value.toLowerCase())
            : bookings;

        const csvContent = "Customer,Amount,Status\n" + 
            filteredBookings.map(booking => `${booking.customer},${booking.amount},${booking.status}`).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", "booking_report.csv");
        link.click();
    });

    renderReport();
});
