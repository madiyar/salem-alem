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
                let allComments = [];
                comments.map(comment => {
                    let allLikes = [];
                    let likeCount = 0;
                    fetch(`${API_URL}/liked/comment/${comment.id}`)
                    .then(res => res.json())
                    .then(likes => {
                        likes.map(like => {
                            allLikes.push(like);
                            likeCount++;
                        })
                    });
                    allComments.push({...comment, likes: allLikes, likeCount: likeCount});
                })
                dispatch(setComments(allComments));
            })
            .finally(() => {
                dispatch(setCommentsLoading(false));
            });
    }
}