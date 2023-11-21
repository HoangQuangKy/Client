import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home/Home';
import AdminPage from '../components/Admin/AdminPage';

function AppRouter() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path='/admin/*' element={<AdminPage />} />
        </Routes>
    );
}

export default AppRouter;