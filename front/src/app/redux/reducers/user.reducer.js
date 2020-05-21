import { GET_USER, USER_LOADING, GET_USER_PROGRESS, GET_USER_TESTED } from "../types";

const initialState = {
    user: null,
    progress: null,
    tested: null,
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case GET_USER_PROGRESS:
            return {
                ...state,
                progress: action.payload,
            }
        case GET_USER_TESTED:
            return {
                ...state,
                tested: action.payload,
            }
        case USER_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default: 
            return state;
    }
}