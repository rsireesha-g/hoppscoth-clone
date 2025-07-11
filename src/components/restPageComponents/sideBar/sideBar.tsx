import React, { useState } from 'react'
import { Tooltip } from '../../tooltip'
import { IoCode, IoLayersOutline, IoShareSocialOutline } from 'react-icons/io5'
import { CiFolderOn } from 'react-icons/ci'
import { FaRegClock } from 'react-icons/fa'
import { Collections } from './collections'
import { BiChevronRight } from 'react-icons/bi'
import { History } from './history'
import { Environment } from './environment'
import { Share } from './share'




export const RestPageSideBar = () => {
    const [selectedTab, setSelectedTab] = useState('Collections');

    const renderTabs = () => {
        switch (selectedTab) {
            case 'Shared Requests':
                return <Share />
            case 'Generate Code':
            case 'Environments':
                return <Environment />
            case 'History':
                return <History />
            default:
                return <Collections />
        }
    }
    return (
        <div className="w-full h-full border border-red-500 flex gap-2">
            <div className='w-14 h-full flex flex-col gap-4 mt-2 border-r border-r-dividerDark'>
                <Tooltip position='side-left' text='Collections'>
                    <CiFolderOn size={18} className={`cursor-pointer ${selectedTab === 'Collections' ? 'text-accentDark' : 'text-secondary'}`}
                        onClick={() => setSelectedTab('Collections')} />
                </Tooltip>
                <Tooltip position='side-left' text='Environments'>
                    <IoLayersOutline size={18} className={`cursor-pointer ${selectedTab === 'Environments' ? 'text-accentDark' : 'text-secondary'}`}
                        onClick={() => setSelectedTab('Environments')} />
                </Tooltip>
                <Tooltip position='side-left' text='History'>
                    <FaRegClock size={18} className={`cursor-pointer ${selectedTab === 'History' ? 'text-accentDark' : 'text-secondary'}`}
                        onClick={() => setSelectedTab('History')} />
                </Tooltip>
                <Tooltip position='side-left' text='Shared Requests'>
                    <IoShareSocialOutline size={18} className={`cursor-pointer ${selectedTab === 'Shared Requests' ? 'text-accentDark' : 'text-secondary'}`}
                        onClick={() => setSelectedTab('Shared Requests')} />
                </Tooltip>
                <Tooltip position='side-left' text='Generate Code'>
                    <IoCode size={18} className={`cursor-pointer ${selectedTab === 'Generate Code' ? 'text-accentDark' : 'text-secondary'}`}
                        onClick={() => setSelectedTab('Generate Code')} />
                </Tooltip>

            </div>
            <div className='w-full h-full flex flex-col gap-1 '>
                <div className="flex p-2 gap-1 justify-start align-middle text-secondary border-b border-b-dividerDark">
                    <p className="text-[10px]">Personal Workspace</p>
                    <BiChevronRight size={16} />
                    <p className="text-[10px]">{selectedTab}</p>
                </div>
                {renderTabs()}
            </div>

        </div>
    )
}
