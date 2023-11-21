import React from 'react'
import logo from '../../../public/logo.jpg'
import search from "../../../public/search.png"
import noti from "../../../public/bell.png"
import NavBarHeader from './NavBarHeader'

function Header() {
    return (
        <div className='flex flex-row w-full h-8 justify-between items-center px-10 mt-5 absolute top-[0px] z-50'>
            <div className='flex flex-row h-8 items-center'>
                <img src={logo} alt="" width={100} height={100} />
                <button className='mx-2 text-sm hover:text-slate-400'>Home</button>
                <button className='mx-2 text-sm hover:text-slate-400'>TV Shows</button>
                <button className='mx-2 text-sm hover:text-slate-400'>Movies</button>
                <button className='mx-2 text-sm hover:text-slate-400'>New & Popular</button>
                <button className='mx-2 text-sm hover:text-slate-400'>My list</button>
                <button className='mx-2 text-sm hover:text-slate-400'>Browse by Languages</button>
            </div>
            <div className='flex flex-row h-8 items-center'>
                <button className='mx-4'>
                    <img src={search} alt="" width={20} height={20} />
                </button>
                <NavBarHeader className='mx-4'></NavBarHeader>
                <button className='mx-4'>
                    <img src={noti} alt="" width={20} height={20} />
                </button>
            </div>
        </div>
    )
}

export default Header
