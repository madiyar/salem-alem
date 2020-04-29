import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getQuestion } from '../redux/effects/questions.effects';
import { Spin, Typography, Breadcrumb, Row, Avatar, Col } from 'antd';
import { HomeOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { API_URL } from '../redux/types';
import Comments from '../shared/Comments';

const QuestionPage = ({ question, getQuestion }) => {
    const { questionId } = useParams();

    useEffect(() => {
        if(questionId) getQuestion(questionId);
    }, [questionId, getQuestion]);

    return question ? (
        <div>
            <div className="padding25">
                <Breadcrumb style={{marginBottom:'10px'}}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/qna"><QuestionCircleOutlined /> Сұрақтар</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/qna/${question.categoryId}`}>{question.category.name}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><span></span></Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={10}>
                    <Col span={2} style={{padding:'5px', textAlign:'center'}}>
                        <Avatar 
                            size={64} 
                            src={`${API_URL}/avatar/${question.user.avatar}`} 
                            alt={question.user.firstName} 
                        />
                    </Col>
                    <Col span={22}>
                        <Typography.Title level={2} style={{margin:0}}>{question.title}</Typography.Title>
                        <Link to={`/user/${question.userId}`}>
                            <UserOutlined /> {question.user.firstName} {question.user.lastName}
                        </Link>
                        <p>{question.msg}</p>
                    </Col>
                </Row>
            </div>
            <Comments type="question" targetId={question.id} />
        </div>
    ) : <Spin size="large" />
}

const mapStateToProps = state => ({
    question: state.questions.question
});

export default connect(mapStateToProps, { getQuestion })(QuestionPage);