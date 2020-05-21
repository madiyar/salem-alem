import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllBlog } from '../redux/effects/blog.effects';
import { List, Typography, Input } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { API_URL } from '../redux/types';
import { Link } from 'react-router-dom';

const { Search } = Input;

const BlogList = ({ pageSize = 5, blog, getAllBlog }) => {

    const [showBlog, setShowBlog] = useState();

    useEffect(() => {
        getAllBlog();
    }, [getAllBlog]);

    useEffect(() => {
        if(blog) {
            setShowBlog(blog)
        }
    }, [blog])

    const onSearch = (value) => {
        if(value) {
            setShowBlog(showBlog.filter(
                item => item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            ));
        } else {
            setShowBlog(blog);
        }
    }

    return blog ? (
        <div className="padding25">
            {pageSize > 1 ? 
                <Search
                    placeholder="Мақаланы іздеу"
                    enterButton="Іздеу"
                    size="large"
                    onSearch={value => onSearch(value)}
                /> : null
            }
            <List
                itemLayout="vertical"
                size="large"
                dataSource={showBlog}
                pagination={{pageSize: pageSize}}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={<img width={450} alt={item.title} src={`${API_URL}/${item.poster}`} />}
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