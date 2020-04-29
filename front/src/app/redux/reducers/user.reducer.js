import { GET_USER, USER_LOADING } from "../types";

const initialState = {
    user: null,
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload,
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