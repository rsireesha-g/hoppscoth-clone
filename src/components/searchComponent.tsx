import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { TbArrowBack } from 'react-icons/tb';
import { Modal } from './modal';
import { useSelector } from 'react-redux';
import { onSearchModalClick } from '../redux/slices/statesSlice';

export const SearchComponent = () => {
    const searchRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const isSearchModalOpen = useSelector((state: RootState) => state.statesStatus.isSearchModalOpen);




    return (
        <Modal onClose={() => dispatch(onSearchModalClick(false))} isOpen={isSearchModalOpen}>
            <div className="innerModal overflow-y-hidden p-2 top-16 md:mb-8 w-[500px] min-w-fit min-h-fit left-1/3" ref={searchRef}>
                <div className="flex max-h-[60vh] flex-col">
                    <div className=" text-secondary hover:text-secondaryDark bg-none border-0 p-2">
                        <input className='w-full p-2 bg-transparent focus:border-0' type='text' placeholder='Type a command or search...' />
                    </div>
                    <div className="flex gap-2 justify-between align-middle text-secondary border-t border-dividerDark pt-3 pb-1">
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
        </Modal>
    )
}
