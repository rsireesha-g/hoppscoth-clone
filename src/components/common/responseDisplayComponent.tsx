import React, { useState } from 'react'

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
                <div>

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
