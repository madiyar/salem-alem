import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../redux/effects/books.effects';
import { API_URL } from '../redux/types';
import { Typography, Row, Col, Card, Spin } from 'antd';

const { Meta } = Card;

const BooksList = ({slice, books, getAllBooks}) => {
    useEffect(() => {
        getAllBooks();
    }, [getAllBooks]);
    if(slice && books) {
        books = books.slice(0,slice);
    }
    return (
        <div>
            <Typography.Title level={1} className="title">
                {slice ? <Link to="/library/" className="grayLink">Кітапхана</Link> : 'Кітапхана'}
            </Typography.Title>
            {books ? 
                <Row gutter={24} className="coursesGrid">
                    {books.map(book => 
                        <Col span={6}>
                            <Link to={`/library/${book.id}`}>
                                <Card
                                    className="card" 
                                    cover={
                                    <img
                                        alt={book.name}
                                        src={`${API_URL}/${book.poster}`}
                                    />
                                    }
                                >
                                <Meta title={book.name} description={<div>{book.author}</div>} />
                                </Card>
                            </Link>
                        </Col>
                    )}
                </Row> : <Spin size="large" />}
        </div>
    )
}

const mapStateToProps = state => ({
    books: state.books.allBooks
});

export default connect(mapStateToProps, { getAllBooks })(BooksList);