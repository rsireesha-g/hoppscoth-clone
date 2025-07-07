import React, { useEffect, useRef } from 'react'
import { onSearchModalClick } from '../redux/slices/statesSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { TbArrowBack } from 'react-icons/tb';

export const SearchComponent = () => {
    const searchRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                dispatch(onSearchModalClick());
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <div className='modal'>
            <div className="innerModal overflow-y-hidden p-2 top-16 md:mb-8 w-[500px] min-w-fit min-h-fit" ref={searchRef}>
                <div className="flex max-h-[60vh] flex-col">
                    <div className=" text-secondaryLight hover:text-secondaryDark bg-none border-0 p-2">
                        <input className='w-full p-1 bg-transparent focus:border-0' type='text' placeholder='Type a command or search...' />
                    </div>
                    <div className="flex gap-2 justify-between align-middle text-secondaryLight border-t border-dividerDark pt-3 pb-1">
                        <div className="text-[10px] flex">
                            <IoIosArrowRoundUp className="kbd" />
                            <IoIosArrowRoundDown className='kbd' />
                            <span className='ml-1'> to navigate</span>
                            <TbArrowBack className='kbd' />
                            <span className='ml-1'>to select</span>
                        </div>
                        <div className="text-[10px]">
                            <kbd className="kbd uppercase">esc</kbd>
                            <span className='ml-1 '>to close</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
