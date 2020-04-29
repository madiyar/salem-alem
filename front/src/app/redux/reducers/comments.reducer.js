import { GET_COMMENTS, COMMENTS_LOADING } from '../types';

const initialState = {
    comments: null,
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case COMMENTS_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default: 
            return state;
    }
}