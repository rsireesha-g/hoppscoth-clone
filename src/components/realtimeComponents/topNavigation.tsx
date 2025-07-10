import React from 'react'
import { Link } from 'react-router';
import { GrConnectivity } from "react-icons/gr";
import { TbBrandSocketIo } from 'react-icons/tb';
import { RiSignalTowerLine } from 'react-icons/ri';
import { SiMqtt } from "react-icons/si";

interface navProps {
    currPage: string
}

export const TopNavigation = ({ currPage }: navProps) => {
    return (
        <div className="w-full flex justify-start gap-4 border-b border-b-dividerDark">
            <Link to='/realtime/websocket' className={`${currPage === 'web' && '!text-secondaryDark border-b-2 border-b-accentDark'} flex gap-2 p-2 text-secondary hover:text-secondaryDark`}>
                <GrConnectivity size={18} />
                <p>WebSocket</p>
            </Link>
            <Link to='/realtime/sse' className={`${currPage === 'sse' && '!text-secondaryDark border-b-2 border-b-accentDark'} flex gap-2 p-2 text-secondary hover:text-secondaryDark`}>
                <RiSignalTowerLine size={18} />
                <p>SSE</p>
            </Link>
            <Link to='/realtime/socketio' className={`${currPage === 'socket' && '!text-secondaryDark border-b-2 border-b-accentDark'} flex gap-2 p-2 text-secondary hover:text-secondaryDark`}>
                <TbBrandSocketIo size={18} />
                <p>Socket.IO</p>
            </Link>
            <Link to='/realtime/mqtt' className={`${currPage === 'mqtt' && '!text-secondaryDark border-b-2 border-b-accentDark'} flex gap-2 p-2 text-secondary hover:text-secondaryDark`}>
                <SiMqtt size={14} />
                <p>MQTT</p>
            </Link>
        </div>
    )
}
