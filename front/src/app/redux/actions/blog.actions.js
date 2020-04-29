import { GET_ALL_BLOG, GET_ONE_POST, BLOG_LOADING } from "../types"

export const setAllBlog = posts => {
    return {
        type: GET_ALL_BLOG,
        payload: posts
    }
}

export const setOnePost = post => {
    return {
        type: GET_ONE_POST,
        payload: post
    }
}

export const setBlogLoading = status => {
    return {
        type: BLOG_LOADING,
        payload: status
    }
}