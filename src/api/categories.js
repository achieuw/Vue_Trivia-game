import { QUESTION_URL } from "./";

export async function apiGetCategories() {
    try {
        const response = await fetch(`${QUESTION_URL}_category.php`)

        const data = await response.json()

        // if(!success) {
        //     throw new Error(error)
        // }

        return data
    } catch (error) {
        return null
    }
}