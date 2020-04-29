import React, { useState } from 'react';
import { Tabs, Form, Input, Button, Select, Alert, Menu } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons';
import { API_URL } from '../redux/types';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
const { Option } = Select;

const cities = [
    'Абай', 'Ақкөл', 'Ақсай', 'Ақсу', 'Ақтау', 'Ақтөбе', 'Алға', 'Алматы', 'Арал', 'Арқалық', 'Арыс', 
    'Астана (Нұр-Сұлтан)', 'Атбасар', 'Атырау', 'Аягөз', 'Байқоңыр', 'Балқаш', 'Булаев', 'Державин',
    'Екібастұз', 'Ембі', 'Ерейментау', 'Есік', 'Есіл', 'Жаңаөзен', 'Жаңатас', 'Жаркент', 'Жезқазған', 'Жем', 
    'Жетісай', 'Жітіқара', 'Зайсаң', 'Зыряновск', 'Қазалы', 'Қандыағаш', 'Қапшағай', 'Қарағанды', 'Қаражал', 
    'Қаратау', 'Қарқаралы', 'Қаскелең', 'Кентау', 'Көкшетау', 'Қостанай', 'Құлсары', 'Курчатов', 'Қызылорда', 
    'Леңгір', 'Лисаковск', 'Макинск', 'Мамлют', 'Павлодар', 'Петропавл', 'Приозер', 'Риддер', 'Рудный', 'Саран', 
    'Сарқант', 'Сарыағаш', 'Сәтбаев', 'Семей', 'Сергеев', 'Серебрянск', 'Степногорск', 'Степняк', 'Тайынша', 
    'Талғар', 'Талдықорған', 'Тараз', 'Текелі', 'Темір', 'Теміртау', 'Тобыл', 'Түркістан', 'Орал', 'Өскемен', 
    'Үшарал', 'Үштөбе', 'Форт-Шевченко', 'Хромтау', 'Шардара', 'Шалқар', 'Шар', 'Шахтинск', 'Шемонаиха', 'Шу', 
    'Шымкент', 'Щучинск'
];

const UserHeader = () => {
    const [authFailed, setAuthFailed] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    
    const userAuth = (data) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.email, password: data.password })
        };
        fetch(`${API_URL}/users/auth`, options)
        .then(response => response.json())
        .then(user => {
            if (!user) {
                setAuthFailed(true);
                return;
            }
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
        });
    }
        
    const userReg = (data) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: data.email, 
                password: data.password, 
                firstName: data.firstName, 
                lastName: data.lastName, 
                city: data.city,
                isAdmin: false,
                avatar: "empty.png"
            })
        };
        fetch(`${API_URL}/users`, options)
        .then(response => response.json())
        .then(user => {
            if (!user && user.message) {
                setAuthFailed(true);
                return;
            }
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
        });
        console.log(data);
    }

    function callback(key) {
        console.log(key);
    }

    const userAuthFailed = (data) => {
        console.log(data);
    }

    const userRegFailed = (data) => {
        console.log(data);
    }

    return !user ? (
        <div className="UserHeader">
            <Tabs defaultActiveKey="1" onChange={callback} size="large" style={{margin:0}}>
                <TabPane tab="Кіру" key="1">
                    <Form name="auth" onFinish={userAuth} onFinishFailed={userAuthFailed}>
                        {authFailed ? <Alert message="Қате шықты. Кейін қайта көріңіз" type="error" showIcon style={{marginBottom: '10px'}}/> : null}
                        <Form.Item name="email" rules={[{required: true, message: 'Поштаны еңгізіңіз', type: 'email'}]}>
                            <Input placeholder="Пошта" prefix={<MailOutlined className="prefixIcon" />} />
                        </Form.Item>

                        <Form.Item name="password" rules={[{required: true, message: 'Құпиясөзді еңгізіңіз'}]}>
                            <Input.Password placeholder="Құпиясөз" prefix={<LockOutlined className="prefixIcon" />} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Кіру</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Тіркелу" key="2">
                    <Form name="reg" onFinish={userReg} onFinishFailed={userRegFailed}>
                        <Form.Item style={{marginBottom: 0}}>
                            <Form.Item
                                name="firstName"
                                rules={[{required: true, message: 'Атыңызды еңгізіңіз'}]}
                                style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                            >
                                <Input placeholder="Атыңыз" prefix={<UserOutlined className="prefixIcon" />}/>
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                rules={[{required: true, message: 'Фамилия еңгізіңіз'}]}
                                style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px'}}
                            >
                                <Input placeholder="Фамилия" />
                            </Form.Item>
                        </Form.Item>
                        
                        <Form.Item name="email" rules={[{required: true, message: 'Поштаны еңгізіңіз', type: 'email'}]} hasFeedback>
                            <Input placeholder="Пошта" prefix={<MailOutlined  className="prefixIcon" />} />
                        </Form.Item>

                        <Form.Item 
                            name="password" 
                            rules={[
                                {min: 8, message: 'Құпиясөз 8 символдан тұруы қажет'},
                                {required: true, message: 'Құпиясөзді еңгізіңіз'}
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Құпиясөз" prefix={<LockOutlined className="prefixIcon" />} />
                        </Form.Item>

                        <Form.Item name="city" rules={[{required: true, message: 'Қалаңызды таңдаңыз'}]}>
                            <Select
                                showSearch
                                placeholder="Қай қаладансыз?"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {cities.map(city => <Option value={city}>{city}</Option>)}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Тіркелу</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    ) : (
        <div className="UserHeader authSuccess">
            <Menu mode="inline">
                <Menu.Item key="1"><Link to={`/user/${user.id}`}><UserOutlined /> Менің парақшам</Link></Menu.Item>
                <Menu.Item key="3" onClick={() => {localStorage.removeItem('user');window.location.reload()}}><LogoutOutlined /> Шығу</Menu.Item>
            </Menu>
        </div>
    )
}

export default UserHeader;