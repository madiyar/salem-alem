import { setBooksLoading, setAllBooks, setOneBook } from '../actions/books.actions';
import { API_URL } from '../types';

export function getAllBooks() {
    return function(dispatch, getState) {
        dispatch(setBooksLoading(true));
        return fetch(`${API_URL}/books`)
            .then(res => res.json())
            .then(books => {
                if(!books || !books.length) {
                    dispatch(setAllBooks(null));
                    return;
                }
                dispatch(setAllBooks(books));
            })
            .finally(() => {
                dispatch(setBooksLoading(false));
            });
    }
}

export function getOneBook(id) {
    return function(dispatch, getState) {
        return fetch(`${API_URL}/books/${id}`)
            .then(res => res.json())
            .then(book => {
                if(!book) {
                    dispatch(setOneBook(null));
                    return;
                }
                dispatch(setOneBook(book));
            });
    }
}