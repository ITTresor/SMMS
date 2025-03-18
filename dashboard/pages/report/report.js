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

    // Membership Report (Line Chart)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jly", "aug", "spt", "oct", "nov", "dec"];
    const membershipData = [100, 140, 130, 190, 220, 270, 300, 270, 380, 440, 400, 520];
    let membershipChart = createChart(
        document.getElementById("membershipReportChart").getContext("2d"),
        "line",
        months,
        membershipData,
        ["rgba(0, 123, 255, 0.6)"],
        "New Memberships"
    );
    // Injecting Membership Data into the info-container
    document.getElementById("membershipinfo").innerHTML = `
        <p><strong>Month-wise New Memberships:</strong></p>
        <ul>
            ${months.map((month, index) => `<li>${month}: ${membershipData[index]}</li>`).join("")}
        </ul>
    `;

    // Revenue Report (Bar Chart)
    const weeklyRevenueData = [5000, 7000, 6000, 9000];
    let revenueChart = createChart(
        document.getElementById("revenueReportChart").getContext("2d"),
        "bar",
        ["Week 1", "Week 2", "Week 3", "Week 4"],
        weeklyRevenueData,
        ["rgba(76, 175, 80, 0.6)"],
        "Weekly Revenue ($)"
    );
    // Injecting Revenue Data into the info-container
    document.getElementById("revenueinfo").innerHTML = `
        <p><strong>Weekly Revenue ($):</strong></p>
        <ul>
            ${weeklyRevenueData.map((revenue, index) => `<li>Week ${index + 1}: $${revenue}</li>`).join("")}
        </ul>
    `;

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
    // Injecting Booking Data into the info-container
    document.getElementById("bookinginfo").innerHTML = `
        <p><strong>Bookings Distribution:</strong></p>
        <ul>
            ${bookingData.map((bookings, index) => `<li>${["Sauna", "Massage", "Facial", "Body Scrub"][index]}: ${bookings}</li>`).join("")}
        </ul>
    `;

    // Loyalty & Discounts (Doughnut Chart)
    const loyaltyData = [300, 700];
    let loyaltyChart = createChart(
        document.getElementById("loyaltyReportChart").getContext("2d"),
        "doughnut",
        ["Discounts Used", "Loyalty Points Redeemed"],
        loyaltyData,
        ["rgba(255, 159, 64, 0.6)", "rgba(153, 102, 255, 0.6)"],
        "Loyalty & Discounts"
    );
    // Injecting Loyalty & Discounts Data into the info-container
    document.getElementById("loyaltyinfo").innerHTML = `
        <p><strong>Loyalty & Discounts:</strong></p>
        <ul>
            ${loyaltyData.map((value, index) => `<li>${["Discounts Used", "Loyalty Points Redeemed"][index]}: ${value}</li>`).join("")}
        </ul>
    `;
});

// Export Report
function exportReport() {
    let exportType = document.getElementById("exportType").value;
    if (exportType === "pdf") {
        exportPDF();
    } else if (exportType === "excel") {
        exportExcel();
    }
}

// Export as PDF (Now Includes Charts)
function exportPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF("p", "mm", "a4");

    doc.text("Sauna Management Report", 10, 10);
    doc.text("Generated on: " + new Date().toLocaleString(), 10, 20);
    doc.text("Memberships, Revenue, Bookings, and Loyalty Summary", 10, 30);

    // Capture each chart and add to PDF
    let charts = ["membershipReportChart", "revenueReportChart", "bookingReportChart", "loyaltyReportChart"];

    let yOffset = 40;
    charts.forEach((chartId, index) => {
        let canvas = document.getElementById(chartId);
        let imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 10, yOffset, 180, 90);
        yOffset += 100;
        if (index < charts.length - 1) doc.addPage();
    });

    doc.save("Sauna_Report.pdf");
}

// Export as Excel (Now Includes Multiple Sheets)
function exportExcel() {
    let workbook = XLSX.utils.book_new();

    // Membership Data
    const membershipData = [
        ["Month", "New Members"],
        ["Jan", 100],
        ["Feb", 120],
        ["Mar", 150],
        ["Apr", 180],
        ["May", 220],
        ["Jun", 260]
    ];
    let membershipSheet = XLSX.utils.aoa_to_sheet(membershipData);
    XLSX.utils.book_append_sheet(workbook, membershipSheet, "Memberships");

    // Revenue Data
    const revenueData = [
        ["Week", "Revenue ($)"],
        ["Week 1", 5000],
        ["Week 2", 7000],
        ["Week 3", 6000],
        ["Week 4", 9000]
    ];
    let revenueSheet = XLSX.utils.aoa_to_sheet(revenueData);
    XLSX.utils.book_append_sheet(workbook, revenueSheet, "Revenue");

    // Booking Data
    const bookingData = [
        ["Service", "Bookings"],
        ["Sauna", 50],
        ["Massage", 40],
        ["Facial", 30],
        ["Body Scrub", 20]
    ];
    let bookingSheet = XLSX.utils.aoa_to_sheet(bookingData);
    XLSX.utils.book_append_sheet(workbook, bookingSheet, "Bookings");

    // Save Excel File
    XLSX.writeFile(workbook, "Sauna_Report.xlsx");
}
