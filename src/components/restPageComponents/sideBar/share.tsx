import React, { useState } from 'react'
import emptyImg from "../../../assests/images/history.png"
import { IoAdd } from 'react-icons/io5';
import { Tooltip } from '../../tooltip';
import { Link } from 'react-router';
import { CiCircleQuestion } from 'react-icons/ci';
import { ShareModal } from './shareModal';

export const Share = () => {
    const [requests, setRequests] = useState([]);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    return (
        <>
            <div className='w-full h-full flex flex-col gap-1 '>
                <div className="p-2 text-stone-400 border-b border-b-dividerDark flex justify-between align-middle items-center">
                    <div className="flex gap-2" onClick={() => {
                        setIsShareModalOpen(true);
                    }}>
                        <IoAdd size={16} className='cursor-pointer' />
                        <div className="">New</div>
                    </div>
                    <div className="flex gap-2">
                        <Tooltip text='wiki' position='top-right'>
                            <Link to="https://docs.hoppscotch.io/documentation/features/collections" target='_blank'>
                                <CiCircleQuestion size={16} className='cursor-pointer' />
                            </Link>
                        </Tooltip>
                    </div>
                </div>
                <div className="p-2 text-secondary">
                    {requests?.length === 0 ?
                        <div className='flex flex-col gap-2 align-middle items-center'>
                            <img alt='empty collections ' width={70} height={70} src={emptyImg} />
                            <p className="text-[10px] text-secondaryLight">Shared requests are empty</p>
                        </div>
                        :

                        "Exists"

                    }
                </div>
            </div>
            {isShareModalOpen && <ShareModal handleModal={() => setIsShareModalOpen(false)} />}
        </>
    )
}
