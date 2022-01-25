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
        
        if(response_code) {
            throw new Error(error)
        }

        return [ null, results ]

    } catch (error) {
        return [ error.message, [] ]
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