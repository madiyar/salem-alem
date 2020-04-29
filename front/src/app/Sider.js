import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { BookOutlined, AppstoreOutlined, FileTextOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const SideBar = () => {
    let href = window.location.href.split('/')[3];
    return (
        <Sider theme='light' className="Sider">
            <Link className="logo" to="/">СәлемӘлем</Link>
            <Menu mode="inline" defaultSelectedKeys={['/'+href]} className="Menu">
                <Menu.Item key="/course">
                    <Link to="/course"><AppstoreOutlined /> Курстар</Link>
                </Menu.Item>
                <Menu.Item key="/library">
                    <Link to="/library"><BookOutlined /> Кітапхана</Link>
                </Menu.Item>
                <Menu.Item key="/blog">
                    <Link to="/blog"><FileTextOutlined /> Мақалалар</Link>
                </Menu.Item>
                <Menu.Item key="/qna">
                    <Link to="/qna"><QuestionCircleOutlined /> Сұрақ/Жауап</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideBar;