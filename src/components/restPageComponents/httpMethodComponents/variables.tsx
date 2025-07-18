import React, { useState } from 'react'
import { Tooltip } from '../../tooltip'
import { CiCircleQuestion } from 'react-icons/ci'
import { MdOutlineDeleteForever, MdOutlineDeleteOutline, MdOutlineWrapText } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosAdd, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { VariablesObj } from '../../../interfaces/restApiInterface'
import { Link } from 'react-router'



interface variableProps {
    data: Array<VariablesObj>,
    setData: any,
    initialState: Array<VariablesObj>
}

export const Variables = ({ data, setData, initialState }: variableProps) => {
    const [isBulkEdit, setIsBulkEdit] = useState(false);

    const handleAddRow = () => {
        let newRow: VariablesObj = { variable: '', value: '' }
        setData([...data, newRow])
    };

    const handleChange = (index: number, field: keyof VariablesObj, newValue: string) => {
        const rows = [...data];
        rows[index][field] = newValue;
        if (field === 'variable') {
            let newRow: VariablesObj = { variable: '', value: '' }
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

    const handleBulkEdit = (e: React.ChangeEvent<HTMLInputElement>, ind: number) => {
        const input = e.target.value;
        const [key, value] = input.split(":").map((s) => s.trim()); // trim whitespace
        const updatedRows = [...data];

        updatedRows[ind] = {
            ...updatedRows[ind],
            variable: key || '',
            value: value || ''
        };

        setData(updatedRows);
    };


    return (
        <div>
            {/* top */}
            <div className="flex gap-2  justify-between p-2 border-y border-y-dividerDark px-4">
                <div className="text-secondary">Request Variables</div>
                <div className="flex gap-2 align-middle text-[#e1e0e0]">
                    <Tooltip position='top-left' text='Wiki'>
                        <Link to="https://docs.hoppscotch.io/documentation/features/rest-api-testing" target='_blank' >
                            <CiCircleQuestion size={16} className='cursor-pointer' />
                        </Link>
                    </Tooltip>
                    <Tooltip position='top-left' text='Clear All'>
                        <MdOutlineDeleteForever size={16} onClick={handleClearAll} className='cursor-pointer' />
                    </Tooltip>
                    {isBulkEdit &&
                        <Tooltip position='top-left' text='Wrap Lines'>
                            <MdOutlineWrapText size={16} className='cursor-pointer' />
                        </Tooltip>
                    }
                    <Tooltip position='top-left' text='Bulk Edit'>
                        <FaRegEdit size={16} onClick={() => setIsBulkEdit(!isBulkEdit)} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Add New'>
                        <IoIosAdd size={20} onClick={handleAddRow} className='cursor-pointer' />
                    </Tooltip>
                </div>
            </div>
            {/* grid */}
            <>{
                !isBulkEdit ?
                    <>
                        {data?.map((param: VariablesObj, ind: number) => (
                            <div className="w-full flex gap-0 align-middle text-secondary justify-end border-b border-b-dividerDark" key={ind}>
                                <div className="p-1 w-8 border-r border-r-dividerDark"></div>
                                <div className="flex-gow-1 w-1/2 p-1 border-r border-r-dividerDark">
                                    <input type='text' placeholder={`Variable ${ind + 1}`} className='bg-transparent p-2 w-full' name='key' value={param?.variable} onChange={(e) => handleChange(ind, "variable", e.target.value)} />
                                </div>
                                <div className="flex-gow-2 w-1/2 p-1 border-r border-r-dividerDark">
                                    <input type='text' placeholder={`Value ${ind + 1}`} className='bg-transparent p-2 w-full' name='value' value={param?.value} onChange={(e) => handleChange(ind, "value", e.target.value)} />
                                </div>
                                <div className="p-3 w-fit border-r border-r-dividerDark">
                                    <Tooltip position='top-right' text='Turn'>
                                        <IoMdCheckmarkCircleOutline className='text-green-500 cursor-pointer' size={16} />
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
                    :
                    <div className=" border-b border-b-dividerDark p-2">
                        {data?.map((param: VariablesObj, ind: number) => (
                            <div key={ind} className='w-full flex gap-0 items-center align-middle text-secondary justify-end'>
                                {param?.variable !== '' &&
                                    <>
                                        <div className="p-2 py- w-8 border-r border-r-dividerDark">{ind + 1}</div>
                                        <div className="flex-gow-1 p-1 py-0 w-full">

                                            <input type='text'
                                                placeholder={`${data?.[0]?.variable !== '' ? 'Entries are separated by new line, Keys and values are separated by :' : ''}`}
                                                className='bg-transparent w-full text-accentDark'
                                                name='bulk'
                                                value={`${param?.variable} : ${param?.value}`}
                                                onChange={(e) => handleBulkEdit(e, ind)}
                                            />
                                        </div>
                                    </>
                                }
                            </div>
                        ))}
                    </div>
            }
            </>
        </div >
    )
}
