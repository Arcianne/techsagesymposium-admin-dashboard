async function fetchPendingEvents() {
    try {
        const response = await axios.get(ENVIRONMENT.API_BASE_URL + "/api/v1/events/pending-status/true");
        const dataSource = response.data.data
        const listContainer = document.getElementById("list-container")

        const htmlContent = dataSource.map(event => `
            <div class="list">
                    <div class="list-details">
                        <div class="title">
                            <p>Title</p>
                            <h1>${event.title}</h1>
                        </div>
                        <div class="location">
                            <p>Location</p>
                            <p>${event.location}</p>
                        </div>

                        <div class="speaker">
                            <p>Speaker</p>
                            <p>${event.speaker}</p>
                        </div>

                        <div class="date">
                            <p>Date</p>
                            <p>${moment(event.date).format('MM/DD/YYYY')}</p>
                        </div>

                        <div class="email">
                            <p>Email</p>
                            <p>${event.email}</p>
                        </div>

                        <div>
                            <button class="btn-accept" onclick="acceptEvent('${event._id}', '${event.title}')">Accept</button>
                            <button class="btn-decline" onclick="promptEventDeletion('${event._id}')">Decline</button>
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

fetchPendingEvents()

async function deleteEvent(id){
    try {
        const response = await axios.delete(ENVIRONMENT.API_BASE_URL + "/api/v1/events/" + id)
        console.log(response)
        fetchPendingEvents()
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
            deleteEvent(id)
        }
    });
}

async function acceptEvent(id, title){
    try {
        const response = await axios.put(
            ENVIRONMENT.API_BASE_URL + "/api/v1/events/" + id, 
            { is_pending: false }
        )

        Swal.fire({
            title: "Accepted!",
            text: title + "event has been successfully accepted and is now available on the event page.",
            icon: "success",
        });
        
        fetchPendingEvents()
    } catch (error) {
        console.log(error)
    }
}