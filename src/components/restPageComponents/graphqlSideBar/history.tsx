import React, { useState } from 'react'
import { CiCircleQuestion } from 'react-icons/ci';
import { Link } from 'react-router';
import { Tooltip } from '../../tooltip';
import { IoFilterCircleOutline } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import DropdownMenu from '../../dropdownMenu';
import { RadioButton } from '../../radioButton';
import emptyImg from "../../../assests/images/history.png"

export const History = () => {
    const [search, setSearch] = useState("");
    const [selectedFilterType, setSelectedFilterType] = useState('All');
    const [selectedFilterGroup, setSelectedFilterGroup] = useState('Time');

    const searchedResults = [];

    return (
        <div className='w-full h-full flex flex-col gap-1 '>
            <div className="text-stone-400 border-b border-b-dividerDark flex justify-between align-middle items-center">
                <input type='search' placeholder='Search'
                    className='w-full'
                    value={search}
                    onChange={(el) => setSearch(el.target.value)}
                />
                <div className="flex gap-2">
                    <Tooltip text='wiki' position='top-right'>
                        <Link to="https://docs.hoppscotch.io/documentation/features/history" target='_blank'>
                            <CiCircleQuestion size={16} className='cursor-pointer' />
                        </Link>
                    </Tooltip>
                    <DropdownMenu position='bottom-left' button={
                        <Tooltip text='Export / Import' position='top-right'>
                            <IoFilterCircleOutline size={16} className='cursor-pointer' />
                        </Tooltip>
                    }>
                        <p className='text-[10px'>Filter</p>
                        {['All', 'Starred']?.map((method: string) => (
                            <RadioButton text={method} selected={selectedFilterType} setSelected={setSelectedFilterType} />
                        ))}
                        <p className='text-[10px'>Group by</p>
                        {['Time', 'URL']?.map((method: string) => (
                            <RadioButton text={method} selected={selectedFilterGroup} setSelected={setSelectedFilterGroup} />
                        ))}
                    </DropdownMenu>
                    <MdOutlineDeleteOutline size={16} className='cursor-pointer' />

                </div>
            </div>
            <div className="p-2 text-secondary">
                {search === '' ?
                    <div className='flex flex-col gap-2 align-middle items-center'>
                        <img alt='empty collections ' width={70} height={70} src={emptyImg} />
                        <p className="text-[10px]">History is empty</p>
                    </div>
                    :

                    "Exists"

                }
            </div>
        </div>
    )
}
