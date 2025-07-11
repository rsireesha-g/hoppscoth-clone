import React from 'react'
import { BsArrowDown, BsArrowUp, BsChevronDown, BsCopy, BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Tooltip } from '../tooltip';


type logDataProp = {
    isConnected: number
}
export const LogData = ({ isConnected }: logDataProp) => {
    return (
        <>
            {isConnected !== -1 &&
                <div className='my-4'>
                    <div className="flex justify-between p-2 border-y border-y-dividerDark">
                        <p className="text-secondary text-[10px]">Log</p>
                        <div className="flex gap-2">
                            <Tooltip position='top-right' text='Delete'>
                                <MdOutlineDeleteOutline size={14} />
                            </Tooltip>
                            <Tooltip position='top-right' text='Scroll up'>
                                <BsArrowUp size={14} />
                            </Tooltip>
                            <Tooltip position='top-right' text='Scroll down'>
                                <BsArrowDown size={14} />
                            </Tooltip>
                            <Tooltip position='top-right' text='Autoscroll: Turn off'>
                                <BsChevronDown size={14} />
                            </Tooltip>

                        </div>
                    </div>
                    <>
                        <div className="flex justify-between border-b border-b-dividerDark px-2">
                            <div className="flex justify-start gap-2 w-full">
                                <BsInfoCircle size={14} className='text-getColor mt-2' />
                                <p className='text-secondaryLight text-[9px] border-x border-x-dividerDark px-4 py-2'>Jul 11, 2025, 7:20:20 AM</p>
                                <div className='flex-grow flex justify-between gap-4 py-2 '>
                                    <p className='text-secondaryLight  flex-grow'>Connected to wss://echo-websocket.hoppscotch.io</p>
                                    <div className='flex gap-4'>
                                        <BsCopy size={16} className='opacity-0 hover:opacity-10' />
                                        <BsChevronDown size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between border-b border-b-dividerDark px-2">
                            <div className="flex justify-start gap-2 w-full">
                                <BsArrowDown size={14} className='text-blue-400 mt-2 rotate-45' />
                                <p className='text-secondaryLight text-[9px] border-x border-x-dividerDark px-4 py-2'>Jul 11, 2025, 7:20:20 AM</p>
                                <div className='flex-grow flex justify-between gap-4 py-2 '>
                                    <p className='text-secondaryLight  flex-grow'>14:22:13 GMT+0000 (Coordinated Universal Time)</p>
                                    <div className='flex gap-4'>
                                        <BsCopy size={16} className='opacity-0 hover:opacity-10' />
                                        <BsChevronDown size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

                    {
                        isConnected === 1 &&
                        <>
                            <div className="flex justify-between border-b border-b-dividerDark px-2">
                                <div className="flex justify-start gap-2 w-full">
                                    <BsInfoCircle size={14} className='text-deleteColor mt-2' />
                                    <p className='text-secondaryLight text-[9px] border-x border-x-dividerDark px-4 py-2'>Jul 11, 2025, 7:20:20 AM</p>
                                    <div className='flex-grow flex justify-between gap-4 py-2 '>
                                        <p className='text-secondaryLight  flex-grow'>Disconnected from wss://echo-websocket.hoppscotch.io</p>
                                        <div className='flex gap-4'>
                                            <BsCopy size={16} className='opacity-0 hover:opacity-10' />
                                            <BsChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )
}
