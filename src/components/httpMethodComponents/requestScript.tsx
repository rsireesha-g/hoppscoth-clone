import React, { useState } from 'react'
import { Tooltip } from '../tooltip'
import { CiCircleQuestion } from 'react-icons/ci'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { Link } from 'react-router'

type snippetsType = { label: string, value: { label: string, code: string }[] }[]

export const RequestScriptTab = ({ selectedTab }: any) => {
    const snippets: snippetsType = [
        {
            label: 'pre-request', value: [
                { label: 'Environment: Set an environment variable ', code: 'pw.env.set("variable", "value");' },
                {
                    label: 'Environment: Set timestamp variable', code: 'const currentTime = Date.now();pw.env.set("timestamp", currentTime.toString());'
                },
                { label: 'Environment: Set random number variable', code: 'const min = 1;const max = 1000;const randomArbitrary = Math.random() * (max - min) + min;pw.env.set("randomNumber", randomArbitrary.toString());' }
            ]
        },
        {
            label: 'post-request', value: [
                { label: 'Environment: Set an environment variable', code: 'pw.env.set("variable", "value");' },
                {
                    label: 'Response: Status code is 200', code: 'pw.test("Status code is 200", ()=> {pw.expect(pw.response.status).toBe(200);}); '
                },
                { label: 'Response: Assert property from body', code: 'pw.test("Check JSON response property", ()=> {pw.expect(pw.response.body.method).toBe("GET");});' },
                { label: 'Status code: Status code is 2xx', code: 'pw.test("Status code is 2xx", ()=> {pw.expect(pw.response.status).toBeLevel2xx();});' },
                { label: 'Status code: Status code is 3xx', code: 'pw.test("Status code is 3xx", ()=> {pw.expect(pw.response.status).toBeLevel3xx();});' },
                { label: 'Status code: Status code is 4xx', code: 'pw.test("Status code is 4xx", ()=> {pw.expect(pw.response.status).toBeLevel4xx();});' },
                { label: 'Status code: Status code is 5xx', code: 'pw.test("Status code is 5xx", ()=> {pw.expect(pw.response.status).toBeLevel5xx();});' },
            ]
        }
    ];

    const [selectedScript, setSelectedScript] = useState<Array<any>>([]);
    const handleAddScript = (select: string, type: string) => {
        let val = snippets?.filter((x) => x.label === type)
            ?.[0]?.value
            ?.filter((x) => x.label === select);
        let value = selectedScript?.includes(val?.[0]?.code);
        !value && setSelectedScript([...selectedScript, val?.[0]?.code])
    }

    return (
        <div>
            {/* top */}
            <div className="flex gap-2  justify-between p-2 border-y border-y-dividerDark">
                <div className="text-secondaryLight">JavaScript Code</div>
                <div className="flex gap-2 align-middle text-[#e1e0e0]">
                    <Tooltip position='top-left' text='Wiki'>
                        <CiCircleQuestion size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Clear All'>
                        <MdOutlineDeleteForever size={16} className='cursor-pointer' onClick={() => setSelectedScript([])} />
                    </Tooltip>
                    <Tooltip position='top-left' text='Bulk Edit' >
                        <FaRegEdit size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Add New'>
                        <IoIosAdd size={20} className='cursor-pointer' />
                    </Tooltip>
                </div>
            </div>
            {/* grid */}
            <div className="w-full flex gap-0 align-middle text-secondaryLight border-b border-b-dividerDark overflow-y-scroll ">
                <div className="flex-gow-1 w-10 p-2">1</div>
                <div className="flex-gow-2 w-1/2 p-2 border-x border-x-dividerDark">
                    <textarea placeholder='JavaScript Code' value={selectedScript?.join("\n")}
                        className='w-full h-full bg-transparent p-2 text-accentDark break-normal'
                    />
                </div>
                <div className="w-1/3 p-2 flex gap-4 flex-col justify-start h-[200px]">
                    <p className='text-secondaryLight'>
                        {selectedTab === 'pre-request script' ?
                            'Pre-request scrips are written in JavaScript, and are run before the request is sent.'
                            :
                            'Post-request scrips are written in JavaScript, and are run after the request is received.'
                        }
                    </p>
                    <Link
                        className='text-secondaryLight hover:text-secondaryDark'
                        to="https://docs.hoppscotch.io/documentation/getting-started/rest/pre-request-scripts"
                    >Read documentation</Link>
                    {selectedTab === 'pre-request script' ?
                        snippets?.[0]?.value?.map((tab: any, i: number) => (
                            <div
                                key={i}
                                className='cursor-pointer text-accentDark hover:ml-4'
                                onClick={() => handleAddScript(tab?.label, 'pre-request')}
                            >{tab?.label}</div>

                        )) :
                        snippets?.[1]?.value?.map((tab: any, i: number) => (
                            <div
                                key={i}
                                className='cursor-pointer text-accentDark hover:ml-4'
                                onClick={() => handleAddScript(tab?.label, 'post-request')}
                            >{tab?.label}</div>

                        ))
                    }
                </div>
            </div>
        </div>
    )
}
