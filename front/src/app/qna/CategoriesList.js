import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllCategories, getAllQuestions } from '../redux/effects/questions.effects';
import { Row, Col, Menu, Typography, Button, Divider, List, Modal, Empty, Form, Select, Input } from 'antd';
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useParams, Redirect } from 'react-router-dom';
import { API_URL } from '../redux/types';

const { Option } = Select;

const CategoriesList = ({categories, questions, getAllCategories, getAllQuestions}) => {
    const { categoryId } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [modal, setModal] = useState(false);
    const [toQuestion, setToQuestion] = useState(null);

    useEffect(() => {
        getAllCategories();
        getAllQuestions(categoryId);
    }, [getAllCategories, getAllQuestions, categoryId]);

    const addQuestion = (data) => {
        if(user) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: user.id,
                    categoryId: data.categoryId,
                    title: data.title,
                    msg: data.msg,
                    answerId: 0
                })
            };
            fetch(`${API_URL}/questions`, options)
            .then(response => response.json())
            .then(question => {
                if (!question && question.message) {
                    return;
                }
                setToQuestion(question.id);
            });
        }
    }

    return (
        <Row>
            {toQuestion ? <Redirect to={`/question/${toQuestion}`} /> : null}
            <Col span={17} className="padding25">
                <Row justify="space-between">
                    <Col><Typography.Title level={1}>Сұрақтар</Typography.Title></Col>
                    <Col style={{textAlign:'right',paddingTop:'5px'}}>
                        <Button type="primary" size="large" onClick={() => setModal(true)}>Сұрақ қою</Button>
                    </Col>
                </Row>
                <Modal title="Сұрақ қою" visible={modal} onCancel={() => setModal(false)} footer={false}>
                    <Form name="addQuestion" onFinish={addQuestion}>

                        <Form.Item name="title" rules={[{required: true, message: 'Тақырыбын еңгізіңіз'}]} hasFeedback>
                            <Input placeholder="Тақырыбы" prefix={<UserOutlined  className="prefixIcon" />} />
                        </Form.Item>

                        <Form.Item name="msg" rules={[{ required: true, message: 'Сұрағыңызды толық жазыңыз' }]}>
                            <Input.TextArea rows={4} placeholder="Сіздің сұрағыңыз" />
                        </Form.Item>

                        <Form.Item name="categoryId" rules={[{required: true, message: 'Категориясын таңдаңыз'}]}>
                            <Select
                                showSearch
                                placeholder="Категория"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {categories && categories.map(cat => <Option value={cat.id}>{cat.name}</Option>)}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Жіберу</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Divider />
                {questions ? 
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={questions}
                        pagination={{pageSize: 5}}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={
                                        <Typography.Title level={3}>
                                            <Link to={`/question/${item.id}`} className="grayLink">{item.title}</Link>
                                        </Typography.Title>
                                    }
                                    description={
                                        <span>
                                            <Link to={`/user/${item.userId}`}>
                                                <UserOutlined /> {item.user.firstName} {item.user.lastName}
                                            </Link>
                                            <Link to={`/qna/${item.categoryId}`} style={{marginLeft:'10px'}}>
                                                <QuestionCircleOutlined /> {item.category.name}
                                            </Link>
                                        </span>
                                    }
                                />
                                <Typography.Paragraph
                                    ellipsis={{
                                        rows:3,
                                        expandable: false,
                                    }}
                                >
                                    {item.msg}
                                </Typography.Paragraph>
                            </List.Item>
                        )}
                    /> : <Empty description="Сұрақтар жоқ" />
                }
            </Col>
            <Col span={7} className="rightSider">
                <Menu mode="inline" defaultSelectedKeys={[categoryId ? ""+categoryId : "0"]}>
                    <Menu.Item key="0"><Link to="/qna">Барлық сұрақтар</Link></Menu.Item>
                    {categories ? categories.map(category => 
                        <Menu.Item key={category.id}><Link to={`/qna/${category.id}`}>{category.name}</Link></Menu.Item>
                    ) : null}
                </Menu>
            </Col>
        </Row>
    );
}

const mapStateToProps = state => ({
    categories: state.questions.categories,
    questions: state.questions.questions
})

export default connect(mapStateToProps, { getAllCategories, getAllQuestions })(CategoriesList);