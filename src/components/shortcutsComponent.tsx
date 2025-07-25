import React from 'react'
import { Button } from './button'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { TbArrowBack } from "react-icons/tb";

type shortcutsProps = {
    isHorizontalCollapsed: boolean,
}

export const ShortcutsComponent = ({
    isHorizontalCollapsed,
}: shortcutsProps) => {

    return (
        <div className={`${isHorizontalCollapsed ? 'flex-grow w-full h-full' : 'h-full w-full'} 
         p-4`}>
            <div className=' grid grid-cols-1 gap-2 text-secondaryLight w-fit m-auto'>
                <div className='flex gap-2 align-middle justify-end hover:text-secondaryLight'>
                    <p className=''>Send Request</p>
                    <kbd className='kbd'>Ctrl</kbd>
                    <kbd className='kbd'><TbArrowBack className='w-3 h-3' /></kbd>
                </div>
                <div className='flex gap-2 align-middle justify-end hover:text-secondaryLight'>
                    <p className='' >Keyboard shortcuts</p>
                    <kbd className='kbd'>Ctrl</kbd>
                    <kbd className='kbd'>/</kbd>
                </div>
                <div className='flex gap-2 align-middle justify-end hover:text-secondaryLight'>
                    <p className=''>Search & command menu</p>
                    <kbd className='kbd'>Ctrl</kbd>
                    <kbd className='kbd'>K</kbd>
                </div>
                <div className='flex gap-2 align-middle justify-end hover:text-secondaryLight'>
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
