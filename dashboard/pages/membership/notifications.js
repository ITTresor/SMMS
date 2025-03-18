// Sample data for notifications
const notifications = [
    { date: "2025-03-01", member: "John Doe", notification: "Membership Renewal Reminder", status: "Pending" },
    { date: "2025-02-25", member: "Jane Smith", notification: "Membership Expiry Notice", status: "Processed" },
    { date: "2025-02-15", member: "Alice Johnson", notification: "Tier Upgrade to Platinum", status: "Processed" },
    { date: "2025-02-01", member: "Bob Brown", notification: "Membership Expired", status: "Expired" },
    { date: "2025-01-20", member: "Charlie White", notification: "Membership Renewal Reminder", status: "Pending" },
    { date: "2025-01-10", member: "David Green", notification: "Membership Expiry Notice", status: "Processed" }
];

// Function to generate the notifications as cards
function generateNotifications() {
    const notificationsList = document.querySelector('.notifications-list');
    notificationsList.innerHTML = ''; // Clear any existing notifications

    notifications.forEach(notification => {
        const notificationCard = document.createElement('div');
        notificationCard.classList.add('notification-card');

        const statusClass = notification.status.toLowerCase().replace(' ', '-'); // Convert status to class
        notificationCard.innerHTML = `
            <div class="date">${notification.date}</div>
            <div class="member">${notification.member}</div>
            <div class="notification">${notification.notification}</div>
            <div class="status status-${statusClass}">${notification.status}</div>
        `;

        notificationsList.appendChild(notificationCard);
    });
}

// Initialize the notifications page
generateNotifications();
