import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    HomeOutlined,
    VideoCameraOutlined,
    UserAddOutlined,
    UserSwitchOutlined,
    ExclamationCircleOutlined,
    VideoCameraAddOutlined,
    SwitcherOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import MainData from './ManageFilm';
import CreateFilm from './CreateFilm';
import EditFilm from './EditFilm';
import CreateAccount from './CreateAccount';
import EditAccount from './EditAccount';
import ManageUser from './ManageUser';

const items1 = [
    { key: '2', label: 'Logout', icon: <LogoutOutlined /> }
];

const items = [
    { key: '1', label: 'Administrator', icon: <HomeOutlined /> },
    {
        key: 'sub1',
        label: 'Quản lí tài khoản',
        icon: <UserOutlined />,
        children: [
            { key: '2', label: 'Thêm tài khoản', icon: <UserAddOutlined />, path: 'create_user' },
            { key: '4', label: 'Thay đổi thông tin tài khoản', icon: <UserSwitchOutlined />, path: 'update_user' },
            { key: '5', label: 'Danh sách tài khoản', icon: <ExclamationCircleOutlined />, path: 'manage_user' }
        ]
    },
    {
        key: 'sub2',
        label: 'Quản lí phim',
        icon: <VideoCameraOutlined />,
        children: [
            { key: '6', label: 'Thêm phim', icon: <VideoCameraAddOutlined />, path: 'create_film' },
            { key: '8', label: 'Thay đổi thông tin phim', icon: <SwitcherOutlined />, path: 'manage_film' }
        ]
    }
];

function AdminPage() {
    const navigate = useNavigate()
    const handleClickLogout = () => {
        localStorage.clear("accessToken")
        navigate('/login')
    }
    return (
        <div className='w-full h-[100vh] flex flex-row bg-white'>
            <div className='w-[280px] h-[100vh] bg-black pt-5 flex flex-col pb-5 justify-between'>
                <div>
                    {items.map(item => (
                        <Menu key={item.key} icon={item.icon} theme='dark' mode="inline" defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']} className='w-[280px] text-base flex px-1'>
                            {item.children ? (
                                <Menu.SubMenu key={item.key} title={item.label} className='w-[275px]'>
                                    {item.children.map(child => (
                                        <Menu.Item key={child.key} icon={child.icon} className='w-[275px]'>
                                            <Link to={`/admin/${child.path}`}>{child.label}</Link>
                                        </Menu.Item>
                                    ))}
                                </Menu.SubMenu>
                            ) : (
                                <Link to={`/admin/${item.path}`}>{item.label}</Link>
                            )}
                        </Menu>
                    ))}
                </div>
                <Menu
                    className='w-[256px]'
                    mode='inline'
                    theme='dark'
                >
                    {items1.map(item => (
                        <Menu.Item key={item.key} icon={item.icon} onClick={handleClickLogout}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
            <Routes>
                <Route path='create_film' element={<CreateFilm />} />
                <Route path='manage_film' element={<MainData />} />
                <Route path={`editfilm/:_id`} element={<EditFilm />} />
                <Route path='create_user' element={<CreateAccount></CreateAccount>}></Route>
                <Route path={`update_user/:_id`} element={<EditAccount />}></Route>
                <Route path='manage_user' element={<ManageUser />}></Route>
            </Routes>
        </div >
    );
}

export default AdminPage;