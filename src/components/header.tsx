import React, { useRef } from 'react'
import { Button } from './button'
import { LuCloudUpload, LuDownload } from "react-icons/lu";
import { HiOutlineSupport } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router';
import DropdownMenu from './dropdownMenu';
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { useDispatch } from 'react-redux';
import { onSearchModalClick } from '../redux/slices/statesSlice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { SearchComponent } from './searchComponent';

export const Header = () => {

    const downloadItems = [
        { label: 'macOS', icon: <FaApple size={16} /> },
        { label: 'Windows', icon: <FaWindows size={16} /> },
        { label: 'Linux', icon: <FaLinux size={16} /> },
        { label: 'Web App', icon: <CiGlobe size={16} /> },
        { label: 'CLI', icon: <HiOutlineCommandLine size={16} /> }
    ];

    const dispatch = useDispatch<AppDispatch>();
    const isSearchModalOpen = useSelector((state: RootState) => state.statesStatus?.isSearchModalOpen)
    return (
        <>
            <div className={`relative w-full p-2 grid grid-cols-5 gap-2  border-b-[1px] border-[#302f2f]`}>
                <Link to="/" className={`col-span-2 flex items-center justify-between space-x-2 uppercase`}>Hoppscotch</Link>
                <div className={`col-span-1 flex items-center justify-between space-x-2`}>
                    <button className='flex flex-1 cursor-text items-center justify-between self-stretch rounded bg-primaryDark 
                px-2 transition hover:border-dividerDark hover:bg-primaryLight 
                hover:text-secondary focus-visible:border-dividerDark focus-visible:bg-primaryLight 
                focus-visible:text-secondary overflow-hidden text-secondaryLight'

                        onClick={() => dispatch(onSearchModalClick())}
                    >
                        <span className='flex gap-2 items-center flex-nowrap'>
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

                        <DropdownMenu
                            button={
                                <LuDownload className='w-4 h-4' />
                            }
                            items={downloadItems}
                            position='header'
                        />
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
            {isSearchModalOpen && <SearchComponent />}
        </>
    )
}
