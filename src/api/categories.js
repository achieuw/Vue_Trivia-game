import { QUESTION_URL } from "./";
import store from "../store"

const maxAmountOfQuestions = 50;

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

export async function apiGetAmountOfQuestions(difficulty) {
    try {
        let url = ""

        if(store.state.categoryID > 8){
            url = "_count.php?category=" + store.state.categoryID
        } else {
            return maxAmountOfQuestions
        }

        const response = await fetch(`${QUESTION_URL}${url}`)
        const {category_question_count} = await response.json()
        
        if(difficulty === "easy"){
            if(category_question_count.total_easy_question_count > maxAmountOfQuestions){
                return maxAmountOfQuestions
            } else {
                return category_question_count.total_easy_question_count
            }
        } else if(difficulty === "medium") {
            if(category_question_count.total_medium_question_count > maxAmountOfQuestions){
                return maxAmountOfQuestions
            } else {
                return category_question_count.total_medium_question_count
            }
        } else if(difficulty === "hard") {
            if(category_question_count.total_hard_question_count > maxAmountOfQuestions){
                return maxAmountOfQuestions
            } else {
                return category_question_count.total_hard_question_count
            }
        } else {
            if(category_question_count.total_question_count > maxAmountOfQuestions){
                return maxAmountOfQuestions
            } else {
                return category_question_count.total_question_count
            }
        }
        

    } catch (error){
        return null
    }
}