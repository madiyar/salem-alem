import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../redux/effects/comments.effects';
import { Divider, Comment, Avatar, Typography, Empty, Form, Input, Button, Alert } from 'antd';
import { RollbackOutlined, DeleteOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { API_URL } from '../redux/types';
import { Link } from 'react-router-dom';

const Comments = ({type, targetId, comments, getComments}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [form] = Form.useForm();
    const [commentAdded, setCommentAdded] = useState(false);

    useEffect(() => {
        getComments(type, targetId);
        if(commentAdded) setCommentAdded(false);
    }, [getComments, type, targetId, commentAdded]);

    const addComment = data => {
        if(user) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: user.id,
                    type: type,
                    targetId: targetId,
                    msg: data.msg
                })
            };
            fetch(`${API_URL}/comments`, options)
            .then(response => response.json())
            .then(comment => {
                if (!comment && comment.message) {
                    return;
                }
                setCommentAdded(true);
                form.resetFields();
            });
        }
    }

    const reply = (user) => {
        form.setFieldsValue({msg: `${user.firstName} ${user.lastName}, `});
    }

    const deleteComment = (id) => {
        if(user) {
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`${API_URL}/comments/${id}`, options)
            .then(response => response.json())
            .then(comment => {
                if (!comment && comment.message) {
                    return;
                }
                setCommentAdded(true);
            });
        }
    }
    
    return (
        <div className="padding25">
            <Divider />
            <Typography.Title level={2}>Пікірлер</Typography.Title>
            {comments ? comments.map(comment => 
                <Comment
                    author={
                        <Typography.Title level={4}>
                            <Link to={`/user/${comment.user.id}`} className="grayLink">
                                {comment.user.firstName} {comment.user.lastName}
                            </Link>
                        </Typography.Title>
                    }
                    avatar={
                        <Avatar 
                            size={64} 
                            src={`${API_URL}/avatar/${comment.user.avatar}`} 
                            alt={comment.user.firstName} 
                        />
                    }
                    content={<p>{comment.msg}</p>}
                    actions={ (user.id === comment.user.id) ? 
                        [
                            <span onClick={() => deleteComment(comment.id)}><DeleteOutlined /> Жою</span>,
                            <span><HeartFilled /> {comment.likeCount}</span>
                        ] : 
                        [
                            <span onClick={() => reply(comment.user)}><RollbackOutlined /> Жауап беру</span>,
                            <span><HeartFilled /> {comment.likeCount}</span>
                        ]
                    }
                />
            ) : (<Empty description="Пікірлер қалтырылмады" style={{marginBottom: '25px'}} />)}
            {user ? 
                <Form onFinish={addComment} form={form}>
                    <Form.Item name="msg" rules={[{ required: true, message: 'Пікір жазыңыз' }]}>
                        <Input.TextArea rows={4} placeholder="Сіздің пікіріңіз" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Жазу</Button>
                    </Form.Item>
                </Form> : 
                <Alert
                    message="Пікір қалтыру үшін сайқа кіріңіз немесе тіркеліңіз"
                    description="Тек қана авторизацияланған қолданушылар ғана пікір қалтыра алады"
                    type="info"
                    showIcon
                />
            }
        </div>
    );
}

const mapStateToProps = state => ({
    comments: state.comments.comments
})

export default connect(mapStateToProps, { getComments })(Comments);