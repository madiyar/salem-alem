import { combineReducers } from "redux";
import coursesReducer from "./courses.reducer";
import booksReducer from "./books.reducer";
import blogReducer from "./blog.reducer";
import commentsReducer from "./comments.reducer";
import userReducer from "./user.reducer";
import questionsReducer from "./questions.reducer";

const appReducers = combineReducers({
    courses: coursesReducer,
    books: booksReducer,
    blog: blogReducer,
    comments: commentsReducer,
    users: userReducer,
    questions: questionsReducer
});

export default appReducers;