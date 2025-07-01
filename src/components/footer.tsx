import React from 'react'
import { BsLayoutSplit } from "react-icons/bs";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscBrowser } from "react-icons/vsc";
import { CiCircleQuestion } from "react-icons/ci";
import secureImg from "../assests/icons/secure.svg";
import shortcutKeyIcon from "../assests/icons/shortcut.svg";

type footerProps = {
    setIsCollapse: (x: boolean) => void,
    isCollapse: boolean,
    isRightSideBarCollapsed: boolean,
    setIsRightSideBarCollapsed: (x: boolean) => void,
    isHorizontalCollapsed: boolean,
    setIsHorizontalCollapsed: (x: boolean) => void,
}

export const Footer = ({ setIsCollapse, isCollapse, isRightSideBarCollapsed, setIsRightSideBarCollapsed, isHorizontalCollapsed, setIsHorizontalCollapsed }: footerProps) => {
    return (
        <div className='flex justify-between p-2 border border-top-[#666]'>
            <div className='flex gap-2'>
                <VscBrowser className={`w-4 h-4 cursor-pointer ${isCollapse ? '-rotate-90' : 'rotate-90'}`} onClick={() => setIsCollapse(!isCollapse)} />
                <img src={secureImg} alt='interceptor' className='w-4 h-4 cursor-pointer ' />
            </div>
            <div className='flex gap-2'>
                <div className='cursor-pointer flex gap-2 text-secondaryDark font-[400]'>
                    <CiCircleQuestion className='w-4 h-4' />
                    Help & feedback
                </div>
                <img src={shortcutKeyIcon} alt='interceptor' className='w-4 h-4 cursor-pointer' />
                <IoShareSocialOutline className='w-4 h-4 cursor-pointer text-secondaryDark' />
                <BsLayoutSplit className='w-4 h-4 cursor-pointer  text-secondaryDark'
                    onClick={() => setIsHorizontalCollapsed(!isHorizontalCollapsed)}
                />
                <TbLayoutSidebarLeftCollapse
                    onClick={() => setIsRightSideBarCollapsed(!isRightSideBarCollapsed)}
                    className={`w-5 h-5 mt-[-0.15rem] cursor-pointer  text-secondaryDark cover ${isRightSideBarCollapsed ? 'rotate-180' : 'rotate-0'}`}
                />
            </div>
        </div >
    )
}
