import { GET_ALL_COURSES, COURSES_LOADING, GET_ONE_COURSE, GET_COURSE_SECTIONS, GET_CHAPTER, GET_TESTS } from "../types";

const initialState = {
    allCourses: null,
    oneCourse: null,
    chapter: null,
    sections: null,
    tests: null,
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COURSES:
            return {
                ...state,
                allCourses: action.payload,
            }
        case GET_ONE_COURSE:
            return {
                ...state,
                oneCourse: action.payload
            }
        case GET_COURSE_SECTIONS:
            return {
                ...state,
                sections: action.payload
            }
        case GET_CHAPTER:
            return {
                ...state,
                chapter: action.payload
            }
        case GET_TESTS:
            return {
                ...state,
                tests: action.payload
            }
        case COURSES_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default: 
            return state;
    }
}