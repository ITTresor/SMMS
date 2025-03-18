// Sample data for members, tiers, and payments
const members = [
    { name: "John Doe", tier: "Gold", expiryDate: "2025-03-01", status: "Active", paymentAmount: 150 },
    { name: "Jane Smith", tier: "Silver", expiryDate: "2025-02-15", status: "Expired", paymentAmount: 100 },
    { name: "Alice Johnson", tier: "Platinum", expiryDate: "2025-04-20", status: "Active", paymentAmount: 200 },
    { name: "Bob Brown", tier: "Gold", expiryDate: "2025-01-10", status: "Expired", paymentAmount: 150 },
    { name: "Charlie White", tier: "Silver", expiryDate: "2025-03-25", status: "Active", paymentAmount: 120 },
    { name: "David Green", tier: "Platinum", expiryDate: "2025-02-01", status: "Expired", paymentAmount: 250 }
];

// Calculate report stats
function generateReport() {
    let totalMembers = members.length;
    let activeMembers = members.filter(member => member.status === "Active").length;
    let expiredMembers = members.filter(member => member.status === "Expired").length;
    let totalRevenue = members.reduce((sum, member) => sum + member.paymentAmount, 0);

    // Set report stats on the page
    document.getElementById('totalMembers').textContent = totalMembers;
    document.getElementById('activeMembers').textContent = activeMembers;
    document.getElementById('expiredMembers').textContent = expiredMembers;
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;

    generateTierDistribution();
    generateExpiryStatus();
    generateTierChart();
}

// Generate Tier Distribution Table and Chart
function generateTierDistribution() {
    const tierCounts = {
        Gold: 0,
        Silver: 0,
        Platinum: 0
    };
    const tierRevenue = {
        Gold: 0,
        Silver: 0,
        Platinum: 0
    };

    members.forEach(member => {
        tierCounts[member.tier]++;
        tierRevenue[member.tier] += member.paymentAmount;
    });

    const tierTable = document.getElementById('tierDistributionTable').getElementsByTagName('tbody')[0];
    tierTable.innerHTML = '';
    for (const tier in tierCounts) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tier}</td>
            <td>${tierCounts[tier]}</td>
            <td>$${tierRevenue[tier].toFixed(2)}</td>
        `;
        tierTable.appendChild(row);
    }
}

// Generate Membership Expiry Status Table
function generateExpiryStatus() {
    const expiryTable = document.getElementById('expiryStatusTable').getElementsByTagName('tbody')[0];
    expiryTable.innerHTML = '';

    members.forEach(member => {
        const row = document.createElement('tr');
        const expiryStatus = member.status === "Active" ? "Active" : "Expired";
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.expiryDate}</td>
            <td>${expiryStatus}</td>
        `;
        expiryTable.appendChild(row);
    });
}

// Generate Tier Chart (Chart.js)
function generateTierChart() {
    const tierCounts = {
        Gold: 0,
        Silver: 0,
        Platinum: 0
    };

    members.forEach(member => {
        tierCounts[member.tier]++;
    });

    const ctx = document.getElementById('tierChart').getContext('2d');
    const tierChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(tierCounts),
            datasets: [{
                label: 'Membership Distribution',
                data: Object.values(tierCounts),
                backgroundColor: ['#ff9f43', '#00a8ff', '#1dd1a1'],
                hoverBackgroundColor: ['#ff7b28', '#00d4ff', '#0f9b88']
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
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' members';
                        }
                    }
                }
            }
        }
    });
}

// Export Table to CSV
function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Loop through each row
    for (let row of table.rows) {
        let rowData = [];
        for (let cell of row.cells) {
            rowData.push(cell.innerText.replace(/,/g, "")); // Remove commas to avoid breaking CSV format
        }
        csvContent += rowData.join(",") + "\n";
    }
    
    // Create a downloadable link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Example usage:
document.getElementById("exportTierTable").addEventListener("click", function() {
    exportTableToCSV("tierDistributionTable", "tier_distribution_report.csv");
});

document.getElementById("exportExpiryTable").addEventListener("click", function() {
    exportTableToCSV("expiryStatusTable", "membership_expiry_report.csv");
});


// Initialize report page
generateReport();