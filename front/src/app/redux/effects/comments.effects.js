import { setComments, setCommentsLoading } from '../actions/comments.actions';
import { API_URL } from '../types';

export function getComments(type, targetId) {
    return function(dispatch, getState) {
        dispatch(setCommentsLoading(true));
        return fetch(`${API_URL}/comments/${type}/${targetId}`)
            .then(res => res.json())
            .then(comments => {
                if(!comments || !comments.length) {
                    dispatch(setComments(null));
                    return;
                }
                dispatch(setComments(comments));
            })
            .finally(() => {
                dispatch(setCommentsLoading(false));
            });
    }
}