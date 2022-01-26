import { BASE_URL, API_KEY } from "./";

// Post new user data to API
export async function apiUserDataPost(username) {
    try {
        const config = {
            method: "POST",
            headers: {
                "X-API-Key": API_KEY,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username,
                highScore: 0
            })
        }

        const response = await fetch(`${BASE_URL}`, config)
        const data = await response.json()

        return [ null, data ]

    } catch (error) {
        return [ error.message, null ]
    }
}

// Get available user data from API
export async function apiUserDataGet(username) {
    try {
        const response = await fetch(`${BASE_URL}?username=${username}`)
        const data = await response.json()

        if (data.length === 0) {
            throw new Error("User could not be found")
        }

        return [null, data]
    } catch (error) {
        return [error.message, null]
    }
}

// Write new data to existing user in the API
export async function apiUserDataPatch(id, highScore) {
    try {
        const config = {
            method: "PATCH",
            headers: {
                "X-API-Key": API_KEY,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                highScore: highScore
            })
        }

        const response = await fetch(`${BASE_URL}/${id}`, config)
        if(!response.ok){
            throw new Error("Could not update high score")
        }
        return await response.json()

    } catch (error) {
        return null
    }
}