import { GET_ALL_BOOKS, GET_ONE_BOOK, BOOKS_LOADING } from '../types';

const initialState = {
    allBooks: null,
    book: null,
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_BOOKS:
            return {
                ...state,
                allBooks: action.payload
            }
        case GET_ONE_BOOK:
            return {
                ...state,
                book: action.payload
            }
        case BOOKS_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default: 
            return state;
    }
}