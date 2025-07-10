import React, { useEffect, useRef, useState } from 'react'
import { Button } from './button'
import { LuCloudUpload, LuDownload } from "react-icons/lu";
import { HiOutlineSupport } from "react-icons/hi";
import { CiSearch, CiSettings } from "react-icons/ci";
import { Link } from 'react-router';
import DropdownMenu from './dropdownMenu';
import { FaApple, FaCheck, FaLinux, FaWindows } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { useDispatch } from 'react-redux';
import { isAuth, onLoginModalClick, onLogout, onSearchModalClick } from '../redux/slices/statesSlice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { SearchComponent } from './searchComponent';
import { Login } from './login';
import { Tooltip } from './tooltip';
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { BsPerson, BsPersonAdd } from 'react-icons/bs';
import emptyImage from "../assests/images/workspace.png"
import { CreateWorkspace } from './common/createWorkspace';
import { Support } from './common/support';

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [createNewWorkspace, setCreateNewWorkspace] = useState(false);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
    const { isLoggedIn, isLoginModalOpen, isSearchModalOpen, email } = useSelector(
        (state: RootState) => state.statesStatus
    );

    const downloadItems = [
        { label: 'macOS', icon: <FaApple size={16} /> },
        { label: 'Windows', icon: <FaWindows size={16} /> },
        { label: 'Linux', icon: <FaLinux size={16} /> },
        { label: 'Web App', icon: <CiGlobe size={16} /> },
        { label: 'CLI', icon: <HiOutlineCommandLine size={16} /> }
    ];

    const handleLogout = () => {
        dispatch(onLogout())
    }

    const profileItems = [
        { label: 'Profile', icon: <CgProfile size={16} />, kbd: 'P' },
        { label: 'Settings', icon: <CiSettings size={16} />, kbd: 'S' },
        { label: 'Logout', icon: <FaArrowRightFromBracket size={16} />, kbd: 'L', onclick: { handleLogout } },
    ];

    useEffect(() => { dispatch(isAuth()) }, []);

    return (
        <>
            <div className={`relative w-full p-2 grid grid-cols-5 gap-2  border-b-[1px] border-[#302f2f]`}>
                <Link to="/" className={`col-span-2 flex items-center justify-between space-x-2 uppercase`}>Hoppscotch</Link>
                <div className={`col-span-1 flex items-center justify-between space-x-2`}>
                    <button className='p-1 flex flex-1 cursor-text items-center justify-between self-stretch rounded bg-primaryDark 
                px-2 transition hover:border-dividerDark hover:bg-primaryLight 
                hover:text-secondary focus-visible:border-dividerDark focus-visible:bg-primaryLight 
                focus-visible:text-secondary overflow-hidden text-secondaryLight'

                        onClick={() => dispatch(onSearchModalClick(true))}
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
                        <Tooltip text='Options' position='bottom'>
                            <HiOutlineSupport className='w-4 h-4' onClick={() => setIsSupportModalOpen(true)} />
                        </Tooltip>
                    </div>
                    {!isLoggedIn ?
                        <div className={`flex items-center gap-2 space-x-2`}>

                            <Tooltip text='My work space' position='bottom'>
                                <Button type='bordered' text='My workspace' onClick={() => dispatch(onLoginModalClick(isLoggedIn ? false : true))}>
                                    <LuCloudUpload className='w-4 h-4' />
                                </Button>
                            </Tooltip>
                            <Button type='primary' text='Login' onClick={() => dispatch(onLoginModalClick(isLoggedIn ? false : true))} />
                        </div>
                        :
                        <div className={`flex items-center gap-2 space-x-2`}>
                            <Tooltip text='Invite' position='bottom'>
                                <BsPersonAdd size={20} />
                            </Tooltip>
                            <DropdownMenu
                                position='bottom-right'
                                button={
                                    <Tooltip text="Change workspace" position='bottom'>
                                        <Button extraClass='!text-accent !border-accent text-xs !p-1'
                                            type='bordered' text='Personal workspace'
                                            chevronExists={true}
                                            onClick={() => dispatch(isAuth())}>
                                            <BsPerson className='w-4 h-4' />
                                        </Button>
                                    </Tooltip>
                                }
                            >
                                <div className="flex flex-col gap-2 justify-center">
                                    <div className="flex gap-2 justify-between hover:bg-primaryDark p-2">
                                        <BsPerson size={16} />
                                        <p className='text-[10px]'>Personal Workspace</p>
                                        <FaCheck className='text-accentDark' size={16} />
                                    </div>
                                    <div className="flex text-secondaryLight hover:text-secondaryDark border-y border-y-dividerDark flex-col gap-2 justify-center align-middle items-center p-4">
                                        <img src={emptyImage} width={70} height={70} alt="no workspace" />
                                        <p className="text-[10px] font-normal">You don't belong to any workspaces</p>
                                        <Button type='secondary' text='+ Create new workspace' extraClass='!flex-row'
                                            onClick={() => setCreateNewWorkspace(true)} />
                                    </div>
                                    <Button type='primary' text='Create an organization' />
                                </div>
                            </DropdownMenu>

                            <DropdownMenu
                                button={
                                    <CgProfile size={20} />
                                }
                                items={profileItems}
                                position='header-right'
                                childrenPosition="top"
                            >
                                <div className="border-b border-b-dividerDark pb-2">
                                    <p className="">{email && email?.split("@")?.[0]}</p>
                                    <p className="text-[10px] text-secondary">{email}</p>
                                </div>
                            </DropdownMenu>

                        </div>
                    }
                </div>
            </div>
            {isSearchModalOpen && <SearchComponent />}
            {isLoginModalOpen ? !isLoggedIn && <Login /> : ''}
            {createNewWorkspace && <CreateWorkspace handleClose={() => setCreateNewWorkspace(false)} />}
            {isSupportModalOpen && <Support handleClose={() => setIsSupportModalOpen(false)} />}
        </>
    )
}
