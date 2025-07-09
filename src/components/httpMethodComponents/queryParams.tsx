import React, { useState } from 'react'
import { Tooltip } from '../tooltip'
import { CiCircleQuestion } from 'react-icons/ci'
import { MdOutlineDeleteForever, MdOutlineDeleteOutline } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { TiTickOutline } from 'react-icons/ti'
import { KeyValueDescription } from '../../interfaces/restApiInterface'
import { Link } from 'react-router'


interface queryParamProps {
    data: Array<KeyValueDescription>,
    setData: any,
    initialState: Array<KeyValueDescription>
}

export const QueryParams = ({ data, setData, initialState }: queryParamProps) => {


    const handleAddRow = () => {
        let newRow: KeyValueDescription = { key: '', value: '', description: '' }
        setData([...data, newRow])
    };

    const handleChange = (index: number, field: keyof KeyValueDescription, newValue: string) => {
        const rows = [...data];
        rows[index][field] = newValue;
        if (field === 'key') {
            let newRow: KeyValueDescription = { key: '', value: '', description: '' }
            rows[index + 1] ? setData(rows) : setData([...rows, newRow])
        } else
            setData(rows);
    }


    const handleClearAll = () => {
        setData(initialState);
    };

    const handleDeleteRow = (index: number) => {
        const remainingRows = data?.filter((_: any, ind: number) => ind !== index);
        console.log(remainingRows, remainingRows?.length === 0)
        if (remainingRows?.length === 0) {
            console.log('inside', initialState)
            setData((prev: any) => initialState)
        } else {
            setData(remainingRows)
        }
    };

    const handleEdit = () => { console.log('first') };


    return (
        <div>
            {/* top */}
            <div className="flex gap-2  justify-between p-2 border-y border-y-dividerDark px-4">
                <div className="text-secondaryLight">Query data</div>
                <div className="flex gap-2 align-middle text-[#e1e0e0]">
                    <Tooltip position='top-left' text='Wiki'>
                        <Link to="https://docs.hoppscotch.io/documentation/features/rest-api-testing" target='_blank' >
                            <CiCircleQuestion size={16} className='cursor-pointer' />
                        </Link>
                    </Tooltip>
                    <Tooltip position='top-left' text='Clear All'>
                        <MdOutlineDeleteForever size={16} onClick={handleClearAll} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Bulk Edit'>
                        <FaRegEdit size={16} onClick={handleEdit} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Add New'>
                        <IoIosAdd size={20} onClick={handleAddRow} className='cursor-pointer' />
                    </Tooltip>
                </div>
            </div>
            {/* grid */}
            <>
                {data?.map((param: KeyValueDescription, ind: number) => (
                    <div className="w-full flex gap-0 align-middle text-secondaryLight justify-end border-b border-b-dividerDark" key={ind}>
                        <div className="p-1 w-8 border-r border-r-dividerDark"></div>
                        <div className="flex-gow-1 w-[20%] p-1 border-r border-r-dividerDark">
                            <input type='text' placeholder='Key' className='bg-transparent p-2 w-full' name='key' value={param?.key} onChange={(e) => handleChange(ind, "key", e.target.value)} />
                        </div>
                        <div className="flex-gow-2 w-1/4 p-1 border-r border-r-dividerDark">
                            <input type='text' placeholder='Values' className='bg-transparent p-2 w-full' name='value' value={param?.value} onChange={(e) => handleChange(ind, "value", e.target.value)} />
                        </div>
                        <div className="w-[45%] p-1 border-r border-r-dividerDark">
                            <input type='text' placeholder='Description' className='bg-transparent p-2 w-full' name='description' value={param?.description} onChange={(e) => handleChange(ind, "description", e.target.value)} />
                        </div>
                        <div className="p-3 w-fit border-r border-r-dividerDark">
                            <Tooltip position='top-right' text='Turn'>
                                <TiTickOutline className='text-green-500 cursor-pointer' size={16} />
                            </Tooltip>
                        </div>
                        <div className="p-3 w-fit ">
                            <Tooltip position='top-right' text='Remove'>
                                <MdOutlineDeleteOutline className='text-deleteColor cursor-pointer' size={16} onClick={() => handleDeleteRow(ind)} />
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </>
        </div>
    )
}
