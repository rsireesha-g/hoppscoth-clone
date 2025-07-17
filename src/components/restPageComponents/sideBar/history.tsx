import React, { useState } from 'react'
import { CiCircleQuestion } from 'react-icons/ci';
import { Link } from 'react-router';
import { Tooltip } from '../../tooltip';
import { IoFilterCircleOutline } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import DropdownMenu from '../../dropdownMenu';
import { RadioButton } from '../../radioButton';
import emptyImg from "../../../assests/images/history.png"
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

export const History = () => {
    const [search, setSearch] = useState("");
    const [selectedFilterType, setSelectedFilterType] = useState('All');
    const [selectedFilterGroup, setSelectedFilterGroup] = useState('Time');
    const { historyData } = useSelector((state: RootState) => state.restApi)

    console.log('historyData', historyData);


    const searchedResults = [];

    return (
        <div className='w-full h-full flex flex-col gap-1 '>
            <div className="text-stone-400 border-y border-y-dividerDark flex justify-between align-middle items-center">
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

                    <DropdownMenu position='bottom-right' button={
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
                {historyData?.data?.length === 0 ?
                    search === '' ?
                        <div className='flex flex-col gap-2 align-middle items-center'>
                            <img alt='empty collections ' width={70} height={70} src={emptyImg} />
                            <p className="text-[10px]">History is empty</p>
                        </div>
                        :

                        <>

                        </>
                    :
                    <>
                        {historyData?.data?.map((history, ind) => (
                            // <p key={ind}>{history?.url}</p>
                            <details>
                                <summary>{history?.url}</summary>
                                <div className='flex flex-col gap-2 my-2 justify-start align-top items-start pl-6'>
                                    {history?.requests?.map((request, index) => (
                                        <div key={request?.id}>
                                            <Tooltip text={(new Date(request?.requested_at))?.toLocaleString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: true
                                            })}>
                                                <div className='flex gap-4 justify-start'>
                                                    <p className='text-getColor'>{request?.method?.toLocaleUpperCase()}</p>
                                                    <p>{history?.url}</p>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    ))}

                                </div>
                            </details>
                        ))}
                    </>

                }
            </div>
        </div >
    )
}
