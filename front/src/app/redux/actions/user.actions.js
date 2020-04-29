import { GET_USER, USER_LOADING } from "../types"

export const setUser = user => {
    return {
        type: GET_USER,
        payload: user
    }
}

export const setUserLoading = status => {
    return {
        type: USER_LOADING,
        payload: status
    }
}