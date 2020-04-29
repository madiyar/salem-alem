import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getUser } from '../redux/effects/user.effects';
import { Typography, Breadcrumb, Avatar, Row, Col, Button } from 'antd';
import { HomeOutlined, UserOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import { API_URL } from '../redux/types';
import Comments from '../shared/Comments';

const UserProfile = ({ user, getUser }) => {
    const {userId} = useParams();
    useEffect(() => {
        if(userId) getUser(userId);
    }, [userId, getUser]);

    return user ? (
        <div>
            <Row  className="padding25" style={{background: 'linear-gradient(to top, #d1effd, #7499f0)'}}>
                <Col span={4}>
                    <Avatar size={150} src={`${API_URL}/avatar/${user.avatar}`} alt={user.lastName} className="avatar" />
                </Col>
                <Col span={20}>
                    <Typography.Title level={1} style={{marginBottom:'10px'}}>{user.firstName} {user.lastName}</Typography.Title>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                        <Breadcrumb.Item><UserOutlined /> Қолданушы</Breadcrumb.Item>
                        <Breadcrumb.Item>{user.firstName} {user.lastName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop: '25px'}}>
                        <Button size="middle" shape="round" style={{marginRight:'10px'}}>
                            <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer"><MailOutlined /> E-mail</a>
                        </Button>
                        <Button size="middle" shape="round"><GlobalOutlined /> {user.city}</Button>
                    </div>
                </Col>
            </Row>
            <Comments type="user" targetId={user.id} />
        </div>
    ) : null;
}

const mapStateToProps = state => ({
    user: state.users.user

});

export default connect(mapStateToProps, { getUser })(UserProfile);