import React, { useRef } from 'react'

export const InputWithDropdown = () => {
    const itemRef = useRef(null);

    return (
        <div className=''>
            <div className='flex justify-between p-2 w-[200px] border border-dividerDark'>
                <input type="text" value='input' placeholder='Enter '
                    className='bg-transparent'
                />
                <div className="">S</div>
            </div>
            <div className="w-[200px]  rounded-md relative -mt-1 h-fit min-h-40 max-h-[300px] bg-[#222]" ref={itemRef}>
                <div className="w-2 h-2 left-1/2 -translate-x-1/2 absolute z-[2] bg-inherit border border-dividerDark border-r-0 border-b-0  rotate-45 -top-1"></div>
                <div className="absolute w-full h-full rounded-md p-2 border shadow-md border-dividerDark">
                    <div className="">hi</div>
                </div>
            </div>
        </div >
    )
}
