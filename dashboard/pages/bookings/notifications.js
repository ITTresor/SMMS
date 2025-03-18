document.addEventListener("DOMContentLoaded", function () {
    const notificationsList = document.getElementById("notificationsList");
    const markAllReadBtn = document.getElementById("markAllRead");

    // Sample Notification Data
    let notifications = [
        { id: 1, message: "New booking from John Doe", read: false },
        { id: 2, message: "Your booking for March 10 has been confirmed", read: false },
        { id: 3, message: "Booking canceled by Alex Smith", read: true },
        { id: 4, message: "Payment received for Booking #1234", read: false },
        { id: 1, message: "New booking from John Doe", read: false },
        { id: 2, message: "Your booking for March 10 has been confirmed", read: false },
        { id: 3, message: "Booking canceled by Alex Smith", read: true },
        { id: 4, message: "Payment received for Booking #1234", read: false }
    ];

    // Function to Render Notifications
    function renderNotifications() {
        notificationsList.innerHTML = "";
        notifications.forEach(notification => {
            const li = document.createElement("li");
            li.className = `notification ${notification.read ? "read" : "unread"}`;
            li.innerHTML = `
                <span>${notification.message}</span>
                ${!notification.read ? `<button onclick="markAsRead(${notification.id})">Mark Read</button>` : ''}
            `;
            notificationsList.appendChild(li);
        });
    }

    // Mark a Single Notification as Read
    window.markAsRead = function (id) {
        notifications = notifications.map(notification => 
            notification.id === id ? { ...notification, read: true } : notification
        );
        renderNotifications();
    };

    // Mark All Notifications as Read
    markAllReadBtn.addEventListener("click", function () {
        notifications = notifications.map(notification => ({ ...notification, read: true }));
        renderNotifications();
    });

    // Initial Rendering
    renderNotifications();
});
