import React, { useState } from 'react'
import { Layout } from '../components/layout'
import { TopNavigation } from '../components/realtimeComponents/topNavigation'
import { Button } from '../components/button'
import { BsCheck, } from 'react-icons/bs'
import { Tooltip } from '../components/tooltip'
import { MdOutlineDeleteForever, MdOutlineDeleteOutline, MdOutlineWrapText, MdSend } from 'react-icons/md'
import DropdownMenu from '../components/dropdownMenu'
import { Link } from 'react-router'
import { CiCircleQuestion } from 'react-icons/ci'
import { PiMagicWand } from 'react-icons/pi'
import { BiSolidFileImport } from 'react-icons/bi'
import { IoAdd } from 'react-icons/io5';
import emptyImage from "../assests/images/environment.png"
import { LogData } from '../components/common/logData'

export const Realtime = () => {
    const [isConnected, setIsConnected] = useState(-1);
    const [tab, setTab] = useState(1);
    const [messageType, setMessageType] = useState('JSON');

    return (
        <Layout page='realtime' showRightSideBar={false} showShortCuts={false}>
            <TopNavigation currPage='web' />
            <div className="w-full p-4 ">
                <div className="flex gap-2 justify-between">
                    <input type="text" className='w-full flex-grow bg-primaryDark p-2' value='wss://echo-websocket.hoppscotch.io' />
                    <Button type='primary' text={`${isConnected === 0 ? 'Disconnect' : 'Connect'}`} onClick={() => setIsConnected(isConnected === -1 ? 0 : isConnected === 0 ? 1 : 0)} />
                </div>

                <div className=''>
                    <div className="flex justify-start gap-4 align-middle p-2">
                        <div onClick={() => setTab(1)}
                            className={`${tab === 1 && 'border-b-2 border-b-accentDark !text-secondaryDark'} cursor-pointer text-secondaryLight hover:text-secondaryDark p-2 pl-0`}>
                            Communications
                        </div>
                        <div onClick={() => setTab(2)}
                            className={`${tab === 2 && 'border-b-2 border-b-accentDark !text-secondaryDark'} cursor-pointer text-secondaryLight hover:text-secondaryDark p-2 pl-0`}>
                            Protocols
                        </div>
                    </div>
                    {tab === 1 ?
                        <>
                            <div className="flex justify-between gap-4 align-middle">
                                <div className="flex gap-2 align-middle items-center">
                                    <p className="text-secondaryLight text-[10px]">Message</p>
                                    <DropdownMenu
                                        position='bottom-left'
                                        button={
                                            <Button type='secondary' text='JSON' extraClass='!flex-row border-0' chevronExists={true} />
                                        }
                                    >
                                        <div className="flex gap-4" onClick={() => setMessageType("JSON")}>
                                            <p>JSON</p>
                                            {messageType === 'JSON' && <BsCheck size={16} className='text-accentDark' />}
                                        </div>
                                        <div className="flex gap-4" onClick={() => setMessageType("Raw")}>
                                            <p>Raw</p>
                                            {messageType === 'Raw' && <BsCheck size={16} className='text-accentDark' />}
                                        </div>
                                    </DropdownMenu>
                                </div>
                                <div className="flex gap-4 align-middle items-center">
                                    <div className='cursor-not-allowed text-accentDark flex gap-2'>
                                        <MdSend size={16} />
                                        <p >Send</p>
                                    </div>
                                    <Tooltip position='top-left' text='Clear input on send'>
                                        <input type='checkbox' />
                                        <label>Clear Input</label>
                                    </Tooltip>
                                    <Tooltip position='top-left' text='Wiki'>
                                        <Link target='_blank' to='https://docs.hoppscotch.io/documentation/features/realtime-api-testing' >
                                            <CiCircleQuestion size={16} className='cursor-pointer' />
                                        </Link>
                                    </Tooltip>
                                    <Tooltip position='top-left' text='Clear All'>
                                        <MdOutlineDeleteForever size={16} className='cursor-pointer' />
                                    </Tooltip>
                                    <Tooltip position='top-left' text='Wrap lines'>
                                        < MdOutlineWrapText size={16} className='cursor-pointer' />
                                    </Tooltip>
                                    <Tooltip position='top-right' text='Prettify'>
                                        <PiMagicWand size={16} className='cursor-pointer' />
                                    </Tooltip>
                                    <Tooltip position='top-right' text='Import'>
                                        <BiSolidFileImport size={16} className='cursor-pointer' />
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="flex gap-2 align-middle items-center min-h-30">
                                <div className="flex">1</div>
                                <input type="text" className='text-accentDark' placeholder='Message' />
                            </div>
                        </>
                        :
                        <>
                            <div className="flex justify-between gap-4 align-middle">
                                <div className="flex gap-2 align-middle items-center">
                                    <p className="text-secondaryLight text-[10px]">Protocols</p>
                                </div>
                                <div className="flex gap-4 align-middle items-center">
                                    <Tooltip position='top-left' text='Clear All'>
                                        <MdOutlineDeleteForever size={16} className='cursor-pointer' />
                                    </Tooltip>
                                    <Tooltip position='top-left' text='Wrap lines'>
                                        <IoAdd size={16} className='cursor-pointer' />
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="flex gap-2 align-middle items-center min-h-30 flex-col ">
                                <img loading="lazy" src={emptyImage} alt="no protocols" width={100} height={100} />
                                <p className='text-[10px] text-secondaryLight'>Protocols are empty</p>
                            </div>
                        </>
                    }
                </div>

                <LogData {...{ isConnected }} />

            </div>
        </Layout>
    )
}



