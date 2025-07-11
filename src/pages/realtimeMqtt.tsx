import React, { useState } from 'react'
import { Layout } from '../components/layout'
import { TopNavigation } from '../components/realtimeComponents/topNavigation'
import { Button } from '../components/button'
import { LogData } from '../components/common/logData'
import { Tooltip } from '../components/tooltip'

export const RealtimeMqtt = () => {
    const [isConnected, setIsConnected] = useState(-1);
    const [urlInput, setUrlInput] = useState('wss://test.mosquitto.org:8081')
    const [clientId, setClientId] = useState('hoppscotch');
    const [data, setData] = useState({
        user_name: '',
        password: '',
        last_will_topic: '',
        last_will_message: '',
        last_will_qos: 0,
        keep_alive: 60
    });

    const handlechange = (e: any) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    return (
        <Layout page='realtime' showShortCuts={false}>
            <TopNavigation currPage='mqtt' />
            <div className="w-full p-4 ">
                <div className="flex gap-2 justify-between w-full ">
                    <input type="text" className='flex-grow bg-primaryDark p-2 text-secondaryDark' value={urlInput} onChange={(e: any) => setUrlInput(e.target.value)} />
                    <div className='flex gap-2 flex-grow align-middle items-center bg-primaryDark pl-2 -ml-2' >
                        <label className='text-secondaryLight '>Client ID</label>
                        <input type="text" className='flex-grow bg-primaryDark p-2 text-secondaryDark' value={clientId} onChange={(e: any) => setClientId(e.target.value)} />
                    </div>
                    <Button type='primary' text={`${isConnected === 0 ? 'Disconnect' : 'Connect'}`} onClick={() => setIsConnected(isConnected === -1 ? 0 : isConnected === 0 ? 1 : 0)} />
                </div>
                <div className="flex align-middle mt-2 p-2 border border-dividerDark items-center w-full justify-between">
                    <p className="text-secondaryLight text-[10px]">Connection config</p>
                    <Tooltip position='top-left' text='Clear Session'>
                        <input type='checkbox' defaultChecked />
                        <label className='ml-2'>Clear session</label>
                    </Tooltip>
                </div>
                <div className="w-full flex align-middle flex-wrap border border-dividerDark">
                    <input type="text" className='w-1/3 flex-grow  p-2 text-secondaryDark border border-t-0 border-l-0 border-dividerDark' placeholder='Username' value={data?.user_name} name='user_name' onChange={(e: any) => handlechange(e)} />
                    <input type="text" className='w-1/2 flex-grow  p-2 text-secondaryDark border-b border-b-dividerDark' border-b border-b-dividerDark placeholder='Last will topic' value={data?.last_will_topic} name='last_will_topic' onChange={(e: any) => handlechange(e)} />
                    <input type="text" className='w-1/3 flex-grow  p-2 text-secondaryDark border border-t-0 border-l-0 border-dividerDark' border-b border-b-dividerDark placeholder='password' value={data?.password} name='password' onChange={(e: any) => handlechange(e)} />
                    <input type="text" className='w-1/2 flex-grow p-2 text-secondaryDark border-b border-b-dividerDark' border-b border-b-dividerDark placeholder='Last will message' value={data?.last_will_message} name='last_will_message' onChange={(e: any) => handlechange(e)} />
                    <div className='flex gap-4 pl-2 w-1/3 border border-t-0 border-l-0 border-dividerDark align-middle items-center'>
                        <label >Keep Alive</label>
                        <input type="text" className='flex-grow  p-2 text-secondaryDark' placeholder='kepp alive'
                            value={data?.keep_alive} name='keep_alive' onChange={(e: any) => handlechange(e)} />
                    </div>
                    <div className='flex gap-4 pl-2 w-1/2 border-b border-b-dividerDark align-middle items-center'>
                        <label >Last-will QoS</label>
                        <input type="number" min={0} max={2} className='flex-grow  p-2 text-secondaryDark' placeholder='0' value={data?.last_will_qos} name='last_will_qos' onChange={(e: any) => handlechange(e)} />
                    </div>
                </div>
                <LogData {...{ isConnected }} />
            </div>
        </Layout>
    )
}
