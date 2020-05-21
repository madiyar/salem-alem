import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Typography, Spin, Breadcrumb, Row, Col, Collapse, List, Button, Divider } from 'antd';
import { HomeOutlined, AppstoreOutlined, DownOutlined } from '@ant-design/icons';
import { getOneCourse, getChapter } from '../redux/effects/courses.effects';
import { API_URL } from '../redux/types';
import Comments from '../shared/Comments';

const { Panel } = Collapse;

const Course = ({ course, sections, chapter, getOneCourse, getChapter }) => {
    const { url, chapterId } = useParams();
    useEffect(() => {
        getOneCourse(url);
    }, [getOneCourse, url]);

    useEffect(() => {
        if(chapterId) {
            getChapter(parseInt(chapterId));
        }
    }, [getChapter, chapterId]);

    return course ? (
        <Row>
            <Col span={18}>
                <div style={{
                    background: `rgba(0, 0, 0, 0) url("${API_URL}/posters/${course.poster}") no-repeat scroll 0% 0% / cover`,
                }}>
                    <div className="courseCard">
                        <Typography.Title level={1}>{course.name}</Typography.Title>
                        <Breadcrumb style={{marginBottom: '25px'}}>
                            <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/course"><AppstoreOutlined /> <span>Курстар</span></Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={`/course/${course.url}`}>{course.name}</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <Typography.Paragraph
                            ellipsis={{
                                rows:2,
                                expandable: true,
                            }}
                        >
                            {course.description}
                        </Typography.Paragraph>
                    </div>
                </div>
                {chapterId && chapter ? 
                    <div className="padding25">
                        <Typography.Title level={2}>{chapter.name}</Typography.Title>
                        <div dangerouslySetInnerHTML={{__html: chapter.text}}></div>
                    </div> : 
                    <div>
                        <Comments type="course" targetId={course.id} />
                    </div>
                }
            </Col>
            <Col span={6} className="rightSider">
                <Collapse 
                    bordered={false} 
                    expandIconPosition="right"
                    expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />} 
                    accordion 
                >
                    {sections ? sections.map((section, i) => 
                        <Panel header={section.name} key={i} style={{border:0,background:'#fff'}}>
                            <List
                                itemLayout="horizontal"
                                dataSource={section.chapters}
                                renderItem={item => (<List.Item><Link to={`/course/${url}/${item.id}`}>{item.name}</Link></List.Item>)}
                            />
                        </Panel>
                    ) : null}
                </Collapse>
                <Divider />
                <div style={{padding:'10px'}}>
                    <Button
                        type="primary"
                        size="large"
                        shape="round"
                        style={{width:'100%'}}
                    >
                        <Link to={`/test/${course.url}/${course.id}`}>Тесттен өту</Link>
                    </Button>
                </div>
            </Col>
        </Row>
    ) : <div><Spin size="large" style={{margin: '50px'}} /></div>;
}

const mapStateToProps = state => ({
    course: state.courses.oneCourse,
    sections: state.courses.sections,
    chapter: state.courses.chapter,
});

export default connect(mapStateToProps, { getOneCourse, getChapter })(Course);