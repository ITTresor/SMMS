let currentEditId = null;
let currentEditField = null;

function fetchData() {
    fetch('../../../php/booking-payment.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('bookingTable');
            table.innerHTML = '';
            data.forEach(booking => {
                let row = `<tr>
                    <td>${booking.Id}</td>
                    <td>${booking.Names}</td>
                    <td>${booking.Email}</td>
                    <td>${booking.Phone}</td>
                    <td onclick="openModal(${booking.Id}, 'Status', '${booking.Status}')">${booking.Status}</td>
                    <td onclick="openModal(${booking.Id}, 'Payment', '${booking.Payment}')">${booking.Payment}</td>
                </tr>`;
                table.innerHTML += row;
            });
        });
}

function openModal(id, field, value) {
    currentEditId = id;
    currentEditField = field;
    
    const select = document.getElementById('updateValue');
    select.innerHTML = '';

    if (field === 'Status') {
        ['Pending', 'Confirmed', 'Cancelled', 'Completed'].forEach(option => {
            select.innerHTML += `<option value="${option}" ${option === value ? 'selected' : ''}>${option}</option>`;
        });
    } else if (field === 'Payment') {
        ['Pending', 'Paid', 'Failed'].forEach(option => {
            select.innerHTML += `<option value="${option}" ${option === value ? 'selected' : ''}>${option}</option>`;
        });
    }

    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function saveUpdate() {
    const newValue = document.getElementById('updateValue').value;

    fetch('../../../php/update.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ Id: currentEditId, field: currentEditField, value: newValue })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchData();
            closeModal();
        } else {
            alert('Update failed!');
        }
    });
}

fetchData();
