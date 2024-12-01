async function fetchPendingAttendees() {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/attendees/pending-status/false");
        const listContainer = document.getElementById("list-container")
        console.log(listContainer)
        const dataSource = response.data.data
        const htmlContent = dataSource.map(attendee => `
            <div class="list">
                <div class="list-details">
                    <div class="title">
                        <p>Event Name</p>
                        <h1>${attendee.event_id}</h1>
                    </div>
                    <div class="name">
                        <p>Attendee Name</p>
                        <p>${attendee.attendee_name}</p>
                    </div>

                    <div class="contact">
                        <p>Contact Number</p>
                        <p>${attendee.contact_no}</p>
                    </div>

                    <div class="email">
                        <p>Email</p>
                        <p>${attendee.email}</p>
                    </div>

                    <div class="address">
                        <p>Address</p>
                        <p>${attendee.address}</p>
                    </div>

                    <div>
                        <button class="btn-accept">Send Confirmation</button>
                        <button class="btn-decline">Decline</button>
                    </div>

                </div>
            </div>
        `).join('')
        listContainer.innerHTML = htmlContent;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch event");
    }
}

fetchPendingAttendees()