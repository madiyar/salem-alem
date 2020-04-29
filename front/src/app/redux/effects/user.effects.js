import { setUser, setUserLoading } from '../actions/user.actions';
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