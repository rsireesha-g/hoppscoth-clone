import React from 'react'
import { Tooltip } from '../tooltip'
import { CiCircleQuestion } from 'react-icons/ci'
import { MdOutlineDeleteForever, MdOutlineDeleteOutline } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { TiTickOutline } from 'react-icons/ti'

export const QueryParams = () => {
    return (
        <div>
            {/* top */}
            <div className="flex gap-2  justify-between p-2 border-y border-y-dividerDark px-4">
                <div className="text-secondaryLight">Query Parameters</div>
                <div className="flex gap-2 align-middle text-[#e1e0e0]">
                    <Tooltip position='top-left' text='Wiki'>
                        <CiCircleQuestion size={16} />
                    </Tooltip>
                    <Tooltip position='top-left' text='Clear All'>

                        <MdOutlineDeleteForever size={16} />
                    </Tooltip>
                    <Tooltip position='top-left' text='Bulk Edit'>
                        <FaRegEdit size={16} />
                    </Tooltip>
                    <Tooltip position='top-left' text='Add New'>
                        <IoIosAdd size={20} />
                    </Tooltip>
                </div>
            </div>
            {/* grid */}
            <div className="w-full flex gap-0 align-middle text-secondaryLight justify-end border-b border-b-dividerDark">
                <div className="p-1 w-8"></div>
                <div className="flex-gow-1 w-[20%] p-2">
                    <input type='text' placeholder='Key' className='bg-transparent p-2 w-full' />
                </div>
                <div className="flex-gow-2 w-1/4 p-2">
                    <input type='text' placeholder='Values' className='bg-transparent p-2 w-full' />
                </div>
                <div className="w-[45%] p-2">
                    <input type='text' placeholder='Description' className='bg-transparent p-2 w-full' />
                </div>
                <div className="p-2 w-fit ">
                    <Tooltip position='top-right' text='Remove'>
                        <TiTickOutline className='text-green-500' size={16} />
                    </Tooltip>
                </div>
                <div className="p-2 w-fit ">
                    <Tooltip position='top-right' text='Remove'>
                        <MdOutlineDeleteOutline className='text-deleteColor' size={16} />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
