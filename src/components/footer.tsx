import React, { useEffect, useState } from 'react'
import { BsLayoutSplit } from "react-icons/bs";
import { TbActivityHeartbeat, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { IoChatbubbleOutline, IoShareSocialOutline } from "react-icons/io5";
import { VscBrowser } from "react-icons/vsc";
import { CiCircleQuestion, CiGift } from "react-icons/ci";
import secureImg from "../assests/icons/secure.svg";
import shortcutKeyIcon from "../assests/icons/shortcut.svg";
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ShortcutsSideBar } from './common/shortcutsSideBar';
import { useDispatch } from 'react-redux';
import { onShortCutsModalClick } from '../redux/slices/statesSlice';
import DropdownMenu from './dropdownMenu';
import { RadioButton } from './radioButton';
import { SettingsSection } from './settingsSection';
import { LuGithub, LuTwitter } from 'react-icons/lu';
import { RiAccountCircleLine, RiAccountPinCircleLine } from "react-icons/ri";
import { GoLock } from "react-icons/go";
import { Tooltip } from './tooltip';

type footerProps = {
    setIsCollapse: (x: boolean) => void,
    isCollapse: boolean,
    isRightSideBarCollapsed: boolean,
    setIsRightSideBarCollapsed: (x: boolean) => void,
    isHorizontalCollapsed: boolean,
    setIsHorizontalCollapsed: (x: boolean) => void,
}



export const Footer = ({
    setIsCollapse,
    isCollapse,
    isRightSideBarCollapsed,
    setIsRightSideBarCollapsed,
    isHorizontalCollapsed,
    setIsHorizontalCollapsed
}: footerProps) => {
    const isShortCutsModalOpen = useSelector((state: RootState) => state.statesStatus.isShortCutsModalOpen);
    const dispatch = useDispatch<AppDispatch>();
    const [interceptorSelected, setInterceptorSelected] = useState<string>("Browser");

    const menuItems = [
        { label: 'Documentation', icon: <VscBrowser size={14} className='rotate-180' />, kbd: 'D' },
        { label: 'Keyboard Shortcuts', icon: <img src={shortcutKeyIcon} alt='interceptor' className='w-4 h-4 cursor-pointer' onClick={() => dispatch(onShortCutsModalClick(true))} />, kbd: 'S' },
        { label: 'Chat with us', icon: <IoChatbubbleOutline size={16} /> },
        { label: "What's new?", icon: <CiGift size={16} /> },
        { label: 'Status', icon: <TbActivityHeartbeat size={16} /> },
        { label: 'GitHub', icon: <LuGithub size={16} /> },
        { label: 'Twitter', icon: <LuTwitter size={16} /> },
        { label: 'Invite', icon: <RiAccountCircleLine size={16} /> },
        { label: 'Terms and Privacy', icon: <GoLock size={16} /> },
        { label: 'Hoppscotch v2025.6.0' }
    ];


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key.toLowerCase() === '/') {
                e.preventDefault();
                dispatch(onShortCutsModalClick(true));

            }
            if (e.key === 'Escape') {
                dispatch(onShortCutsModalClick(false));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className='flex justify-between p-2 border border-top-[#666]'>
                <div className='flex gap-2'>
                    <Tooltip text='Collapse sidebar' position='top-left' extraClassName='-mb-0 left-1/2 -bottom-1'>
                        <VscBrowser
                            className={`w-4 h-4 cursor-pointer 
                    ${isCollapse ? '-rotate-90' : 'rotate-90'}
                    `}
                            onClick={() => setIsCollapse(!isCollapse)}
                        />
                    </Tooltip>
                    <Tooltip text='interceptor' position='top-left' extraClassName=''>
                        <DropdownMenu
                            position='top-left'
                            button={
                                <img src={secureImg} alt='interceptor' className='w-4 h-4 cursor-pointer ' />
                            }
                        >
                            <SettingsSection
                                heading='Interceptor'
                                description='Middleware between application and APIs'
                            >    <div className='flex flex-col w-fit px-2'>

                                    {['Browser', 'Proxy', 'Agent', 'Browser extension']?.map((item: string) => (
                                        <RadioButton text={item} selected={interceptorSelected} setSelected={setInterceptorSelected} />
                                    ))}
                                </div>
                            </SettingsSection>
                        </DropdownMenu>
                    </Tooltip>
                </div>
                <div className='flex gap-2'>
                    <DropdownMenu
                        position="top-left"
                        button={
                            <div className='cursor-pointer flex gap-2 text-secondaryDark font-[400]'>
                                <CiCircleQuestion className='w-4 h-4' />
                                Help & feedback
                            </div>
                        }
                        items={menuItems}
                    />
                    <Tooltip position='top-left' text='Shortcuts' kbd={['Ctrl', '/']} extraClassName=' -ml-2 bg-red-500'>
                        <img src={shortcutKeyIcon} alt='interceptor' className='w-4 h-4 cursor-pointer' onClick={() => dispatch(onShortCutsModalClick(true))} />
                    </Tooltip>
                    <Tooltip position='top-right' text='share'>
                        <IoShareSocialOutline className='w-4 h-4 cursor-pointer text-secondaryDark' />
                    </Tooltip>
                    <Tooltip text='Horizontal split' position='top-right'>
                        <BsLayoutSplit className='w-4 h-4 cursor-pointer  text-secondaryDark'
                            onClick={() => setIsHorizontalCollapsed(!isHorizontalCollapsed)}
                        />
                    </Tooltip>
                    <Tooltip text='collapse sidebar' position='top-right'>
                        <TbLayoutSidebarLeftCollapse
                            onClick={() => setIsRightSideBarCollapsed(!isRightSideBarCollapsed)}
                            className={`w-5 h-5 mt-[-0.15rem] cursor-pointer  text-secondaryDark cover ${isRightSideBarCollapsed ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </Tooltip>
                </div>
            </div >
            {
                isShortCutsModalOpen && <ShortcutsSideBar />
            }

        </>
    )
}
