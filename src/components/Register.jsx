import React, { useState } from 'react'

import { Link, redirect } from 'react-router-dom'
import logo from '../../public/logo.jpg'
import { createNewUser } from '../services'

function Register() {
    const [error, setError] = useState(null)
    const [account, setAccount] = useState(
        {
            name: '',
            dateOfBirth: '',
            username: '',
            password: '',
            phonenumber: ''
        }
    )
    const [formErr, setFormErr] = useState(
        {
            name: '',
            dateOfBirth: '',
            username: '',
            password: '',
            phonenumber: ''
        }
    )
    const validateForm = () => {
        let error = {}
        let isValid = true

        if (!account.name) {
            error.name = 'Hãy điền tên của bạn';
            isValid = false
        }
        if (!account.dateOfBirth) {
            error.dateOfBirth = 'Hãy nhập ngày tháng năm sinh của bạn';
            isValid = false
        }
        if (!account.password) {
            error.password = "Hãy nhập mật khẩu";
            isValid = false
        }
        if (!account.username) {
            error.username = 'Hãy nhập tên tài khoản của bạn';
            isValid = false
        }
        if (!account.phonenumber) {
            error.phonenumber = 'Hãy nhập số điện thoại của bạn';
            isValid = false
        }
        setFormErr(error)
        return isValid
    }
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setAccount((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const newUser = {
                name: account.name,
                address: account.address,
                dateOfBirth: account.dateOfBirth,
                username: account.username,
                password: account.password,
                phonenumber: account.phonenumber
            }
            const response = await createNewUser(newUser)
            if (response.status === 200) {
                alert('Đăng kí tài khoản thành công')
                window.location.href = '/login'

            }
        } catch (error) {
            console.log('error', error);
            setError(error.response.data.message)
        }
    }
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-[url('../../public/loginbg.jpg')]">
            <div className='w-full h-20 pl-12 pt-5'>
                <img src={logo} alt="" width={180} height={180} className=' bg-opacity-0' />

            </div>
            <div className='w-[450px] h-[668px] bg-black bg-opacity-80 py-12 px-[68px] flex flex-col '>
                <h1 className='text-white text-4xl pb-8 font-semibold'>Sign up</h1>
                <div className='items-center flex flex-col'>
                    <input
                        type="text"
                        name='username'
                        placeholder='Username'
                        className=' w-[314px] h-[50px] px-5 rounded-t-md border-b-4 border-yellow-600 mb-2 bg-gray-700'
                        value={account.username}
                        onChange={handleChangeInput} />
                    {formErr.username && <p className='text-sm text-red-500 mb-3'>{formErr.username}</p>}
                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        className=' w-[314px] h-[50px] px-5 rounded-t-md border-b-4 border-yellow-600 bg-gray-700 mb-2'
                        value={account.password}
                        onChange={handleChangeInput} />
                    {formErr.password && <p className='text-sm text-red-500 mb-3'>{formErr.password}</p>}
                    <input
                        type="text"
                        placeholder='Full Name'
                        name='name'
                        className=' w-[314px] h-[50px] px-5 rounded-t-md border-b-4 border-yellow-600 bg-gray-700 mb-2'
                        value={account.name}
                        onChange={handleChangeInput} />
                    {formErr.name && <p className='text-sm text-red-500 mb-3'>{formErr.name}</p>}
                    <input
                        type="phone"
                        name='phonenumber'
                        placeholder='Phone Number'
                        className=' w-[314px] h-[50px] px-5 rounded-t-md border-b-4 border-yellow-600 bg-gray-700 mb-2'
                        value={account.phonenumber}
                        onChange={handleChangeInput} />
                    {formErr.phonenumber && <p className='text-sm text-red-500 mb-3'>{formErr.phonenumber}</p>}
                    <input
                        type="date"
                        name='dateOfBirth'
                        placeholder='dateOfBirth'
                        className=' w-[314px] h-[50px] px-5 rounded-t-md border-b-4 border-yellow-600 bg-gray-700 mb-2'
                        value={account.dateOfBirth}
                        onChange={handleChangeInput} />
                    {formErr.dateOfBirth && <p className='text-sm text-red-500 mb-3'>{formErr.dateOfBirth}</p>}
                    {error && <p className=' text-base text-red-500 mb-3'>{error}</p>}
                    <button
                        className='w-[314px] h-[50px] bg-red-600 text-white rounded-md font-medium mb-4'
                        onClick={handleSubmit}>Sign Up</button>
                </div>
                <div className='flex flex-row'>
                    <p className='mr-1 text-slate-600'>You have a account?</p>
                    <Link to={'/login'} className='text-white'>Sign in now</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
