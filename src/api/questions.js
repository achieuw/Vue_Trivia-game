import { QUESTION_URL, TOKEN_URL } from "./";

export async function apiGetQuestions(amount, difficulty="any", category="9", token) {
    try {
        let URL = `${QUESTION_URL}.php?amount=${amount}&token=${token}`

        if(category !== 0) {
            URL += `&category=${category}`
        }

        if(difficulty !== "any") {
            URL += `&difficulty=${difficulty}`
        }

        const response = await fetch(URL);
        
        const { response_code, results, error = "Could not fetch questions" } = await response.json()
        
        if(response_code === 1) {
            throw new Error("Could not return results. The API doesn't have enough questions for your query")
        } else if(response_code == 2) {
            throw new Error("Contains an invalid parameter. Arguements passed in aren't valid.")
        } else if (response_code === 3) {
            throw new Error("Server is down")
        } else if (response_code === 4) {
            console.log(response_code)
            throw new Error("Session token is invalid, please refresh the page")
        }

        return [null, results ]

    } catch (error) {
        return [ error, [] ]
    }
}

export async function apiGetSessionToken(){
    try {
        let URL = `${QUESTION_URL}${TOKEN_URL}`
        

        const response = await fetch(URL)
        const { response_code, message, token} = await response.json()
        
        if(!response_code === 0) {
            throw new Error(message)
        }

        return token
    } catch(error) {
        return error
    }
}