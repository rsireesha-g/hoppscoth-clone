import React, { useState } from 'react';
import emptyImg from "../../../assests/images/environment.png"
import { CiCircleQuestion, CiGlobe } from 'react-icons/ci'
import { HiFolderDownload } from 'react-icons/hi'
import { Link } from 'react-router'
import { IoAdd, IoSearch } from 'react-icons/io5'
import { Tooltip } from '../../tooltip'
import { Button } from '../../button';
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaCopy, FaRegEdit } from 'react-icons/fa';
import DropdownMenu from '../../dropdownMenu';
import { EditEnvironmentModal } from './editEnvironmentModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


const EnvironmentTab = ({ isHovered, setIsHovered, setIsEditModalOpen, isEditModalOpen, selectedLabel = 'Global', label, setSelectedLabel }: any) => {
    const handleEdit = () => {
        setSelectedLabel(label);
        setIsEditModalOpen(!isEditModalOpen)
    }
    return (
        <div className="flex justify-between align-middle gap-2 w-full border-b border-b-dividerDark p-2 text-secondaryLight hover:text-secondaryDark"
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between align-middle gap-2">
                <CiGlobe size={16} className='cursor-pointer'
                />
                <p>{selectedLabel}</p>
            </div>
            <div className="flex justify-between align-middle gap-2">
                {
                    isHovered &&
                    <>
                        <Tooltip text='Edit' position='top-right'>
                            <FaRegEdit size={16} onClick={handleEdit} />
                        </Tooltip>
                        <Tooltip text='Duplicate' position='top-right'>
                            <FaCopy size={16} />
                        </Tooltip>
                    </>
                }
                <DropdownMenu
                    position='bottom-right'
                    button={
                        <Tooltip text='Menu' position='top-right'>
                            <PiDotsThreeVerticalBold size={16} />
                        </Tooltip>
                    }
                    items={[
                        { label: 'Edit', icon: <FaRegEdit size={16} className='cursor-pointer' />, kbd: 'E', onClick: handleEdit },
                        { label: 'Duplicate', icon: <FaCopy size={16} className='cursor-pointer' />, kbd: 'D' },
                        { label: 'Export as JSON', icon: <FaRegEdit size={16} className='cursor-pointer' />, kbd: 'J' }
                    ]}
                />


            </div>
        </div>
    )
}

export const Environment = () => {
    const [search, setSearch] = useState("");
    const [searchedResults, setSearchResults] = useState<Array<string>>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [environments, setEnvironments] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [label, setLabel] = useState('Global');
    const [selectedLabel, setSelectedLabel] = useState('');

    const { environmentData } = useSelector((state: RootState) => state.restApi);

    const handleSearch = (val: string) => {
        setSearch(val);
        let data = environmentData?.filter((x) => x.label?.includes(val))?.map((y) => y.label);
        setSearchResults(data);
    }

    return (
        <>
            <div className='w-full h-full flex flex-col gap-1 '>
                <EnvironmentTab {...{ isHovered, setIsHovered, setIsEditModalOpen, isEditModalOpen, selectedLabel: 'Global', label, setSelectedLabel }} />
                <input type='search' placeholder='Search'
                    className='w-full p-1'
                    value={search}
                    onChange={(el) => handleSearch(el.target.value)}
                />
                <div className="p-2 text-stone-400 border-y border-y-dividerDark flex justify-between align-middle items-center">
                    <div className="flex gap-2" onClick={() => {
                        setLabel('');
                        setIsEditModalOpen(!isEditModalOpen);
                    }}>
                        <IoAdd size={16} className='cursor-pointer' />
                        <div className="">New</div>
                    </div>
                    <div className="flex gap-2">
                        <Tooltip text='wiki' position='top-right'>
                            <Link to="https://docs.hoppscotch.io/documentation/features/collections" target='_blank'>
                                <CiCircleQuestion size={16} className='cursor-pointer' />
                            </Link>
                        </Tooltip>
                        <Tooltip text='Export / Import' position='top-right'>
                            <HiFolderDownload size={16} className='cursor-pointer' />
                        </Tooltip>
                    </div>
                </div>
                <div className="p-2 text-secondaryLight">
                    {search === '' ?
                        environmentData?.length === 0 ?
                            <div className='flex flex-col gap-2 align-middle items-center'>
                                <img alt='empty collections ' width={70} height={70} src={emptyImg} />
                                <p className="text-[10px]">Environments are empty</p>
                                <p className="text-xs" >Import or create a environment</p>
                                <Button type='primary' text='Import' extraClass='flex-row-reverse'>
                                    <HiFolderDownload size={16} />
                                </Button>
                                <Button type='secondary' text='Add new' extraClass='!flex-row' onClick={() => {
                                    setLabel('');
                                    setIsEditModalOpen(!isEditModalOpen);
                                }}>
                                    <IoAdd size={16} />
                                </Button>
                            </div>
                            :
                            environmentData?.filter((x) => x.label !== 'Global')?.map((item) => (
                                <EnvironmentTab {...{ isHovered, setIsHovered, setIsEditModalOpen, isEditModalOpen, selectedLabel: item?.label, label: item?.label, setSelectedLabel }} />
                            ))
                        :
                        searchedResults?.length == 0 &&
                        <div className='flex flex-col gap-2 align-middle items-center'>
                            <IoSearch size={16} />
                            <p className="text-[10px]">No matching environment found for "`{search}`"</p>
                        </div>
                    }
                </div>
            </div>
            {isEditModalOpen && <EditEnvironmentModal handleModal={() => setIsEditModalOpen(false)} label={selectedLabel} setLabel={setLabel} />}
        </>
    )
}
