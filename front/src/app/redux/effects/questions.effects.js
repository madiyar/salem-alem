import { setCategories, setQuestions, setQuestion, setQuestionsLoading } from '../actions/questions.actions';
import { API_URL } from '../types';

export function getAllCategories() {
    return function(dispatch, getState) {
        dispatch(setQuestionsLoading(true));
        return fetch(`${API_URL}/categories`)
            .then(res => res.json())
            .then(categories => {
                if(!categories || !categories.length) {
                    dispatch(setCategories(null));
                    return;
                }
                dispatch(setCategories(categories));
            })
            .finally(() => {
                dispatch(setQuestionsLoading(false));
            });
    }
}

export function getAllQuestions(id = null) {
    return function(dispatch, getState) {
        dispatch(setQuestionsLoading(true));
        if(id) {
            return fetch(`${API_URL}/categories/${id}/questions`)
                .then(res => res.json())
                .then(questions => {
                    if(!questions || !questions.length) {
                        dispatch(setQuestions(null));
                        return;
                    }
                    dispatch(setQuestions(questions));
                })
                .finally(() => {
                    dispatch(setQuestionsLoading(false));
                });
        } else {
            // ALL QUESTIONS
            return fetch(`${API_URL}/questions`)
                .then(res => res.json())
                .then(questions => {
                    if(!questions || !questions.length) {
                        dispatch(setQuestions(null));
                        return;
                    }
                    dispatch(setQuestions(questions));
                })
                .finally(() => {
                    dispatch(setQuestionsLoading(false));
                });
        }
    }
}

export function getQuestion(id) {
    return function(dispatch, getState) {
        return fetch(`${API_URL}/questions/${id}`)
            .then(res => res.json())
            .then(question => {
                if(!question) {
                    dispatch(setQuestion(null));
                    return;
                }
                dispatch(setQuestion(question));
            });
    }
}