import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOnePost } from '../redux/effects/blog.effects';
import { Typography, Breadcrumb, Row, Col } from 'antd';
import { HomeOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import { API_URL } from '../redux/types';
import Comments from '../shared/Comments';

const BlogPost = ({ post, getOnePost }) => {
    const { postId } = useParams();
    useEffect(() => {
        if (postId) getOnePost(postId);
    }, [postId, getOnePost])
    return post ? (
        <div>
            <div className="postWrap" style={{
                    background: `rgba(0, 0, 0, 0) url("${API_URL}/${post.poster}") no-repeat scroll 0% 0% / cover`,
                }}>
                <div className="postHeader">
                    <Row justify="space-between">
                        <Col span={4}>
                            <Breadcrumb style={{marginBottom:'100px'}}>
                                <Breadcrumb.Item><Link to="/" style={{color:'#ddd'}}><HomeOutlined /></Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/blog" style={{color:'#ddd'}}><FileTextOutlined /> Мақалалар</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><span></span></Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                        <Col span={4} style={{textAlign:'right',color:'#ddd'}}>
                            <CalendarOutlined /> {post.postedAt}
                        </Col>
                    </Row>
                    <Typography.Title level={1} style={{margin:0,color:'#ddd'}}>{post.title}</Typography.Title>
                </div>
            </div>
            <div className="padding25">
            <div dangerouslySetInnerHTML={{__html: post.text}}></div>
            </div>
            <Comments type="blog" targetId={post.id} />
        </div>
    ) : null;
}

const mapStateToProps = state => ({
    post: state.blog.onePost
})

export default connect(mapStateToProps, { getOnePost })(BlogPost);