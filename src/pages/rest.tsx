import React, { useState } from 'react'
import { Layout } from '../components/layout'
import { BsChevronDown } from 'react-icons/bs'
import { IoIosAdd } from 'react-icons/io'
import { FaCode, FaFileCode, FaRegEdit, FaRegEye } from 'react-icons/fa'
import { TiTickOutline } from "react-icons/ti";
import DropdownMenu from '../components/dropdownMenu'
import { Button } from '../components/button';
import { AiOutlineFolderAdd, AiOutlineReload, AiOutlineSave } from "react-icons/ai";
import { IoLayersOutline, IoShareSocialOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { QueryParams } from '../components/httpMethodComponents/queryParams'
import { AuthorizationTab } from '../components/httpMethodComponents/authorizationTab'
import { RequestScriptTab } from '../components/httpMethodComponents/requestScript'

export const Rest = () => {
    const { environments } = useSelector((state: RootState) => state.statesStatus)
    const [selectedTab, setSelectedTab] = useState('parameters')

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

    const renderByTab = () => {
        switch (selectedTab) {
            case 'parameters':
            case 'headers':
                return <QueryParams />;
            case 'body':
                return ''; // or <BodyTab /> if needed
            case 'authorization':
                return <AuthorizationTab {...{ selectedAuthMethod, setSelectedAuthMethod }} />;
            case 'pre-request script':
            case 'post-request script':
                return <RequestScriptTab {...{ selectedTab }} />;
            default:
                return <QueryParams />;
        }
    };
    return (
        <Layout page='home'>
            <div className='flex gap-2 justify-between align-middle p-2'>
                <div className="flex-grow my-2 flex align-middle items-center">
                    <div className="flex">
                        <Button type='secondary' extraClass='border-0'
                            text={selectedHttpMethod?.label}
                            textColor={selectedHttpMethod?.color}
                        >
                            <p>Untitled</p>
                        </Button>
                    </div>
                    <IoIosAdd size={20} className='cursor-pointer' />
                </div>
                <div className="flex gap-2 align-middle items-center">
                    <DropdownMenu position='bottom-right' extraClass='!min-w-[350px] overflow-x-hidden'
                        button={
                            <Button type='secondary' extraClass='!flex-row border-0'
                                text='Select environment'
                                chevronExists={true}
                            >
                                <IoLayersOutline size={16} />
                            </Button>
                        }
                    >
                        <input type='text' placeholder='Search'
                            className=' border border-dividerDark p-2 text-secondaryDark bg-transparent'
                        />
                        <div className="flex flex-col justify-between w-full">
                            <div className="flex justify-between p-2">
                                <p>No environment</p>
                                <TiTickOutline className='text-accentDark' size={16} />
                            </div>
                            <div className="flex justify-between w-full bg-primary text-secondaryLight">
                                <div className='cursor-pointer min-w-fit  p-2 border-b-2 border-b-accentDark text-secondaryDark'>Personal Environments</div>
                                <div className='cursor-not-allowed min-w-fit  p-2'>Workspace Environments</div>
                            </div>
                            <div className="flex justify-center p-2">
                                {environments ? 'Exists' : 'Empty'}
                            </div>
                        </div>

                    </DropdownMenu>
                    <DropdownMenu position='bottom-right' extraClass='!min-w-[350px] overflow-x-hidden'
                        button={<FaRegEye size={16} />}
                    >
                        <Button type='secondary'
                            text='Global variables'
                            extraClass='w-full  justify-between'
                        >
                            <FaRegEdit size={16} />
                        </Button>
                        <div className="flex flex-col justify-between w-full">
                            <div className="flex gap-2 justify-between p-2 text-[10px]">
                                <p className='flex-grow'>No environment</p>
                                <p>Initial value</p>
                                <p>Current value</p>
                            </div>
                            <p className='p-2 pb-4'>No variables</p>
                            <Button type='secondary' extraClass='cursor-not-allowed w-full justify-between bg-primary'
                                text='Environment variables'
                            >
                                <FaRegEdit size={16} />
                            </Button>
                            <div className="flex justify-center p-2">
                                {environments ? 'Exists' : 'Empty'}
                            </div>
                        </div>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex justify-between gap-2 p-2">
                <div className="overflow-visible relative">
                    <DropdownMenu position='bottom-left' button={
                        <Button type='secondary' text={selectedHttpMethod?.label} chevronExists={true}
                            extraClass={`!flex-row`} textColor={selectedHttpMethod?.color} />
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
                {renderByTab()}
            </div>
        </Layout >
    )
}
