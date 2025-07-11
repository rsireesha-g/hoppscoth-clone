import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout'
import { BsChevronDown } from 'react-icons/bs'
import { IoIosAdd, IoMdCheckmark, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { FaCode, FaFileCode, FaRegEdit, FaRegEye } from 'react-icons/fa'
import DropdownMenu from '../components/dropdownMenu'
import { Button } from '../components/button';
import { AiOutlineFolderAdd, AiOutlineReload, AiOutlineSave } from "react-icons/ai";
import { IoLayersOutline, IoSearch, IoShareSocialOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { QueryParams } from '../components/restPageComponents/httpMethodComponents/queryParams'
import { AuthorizationTab } from '../components/restPageComponents/httpMethodComponents/authorizationTab'
import { RequestScriptTab } from '../components/restPageComponents/httpMethodComponents/requestScript'
import { KeyValueDescription, MethodData, VariablesObj } from '../interfaces/restApiInterface';
import { Variables } from '../components/restPageComponents/httpMethodComponents/variables'
import emptyImg from "../assests/images/environment.png"
import { EmptyDataComponent } from '../components/common/emptyDataComponent'
import { onSelectEnvironmentLabel } from '../redux/slices/restApiSlice'
import { useDispatch } from 'react-redux'
import { EditEnvironmentModal } from '../components/restPageComponents/sideBar/editEnvironmentModal'
import { BodyComponent } from '../components/restPageComponents/httpMethodComponents/bodyComponent'
import { MdOutlineClose } from 'react-icons/md'

const paramsInitialState: Array<KeyValueDescription> = [{ key: '', value: '', description: '' }];
const variablesInitialState: Array<VariablesObj> = [{ variable: '', value: '' }];


export const Rest = () => {
    const { environmentData, selectedEnvironment, methodTabsData } = useSelector((state: RootState) => state.restApi);
    const [selectedTab, setSelectedTab] = useState('parameters')
    const dispatch = useDispatch<AppDispatch>();
    const newTabData: MethodData = {
        method: 'GET',
        title: '',
        parameters: [{ key: '', value: '', description: '' }],
        headers: [{ key: '', value: '', description: '' }],
        body: '',
        authorization: '',
        preRequestScript: '',
        postRequestScript: '',
        variables: [{ variable: '', value: '' }],
        index: methodTabsData?.length
    };
    const [tabsData, setTabsData] = useState<Array<MethodData>>([newTabData]);
    const [tabIndex, setTabIndex] = useState(0);

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
    const [parameters, setParameters] = useState<Array<KeyValueDescription>>(paramsInitialState);
    const [headers, setHeaders] = useState<Array<KeyValueDescription>>(paramsInitialState);
    const [variables, setVariables] = useState<Array<VariablesObj>>(variablesInitialState);
    const [search, setSearch] = useState('');
    const [searchedResults, setSearchResults] = useState<Array<string>>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const environment = environmentData?.filter((env) => env.label === selectedEnvironment);
    const globalEnv = environmentData?.filter((env) => env.label === 'Global');
    const [selectedMethodTab, setSelectedMethodTab] = useState<MethodData>(methodTabsData?.[0]);

    const handleSearch = (val: string) => {
        setSearch(val);
        let data = environmentData?.filter((x) => x.label?.includes(val))?.map((y) => y.label);
        setSearchResults(data);
    }

    const renderByTab = () => {
        switch (selectedTab) {
            case 'variables':
                return <Variables {...{ data: variables, setData: setVariables, initialState: variablesInitialState }} />;
            case 'body':
                return <BodyComponent {...{ onOverRide: setSelectedTab }} />;
            case 'authorization':
                return <AuthorizationTab {...{ selectedAuthMethod, setSelectedAuthMethod }} />;
            case 'pre-request script':
            case 'post-request script':
                return <RequestScriptTab {...{ selectedTab }} />;
            default:
                return <QueryParams {...{ data: headers, setData: setHeaders, initialState: paramsInitialState }} />;
        }
    };

    const handleAddNewTab = () => {
        let tab = { ...newTabData, index: tabsData?.length }
        setTabsData([...tabsData, tab])
    }
    useEffect(() => {
        setSelectedMethodTab(tabsData?.[tabIndex])
    }, [tabIndex])
    return (
        <Layout page='home' >
            <div className='flex gap-2 justify-between align-middle p-2'>
                <div className="flex-grow my-2  max-w-1/2 flex align-middle items-center w-[76%] max-w-[76%]">
                    {tabsData?.map((tab: MethodData, ind: number) => (
                        <div className="flex align-middle items-center" style={{ width: (tabIndex === ind) ? '300px' : `calc(76%/${tabsData?.length})` }}
                            key={ind}
                        >
                            <Button type='secondary' extraClass='border-0 w-20 flex overflow-x-clip'
                                text={tab?.method}
                                textColor={selectedHttpMethod?.color}
                                onClick={() => setTabIndex(ind)}
                            >
                                <input type='text' placeholder='Untitled' value={''} className='max-w-[80%]' />
                            </Button>
                            <MdOutlineClose size={14} className='cursor-pointer' onClick={() => {
                                let data = tabsData?.filter((_, i: number) => i !== ind);
                                setTabsData(data);
                                if (data?.length === 0) {
                                    setTabsData([newTabData]);
                                    setTabIndex(0)
                                }
                            }} />
                        </div>
                    ))}
                    <IoIosAdd size={16} className='w-4 h-4 cursor-pointer flex-grow' onClick={handleAddNewTab} />
                </div>
                <div className="flex gap-2 align-middle items-center">
                    <DropdownMenu position='bottom-right' extraClass='!min-w-[350px] overflow-x-hidden'
                        button={
                            <Button type='secondary' extraClass='!flex-row border-0'
                                text={`${(selectedEnvironment && selectedEnvironment !== 'Global') ? selectedEnvironment : 'Select environment'}`}
                                chevronExists={true}
                            >
                                <IoLayersOutline size={16} />
                            </Button>
                        }
                    >
                        <input type='text' placeholder='Search'
                            value={search}
                            onChange={(el) => handleSearch(el.target.value)}
                            className=' border border-dividerDark p-2 text-secondaryDark bg-transparent'

                        />
                        <div className="flex flex-col justify-between w-full">
                            <div className="flex justify-between p-2">
                                <p>No environment</p>
                                <IoMdCheckmarkCircleOutline className='text-accentDark' size={16} />
                            </div>
                            <div className="flex justify-between w-full bg-primary text-secondary">
                                <div className='cursor-pointer min-w-fit  p-2 border-b-2 border-b-accentDark text-secondaryDark'>Personal Environments</div>
                                <div className='cursor-not-allowed min-w-fit  p-2'>Workspace Environments</div>
                            </div>
                            <div className="flex justify-center p-2">
                                {search === '' ?
                                    environmentData?.length === 0 ?
                                        <EmptyDataComponent imageUrl={emptyImg} mainText='Environments are empty' />
                                        :
                                        environmentData?.filter((x) => x.label !== 'Global')?.map((item) => (
                                            <div className='flex gap-2 justify-start w-full align-middle'
                                                onClick={() => {
                                                    dispatch(onSelectEnvironmentLabel(item?.label));

                                                }}>
                                                <IoLayersOutline size={16} />
                                                <p className='flex-grow'>{item?.label}</p>
                                                <IoMdCheckmark size={16} />
                                            </div>
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

                    </DropdownMenu>
                    <DropdownMenu position='bottom-right' extraClass='!min-w-[350px] overflow-x-hidden'
                        button={<FaRegEye size={16} />}
                    >{({ closeDropdown }: any) => (
                        <>
                            <Button type='secondary'
                                text='Global variables'
                                extraClass='w-full  justify-between'
                            >
                                <FaRegEdit size={16} onClick={() => {
                                    closeDropdown();
                                    setTimeout(() => setIsEditModalOpen(true), 10);
                                }} />
                            </Button>
                            <div className="flex flex-col justify-between w-full">
                                <div className="flex gap-2 justify-between p-2 text-[10px]">
                                    <p className='flex-grow'>Name</p>
                                    <p>Initial value</p>
                                    <p>Current value</p>
                                </div>
                                {globalEnv?.length === 0
                                    ? <p className='p-2 pb-4'>No variables</p>
                                    :
                                    globalEnv?.[0]?.variables.map((env) => (
                                        <div className="flex gap-2 justify-between p-2 text-[10px]">
                                            <p className='flex-grow'>{env?.variable}</p>
                                            <p>{env.initialValue}</p>
                                            <p>{env.currentValue}</p>
                                        </div>
                                    ))
                                }

                                <Button type='secondary' extraClass='cursor-not-allowed w-full justify-between bg-primary'
                                    text='Environment variables'
                                >
                                    <FaRegEdit size={16} className={`${environment?.length !== 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => environment?.length !== 0 && setIsEditModalOpen(true)} />
                                </Button>
                                {environment?.length === 0
                                    ? <p className='p-2 pb-4'>No active environment</p>
                                    :
                                    <><div className="flex gap-2 justify-between p-2 text-[10px]">
                                        <p className='flex-grow'>Name</p>
                                        <p>Initial value</p>
                                        <p>Current value</p>
                                    </div>

                                        {environment?.[0]?.variables.map((env) => (
                                            <div className="flex gap-2 justify-between p-2 text-[10px]">
                                                <p className='flex-grow'>{env?.variable}</p>
                                                <p>{env.initialValue}</p>
                                                <p>{env.currentValue}</p>
                                            </div>
                                        ))}
                                    </>
                                }
                            </div>
                        </>
                    )}
                    </DropdownMenu>
                </div>
            </div>
            {/* mapping and editing data */}
            <>
                <div className="flex justify-between gap-2 p-2">
                    <div className="overflow-auto relative border border-dividerDark w-full flex gap-2 justify-start align-middle">
                        <DropdownMenu position='bottom-left' button={
                            <Button type='secondary' text={selectedHttpMethod?.label} chevronExists={true}
                                extraClass={`!flex-row border-0`} textColor={selectedHttpMethod?.color} />
                        }
                            items={httpMethods}
                        ></DropdownMenu>
                        <input type='text' placeholder='Untitled'
                            defaultValue={'https://echo.hoppscotch.io'}
                            className='p-2 text-secondaryDark bg-transparent flex-grow'
                        />

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
                                    className=' border border-dividerDark p-2 text-secondaryDark bg-transparent'
                                />
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
                    <div className="flex gap-2 overflow-x-auto" >
                        {["parameters", "body", "headers", "authorization", "pre-request script", "post-request script", "variables"]?.map((title: string) => (
                            <div key={title}
                                className={`min-w-fit cursor-pointer text-center capitalize text-secondary hover:text-secondaryDark p-2 
                            ${selectedTab === title ? 'border-b-2 border-b-accent !text-secondaryDark' : ''}`}
                                onClick={() => setSelectedTab(title)}
                            >{title}</div>
                        ))}
                    </div>
                    {renderByTab()}
                </div>
            </>
            {isEditModalOpen && <EditEnvironmentModal handleModal={() => setIsEditModalOpen(false)} label={selectedEnvironment} setLabel={(x: string) => { }} />}

        </Layout >
    )
}

// export const MethodTab = ({
//     selectedHttpMethod,
//     httpMethods,
//     selectedTab,
//     setSelectedTab,
// }: any) => {
//     const renderByTab = () => {
//         switch (selectedTab) {
//             case 'variables':
//                 return <Variables {...{ data: variables, setData: setVariables, initialState: variablesInitialState }} />;
//             case 'body':
//                 return <BodyComponent {...{ onOverRide: setSelectedTab }} />;
//             case 'authorization':
//                 return <AuthorizationTab {...{ selectedAuthMethod, setSelectedAuthMethod }} />;
//             case 'pre-request script':
//             case 'post-request script':
//                 return <RequestScriptTab {...{ selectedTab }} />;
//             default:
//                 return <QueryParams {...{ data: headers, setData: setHeaders, initialState: paramsInitialState }} />;
//         }
//     };
//     return (
//         <>
//             <div className="flex justify-between gap-2 p-2">
//                 <div className="overflow-visible relative border border-dividerDark w-full flex gap-2 justify-start align-middle">
//                     <DropdownMenu position='bottom-left' button={
//                         <Button type='secondary' text={selectedHttpMethod?.label} chevronExists={true}
//                             extraClass={`!flex-row border-0`} textColor={selectedHttpMethod?.color} />
//                     }
//                         items={httpMethods}
//                     ></DropdownMenu>
//                     <input type='text' placeholder='Untitled'
//                         defaultValue={'https://echo.hoppscotch.io'}
//                         className='p-2 text-secondaryDark bg-transparent flex-grow' />

//                 </div>
//                 <div className='flex justify-center gap-4'>
//                     <div className='flex justify-center gap-0'>
//                         <Button type='primary' text='Send' extraClass='border-r-0 rounded-tr-none rounded-br-none' />
//                         <DropdownMenu button={
//                             <Button type='primary' text='' extraClass='!min-w-fit border-l-0 rounded-tl-none rounded-bl-none !px-2'>
//                                 <BsChevronDown size={12} />
//                             </Button>
//                         }
//                             position='header'
//                             items={[
//                                 { label: 'Import CURL', icon: <FaFileCode size={16} />, kbd: 'C,' },
//                                 { label: 'Show Code', icon: <FaCode size={16} />, kbd: 'S,' },
//                                 { label: 'Clear All', icon: <AiOutlineReload size={16} className='rotate-180' />, kbd: 'x,' }
//                             ]}
//                         />
//                     </div>
//                     <div className='flex justify-center gap-0'>
//                         <Button type='secondary' text='Save' extraClass='!flex-row border-r-0 rounded-tr-none rounded-br-none' >
//                             <AiOutlineSave size={16} />
//                         </Button>
//                         <DropdownMenu
//                             position='bottom-right'
//                             button={
//                                 <Button type='secondary' chevronExists={true} text='' extraClass='!min-w-fit border-l-0 rounded-tl-none rounded-bl-none !px-2'>
//                                 </Button>
//                             }
//                         >
//                             <input type='text' placeholder='Untitled'
//                                 defaultValue={'Untitled'}
//                                 className=' border border-dividerDark p-2 text-secondaryDark bg-transparent' />
//                             <div
//                                 // onClick={() => {
//                                 //     item.onClick?.();
//                                 //     setIsOpen(false);
//                                 // }}
//                                 className=" border-b border-b-dividerDark flex items-center text-xs gap-2 px-4 py-1 text-secondary hover:bg-primaryDark  hover:text-secondaryDark cursor-pointer"
//                             >
//                                 <AiOutlineFolderAdd size={16} />
//                                 <span className='flex-grow truncate max-w-[16rem]'>Save as</span>
//                             </div>
//                             <div
//                                 // onClick={() => {
//                                 //     item.onClick?.();
//                                 //     setIsOpen(false);
//                                 // }}
//                                 className="flex items-center text-xs gap-2 px-4 py-1 text-secondary hover:bg-primaryDark  hover:text-secondaryDark cursor-pointer"
//                             >
//                                 <IoShareSocialOutline size={16} />
//                                 <span className='flex-grow truncate max-w-[16rem]'>Share Request</span>
//                             </div>
//                         </DropdownMenu>
//                     </div>
//                 </div>

//             </div >
//             <div>
//                 <div className="flex gap-2 overflow-x-auto" >
//                     {["parameters", "body", "headers", "authorization", "pre-request script", "post-request script", "variables"]?.map((title: string) => (
//                         <div key={title}
//                             className={`min-w-fit cursor-pointer text-center capitalize text-secondary hover:text-secondaryDark p-2
//                             ${selectedTab === title ? 'border-b-2 border-b-accent !text-secondaryDark' : ''}`}
//                             onClick={() => setSelectedTab(title)}
//                         >{title}</div>
//                     ))}
//                 </div>
//                 {renderByTab()}
//             </div>
//         </>
//     )
// }