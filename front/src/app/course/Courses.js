import React, { useEffect } from 'react';
import { connect } from "react-redux"
import { Typography, Row, Col, Card, Spin } from 'antd';
import { getAllCourses } from '../redux/effects/courses.effects'
import { API_URL } from '../redux/types';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Courses = ({ slice, courses, getAllCourses }) => {
    useEffect(() => {
        getAllCourses();
    }, [getAllCourses]);
    if(slice && courses) {
        courses = courses.slice(0,slice);
    }
    return (
        <div>
            <Typography.Title level={1} className="title">
                {slice ? <Link to="/course/" className="grayLink">Курстар</Link> : 'Курстар'}
            </Typography.Title>
            {courses ? 
                <Row gutter={25} className="coursesGrid">
                    {courses.map(course => 
                        <Col span={8} key={course.id}>
                            <Link to={`/course/${course.url}`}>
                                <Card
                                    className="card" 
                                    cover={
                                    <img
                                        alt={course.name}
                                        src={`${API_URL}/posters/${course.poster}`}
                                    />
                                    }
                                >
                                    <Meta
                                        title={<Typography.Title level={4}>{course.name}</Typography.Title>}
                                        description={
                                            <Typography.Paragraph
                                                className="description"
                                                ellipsis={{
                                                    rows:6,
                                                    expandable: false,
                                                }}
                                            >
                                                {course.description}
                                            </Typography.Paragraph>
                                        }
                                    />
                                </Card>
                            </Link>
                        </Col>
                    )}
                </Row> : <Spin size="large" />
            }
        </div>
    );
}

const mapStateToProps = state => ({
    courses: state.courses.allCourses
});

export default connect(mapStateToProps, { getAllCourses })(Courses);