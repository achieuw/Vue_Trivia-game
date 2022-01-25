import { BASE_URL, API_KEY } from "./";

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
                highScore: 0,
                score: 0
            })
        }

        const response = await fetch(`${BASE_URL}`, config)
        const data = await response.json()

        // if(!success) {
        //     throw new Error(error);
        // }
        return [ null, data ]

    } catch (error) {
        return [ error.message, null ]
    }
}

export async function apiUserDataGet(username) {
    try {
        const response = await fetch(`${BASE_URL}?username=${username}`)
        const data = await response.json()

        // if (response_code) {
        //     throw new Error(error)
        // }

        return data
    } catch (error) {
        return null
    }
}

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