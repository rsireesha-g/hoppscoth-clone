import React, { useEffect, useState } from 'react'
import { CiCircleQuestion, CiStar } from 'react-icons/ci';
import { Link } from 'react-router';
import { Tooltip } from '../../tooltip';
import { IoFilterCircleOutline } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import DropdownMenu from '../../dropdownMenu';
import { RadioButton } from '../../radioButton';
import emptyImg from "../../../assests/images/history.png"
import { AppDispatch, RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { getHistoryData, onHistoryRestore, restoreHistoryData } from '../../../redux/slices/restApiSlice';
import { useDispatch } from 'react-redux';



export const History = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [search, setSearch] = useState("");
    const [selectedFilterType, setSelectedFilterType] = useState('All');
    const [selectedFilterGroup, setSelectedFilterGroup] = useState('Time');
    const { historyData } = useSelector((state: RootState) => state.restApi)

    const handleHistoryRestore = (requested_at: string) => {
        const x = new Date(requested_at).toLocaleString("en-US", { hourCycle: 'h24' }).slice(0, 19).replace('T', ' ')?.split(" ");
        const y = new Date(requested_at).toISOString().slice(0, 19).replace('T', ' ')?.split(" ");
        console.log(x, y, `${y[0]} ${x[1]}`)
        dispatch(restoreHistoryData({ requested_at: `${y[0]} ${x[1]}` }))
    }

    useEffect(() => {
        dispatch(getHistoryData({ selectedFilterGroup }))
    }, [selectedFilterGroup]);

    return (
        <div className='max-w-full h-full flex flex-col gap-1 '>
            <div className="w-full text-stone-400 border-b border-b-dividerDark flex justify-between align-middle items-center">
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
                        <Tooltip text='Filter' position='top-right'>
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
            <div className="p-2 text-secondary w-full">
                {historyData?.data?.length === 0 ?
                    <div className='flex flex-col gap-2 align-middle items-center'>
                        <img loading="lazy" alt='empty collections ' width={70} height={70} src={emptyImg} />
                        <p className="text-[10px]">History is empty</p>
                    </div>
                    :
                    <>
                        {historyData?.data?.filter((x) => x?.requests?.[0]?.url?.includes(search))?.map((history, ind) => (
                            // <p key={ind}>{history?.url}</p>
                            <details open={true} key={ind} className='mb-2 w-full 
                            '>
                                <summary className='flex justify-between group '>
                                    <span className='truncate w-[80%]'>{history?.url}</span>
                                    <div className='invisible group-hover:visible flex gap-1'>
                                        <MdOutlineDeleteOutline size={18} className='cursor-pointer text-deleteColor' />
                                        <CiStar size={18} className='cursor-pointer text-[#eab308]' />
                                    </div>
                                </summary>
                                <div className='w-full flex flex-col gap-2 my-2 justify-start items-start' >
                                    {history?.requests?.filter((x) => x?.url?.includes(search))?.map((request) => (
                                        <div key={request?.id} className='w-full box-border' onClick={() => handleHistoryRestore(request?.requested_at)}>
                                            <Tooltip text={(new Date(request?.requested_at))?.toLocaleString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: true
                                            })}>
                                                <div className='flex justify-between group ml-0 w-full'>
                                                    <div className='flex-grow flex gap-2 justify-start'>
                                                        <span className='text-getColor'>{request?.method?.toLocaleUpperCase()}</span>
                                                        <span className='truncate group-hover:max-w-[60%] max-w-[80%]'>{request?.url}</span>
                                                    </div>
                                                    <div className='invisible group-hover:visible flex gap-1'>
                                                        <MdOutlineDeleteOutline size={18} className='cursor-pointer text-deleteColor' />
                                                        <CiStar size={18} className='cursor-pointer text-[#eab308]' />
                                                    </div>
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
