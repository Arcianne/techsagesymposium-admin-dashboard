async function fetchPendingEvents() {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/events/pending-status/false");
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
                            <button class="btn-accept">Accept</button>
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

fetchPendingEvents()