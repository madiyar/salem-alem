import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Layout, Button, Dropdown, Result } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SideBar from './Sider';
import Home from './home/Home';
import Courses from './course/Courses';
import Course from './course/Course';
import BooksList from './library/BooksList';
import UserHeader from './user/UserHeader';
import Book from './library/Book';
import BlogList from './blog/BlogList';
import UserProfile from './user/UserProfile';
import BlogPost from './blog/BlogPost';
import CategoriesList from './qna/CategoriesList';
import QuestionPage from './qna/QuestionPage';

const { Header, Content } = Layout;

function Main() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Router>
            <Layout className="Main">
                <SideBar />
                <Layout>
                    <Header className="Header">
                        <div style={{float:'right'}}>
                            <Dropdown overlay={<UserHeader />} trigger={['click']} placement="bottomRight">
                                <Button shape="round" size="large" onClick={e => e.preventDefault()}>
                                    <UserOutlined /> {user ? user.firstName : 'Кіру'}
                                </Button>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content className="Content">
                        <div className="Wrap">
                            <Switch>
                                <Route exact path="/"><Home /></Route>
                                <Route path="/course/:url/:chapterId?"><Course /></Route>
                                <Route path="/course"><Courses /></Route>
                                <Route path="/library/:bookId"><Book /></Route>
                                <Route path="/library"><BooksList /></Route>
                                <Route path="/blog/:postId"><BlogPost /></Route>
                                <Route path="/blog"><BlogList /></Route>
                                <Route path="/question/:questionId"><QuestionPage /></Route>
                                <Route path="/qna/:categoryId?"><CategoriesList /></Route>
                                <Route path="/user/:userId"><UserProfile /></Route>
                                <Route path="*">
                                    <Result
                                        status="404"
                                        title="404"
                                        subTitle="Бұл парақша табылмады"
                                        extra={<Button type="primary"><Link to="/">Басты бетке</Link></Button>}
                                    />    
                                </Route>
                            </Switch>
                            <Layout.Footer className="Footer">
                                &copy; Madiyar
                            </Layout.Footer>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}
export default connect()(Main);