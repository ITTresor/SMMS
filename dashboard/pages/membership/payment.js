// Sample payment data (could be fetched from a database in a real-world application)
const paymentData = [
    { name: "John Doe", email: "johndoe@example.com", amount: "$150", method: "Credit Card", status: "Completed", date: "2025-03-01" },
    { name: "Jane Smith", email: "janesmith@example.com", amount: "$100", method: "Mobile Money", status: "Pending", date: "2025-02-25" },
    { name: "Mike Johnson", email: "mikejohnson@example.com", amount: "$200", method: "Debit Card", status: "Completed", date: "2025-02-18" },
    { name: "Alice Williams", email: "alicewilliams@example.com", amount: "$250", method: "Bank Transfer", status: "Failed", date: "2025-02-12" }
];

// Display the payment history
function displayPayments(payments) {
    const tableBody = document.querySelector('#paymentHistoryTable tbody');
    tableBody.innerHTML = ''; // Clear the table before adding new rows

    payments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.name}</td>
            <td>${payment.email}</td>
            <td>${payment.amount}</td>
            <td>${payment.method}</td>
            <td>${payment.status}</td>
            <td>${payment.date}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter payments based on search and filters
function filterPayments() {
    const searchInput = document.getElementById('paymentSearchInput').value.toLowerCase();
    const statusFilter = document.getElementById('paymentStatusFilter').value;
    const methodFilter = document.getElementById('paymentMethodFilter').value;

    const filteredPayments = paymentData.filter(payment => {
        const matchesSearch = payment.name.toLowerCase().includes(searchInput) ||
                              payment.email.toLowerCase().includes(searchInput) ||
                              payment.amount.toLowerCase().includes(searchInput);
        const matchesStatus = statusFilter ? payment.status === statusFilter : true;
        const matchesMethod = methodFilter ? payment.method === methodFilter : true;

        return matchesSearch && matchesStatus && matchesMethod;
    });

    displayPayments(filteredPayments);
}

// Event Listeners for Search and Filters
document.getElementById('paymentSearchInput').addEventListener('input', filterPayments);
document.getElementById('paymentStatusFilter').addEventListener('change', filterPayments);
document.getElementById('paymentMethodFilter').addEventListener('change', filterPayments);

// Initialize the page with all payments
displayPayments(paymentData);
