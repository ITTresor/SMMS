function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('main section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');
}

// Example functions for interactions
function renewMembership() {
    alert("Membership renewed successfully!");
}

function bookService() {
    alert("Redirecting to booking page...");
}

function redeemPoints() {
    alert("Loyalty points redeemed!");
}

function updatePaymentMethod() {
    alert("Redirecting to payment settings...");
}

function bookExtraService() {
    alert("Loading additional services...");
}
