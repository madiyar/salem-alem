import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import { getOneCourse, getTests } from '../redux/effects/courses.effects';
import { getUserTested } from '../redux/effects/user.effects';
import { Typography, Breadcrumb, Divider, Radio, Button, Form } from 'antd';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons'
import { API_URL } from '../redux/types';

const Test = ({ course, tests, tested, getOneCourse, getTests, getUserTested }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { url, courseId } = useParams();
    const [testEnd, setTestEnd] = useState(false);
    useEffect(() => {
        getOneCourse(url);
    }, [getOneCourse, url]);

    useEffect(() => {
        getTests(courseId);
    }, [courseId, getTests]);

    useEffect(() => {
        if(user) {
            getUserTested(user.id, courseId);
        }
    }, [courseId, user, getUserTested]);

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const onChange = values => {
        // console.log(values);
        let count = 0;
        for (let [key, value] of Object.entries(values)) {
            let right = parseInt(tests[parseInt(key)].answer);
            let answer = parseInt(value);
            console.log(answer, right);
            if(answer === right) {
                count=count+1;
            }
        }
        let result = (count/tests.length)*100;
        console.log(result);
        if(user) {
            const method = (tested) ? 'PUT' : 'POST';
            const url = (tested) ? 'progress/'+tested.id : 'progress';
            const options = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: user.id,
                    courseId: courseId,
                    percent: result
                })
            };
            fetch(`${API_URL}/${url}`, options)
            .then(response => response.json())
            .then(data => {
                if (!data && data.message) {
                    return;
                }
                setTestEnd(true);
            });
        }
    };

    return (
        <div>
            {testEnd ? <Redirect to={`/user/${user.id}`} /> : null}
            {course ? <div className="padding25">
                <Typography.Title level={1}>{course.name}</Typography.Title>
                <Breadcrumb style={{marginBottom: '25px'}}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/course"><AppstoreOutlined /> <span>Курстар</span></Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/course/${course.url}`}>{course.name}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Тест</Breadcrumb.Item>
                </Breadcrumb>
                <Typography.Paragraph
                    ellipsis={{
                        rows:2,
                        expandable: true,
                    }}
                >
                    {course.description}
                </Typography.Paragraph>
                <Divider />
            </div> : null}
            <Form 
                name="form"
                onFinish={onChange}
            >
                {tests ? tests.map((test, index) => 
                    <div className="padding25" key={index}>
                        <Typography.Title level={4}>{index+1}) {test.question}</Typography.Title>
                        <Form.Item 
                            name={index} 
                            rules={[{required: true, message: 'Жауап беріңіз'},]}
                        >
                            <Radio.Group>
                                <Radio style={radioStyle} value={1}>{test.answer1}</Radio>
                                <Radio style={radioStyle} value={2}>{test.answer2}</Radio>
                                <Radio style={radioStyle} value={3}>{test.answer3}</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Divider />
                    </div>
                ) : null}
                <div className="padding25">
                    <Button size="large" type="primary" shape="round" htmlType="submit">Жауап беру</Button>
                </div>
            </Form>
        </div>
    )
}
const mapStateToProps = state => ({
    course: state.courses.oneCourse,
    tests: state.courses.tests,
    tested: state.users.tested,
});

export default connect(mapStateToProps, { getOneCourse, getTests, getUserTested })(Test);