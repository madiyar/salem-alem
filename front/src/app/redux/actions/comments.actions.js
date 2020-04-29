import { GET_COMMENTS, COMMENTS_LOADING } from "../types"

export const setComments = comments => {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}

export const setCommentsLoading = status => {
    return {
        type: COMMENTS_LOADING,
        payload: status
    }
}