import React from 'react'
import { Button } from './button'
import { LuCloudUpload, LuDownload } from "react-icons/lu";
import { HiOutlineSupport } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router';

export const Header = () => {
    return (
        <div className={`w-full p-2 grid grid-cols-5 gap-2 overflow-x-auto overflow-y-hidden border-b-[1px] border-[#302f2f]`}>
            <Link to="/" className={`col-span-2 flex items-center justify-between space-x-2 uppercase`}>Hoppscotch</Link>
            <div className={`col-span-1 flex items-center justify-between space-x-2`}>
                <button className='flex flex-1 cursor-text items-center justify-between self-stretch rounded bg-primaryDark 
                px-2 transition hover:border-dividerDark hover:bg-primaryLight 
                hover:text-secondary focus-visible:border-dividerDark focus-visible:bg-primaryLight 
                focus-visible:text-secondary overflow-hidden text-secondaryLight'
                >   <span className='flex gap-2 items-center flex-nowrap'>
                        <CiSearch className='w-4 h-4' />
                        <span className='text-nowrap'>Search and commands</span>
                    </span>
                    <span className='flex gap-2 items-center'>
                        <kbd className='kbd'>Ctrl</kbd>
                        <kbd className='kbd'>K</kbd>
                    </span>

                </button>
            </div>
            <div className={`col-span-2 flex items-center justify-between space-x-2 gap-2`}>
                <div className={`flex items-center gap-2 space-x-2`}>
                    <LuDownload className='w-4 h-4' />
                    <HiOutlineSupport className='w-4 h-4' />
                </div>
                <div className={`flex items-center gap-2 space-x-2`}>
                    <Button type='bordered' text='My workspace'>
                        <LuCloudUpload className='w-4 h-4' />
                    </Button>
                    <Button type='primary' text='Login' />
                </div>
            </div>
        </div>
    )
}
