import React, { useState } from 'react'
import { Layout } from '../components/layout'
import { InputWithDropdown } from '../components/inputWithDropdown'
import { CiCircleQuestion } from 'react-icons/ci'
import { LuDelete } from 'react-icons/lu'
import { BsChevronDown, BsPersonAdd, BsSave, BsSave2Fill } from 'react-icons/bs'
import { IoIosAdd } from 'react-icons/io'
import { MdOutlineDeleteForever, MdOutlineDeleteOutline } from 'react-icons/md'
import { FaCode, FaFileCode, FaRegEdit } from 'react-icons/fa'
import { Tooltip } from '../components/tooltip';
import { TiTickOutline } from "react-icons/ti";
import { Link } from 'react-router'
import DropdownMenu, { DropdownItem } from '../components/dropdownMenu'
import { RadioButton } from '../components/radioButton'
import { BiChevronDown } from 'react-icons/bi'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { Button } from '../components/button';
import { AiOutlineFolderAdd, AiOutlineReload, AiOutlineSave } from "react-icons/ai";
import { IoShareSocialOutline } from 'react-icons/io5'

export const Rest = () => {
    const [selectedTab, setSelectedTab] = useState('parameters')
    const authMethods = [
        "Inherit",
        "None",
        "Basic Auth",
        "Digest Auth",
        "Bearer",
        "OAuth 2.0",
        "API Key",
        "AWS Signature",
        "HAWK",
        "JWT"
    ];
    const [selectedAuthMethod, setSelectedAuthMethod] = useState('Inherit');
    const handleHttpMethodSelect = (label: string) => {
        setSelectedHttpMethod(httpMethods?.filter((x: any) => x.label === label)?.[0])
    }
    const httpMethods = [
        { label: 'GET', color: 'var(--method-get-color)', onClick: () => handleHttpMethodSelect('GET') },
        { label: 'POST', color: 'var(--method-post-color)', onClick: () => handleHttpMethodSelect('POST') },
        { label: 'PUT', color: 'var(--method-put-color)', onClick: () => handleHttpMethodSelect('PUT') },
        { label: 'PATCH', color: 'var(--method-patch-color)', onClick: () => handleHttpMethodSelect('PATCH') },
        { label: 'DELETE', color: 'var(--method-delete-color)', onClick: () => handleHttpMethodSelect('DELETE') },
        { label: 'HEAD', color: 'var(--method-head-color)', onClick: () => handleHttpMethodSelect('HEAD') },
        { label: 'OPTIONS', color: 'var(--method-options-color)', onClick: () => handleHttpMethodSelect('OPTIONS') },
        { label: 'CONNECT', color: 'var(--method-default-color)', onClick: () => handleHttpMethodSelect('CONNECT') },
        { label: 'TRACE', color: 'var(--method-default-color)', onClick: () => handleHttpMethodSelect('TRACE') },
        { label: 'CUSTOM', color: 'var(--method-default-color)', onClick: () => handleHttpMethodSelect('CUSTOM') }
    ];
    const [selectedHttpMethod, setSelectedHttpMethod] = useState({ label: 'GET', color: 'var(--method-get-color)' });

    return (
        <Layout page='home'>
            <div className="flex justify-between gap-2 p-2">
                <div className="">
                    <DropdownMenu position='bottom-left' button={
                        <Button type='secondary' text={selectedHttpMethod?.label} chevronExists={true} extraClass={`!flex-row`} textColor={selectedHttpMethod?.color} />
                    }
                        items={httpMethods}
                    ></DropdownMenu>
                    <input type='text' placeholder='Untitled'
                        defaultValue={'https://echo.hoppscotch.io'}
                        className=' border border-dividerDark p-2 text-secondaryDark bg-transparent' />

                </div>
                <div className='flex justify-center gap-4'>
                    <div className='flex justify-center gap-0'>
                        <Button type='primary' text='Send' extraClass='border-r-0 rounded-tr-none rounded-br-none' />
                        <DropdownMenu button={
                            <Button type='primary' text='' extraClass='!min-w-fit border-l-0 rounded-tl-none rounded-bl-none !px-2'>
                                <BsChevronDown size={12} />
                            </Button>
                        }
                            position='header'
                            items={[
                                { label: 'Import CURL', icon: <FaFileCode size={16} />, kbd: 'C,' },
                                { label: 'Show Code', icon: <FaCode size={16} />, kbd: 'S,' },
                                { label: 'Clear All', icon: <AiOutlineReload size={16} className='rotate-180' />, kbd: 'x,' }
                            ]}
                        />
                    </div>
                    <div className='flex justify-center gap-0'>
                        <Button type='secondary' text='Save' extraClass='!flex-row border-r-0 rounded-tr-none rounded-br-none' >
                            <AiOutlineSave size={16} />
                        </Button>
                        <DropdownMenu
                            position='bottom-right'
                            button={
                                <Button type='secondary' chevronExists={true} text='' extraClass='!min-w-fit border-l-0 rounded-tl-none rounded-bl-none !px-2'>
                                </Button>
                            }
                        >
                            <input type='text' placeholder='Untitled'
                                defaultValue={'Untitled'}
                                className=' border border-dividerDark p-2 text-secondaryDark bg-transparent' />
                            <div
                                // onClick={() => {
                                //     item.onClick?.();
                                //     setIsOpen(false);
                                // }}
                                className=" border-b border-b-dividerDark flex items-center text-xs gap-2 px-4 py-1 text-secondary hover:bg-primaryDark  hover:text-secondaryDark cursor-pointer"
                            >
                                <AiOutlineFolderAdd size={16} />
                                <span className='flex-grow truncate max-w-[16rem]'>Save as</span>
                            </div>
                            <div
                                // onClick={() => {
                                //     item.onClick?.();
                                //     setIsOpen(false);
                                // }}
                                className="flex items-center text-xs gap-2 px-4 py-1 text-secondary hover:bg-primaryDark  hover:text-secondaryDark cursor-pointer"
                            >
                                <IoShareSocialOutline size={16} />
                                <span className='flex-grow truncate max-w-[16rem]'>Share Request</span>
                            </div>
                        </DropdownMenu>
                    </div>
                </div>
            </div >
            <div>
                <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(6,auto)' }}>
                    {["parameters", "body", "headers", "authorization", "pre-request script", "post-request script"]?.map((title: string) => (
                        <div key={title}
                            className={`cursor-pointer text-center capitalize text-secondaryLight hover:text-secondaryDark p-2 
                            ${selectedTab === title ? 'border-b-2 border-b-accent !text-secondaryDark' : ''}`}
                            onClick={() => setSelectedTab(title)}
                        >{title}</div>
                    ))}
                </div>
                {(selectedTab === 'parameters' || selectedTab === 'headers') &&
                    <div>
                        {/* top */}
                        <div className="flex gap-2  justify-between p-2 border-y border-y-dividerDark">
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
                            <div className="p-2 w-8"></div>
                            <div className="flex-gow-1 w-[20%] p-2">Key</div>
                            <div className="flex-gow-2 w-1/4 p-2">Values</div>
                            <div className="w-[45%] p-2">Description</div>
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
                }
                {(selectedTab === "pre-request script" || selectedTab === "post-request script") &&
                    <div>
                        {/* top */}
                        <div className="flex gap-2  justify-between p-2 border-y border-y-dividerDark">
                            <div className="text-secondaryLight">JavaScript Code</div>
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
                        <div className="w-full flex gap-0 align-middle text-secondaryLight border-b border-b-dividerDark">
                            <div className="flex-gow-1 w-10 p-2">1</div>
                            <div className="flex-gow-2 w-1/2 p-2 border-x border-x-dividerDark">JavaScript code</div>
                            <div className="w-1/3 p-2">
                                <p className='text-secondaryLight mb-1'>
                                    {selectedTab === 'pre-request script' ?
                                        'Pre-request scrips are written in JavaScript, and are run before the request is sent.'
                                        :
                                        'Post-request scrips are written in JavaScript, and are run after the request is received.'
                                    }
                                </p>
                                <Link
                                    className='text-secondaryLight hover:text-secondaryDark'
                                    to="https://docs.hoppscotch.io/documentation/getting-started/rest/pre-request-scripts">Read documentation</Link>
                            </div>
                        </div>
                    </div>
                }
                {selectedTab === 'authorization' &&
                    <div>
                        <div className="flex gap-2  justify-between p-2 border-y border-y-dividerDark">
                            <div className="text-secondaryLight flex gap-4 ">
                                <p>Authorization</p>
                                <DropdownMenu position='bottom-left' button={
                                    <p className='flex align-middle gap-1'>{selectedAuthMethod}
                                        <BiChevronDown size={16} />
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
                        <div className="w-full flex gap-0 align-middle text-secondaryLight border-b border-b-dividerDark">
                            <div className="flex-gow w-[66%] p-2 border-x border-x-dividerDark">Please save this request in amy collection to inherit the authorization</div>
                            <div className="w-1/3 p-2">
                                <p className='text-secondaryLight mb-1'>
                                    The authorization header will be automatically generated when you send the request.
                                </p>
                                <Link
                                    className='text-accent hover:text-accentDark flex gap-2 align-middle'
                                    to="https://docs.hoppscotch.io/documentation/features/authorization">
                                    <p>Learn how</p>
                                    <FaArrowUpRightFromSquare size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Layout >
    )
}
