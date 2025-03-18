function upgradeMembership() {
    document.getElementById("tier").textContent = "Gold";
    document.getElementById("discount").textContent = "15%";
    alert("Membership upgraded to Gold!");
}

function renewMembership() {
    alert("Membership renewed successfully!");
}

function cancelMembership() {
    if (confirm("Are you sure you want to cancel your membership?")) {
        alert("Membership canceled.");
    }
}
