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
                highScore: 0
            })
        }

        const response = await fetch(`${BASE_URL}`, config)
        const { success, data, error = "An error occurred while pushing user" } = await response.json()

        if(!success) {
            throw new Error(error);
        }
        return [ null, data ]

    } catch (error) {
        return [ error.message, null ]
    }
}

export async function apiUserDataGet(username) {
    try {
        const response = await fetch(`${BASE_URL}?username=${username}`)
        const { success, data, error = "An error occurred while getting user"} = await response.json()

        if(!success) {
            throw new Error(error)
        }

        return [ null, data ]
    } catch (error) {
        return [ error.message, null ]
    }
}

export async function apiUserDataPatch(username, highScore) {
    try {
        const config = {
            method: "PATCH",
            headers: {
                "X-API-Key": API_KEY,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                highScore
            })
        }

        const response = await fetch(`${BASE_URL}/${username}`, config)
        const { success, data, error = "An error occurred while patching user" } = await response.json()

        if(!success) {
            throw new Error(error)
        }

        return [ null, data ]
    } catch (error) {
        return [ error.message, null ]
    }
}