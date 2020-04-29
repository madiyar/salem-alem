import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllBlog } from '../redux/effects/blog.effects';
import { List, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { API_URL } from '../redux/types';
import { Link } from 'react-router-dom';

const BlogList = ({ pageSize = 5, blog, getAllBlog }) => {
    useEffect(() => {
        getAllBlog();
    }, [getAllBlog]);

    return blog ? (
        <div className="padding25">
            <List
                itemLayout="vertical"
                size="large"
                dataSource={blog}
                pagination={{pageSize: pageSize}}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={<img width={450} alt={item.title} src={`${API_URL}/blog_posters/${item.poster}`} />}
                    >
                        <List.Item.Meta
                            title={
                                <Typography.Title level={3}>
                                    <Link to={`/blog/${item.id}`} className="grayLink">{item.title}</Link>
                                </Typography.Title>
                            }
                            description={<span><CalendarOutlined /> {item.postedAt}</span>}
                        />
                        <Typography.Paragraph
                            ellipsis={{
                                rows:4,
                                expandable: false,
                            }}
                        >
                            {item.text.replace(/<\/?[^>]+(>|$)/g, "")}
                        </Typography.Paragraph>
                    </List.Item>
                )}
            />
        </div>
    ) : null;
}

const mapStateToProps = state => ({
    blog: state.blog.allBlog,
});

export default connect(mapStateToProps, { getAllBlog })(BlogList);