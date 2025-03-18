document.addEventListener("DOMContentLoaded", function () {
    // Sample JSON Data
    const data = {
        members: [
            { name: "John Doe", email: "john@example.com", phone: "123-456-7890", tier: "Gold", status: "Active", points: 120 },
            { name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", tier: "Silver", status: "Expired", points: 50 },
            { name: "Alex Brown", email: "alex@example.com", phone: "555-123-4567", tier: "Bronze", status: "Pending", points: 30 }
        ],
        upgrades: [
            { member: "John Doe", currentTier: "Gold", requestedTier: "Platinum", status: "Pending" },
            { member: "Alex Brown", currentTier: "Bronze", requestedTier: "Silver", status: "Approved" },
            { member: "Jane Smith", currentTier: "Silver", requestedTier: "Gold", status: "Approved" }
        ],
        discounts: [
            { tier: "Bronze", discount: "5% off upgrades", redeemed: 4 },
            { tier: "Silver", discount: "10% off renewals", redeemed: 5 },
            { tier: "Gold", discount: "15% off upgrades", redeemed: 3 }
        ],
        stats: {
            totalMembers: 3,
            activeMembers: 1,
            expiredMembers: 1,
            pendingRenewals: 1,
            newSignups: 5,
            revenue: 60
        }
    };

    // Populate Dashboard Stats
    document.getElementById("totalMembers").textContent = data.stats.totalMembers;
    document.getElementById("activeMembers").textContent = data.stats.activeMembers;
    document.getElementById("expiredMembers").textContent = data.stats.expiredMembers;
    document.getElementById("pendingRenewals").textContent = data.stats.pendingRenewals;
    document.getElementById("newSignups").textContent = data.stats.newSignups;
    document.getElementById("revenue").textContent = `$${data.stats.revenue}`;

    // Populate Member Table
    const memberTableBody = document.getElementById("memberTableBody");
    data.members.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td>${member.tier}</td>
            <td>${member.status}</td>
            <td>${member.points}</td>
        `;
        memberTableBody.appendChild(row);
    });

    // Populate Membership Upgrades & Renewals
    const upgradeTableBody = document.getElementById("upgradeTableBody");
    data.upgrades.forEach(upgrade => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${upgrade.member}</td>
            <td>${upgrade.currentTier}</td>
            <td>${upgrade.requestedTier}</td>
            <td>${upgrade.status}</td>
        `;
        upgradeTableBody.appendChild(row);
    });

    // Populate Discounts & Loyalty Rewards
    const discountTableBody = document.getElementById("discountTableBody");
    data.discounts.forEach(discount => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${discount.tier}</td>
            <td>${discount.discount}</td>
            <td>${discount.redeemed}</td>
        `;
        discountTableBody.appendChild(row);
    });

    // Populate Reports & Analytics
    document.getElementById("growthTrends").textContent = "10% increase in the last month";
    document.getElementById("revenueBreakdown").textContent = "$2000 this year";
    document.getElementById("churnRate").textContent = "5% members canceled";
    document.getElementById("popularTiers").textContent = "Gold and Silver";

    // Charts: Dashboard Stats
    const membershipChart = new Chart(document.getElementById("membershipChart"), {
        type: 'pie',
        data: {
            labels: ['Active', 'Expired', 'Pending'],
            datasets: [{
                data: [data.stats.activeMembers, data.stats.expiredMembers, data.stats.pendingRenewals],
                backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });

    // Chart for Membership Upgrades
    const upgradeChart = new Chart(document.getElementById("upgradeChart"), {
        type: 'bar',
        data: {
            labels: data.upgrades.map(upgrade => upgrade.member),
            datasets: [{
                label: 'Requested Upgrades',
                data: data.upgrades.map(upgrade => upgrade.status === "Approved" ? 1 : 0),
                backgroundColor: '#007bff',
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            }
        }
    });

    // Chart for Discounts & Loyalty Rewards
    const discountChart = new Chart(document.getElementById("discountChart"), {
        type: 'doughnut',
        data: {
            labels: data.discounts.map(discount => discount.tier),
            datasets: [{
                data: data.discounts.map(discount => discount.redeemed),
                backgroundColor: ['#28a745', '#ffc107'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });

    // Chart for Growth Trends (Reports & Analytics)
    const growthChart = new Chart(document.getElementById("growthChart"), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Growth Trends',
                data: [10, 20, 30, 25, 40],
                fill: false,
                borderColor: '#007bff',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                }
            }
        }
    });
});

// Populate Notifications
const notificationList = document.getElementById("notificationList");
const notifications = [
    "Reminder: 2 members have expiring memberships",
    "New signup: 3 members joined today",
    "Payment failed for Jane Smith",
    "Special promo: 20% discount for Silver members"
];

notifications.forEach(note => {
    const listItem = document.createElement("li");
    listItem.textContent = note;
    notificationList.appendChild(listItem);
});
