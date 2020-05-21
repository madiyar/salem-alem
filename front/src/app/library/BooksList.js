import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../redux/effects/books.effects';
import { API_URL } from '../redux/types';
import { Typography, Row, Col, Card, Spin, Input } from 'antd';

const { Meta } = Card;
const { Search } = Input;

const BooksList = ({slice, books, getAllBooks}) => {
    const [showBooks, setShowBooks] = useState();

    useEffect(() => {
        getAllBooks();
    }, [getAllBooks]);

    if(slice && books) {
        books = books.slice(0,slice);
    }

    useEffect(() => {
        if(books) {
            setShowBooks(books)
        }
    }, [books]);

    const onSearch = (value) => {
        if(value) {
            setShowBooks(showBooks.filter(
                item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            ));
        } else {
            setShowBooks(books);
        }
    }

    return (
        <div>
            <Typography.Title level={1} className="title">
                {slice ? <Link to="/library/" className="grayLink">Кітапхана</Link> : 
                    <>
                        {/* <Search
                            placeholder="Сұрақты іздеу"
                            enterButton="Іздеу"
                            size="large"
                            onSearch={value => onSearch(value)}
                        /> */}
                        Кітапхана
                    </>
                }
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