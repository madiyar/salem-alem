import { setUser, setUserLoading, setProgress, setUserTested } from '../actions/user.actions';
import { API_URL } from '../types';

export function getUser(userId) {
    return function(dispatch, getState) {
        dispatch(setUserLoading(true));
        return fetch(`${API_URL}/users/${userId}`)
            .then(res => res.json())
            .then(user => {
                if(!user && !user.message) {
                    dispatch(setUser(null));
                    return;
                }
                dispatch(setUser(user));
            })
            .finally(() => {
                dispatch(setUserLoading(false));
            });
    }
}

export function getProgress(userId) {
    return function(dispatch, getState) {
        return fetch(`${API_URL}/users/${userId}/progress`)
            .then(res => res.json())
            .then(progress => {
                if(!progress && !progress.message) {
                    dispatch(setProgress(null));
                    return;
                }
                dispatch(setProgress(progress));
            });
    }
}

export function getUserTested(userId, courseId) {
    return function(dispatch, getState) {
        return fetch(`${API_URL}/progress/user/${userId}/${courseId}`)
            .then(res => res.json())
            .then(progress => {
                if(!progress && !progress.message) {
                    dispatch(setUserTested(null));
                    return;
                }
                dispatch(setUserTested(progress));
            });
    }
}