import { GET_QUESTIONS, GET_QUESTION, GET_CATEGORIES, QUESTIONS_LOADING } from "../types"

export const setCategories = categories => {
    return {
        type: GET_CATEGORIES,
        payload: categories
    }
}

export const setQuestions = questions => {
    return {
        type: GET_QUESTIONS,
        payload: questions
    }
}

export const setQuestion = question => {
    return {
        type: GET_QUESTION,
        payload: question
    }
}

export const setQuestionsLoading = status => {
    return {
        type: QUESTIONS_LOADING,
        payload: status
    }
}