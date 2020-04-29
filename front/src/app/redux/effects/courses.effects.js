import { setAllCourses, setCoursesLoading, setOneCourse, setCourseSections, setChapter } from "../actions/courses.actions";
import { API_URL } from "../types";

export function getAllCourses() {
    return function(dispatch, getState) {
        dispatch(setCoursesLoading(true));
        return fetch(`${API_URL}/courses`)
            .then(res => res.json())
            .then(courses => {
                if (!courses || !courses.length) {
                    dispatch(setAllCourses(null));
                    return;
                }
                dispatch(setAllCourses(courses));
            })
            .finally(() => {
                dispatch(setCoursesLoading(false));
            });
    }
}

export function getOneCourse(url) {
    return function(dispatch, getState) {
        dispatch(setCoursesLoading(true));
        return fetch(`${API_URL}/courses/${url}`)
            .then(res => res.json())
            .then(course => {
                if (!course) {
                    dispatch(setOneCourse(null));
                    return;
                }
                dispatch(setOneCourse(course));
                return course.id;
            })
            .then(id => {
                fetch(`${API_URL}/courses/${id}/sections`)
                .then(res => res.json())
                .then(sections => {
                    let allSections = [];
                    sections.map(section => {
                        let allChapters = [];
                        fetch(`${API_URL}/sections/${section.id}/chapters`)
                            .then(res => res.json())
                            .then(data => {
                                data.map(chapter => {
                                    allChapters.push({id: chapter.id, name: chapter.name});
                                    return chapter;
                                })
                            });
                        allSections.push({id: section.id, name: section.name, chapters: allChapters});
                        return section;
                    });
                    dispatch(setCourseSections(allSections));
                });
            })
            .finally(() => {
                dispatch(setCoursesLoading(false));
            });
    }
}

export function getChapter(id) {
    return function (dispatch, getState) {
        return fetch(`${API_URL}/chapters/${id}`)
            .then(res => res.json())
            .then(chapter => {
                if(chapter) {
                    dispatch(setChapter(chapter));
                }
            })
    }
}
