import { GET_USER, USER_LOADING, GET_USER_PROGRESS, GET_USER_TESTED } from "../types"

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

export const setProgress = progress => {
    return {
        type: GET_USER_PROGRESS,
        payload: progress
    }
}

export const setUserTested = progress => {
    return {
        type: GET_USER_TESTED,
        payload: progress
    }
}