import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, Breadcrumb, Row, Col, Divider, Button } from 'antd';
import { HomeOutlined, BookOutlined, DownloadOutlined } from '@ant-design/icons';
import { getOneBook } from '../redux/effects/books.effects';
import { API_URL } from '../redux/types';
import Comments from '../shared/Comments';

const Book = ({book, getOneBook}) => {
    const { bookId } = useParams();

    useEffect(() => {
        if(bookId) getOneBook(bookId);
    }, [bookId, getOneBook]);

    return book ? (
        <div>
            <Typography.Title level={1} className="title">{book.name}</Typography.Title>
            <div className="padding25">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/library"><BookOutlined /> Кітапхана</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{book.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{marginTop: '25px'}} gutter={25}>
                    <Col span={6}>
                        <img src={`${API_URL}/${book.poster}`} alt={book.name} className="bookPoster" />
                        <Button type="primary" size="large" block>
                            <a href={book.fileUrl} download><DownloadOutlined /> Жүктеу</a>
                        </Button>
                    </Col>
                    <Col span={18}>
                        <b>Авторы:</b> {book.author} <Divider />
                        {book.description}
                    </Col>
                </Row>
            </div>
            <Comments type="book" targetId={book.id} />
        </div>
    ) : null;
}

const mapStateToProps = state => ({
    book: state.books.book
})

export default connect(mapStateToProps, { getOneBook })(Book);