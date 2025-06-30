import React from 'react'
import { Button } from './button'

export const Header = () => {
    return (
        <div className={`w-full p-2 grid grid-cols-5 gap-2 overflow-x-auto overflow-y-hidden border-b-[1px] border-[#302f2f]`}>
            <div className={`col-span-2 flex items-center justify-between space-x-2`}>Hoppscoth</div>
            <div className={`col-span-1 flex items-center justify-between space-x-2`}>Search bar</div>
            <div className={`col-span-2 flex items-center justify-between space-x-2`}>
                <div>Download</div>
                <div className='text-green border-[1px] border-emerald-600/25 bg-emerald-500/10 !text-emerald-500 hover:border-emerald-600/20 hover:bg-emerald-600/20 focus-visible:border-emerald-600/20 focus-visible:bg-emerald-600/20'>
                    <span>Work my space</span>
                </div>
                <Button type='primary' text='Login' />
            </div>
        </div>
    )
}
