import React, { useState } from 'react'
import { BsChat, BsChevronRight, BsPersonAdd } from 'react-icons/bs'
import { FaDiscord } from 'react-icons/fa'
import { LuGithub, LuTwitter } from 'react-icons/lu'
import { MdOutlineClose } from 'react-icons/md'
import shortcutKeyIcon from "../../assests/icons/shortcut.svg";
import { VscBrowser } from 'react-icons/vsc'
import { CiGift } from 'react-icons/ci'
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { onChartBotModalClick, onInviteModalClick, onShortCutsModalClick } from '../../redux/slices/statesSlice';
import { Link } from 'react-router'

type dataObj = {
    label: string,
    description: string,
    icon: any,
    onClick?: () => void,
    url?: string
}


const Card = (item: dataObj) => {
    return (
        <div className="flex align-top justify-start gap-4 p-2 hover:bg-primaryLight rounded-md cursor-pointer" key={item?.label}>
            <div className='text-accentDark'>{item?.icon}</div>
            <div className="flex-grow flex align-middle justify-between items-center gap-2">
                <div className='flex flex-col gap-2 flex-grow'>
                    <p className="text-secondary">{item?.label}</p>
                    <p className="text-[10px] text-stone-600">{item?.description}</p>
                </div>
                <BsChevronRight size={10} />
            </div>
        </div>
    )
}

export const Support = ({ handleClose }: any) => {
    const { isShortCutsModalOpen, isInviteModalOpen } = useSelector((state: RootState) => state.statesStatus);
    const dispatch = useDispatch<AppDispatch>();
    const [isCollapse, setIsCollapse] = useState(false);

    const data: Array<dataObj> = [
        { label: 'Chat with us', description: 'Questions? Chat with us!', icon: <BsChat size={14} className='rotate-180' />, onClick: () => dispatch(onChartBotModalClick(true)) },
        { label: 'Documentation', description: 'Read more about Hoppscotch', icon: <VscBrowser size={14} className='rotate-180' />, url: 'https://docs.hoppscotch.io/' },
        { label: 'Keyboard shortcuts', description: 'Browse app faster', icon: <img loading="lazy" src={shortcutKeyIcon} alt='interceptor' className='w-4 h-4 cursor-pointer' />, onClick: () => dispatch(onShortCutsModalClick(true)) },
        {
            label: 'Whats new', description: 'Read more about latest releases', icon: <CiGift size={14} />, url: 'https://docs.hoppscotch.io / documentation / changelog'
        },
        {
            label: 'Github', description: 'Follow us on Github', icon: <LuGithub size={14} />, url: 'https://hoppscotch.io / github'
        },
        { label: 'Invite', description: 'Invite people to Hoppscotch', icon: <BsPersonAdd size={14} />, onClick: () => dispatch(onInviteModalClick(true)) },
        {
            label: 'Join our Discord community', description: 'Join our Discord community', icon: <FaDiscord size={14} />, url: 'https://hoppscotch.io / discord'
        },
        {
            label: 'Twitter', description: 'Follow us on Twitter', icon: <LuTwitter size={14} />, url: 'https://hoppscotch.io / twitter'
        }
    ];
    const layoutData: Array<dataObj> = [
        {
            label: 'Expand sidebar',
            description: 'Collapse or Expand the sidebar',
            icon: <VscBrowser className={`w-4 h-4 cursor-pointer ${isCollapse ? '-rotate-90' : 'rotate-90'}`} />,
            onClick: () => setIsCollapse(true)
        },
        {
            label: 'Expand Collection Panel',
            description: 'Collapse or Expand Collections',
            icon: <VscBrowser className={`w-4 h-4 cursor-pointer ${isCollapse ? '-rotate-90' : 'rotate-90'}`} />,
            onClick: () => setIsCollapse(true)
        },
    ]
    return (
        <>
            <div className="modal">
                <div className="innerModal pt-0 bottom-0 md:top-12 left-[35%]" >
                    <div className="flex items-center justify-between p-2 pt-4 sticky w-full z-[1] top-0 left-0 bg-popoverColor">
                        <h3 className="ml-4 heading text-center flex-grow">Support</h3>
                        <MdOutlineClose
                            size={20}
                            onClick={handleClose}
                            className='cursor-pointer' />
                    </div>
                    <div className='flex flex-col gap-4 md:hidden'>
                        <p className="text-secondary ">Support</p>
                        {layoutData?.map((item: dataObj) => (
                            <div onClick={() => {
                                item?.onClick?.();
                                handleClose();
                            }}
                                className='w-full'>
                                <Card {...item} />
                            </div>
                        ))}
                    </div>
                    <p className="text-secondary visible md:hidden">Support</p>
                    <div className="flex flex-col gap-2 p-2">
                        {data?.map((item: dataObj) => (
                            item?.url ?
                                <Link to={item?.url} target='_blank'>
                                    <Card {...item} />
                                </Link>
                                :
                                <div onClick={() => {
                                    item?.onClick?.();
                                    handleClose();
                                }}
                                    className='w-full'>
                                    <Card {...item} />
                                </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}
