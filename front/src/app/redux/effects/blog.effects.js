import { setAllBlog, setBlogLoading, setOnePost } from '../actions/blog.actions';
import { API_URL } from '../types';

export function getAllBlog() {
    return function(dispatch, getState) {
        dispatch(setBlogLoading(true));
        return fetch(`${API_URL}/blog`)
            .then(res => res.json())
            .then(posts => {
                if(!posts || !posts.length) {
                    dispatch(setAllBlog(null));
                    return;
                }
                dispatch(setAllBlog(posts));
            })
            .finally(() => {
                dispatch(setBlogLoading(false));
            });
    }
}

export function getOnePost(id) {
    return function(dispatch, getState) {
        return fetch(`${API_URL}/blog/${id}`)
            .then(res => res.json())
            .then(post => {
                if(!post) {
                    dispatch(setOnePost(null));
                    return;
                }
                dispatch(setOnePost(post));
            });
    }
}