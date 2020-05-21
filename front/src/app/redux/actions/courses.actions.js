import { GET_ALL_COURSES, COURSES_LOADING, GET_ONE_COURSE, GET_COURSE_SECTIONS, GET_CHAPTER, GET_TESTS } from "../types";

export const setAllCourses = courses => {
    return {
        type: GET_ALL_COURSES,
        payload: courses,
    }
}

export const setCoursesLoading = status => {
    return {
        type: COURSES_LOADING,
        payload: status,
    }
}

export const setCourseSections = sections => {
    return {
        type: GET_COURSE_SECTIONS,
        payload: sections
    }
}

export const setOneCourse = course => {
    return {
        type: GET_ONE_COURSE,
        payload: course
    }
}

export const setChapter = chapter => {
    return {
        type: GET_CHAPTER,
        payload: chapter
    }
}

export const setTests = tests => {
    return {
        type: GET_TESTS,
        payload: tests
    }
}