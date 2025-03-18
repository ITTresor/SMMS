document.addEventListener("DOMContentLoaded", function () {

    // Membership Growth Chart (Line Chart)
    const membershipCtx = document.getElementById("membershipChart").getContext("2d");
    new Chart(membershipCtx, {
        type: "line",
        data: {
            labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
            datasets: [{
                label: "Membership Growth",
                data: [50, 65, 80, 90, 120, 150],
                borderColor: "#007BFF",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                fill: true,
                tension: 0.3
            }]
        }
    });

    // Booking Statistics (Bar Chart)
    const bookingCtx = document.getElementById("bookingChart").getContext("2d");
    new Chart(bookingCtx, {
        type: "bar",
        data: {
            labels: ["10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
            datasets: [{
                label: "Peak Booking Hours",
                data: [5, 12, 18, 25, 20, 10],
                backgroundColor: "#FF9800"
            }]
        }
    });

    // Financial Summary (Pie Chart)
    const revenueCtx = document.getElementById("revenueChart").getContext("2d");
    new Chart(revenueCtx, {
        type: "pie",
        data: {
            labels: ["Memberships", "Spa Services", "Products"],
            datasets: [{
                data: [5000, 3000, 1200],
                backgroundColor: ["#4CAF50", "#FF5733", "#FFC107"]
            }]
        }
    });

});


//
document.addEventListener("DOMContentLoaded", function () {
    const data = {
        totalMembers: 120,
        activeMemberships: 85,
        expiringSoon: 10,
        pendingPayments: 5,
        totalRevenue: "$5,000",
        upcomingAppointments: 12,
        activities: [
            "[12:30 PM] John Doe renewed his Gold membership.",
            "[11:15 AM] Sarah booked a massage session for March 10th.",
            "[10:00 AM] Payment of $50 received via MTN Mobile Money.",
            "[09:45 AM] New member registered: Alex Smith."
        ],
        alerts: [
            "🚨 10 memberships are expiring soon!",
            "⚠️ 5 unpaid invoices need attention.",
            "📦 Low stock alert: Massage oils running low."
        ]
    };

    document.getElementById("total-members").textContent = `Total Members: ${data.totalMembers}`;
    document.getElementById("active-memberships").textContent = `Active Memberships: ${data.activeMemberships}`;
    document.getElementById("expiring-memberships").textContent = `Expiring Soon: ${data.expiringSoon}`;
    document.getElementById("pending-payments").textContent = `Pending Payments: ${data.pendingPayments}`;
    document.getElementById("total-revenue").textContent = `Total Revenue: ${data.totalRevenue}`;
    document.getElementById("upcoming-appointments").textContent = `Upcoming Appointments: ${data.upcomingAppointments}`;

    const activityLog = document.getElementById("activity-log");
    data.activities.forEach(activity => {
        const li = document.createElement("li");
        li.textContent = activity;
        activityLog.appendChild(li);
    });

    const alertsList = document.getElementById("alerts");
    data.alerts.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert;
        alertsList.appendChild(li);
    });
});
