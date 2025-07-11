import React, { useState } from 'react'
import { Layout } from '../components/layout'
import { TopNavigation } from '../components/realtimeComponents/topNavigation'
import { Button } from '../components/button'
import { LogData } from '../components/common/logData'

export const RealtimeSse = () => {
    const [isConnected, setIsConnected] = useState(-1);
    const [urlInput, setUrlInput] = useState('wss://echo-websocket.hoppscotch.io')
    const [eventType, setEventType] = useState('data');
    return (
        <Layout page='realtime'>
            <TopNavigation currPage='sse' />
            <div className="w-full p-4 ">
                <div className="flex gap-2 justify-between w-full ">
                    <input type="text" className='flex-grow bg-primaryDark p-2' value={urlInput} onChange={(e: any) => setUrlInput(e.target.value)} />
                    <div className='flex gap-2 flex-grow align-middle items-center bg-primaryDark pl-2 -ml-2' >
                        <label className='text-secondaryLight '>Event Type</label>
                        <input type="text" className='flex-grow bg-primaryDark p-2' defaultValue='data' value={eventType} onChange={(e: any) => setEventType(e.target.value)} />
                    </div>
                    <Button type='primary' text='Start' onClick={() => setIsConnected(isConnected === -1 ? 0 : isConnected === 0 ? 1 : 0)} />
                </div>
                <LogData {...{ isConnected }} />
            </div>
        </Layout>
    )
}
