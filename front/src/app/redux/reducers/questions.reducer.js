import { GET_CATEGORIES, GET_QUESTION, GET_QUESTIONS, QUESTIONS_LOADING } from '../types';

const initialState = {
    categories: null,
    questions: null,
    question: null,
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            }
        case GET_QUESTION:
            return {
                ...state,
                question: action.payload
            }
        case QUESTIONS_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default: 
            return state;
    }
}