document.addEventListener("DOMContentLoaded", function () {
    const mainLinks = document.querySelectorAll(".main-link");
    const subMenuContainer = document.getElementById("subMenuContainer");
    const iframe = document.querySelector("iframe[name='iframe-div']");

    // Define sub-links for each main link
    const subLinks = {
        "pages/bookings/": [
            { name: "Overview", url: "pages/bookings/overview.html" },
            { name: "Manage", url: "pages/bookings/manage.html" },
            { name: "Payments", url: "pages/bookings/payment.html" },
            { name: "Report", url: "pages/bookings/report.html" },
            { name: "Notifications", url: "pages/bookings/notifications.html" }
        ],
        "pages/membership/": [
            { name: "Overview", url: "pages/membership/overview.html" },
            { name: "Manage", url: "pages/membership/manage.html" },
            { name: "Payments", url: "pages/membership/payment.html" },
            { name: "Report", url: "pages/membership/report.html" },
            { name: "Notifications", url: "pages/membership/notifications.html" }
        ]
    };

    function showSubLinks(mainLink, loadFirstView = false) {
        // Clear existing sub-links and header
        subMenuContainer.innerHTML = "";
    
        // Create and append the header
        const h2 = document.createElement("h2");
        h2.textContent = `${mainLink.split("/")[1]}`; // Extract the main link name for the header
        subMenuContainer.appendChild(h2);
    
        if (subLinks[mainLink]) {
            // Create <nav> element to contain the <ul>
            const nav = document.createElement("nav");
            
            // Create the <ul> element
            const ul = document.createElement("ul");
            ul.classList.add("sub-menu");
    
            subLinks[mainLink].forEach((link, index) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = link.url;
                a.textContent = link.name;
                a.target = "iframe-div";
    
                // Load the first sub-link's page if main link is clicked
                if (index === 0 && loadFirstView) {
                    iframe.src = link.url;
                }
    
                // Load page in iframe when sub-link is clicked
                a.addEventListener("click", function (event) {
                    event.preventDefault();
                    iframe.src = link.url;
                });
    
                li.appendChild(a);
                ul.appendChild(li);
            });
    
            // Append the <ul> inside the <nav>
            nav.appendChild(ul);
    
            // Append the <nav> to the subMenuContainer
            subMenuContainer.appendChild(nav);
        }
    }
    
    

    // Show "Bookings" sub-links on page load but do NOT load any page in the iframe
    showSubLinks("pages/bookings/", false);

    // Add event listeners to main links
    mainLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const mainLinkHref = link.getAttribute("href");
            showSubLinks(mainLinkHref, true); // Load first sub-link when a main link is clicked
        });
    });
});
