async function fetchPendingAttendees() {
    try {
        const response = await axios.get(ENVIRONMENT.API_BASE_URL + "/api/v1/attendees/pending-status/true");
        const listContainer = document.getElementById("list-container")
        console.log(listContainer)
        const dataSource = response.data.data
        const htmlContent = dataSource.map(attendee => `
            <div class="list">
                <div class="list-details">
                    <div class="title">
                        <p>Event Name</p>
                        <h1>${attendee.event_id.title}</h1>
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
                        <button class="btn-accept" onclick="acceptAttendee('${attendee._id}', '${attendee.attendee_name}', '${attendee.email}')">Send Confirmation</button>
                        <button class="btn-decline" onclick="promptEventDeletion('${attendee._id}')">Decline</button>
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

async function deleteAttendee(id) {
    try {
        const response = axios.delete(ENVIRONMENT.API_BASE_URL + "/api/v1/attendees/" + id)
        
        fetchPendingAttendees()
    } catch (error) {
        console.log(error)
    }
}

function promptEventDeletion(id){
    Swal.fire({
        title: "Are you sure",
        text: "You won't be able to revert this!",
        icon: "warning",
        confirmButtonText: "Yes",
        showCancelButton: true,
    }).then((result) => {
        if(result.isConfirmed) {
            deleteAttendee(id)
        }
    });
}

async function acceptAttendee(id, name, email) {
    try {
        const response = await axios.put(
            ENVIRONMENT.API_BASE_URL + "/api/v1/attendees/" + id, 
            { is_pending: false }
        )
    
        Swal.fire({
            title: "Registration Accepted Successfully",
            text: name + " Ticket will be emailed to " + email,
            icon: "success",
        });
        
        fetchPendingAttendees()
    } catch (error) {
        console.log(error)
    }
}