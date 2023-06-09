<script>
    const API_URL = 'https://your-api-url.com/Players';

    async function getAllPlayers() {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    }

    async function getPlayerById(id) {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        return data;
    }

    async function addPlayer(player) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });

        const data = await response.json();
        return data;
    }

    async function updatePlayer(id, player) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });

        const data = await response.json();
        return data;
    }

    async function deletePlayer(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        return data;
    }
</script>