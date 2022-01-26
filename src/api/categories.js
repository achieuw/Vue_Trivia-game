import { QUESTION_URL } from "./";
import store from "../store"

// Max amount of questions to fetch from API (50 is maximum atm)
const maxAmountOfQuestions = 50;

export async function apiGetCategories() {
    try {
        const response = await fetch(`${QUESTION_URL}_category.php`)

        
        if(!response.ok) {
            throw new Error("Could not fetch categories");
        }

        const data = await response.json()

        return [null, data ]
    } catch (error) {
        return [ error.message, []]
    }
}

// Return the maximum amount of questions available for specific difficulty/category
export async function apiGetAmountOfQuestions(difficulty) {
    try {
        let url = ""

        // Category ID starts at 9, also handles category "any" (ID = "")
        if(store.state.categoryID > 8) {
            url = "_count.php?category=" + store.state.categoryID
        } else {
            return maxAmountOfQuestions
        }

        const response = await fetch(`${QUESTION_URL}${url}`)

        if(!response.ok) {
            throw new Error("Could not fetch amount of category questions")
        }

        const {category_question_count} = await response.json()

        let categoryQuestionAmount = 0;

        switch (difficulty) {
            case "easy":
                categoryQuestionAmount = category_question_count.total_easy_question_count;
                break;
            case "medium":
                categoryQuestionAmount = category_question_count.total_medium_question_count;
                break;
            case "hard":
                categoryQuestionAmount = category_question_count.total_hard_question_count;
                break;
            default: // if difficulty is any
                categoryQuestionAmount = category_question_count.total_question_count
                break;
        }

        if(categoryQuestionAmount > maxAmountOfQuestions){
            return [null, maxAmountOfQuestions]
        } else {
            return [null, categoryQuestionAmount]
        }
    } 
    catch (error) {
        return [error.message, null]
    }
}