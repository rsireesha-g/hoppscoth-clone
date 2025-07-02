import React from 'react'
import { Button } from './button'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

type shortcutsProps = {
    isHorizontalCollapsed: boolean,
}

export const ShortcutsComponent = ({
    isHorizontalCollapsed,
}: shortcutsProps) => {
    return (
        <div className={`${isHorizontalCollapsed ? 'flex-grow w-full' : 'h-full w-1/2'} 
        border border-blue-700 bg-[#222] p-4`}>
            <div className=' grid grid-cols-1 gap-2 text-secondaryLight w-fit m-auto'>
                <div className='flex gap-2 align-middle justify-end hover:text-secondary'>
                    <p className=''>Send Request</p>
                    <kbd className='kbd'>Ctrl</kbd>
                    <kbd className='kbd'></kbd>
                </div>
                <div className='flex gap-2 align-middle justify-end hover:text-secondary'>
                    <p className=''>Keyboard shortcuts</p>
                    <kbd className='kbd'>Ctrl</kbd>
                    <kbd className='kbd'>/</kbd>
                </div>
                <div className='flex gap-2 align-middle justify-end hover:text-secondary'>
                    <p className=''>Search & command menu</p>
                    <kbd className='kbd'>Ctrl</kbd>
                    <kbd className='kbd'>K</kbd>
                </div>
                <div className='flex gap-2 align-middle justify-end hover:text-secondary'>
                    <p className=''>Help menu</p>
                    <kbd className='kbd'>Ctrl</kbd>
                    <kbd className='kbd'>?</kbd>
                </div>
                <Button text='Documentation' extraClass='m-auto' type='link' nextLink='https://docs.hoppscotch.io/documentation/features/rest-api-testing#response'>
                    <FaArrowUpRightFromSquare className='w-3 h-3 hover:text-secondary' />
                </Button>
            </div>
        </div>
    )
}
