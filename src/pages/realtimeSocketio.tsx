import React, { useState } from 'react'
import { Layout } from '../components/layout'
import { TopNavigation } from '../components/realtimeComponents/topNavigation'
import { LogData } from '../components/common/logData';
import { Button } from '../components/button';
import DropdownMenu from '../components/dropdownMenu';
import { Link } from 'react-router';
import { Tooltip } from '../components/tooltip';
import { CiCircleQuestion } from 'react-icons/ci';
import { MdOutlineDeleteForever, MdOutlineWrapText, MdSend } from 'react-icons/md';
import { PiMagicWand } from 'react-icons/pi';
import { BiChevronDown, BiSolidFileImport } from 'react-icons/bi';
import { IoAdd } from 'react-icons/io5';
import emptyImage from "../assests/images/environment.png"
import { BsCheck, BsWifi } from 'react-icons/bs';
import { AuthorizationTab } from '../components/restPageComponents/httpMethodComponents/authorizationTab';
import { RadioButton } from '../components/radioButton';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

export const RealtimeSocketio = () => {
    const [isConnected, setIsConnected] = useState(-1);
    const [urlInput, setUrlInput] = useState('wss://echo-websocket.hoppscotch.io')
    const [eventType, setEventType] = useState('/socket.io');
    const [clientType, setclientType] = useState('Client v4')
    const [tab, setTab] = useState(1);
    const [messageType, setMessageType] = useState('JSON');
    const [topicName, setTopicName] = useState('');
    const [authType, setAuthType] = useState('None');

    return (
        <Layout page='realtime' showShortCuts={isConnected === -1} showRightSideBar={false}>
            <TopNavigation currPage='socket' />
            <div className="w-full p-4 ">
                <div className="flex gap-2 justify-between w-full ">
                    <div className="flex justify-start w-full">
                        <DropdownMenu
                            position='bottom-left'
                            button={
                                <Button type='secondary' text={clientType}
                                    extraClass='flex-row border-0 bg-primaryDark' chevronExists={true}
                                />
                            }>
                            {['Client v2', 'Client v3', 'Client v4']?.map((client: string) => (
                                <div className='text-secondaryLight' onClick={() => setclientType(client)}>{client}</div>
                            ))}

                        </DropdownMenu>
                        <div className='flex gap-2 flex-grow align-middle items-center bg-primaryDark pl-2 -ml-2' >
                            <input type="text" className='flex-grow bg-primaryDark p-2 text-secondaryDark' value={urlInput} onChange={(e: any) => setUrlInput(e.target.value)} />
                            <input type="text" className='flex-grow bg-primaryDark p-2 text-secondaryDark' defaultValue='data' value={eventType} onChange={(e: any) => setEventType(e.target.value)} />
                        </div>
                    </div>
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
                            Authorization
                        </div>
                    </div>
                    {tab === 1 ?
                        <>
                            <div className='w-full p-2 border-b border-b-dividerDark flex gap-2 align-middle'>
                                <BsWifi size={16} className='text-accentDark mt-2 rotate-45' />
                                <input type="text" placeholder='Event Type' className='flex-grow  text-secondary' value={topicName} onChange={(e: any) => setTopicName(e.target.value)} />
                            </div>
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
                                    <p className="text-secondaryLight text-[10px]">Authorization Type</p>
                                    <DropdownMenu position='bottom-left' button={
                                        <p className='flex align-middle gap-1'>{authType}
                                            <BiChevronDown size={16} className='cursor-pointer' />
                                        </p>
                                    }>

                                        {['None', 'Bearer Token']?.map((method: string) => (
                                            // <div onClick={() => closeDropdown()}>
                                            <RadioButton text={method} selected={authType} setSelected={setAuthType} />
                                            // </div>
                                        ))}

                                    </DropdownMenu>
                                </div>

                                <div className="flex gap-4 align-middle items-center">
                                    <Tooltip position='top-left' text='Clear input on send'>
                                        <input type='checkbox' defaultChecked={true} />
                                        <label>Enabled</label>
                                    </Tooltip>
                                    <Tooltip position='top-left' text='Wiki'>
                                        <Link target='_blank' to='https://docs.hoppscotch.io/documentation/features/realtime-api-testing' >
                                            <CiCircleQuestion size={16} className='cursor-pointer' />
                                        </Link>                                    </Tooltip>
                                    <Tooltip position='top-left' text='Clear All'>
                                        <MdOutlineDeleteForever size={16} className='cursor-pointer' />
                                    </Tooltip>

                                </div>
                            </div>
                            {authType === 'None' ?
                                <div className="flex gap-2 align-middle items-center min-h-30 flex-col ">
                                    <img src={emptyImage} alt="no protocols" width={100} height={100} />
                                    <p className='text-[10px] text-secondaryLight'>This SocketIO connection does not use any authentication</p>
                                </div>
                                :
                                <div className="w-full flex gap-0 align-middle text-secondary border-b border-b-dividerDark min-h-40 p-2">
                                    <div className="flex-gow w-[66%] p-2 border-x border-x-dividerDark">Please save this request in amy collection to inherit the authorization</div>
                                    <div className="w-1/3 p-2">
                                        <p className='text-secondary mb-1'>
                                            The authorization header will be automatically generated when you send the request.
                                        </p>
                                        <Link
                                            target="_blank"
                                            className='text-accent hover:text-accentDark flex gap-2 align-middle'
                                            to="https://docs.hoppscotch.io/documentation/features/authorization">
                                            <p>Learn how</p>
                                            <FaArrowUpRightFromSquare size={12} className='cursor-pointer' />
                                        </Link>
                                    </div>
                                </div>
                            }
                        </>
                    }
                </div>
                <LogData {...{ isConnected }} />

            </div>
        </Layout >
    )
}
