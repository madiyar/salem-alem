import { GET_ALL_BOOKS, BOOKS_LOADING, GET_ONE_BOOK } from "../types"

export const setAllBooks = books => {
    return {
        type: GET_ALL_BOOKS,
        payload: books
    }
}

export const setOneBook = book => {
    return {
        type: GET_ONE_BOOK,
        payload: book
    }
}

export const setBooksLoading = status => {
    return {
        type: BOOKS_LOADING,
        payload: status
    }
}