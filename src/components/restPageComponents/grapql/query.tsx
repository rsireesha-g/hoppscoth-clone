import React, { useState } from 'react'
import { Tooltip } from '../../tooltip'
import { CiCircleQuestion } from 'react-icons/ci'
import { MdOutlineDeleteForever, MdOutlineDeleteOutline, MdOutlineWrapText, MdSave } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosAdd, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { VariablesObj2 as VariablesObj } from '../../../interfaces/restApiInterface'
import { Link } from 'react-router'
import { BsCopy } from 'react-icons/bs'
import { PiMagicWand } from 'react-icons/pi'



interface variableProps {
    data: Array<VariablesObj>,
    setData: any,
    initialState: Array<VariablesObj>
}

export const Query = ({ data, setData, initialState }: variableProps) => {

    const handleAddRow = () => {
        let newRow: VariablesObj = { value: '' }
        setData([...data, newRow])
    };

    const handleChange = (index: number, field: keyof VariablesObj, newValue: string) => {
        const rows = [...data];
        rows[index][field] = newValue;
        setData(rows);
    }


    const handleClearAll = () => {
        setData(initialState);
    };


    const handleBulkEdit = (e: React.ChangeEvent<HTMLInputElement>, ind: number) => {
        const input = e.target.value;
        const [key, value] = input.split(":").map((s) => s.trim()); // trim whitespace
        const updatedRows = [...data];

        updatedRows[ind] = {
            ...updatedRows[ind],
            value: value || ''
        };

        setData(updatedRows);
    };


    return (
        <div>
            {/* top */}
            <div className="flex gap-2  justify-between p-2 border-y border-y-dividerDark px-4">
                <div className="text-secondary">Variables</div>
                <div className="flex gap-2 align-middle text-secondary">
                    <div className='cursor-pointer flex gap-2'>
                        <MdSave size={16} />
                        <p >Save</p>
                    </div>
                    <Tooltip position='top-left' text='Wiki'>
                        <Link to="https://docs.hoppscotch.io/documentation/features/rest-api-testing" target='_blank' >
                            <CiCircleQuestion size={16} className='cursor-pointer' />
                        </Link>
                    </Tooltip>
                    <Tooltip position='top-left' text='Clear All'>
                        <MdOutlineDeleteForever size={16} onClick={handleClearAll} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Wrap Lines'>
                        <MdOutlineWrapText size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Bulk Edit'>
                        <PiMagicWand size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Add New'>
                        <BsCopy size={16} onClick={handleAddRow} className='cursor-pointer' />
                    </Tooltip>
                </div>
            </div>
            {/* grid */}

            <>
                {data?.map((param: VariablesObj, ind: number) => (
                    <div className="w-full flex gap-0 align-middle text-secondary justify-end" key={ind}>
                        <div className="p-1 w-8 border-r border-r-dividerDark">{ind + 1}</div>
                        <div className="flex-gow border-r border-r-dividerDark w-full">
                            <input type='text' placeholder={`Value`}
                                className='bg-transparent p-1 w-full' name='value' value={param?.value}
                                onChange={(e) => handleChange(ind, "value", e.target.value)}
                                onClick={handleAddRow}
                            />
                        </div>

                    </div>
                ))}
            </>
        </div >
    )
}
