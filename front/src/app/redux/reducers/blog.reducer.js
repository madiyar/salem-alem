import { GET_ALL_BLOG, BLOG_LOADING, GET_ONE_POST } from '../types';

const initialState = {
    allBlog: null,
    onePost: null,
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_BLOG:
            return {
                ...state,
                allBlog: action.payload
            }
        case GET_ONE_POST:
            return {
                ...state,
                onePost: action.payload
            }
        case BLOG_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default: 
            return state;
    }
}