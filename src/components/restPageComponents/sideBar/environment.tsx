import React, { useEffect, useState } from 'react';
import emptyImg from "../../../assests/images/environment.png"
import { CiCircleQuestion, CiGlobe } from 'react-icons/ci'
import { HiFolderDownload } from 'react-icons/hi'
import { Link } from 'react-router'
import { IoAdd, IoLayersOutline, IoSearch } from 'react-icons/io5'
import { Tooltip } from '../../tooltip'
import { Button } from '../../button';
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaCopy, FaRegEdit } from 'react-icons/fa';
import DropdownMenu from '../../dropdownMenu';
import { EditEnvironmentModal } from './editEnvironmentModal';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { EmptyDataComponent } from '../../common/emptyDataComponent';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { onDeleteEnvironment, onSelectEnvironmentLabel } from '../../../redux/slices/restApiSlice';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { ConfirmationModal } from '../../common/confirmationModal';


const EnvironmentTab = ({ isHovered, setIsHovered, setIsEditModalOpen, isEditModalOpen, selectedLabel = 'Global', label = 'Global' }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedEnvironment } = useSelector((state: RootState) => state.restApi);
    const [isDelteModalOpen, setIsDelteModalOpen] = useState(false);

    const handleEdit = () => {
        dispatch(onSelectEnvironmentLabel(label))
        setIsEditModalOpen(!isEditModalOpen)
    }

    const handleDelete = () => {
        console.log(label, 'sele')
        dispatch(onDeleteEnvironment(label))
    }

    const handleCancel = () => {
        setIsDelteModalOpen(false);
    }

    let itemsArr = [
        { label: 'Edit', icon: <FaRegEdit size={16} className='cursor-pointer' />, kbd: 'E', onClick: handleEdit },
        { label: 'Duplicate', icon: <FaCopy size={16} className='cursor-pointer' />, kbd: 'D' },
        { label: 'Export as JSON', icon: <FaRegEdit size={16} className='cursor-pointer' />, kbd: 'J' }
    ]
    const [items, setItems] = useState(itemsArr)
    useEffect(() => {
        if (label !== 'Global') {
            let deleteLabel = { kbd: '', label: 'Delete', icon: <MdOutlineDeleteOutline size={16} className='cursor-pointer' />, onClick: () => setIsDelteModalOpen(true) };
            setItems([...itemsArr, deleteLabel]);
        }
    }, []);

    return (
        <>
            <div className="flex justify-between align-middle gap-2 w-full border-b border-b-dividerDark p-2 text-secondaryLight hover:text-secondaryDark"
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => { e.stopPropagation(); dispatch(onSelectEnvironmentLabel(label)) }}
            >
                <div className="flex justify-between align-middle gap-2">
                    {label === 'Global' ? <CiGlobe size={16} className='cursor-pointer' />
                        :
                        label === selectedEnvironment ?
                            <IoMdCheckmarkCircleOutline size={16} className='cursor-pointer text-green-600' />
                            : <IoLayersOutline size={16} className='cursor-pointer' />
                    }
                    <p>{label}</p>
                </div >
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
                        items={items}
                    />


                </div>
            </div >
            {isDelteModalOpen && <ConfirmationModal {...{
                handleCancel, handleDelete,
                text: 'Are you sure you want to permanently delete this environment'
            }} />}
        </>
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

    const { environmentData, selectedEnvironment } = useSelector((state: RootState) => state.restApi);

    const handleSearch = (val: string) => {
        setSearch(val);
        let data = environmentData?.filter((x) => x.label?.includes(val))?.map((y) => y.label);
        setSearchResults(data);
    }

    return (
        <>
            <div className='w-full h-full flex flex-col gap-1 '>
                <EnvironmentTab {...{ isHovered, setIsHovered, setIsEditModalOpen, isEditModalOpen, selectedLabel: selectedEnvironment, label: 'Global' }} />
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
                            <EmptyDataComponent imageUrl={emptyImg} mainText='Environments are empty' description='Import or create a environment'>
                                <Button type='primary' text='Import' extraClass='flex-row-reverse'>
                                    <HiFolderDownload size={16} />
                                </Button>
                                <Button type='secondary' text='Add new' extraClass='!flex-row' onClick={() => {
                                    setLabel('');
                                    setIsEditModalOpen(!isEditModalOpen);
                                }}>
                                    <IoAdd size={16} />
                                </Button>
                            </EmptyDataComponent>
                            :
                            environmentData?.filter((x) => x.label !== 'Global')?.map((item) => (
                                <EnvironmentTab {...{ isHovered, setIsHovered, setIsEditModalOpen, isEditModalOpen, label: item?.label, selectedLabel: selectedEnvironment }} />
                            ))
                        :
                        searchedResults?.length === 0 &&
                        <div className='flex flex-col gap-2 align-middle items-center'>
                            <IoSearch size={16} />
                            <p className="text-[10px]">No matching environment found for "`{search}`"</p>
                        </div>
                    }
                </div>
            </div>
            {isEditModalOpen && <EditEnvironmentModal handleModal={() => setIsEditModalOpen(false)} label={label} setLabel={setLabel} />}
        </>
    )
}
