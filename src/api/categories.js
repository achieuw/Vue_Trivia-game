import { QUESTION_URL } from "./";

export async function apiGetCategories() {
    try {
        const response = await fetch(`${QUESTION_URL}_category.php`)

        const { success, data, error = "Could not fetch categories" } = await response.json()

        if(!success) {
            throw new Error(error)
        }

        return [null, data]
    } catch (error) {
        return [error.message, []]
    }
}