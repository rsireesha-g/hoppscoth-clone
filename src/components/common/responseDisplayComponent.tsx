import React, { useState } from 'react'
import { Tooltip } from '../tooltip';
import { MdOutlineWrapText } from 'react-icons/md';
import { IoFilterCircleOutline } from 'react-icons/io5';
import { LuDownload } from 'react-icons/lu';
import { BsCopy, BsSave, BsThreeDots } from 'react-icons/bs';

export const ResponseDisplayComponent = (response: any) => {
    const [tab, setTab] = useState<string>("JSON");
    console.log(response, 'component inside')

    return (
        <div className='h-[57%] max-h-[57vh] py-2'>
            <div className="flex p-4 justify-start gap-4 font-[600]">
                <div className='flex gap-1 justify-start align-middle'>
                    <span>Status: </span>
                    <span className='text-getColor'>{JSON.stringify(response?.response?.status)}</span>
                    <span className='text-getColor'>{(JSON.stringify(response?.response?.statusText))?.split('"')?.[1]}</span>
                </div>
                <div className='flex gap-1 justify-start align-middle'>
                    <span>Time:</span>
                    <span className='text-getColor'>{JSON.stringify(response?.response?.responseTime)}ms</span>
                </div>
                <div className='flex gap-1 justify-start align-middle'>
                    <span>Size:</span>
                    <span className='text-getColor'>15KB</span>
                </div>
            </div>
            <div className='flex gap-3 justify-start align-middle px-2'>
                {['JSON', 'RAW', 'Headers', 'Test Results']?.map((title: string) => (
                    <div key={title}
                        onClick={() => setTab(title)}
                        className={`border-b-2 p-2 cursor-pointer text-secondaryLight hover:text-secondaryDark
                             ${tab === title ? 'border-b-accentDark !text-secondaryDark' : 'border-b-transparent'}`}
                    >{title}</div>
                ))}
            </div>
            <div className='flex justify-between gap-2 align-middle w-full p-2  border-y border-y-dividerDark'>
                <div>Response Body</div>
                <div className='flex gap-2'>
                    <Tooltip position='top-left' text='Wrap Lines'>
                        <MdOutlineWrapText size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip text='Filter' position='top-right'>
                        <IoFilterCircleOutline size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip text='Download File' position='top-right'>
                        <LuDownload size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Copy'>
                        <BsCopy size={14} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-right' text='Save the request'>
                        <BsSave size={14} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-right' text='more'>
                        <BsThreeDots size={16} className='cursor-pointer' />
                    </Tooltip>
                </div>
            </div>
            <div className='p-2 text-[14px] overflow-y-auto h-[62%] max-h-[62%]'>
                <pre>
                    {(JSON.stringify(response?.response?.data || response?.response))?.split(",")?.join("\n ")}
                </pre>
            </div>
        </div>
    )
}
