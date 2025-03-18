document.addEventListener("DOMContentLoaded", function () {
    // Sample Data for Members and Upgrades
    const membersData = [
        { name: "John Doe", email: "john@example.com", phone: "123-456-7890", tier: "Gold", status: "Active" },
        { name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", tier: "Silver", status: "Expired" },
        { name: "Alex Brown", email: "alex@example.com", phone: "555-123-4567", tier: "Bronze", status: "Pending" }
    ];

    const upgradesData = [
        { member: "John Doe", currentTier: "Gold", requestedTier: "Platinum", status: "Pending" },
        { member: "Jane Smith", currentTier: "Silver", requestedTier: "Gold", status: "Approved" },
        { member: "Alex Brown", currentTier: "Bronze", requestedTier: "Silver", status: "Pending" }
    ];

    // Populate Member Table
    const memberTableBody = document.getElementById("memberTableBody");
    membersData.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td>${member.tier}</td>
            <td>${member.status}</td>
            <td>
                <button class="action-button" onclick="editMember('${member.name}')">Edit</button>
                <button class="deny-button" onclick="deleteMember('${member.name}')">Delete</button>
            </td>
        `;
        memberTableBody.appendChild(row);
    });

    // Populate Membership Upgrade Requests Table
    const upgradeRequestsBody = document.getElementById("upgradeRequestsBody");
    upgradesData.forEach(upgrade => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${upgrade.member}</td>
            <td>${upgrade.currentTier}</td>
            <td>${upgrade.requestedTier}</td>
            <td>${upgrade.status}</td>
            <td>
                <button class="action-button" onclick="approveUpgrade('${upgrade.member}')">Approve</button>
                <button class="deny-button" onclick="denyUpgrade('${upgrade.member}')">Deny</button>
            </td>
        `;
        upgradeRequestsBody.appendChild(row);
    });
});

// Search Member by Name, Email, or Phone
function searchMembers() {
    const searchInput = document.getElementById("memberSearchInput").value.toLowerCase();
    const memberRows = document.querySelectorAll("#memberTableBody tr");

    memberRows.forEach(row => {
        const nameCell = row.cells[0].textContent.toLowerCase();
        const emailCell = row.cells[1].textContent.toLowerCase();
        const phoneCell = row.cells[2].textContent.toLowerCase();

        if (nameCell.includes(searchInput) || emailCell.includes(searchInput) || phoneCell.includes(searchInput)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Filter Members by Tier or Status
function filterMembers() {
    const tierFilter = document.getElementById("tierFilter").value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value.toLowerCase();
    const memberRows = document.querySelectorAll("#memberTableBody tr");

    memberRows.forEach(row => {
        const tierCell = row.cells[3].textContent.toLowerCase();
        const statusCell = row.cells[4].textContent.toLowerCase();

        if (
            (tierFilter === "" || tierCell.includes(tierFilter)) &&
            (statusFilter === "" || statusCell.includes(statusFilter))
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Search Upgrade Requests by Member Name
function searchUpgradeRequests() {
    const searchInput = document.getElementById("upgradeSearchInput").value.toLowerCase();
    const upgradeRows = document.querySelectorAll("#upgradeRequestsBody tr");

    upgradeRows.forEach(row => {
        const memberCell = row.cells[0].textContent.toLowerCase();

        if (memberCell.includes(searchInput)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Filter Upgrade Requests by Current Tier, Requested Tier, and Status
function filterUpgrades() {
    const currentTierFilter = document.getElementById("currentTierFilter").value.toLowerCase();
    const requestedTierFilter = document.getElementById("requestedTierFilter").value.toLowerCase();
    const upgradeStatusFilter = document.getElementById("upgradeStatusFilter").value.toLowerCase();
    const upgradeRows = document.querySelectorAll("#upgradeRequestsBody tr");

    upgradeRows.forEach(row => {
        const currentTierCell = row.cells[1].textContent.toLowerCase();
        const requestedTierCell = row.cells[2].textContent.toLowerCase();
        const statusCell = row.cells[3].textContent.toLowerCase();

        if (
            (currentTierFilter === "" || currentTierCell.includes(currentTierFilter)) &&
            (requestedTierFilter === "" || requestedTierCell.includes(requestedTierFilter)) &&
            (upgradeStatusFilter === "" || statusCell.includes(upgradeStatusFilter))
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Approve and Deny Upgrade Functions
function approveUpgrade(memberName) {
    alert(`${memberName}'s upgrade has been approved.`);
}

function denyUpgrade(memberName) {
    alert(`${memberName}'s upgrade has been denied.`);
}

// Edit and Delete Member Functions
function editMember(memberName) {
    alert(`Edit member: ${memberName}`);
}

function deleteMember(memberName) {
    if (confirm(`Are you sure you want to delete ${memberName}?`)) {
        alert(`${memberName} has been deleted.`);
    }
}