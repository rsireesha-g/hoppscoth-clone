import React, { useState } from 'react'
import { Layout } from '../components/layout'
import { Button } from '../components/button'
import { IoIosAdd } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { AuthorizationTab } from '../components/restPageComponents/httpMethodComponents/authorizationTab';
import { QueryParams } from '../components/restPageComponents/httpMethodComponents/queryParams';
import { KeyValueDescription, VariablesObj2 as VariablesObj } from '../interfaces/restApiInterface';
import { Variables } from '../components/restPageComponents/grapql/variables';
import { Query } from '../components/restPageComponents/grapql/query';

const paramsInitialState: Array<KeyValueDescription> = [{ key: '', value: '', description: '' }];
const variablesInitialState: Array<VariablesObj> = [{ value: '' }];



export const GraphQL = () => {
    const [isConnected, setIsConnected] = useState(-1);
    const [tabs, setTabs] = useState(['Untitled']);
    const [selectedTab, setSelectedTab] = useState('query');
    const [selectedAuthMethod, setSelectedAuthMethod] = useState('Inherit');
    const [headers, setHeaders] = useState<Array<KeyValueDescription>>(paramsInitialState);
    const [variables, setVariables] = useState<Array<VariablesObj>>(variablesInitialState);
    const [queries, setQueries] = useState<Array<VariablesObj>>(variablesInitialState);

    const renderByTab = () => {
        switch (selectedTab) {
            case 'authorization':
                return <AuthorizationTab {...{ selectedAuthMethod, setSelectedAuthMethod }} />;
            case 'headers':
                return <QueryParams {...{ data: headers, setData: setHeaders, initialState: paramsInitialState }} />;
            case 'variables':
                return <Variables {...{ data: variables, setData: setVariables, initialState: variablesInitialState }} />;
            default:
                return <Query  {...{ data: queries, setData: setQueries, initialState: variablesInitialState }} />
        }
    }

    return (
        <Layout page='graphql'>
            <div className="p-2">
                <div className="flex gap-2 justify-between">
                    <input type="text" className='w-full flex-grow bg-primaryDark p-2' value='https://echo.hoppscotch.io/graphql' />
                    <Button type='primary' text={`${isConnected === 0 ? 'Disconnect' : 'Connect'}`} onClick={() => setIsConnected(isConnected === -1 ? 0 : isConnected === 0 ? 1 : 0)} />
                </div>
                <div className='flex align-middle justify-start items-center my-2'>
                    {tabs.map((tab: string, index: number) => (
                        <div className="flex justify-start align-middle items-center max-w-[90%]" style={{ width: `calc(90%/${tabs?.length})` }}>
                            <input type='text' placeholder='Untitled' value={tab}
                                className='max-w-[90%]'
                                onChange={(e) => {
                                    let remainingTabs = tabs.filter((_, i) => i !== index);
                                    setTabs([...remainingTabs, e.target.value])
                                }
                                }
                            />
                            <MdOutlineClose size={10} className='cursor-pointer' onClick={() => {
                                let data = tabs?.filter((_, i: number) => i !== index);
                                setTabs(data);
                                if (data?.length === 0) {
                                    setTabs(['Untitled'])
                                }
                            }} />
                        </div>
                    ))}
                    <div className='bg-secondaryLight flex-grow p-2'>
                        <IoIosAdd size={20} className='cursor-pointer' onClick={() => {
                            setTabs([...tabs, 'Untitled'])
                        }
                        } />
                    </div>
                </div>
                {/* query tabs  */}
                <div>
                    <div className="flex gap-2 overflow-x-auto" >
                        {["query", "variables", "headers", "authorization"]?.map((title: string) => (
                            <div key={title}
                                className={`min-w-fit cursor-pointer text-center capitalize text-secondary hover:text-secondaryDark p-2 
                            ${selectedTab === title ? 'border-b-2 border-b-accent !text-secondaryDark' : ''}`}
                                onClick={() => setSelectedTab(title)}
                            >{title}</div>
                        ))}
                    </div>
                    {renderByTab()}
                </div>
            </div>
        </Layout>
    )
}
