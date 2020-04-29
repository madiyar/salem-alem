import React from 'react';
import { connect } from "react-redux"
import { Typography } from 'antd';
import BlogList from '../blog/BlogList';
import Courses from '../course/Courses';
import BookList from '../library/BooksList';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="padding25">
            <Typography.Title level={1} className="title">
                <Link to="/blog/" className="grayLink">Соңғы мақалалар</Link>
            </Typography.Title>
            <BlogList pageSize={1} />
            <Courses slice={3} />
            <BookList slice={4} />
        </div>
    );
}

export default connect()(Home);