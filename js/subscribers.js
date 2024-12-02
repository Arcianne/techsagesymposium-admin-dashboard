async function fetchAllSubscribers() {
    try {
        const response = await axios.get(ENVIRONMENT.API_BASE_URL + "/api/v1/subscribers")
        const dataSource = response.data.data
        const listContainer = document.getElementById("list-container")

        const htmlContent = dataSource.map(subscriber => `
            <div class="list">
                <div class="list-details">
                    <div class="email">
                        <p>${subscriber.email}</p>
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

fetchAllSubscribers()