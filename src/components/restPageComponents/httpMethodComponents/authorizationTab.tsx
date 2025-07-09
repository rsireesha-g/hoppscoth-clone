import React from 'react'
import { Tooltip } from '../../tooltip'
import { CiCircleQuestion } from 'react-icons/ci'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { Link } from 'react-router'
import DropdownMenu from '../../dropdownMenu'
import { BiChevronDown } from 'react-icons/bi'
import { RadioButton } from '../../radioButton'
import { authMethods } from '../../../contanst'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

export const AuthorizationTab = ({
    selectedAuthMethod,
    setSelectedAuthMethod
}: any) => {
    return (
        <div>
            <div className="flex gap-2  justify-between p-2 border-y border-y-dividerDark">
                <div className="text-secondaryLight flex gap-4 ">
                    <p>Authorization</p>
                    <DropdownMenu position='bottom-left' button={
                        <p className='flex align-middle gap-1'>{selectedAuthMethod}
                            <BiChevronDown size={16} className='cursor-pointer' />
                        </p>
                    }>
                        {authMethods?.map((method: string) => (
                            <RadioButton text={method} selected={selectedAuthMethod} setSelected={setSelectedAuthMethod} />
                        ))

                        }
                    </DropdownMenu>
                </div>
                <div className="flex gap-2 align-middle text-[#e1e0e0]">
                    <Tooltip position='top-left' text='Wiki'>
                        <Link target='_blank' to="https://docs.hoppscotch.io/documentation/features/authorization" >
                            <CiCircleQuestion size={16} className='cursor-pointer' />
                        </Link>
                    </Tooltip>
                    <Tooltip position='top-left' text='Clear All'>
                        <MdOutlineDeleteForever size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Bulk Edit'>
                        <FaRegEdit size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Add New'>
                        <IoIosAdd size={20} className='cursor-pointer' />
                    </Tooltip>
                </div>
            </div>
            <div className="w-full flex gap-0 align-middle text-secondaryLight border-b border-b-dividerDark">
                <div className="flex-gow w-[66%] p-2 border-x border-x-dividerDark">Please save this request in amy collection to inherit the authorization</div>
                <div className="w-1/3 p-2">
                    <p className='text-secondaryLight mb-1'>
                        The authorization header will be automatically generated when you send the request.
                    </p>
                    <Link
                        target="_blank"
                        className='text-accent hover:text-accentDark flex gap-2 align-middle'
                        to="https://docs.hoppscotch.io/documentation/features/authorization">
                        <p>Learn how</p>
                        <FaArrowUpRightFromSquare size={12} className='cursor-pointer' />
                    </Link>
                </div>
            </div>
        </div>
    )
}
