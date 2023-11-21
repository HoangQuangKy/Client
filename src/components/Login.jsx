import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../public/logo.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { Login as loginServer } from '../services';
import { setAccessToken } from '../redux/slice/token.slice';
import axios from 'axios';
function Login() {

    const dispatch = useDispatch();
    const username = useSelector((state) => state.token.username)
    const accessToken = useSelector((state) => state.token.accessToken)
    const [account, setAccount] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();


    const [err, setErr] = useState('');
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setAccount((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userLogin = {
                username: account.username,
                password: account.password
            }
            const response = await loginServer(userLogin)
            if (response.status === 200) {
                const tokenData = response.data.data
                const userData = response.data.username
                if (userData === 'admin') {
                    navigate('/admin')
                }
                else {
                    navigate('/')
                }

                dispatch(setAccessToken({ accessToken: tokenData, username: userData }))
                alert("Đăng nhập thành công")
                localStorage.setItem("accessToken", accessToken)

            }
        } catch (error) {
            setErr(error?.response?.data?.message)
        }

    }
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-[url('../../public/loginbg.jpg')]">
            <div className='w-full h-20 pl-12 pt-5'>
                <img src={logo} alt="" width={180} height={180} className=' bg-opacity-0' />

            </div>
            <div className='w-[450px] h-[668px] bg-black bg-opacity-80 py-12 px-[68px] flex flex-col'>
                <h1
                    className=' text-4xl pb-8 font-semibold'>Sign In</h1>
                <div className='items-center flex flex-col'>
                    <input
                        type="text"
                        onChange={handleChangeInput}
                        value={account.username}
                        name='username'
                        placeholder='Username'
                        className=' w-[314px] h-[50px] px-5 rounded-t-md border-b-4 border-yellow-600 mb-5 bg-gray-700' />
                    <input
                        type="password"
                        name='password'
                        onChange={handleChangeInput}
                        value={account.password}
                        placeholder='Password'
                        className=' w-[314px] h-[50px] px-5 rounded-t-md border-b-4 border-yellow-600 bg-gray-700 mb-14' />
                    {err && <p className=' text-base text-red-500 mb-3'>{err}</p>}
                    <button
                        onClick={handleSubmit}
                        className='w-[314px] h-[50px] bg-red-600  rounded-md font-medium mb-4'>Sign In</button>
                </div>
                <div className='flex flex-row justify-between mb-10'>
                    <div className='flex flex-row'>
                        <input type="checkbox" />
                        <p className='text-sm text-slate-600 ml-1'>Remember me</p>
                    </div>
                    <button className='text-sm text-slate-600'>Need helps?</button>
                </div>
                <div className='flex flex-row'>
                    <p className='mr-1 text-slate-600'>New to Netflix?</p>
                    <Link to={'/register'} className='text-white'>Sign up now</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
