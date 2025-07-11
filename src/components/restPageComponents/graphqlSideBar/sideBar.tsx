import React, { useState } from 'react'
import { IoCode, IoDocument, IoLayersOutline, IoShareSocialOutline } from 'react-icons/io5'
import { CiFolderOn } from 'react-icons/ci'
import { FaRegClock } from 'react-icons/fa'
import { Collections } from './collections'
import { BiChevronRight } from 'react-icons/bi'
import { History } from './history'
import { Tooltip } from '../../tooltip'
import { IoMdBook } from 'react-icons/io'
import { HiOutlineCube } from 'react-icons/hi'




export const GraphQlPageSideBar = () => {
    const [selectedTab, setSelectedTab] = useState('Collections');

    const renderTabs = () => {
        switch (selectedTab) {
            case 'Collections':
                return <Collections />
            case 'History':
                return <History />
            case 'Schema':
            default:
                return <History />
        }
    }
    return (
        <div className="w-full h-full border border-dividerDark">
            <div className='w-14 h-full flex flex-col gap-4 mt-2 border-r border-r-dividerDark'>
                <Tooltip position='side-left' text='Documentation'>
                    <IoMdBook size={18} className={`cursor-pointer ${selectedTab === 'Documentation' ? 'text-accentDark' : 'text-secondary'}`}
                        onClick={() => setSelectedTab('Documentation')} />
                </Tooltip>
                <Tooltip position='side-left' text='Schema'>
                    <HiOutlineCube size={18} className={`cursor-pointer ${selectedTab === 'Schema' ? 'text-accentDark' : 'text-secondary'}`}
                        onClick={() => setSelectedTab('Schema')} />
                </Tooltip>
                <Tooltip position='side-left' text='Collections'>
                    <CiFolderOn size={18} className={`cursor-pointer ${selectedTab === 'Collections' ? 'text-accentDark' : 'text-secondary'}`}
                        onClick={() => setSelectedTab('Collections')} />
                </Tooltip>
                <Tooltip position='side-left' text='History'>
                    <FaRegClock size={18} className={`cursor-pointer ${selectedTab === 'History' ? 'text-accentDark' : 'text-secondary'}`}
                        onClick={() => setSelectedTab('History')} />
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
