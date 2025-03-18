// Simulating an existing database of booked times for each service
const bookings = {
    massage: {
        "2025-03-20": [
            { time: "10:30-11:00" },
            { time: "14:00-14:30" }
        ]
    },
    sauna: {
        "2025-03-20": [
            { time: "09:00-09:30" },
            { time: "17:00-17:30" }
        ]
    }
};

document.addEventListener("DOMContentLoaded", function () {
    // Initialize the booking system
    document.getElementById("serviceType").addEventListener("change", updateServices);
    document.getElementById("validateBtn").addEventListener("click", validateBooking);
    updateServices(); // Call the function to initialize services
});

function updateServices() {
    const massageServices = [
        "Swedish Massage", "Deep Tissue Massage", "Sports Massage", "Hot Stone Massage",
        "Aromatherapy Massage", "Shiatsu Massage", "Thai Massage", "Reflexology",
        "Lomi Lomi Massage", "Cupping Therapy", "Prenatal Massage", "Indian Head Massage",
        "Myofascial Release", "Trigger Point Therapy", "Chair Massage", "Tui Na Massage"
    ];

    const saunaServices = [
        "Traditional Finnish Sauna", "Infrared Sauna", "Steam Sauna (Turkish Bath or Hammam)",
        "Wet Sauna", "Infrared Light Sauna", "Salt Sauna", "Bio Sauna", "Russian Banya",
        "Wooden Sauna", "Portable Sauna"
    ];

    const massageDurations = [
        "30 minutes - Express Massage", "60 minutes - Standard Massage", 
        "90 minutes - Premium Massage", "120 minutes - Luxury Massage"
    ];

    const saunaDurations = [
        "15 minutes - Quick Sauna", "30 minutes - Standard Sauna", 
        "45 minutes - Extended Sauna", "60 minutes - Luxury Sauna Experience"
    ];

    const type = document.getElementById("serviceType").value;
    const serviceDropdown = document.getElementById("service");
    const durationDropdown = document.getElementById("duration");

    serviceDropdown.innerHTML = "";
    durationDropdown.innerHTML = "";

    let services = type === "massage" ? massageServices : saunaServices;
    let durations = type === "massage" ? massageDurations : saunaDurations;

    // Fill the service options
    services.forEach(service => {
        let option = document.createElement("option");
        option.value = service.toLowerCase().replace(/ /g, "-");
        option.textContent = service;
        serviceDropdown.appendChild(option);
    });

    // Fill the duration options
    durations.forEach(duration => {
        let option = document.createElement("option");
        option.value = duration.toLowerCase().replace(/ /g, "-");
        option.textContent = duration;
        durationDropdown.appendChild(option);
    });
}

function validateBooking() {
    const serviceType = document.getElementById("serviceType").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const duration = document.getElementById("duration").value;

    if (!serviceType || !service || !date || !time || !duration) {
        alert("Please fill out all fields.");
        return;
    }

    const serviceKey = serviceType === "massage" ? "massage" : "sauna";
    const dateKey = `${date}`;

    // Check if the selected time slot is already booked
    const serviceBookings = bookings[serviceKey][dateKey] || [];

    // Get duration in minutes
    const durationInMinutes = getDurationInMinutes(duration);
    const selectedTimeSlot = getTimeSlot(time, durationInMinutes);

    // Check for overlapping bookings
    const overlappingBooking = serviceBookings.find(booking => {
        const [bookedStart, bookedEnd] = booking.time.split('-').map(time => timeToMinutes(time));
        const [selectedStart, selectedEnd] = selectedTimeSlot.split('-').map(time => timeToMinutes(time));
        return isTimeOverlapping(selectedStart, selectedEnd, bookedStart, bookedEnd);
    });

    if (overlappingBooking) {
        // If the time is already booked, show the list of booked times
        let bookedTimes = serviceBookings.map(booking => booking.time).join(", ");
        alert(`This time slot is already booked! Here are the already booked slots for ${date}:\n\n${bookedTimes}\n\nPlease choose another time.`);
    } else {
        // If time is available, store the booking time
        bookings[serviceKey][dateKey] = bookings[serviceKey][dateKey] || [];
        bookings[serviceKey][dateKey].push({
            time: selectedTimeSlot
        });

        alert("Booking successful! You can now proceed.");
    }
}

// Helper function to convert duration to minutes
function getDurationInMinutes(duration) {
    const minutesMatch = duration.match(/^(\d+)/); // Extract number from "30 minutes - Express Massage"
    return minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
}

// Helper function to convert time string to minutes since midnight
function timeToMinutes(time) {
    const [hour, minute] = time.split(":").map(num => parseInt(num, 10));
    return hour * 60 + minute;
}

// Helper function to check if the selected time slot overlaps with an existing one
function isTimeOverlapping(selectedStart, selectedEnd, bookedStart, bookedEnd) {
    return !(selectedEnd <= bookedStart || selectedStart >= bookedEnd);
}

// Helper function to calculate the time range (start - end) for a given time and duration
function getTimeSlot(time, durationInMinutes) {
    const timeParts = time.split(":");
    const hour = parseInt(timeParts[0]);
    const minute = parseInt(timeParts[1]);

    let startTime = `${hour}:${minute}`;
    let endTime = `${hour}:${minute + durationInMinutes}`;

    // Adjust for minutes overflow (e.g., 10:30 to 11:00 or 11:30 to 12:00)
    if (minute + durationInMinutes >= 60) {
        endTime = `${hour + 1}:${(minute + durationInMinutes) % 60}`;
    }

    return `${startTime}-${endTime}`;
}
