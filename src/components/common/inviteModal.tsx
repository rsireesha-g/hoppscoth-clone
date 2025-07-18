import React from 'react'
import { BsCopy } from 'react-icons/bs'
import { CiMail } from 'react-icons/ci'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { LuTwitter } from 'react-icons/lu'
import { MdOutlineClose } from 'react-icons/md'
import { Link } from 'react-router'
import redditImg from "../../assests/images/reddit.png"

export const InviteModal = ({ handleClose }: any) => {
    const mediaList = [
        { label: 'Mail', icon: <CiMail size={24} className='text-secondary' />, },
        { label: 'Twitter', icon: <LuTwitter className='text-accentDark' size={24} />, link: 'https://twitter.com/intent/tweet?text=Hoppscotch%20-%20Open%20source%20API%20development%20ecosystem.%20Helps%20you%20create%20requests%20faster,%20saving%20precious%20time%20on%20development.&url=https://hoppscotch.io&via=hoppscotch_io' },
        { label: 'Facebook', icon: <FaFacebook size={24} className='text-accentDark' />, link: 'https://www.facebook.com/sharer/sharer.php?u=https://hoppscotch.io' },
        { label: 'Reddit', icon: <img loading="lazy" src={redditImg} className='text-accentDark w-7 object-contain' alt='reddit' />, link: 'https://www.reddit.com/submit?url=https://hoppscotch.io&title=Hoppscotch%20-%20Open%20source%20API%20development%20ecosystem.' },
        { label: 'LinkedIn', icon: <FaLinkedin size={24} className='text-accentDark' />, link: 'https://www.linkedin.com/sharing/share-offsite/?url=https://hoppscotch.io' },
        { label: 'Copy', icon: <BsCopy size={24} className='text-secondary' />, }
    ]
    return (
        <div className="modal">
            <div className="innerModal top-12 left-[35%]" >
                <div className="flex items-center justify-between p-2 ">
                    <h3 className="ml-4 heading text-center flex-grow">Invite your friends</h3>
                    <MdOutlineClose
                        size={20}
                        onClick={handleClose}
                        className='cursor-pointer' />
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 w-full">
                    {mediaList?.map((media) => (
                        media?.link !== '' ?
                            <Link to={media.link || ''} className="flex gap-2 p-4 border border-dividerDark rounded-md justify-center items-center flex-col">
                                {media?.icon}
                                <p className="text-secondary">{media?.label}</p>
                            </Link>
                            :
                            <div className="flex gap-2 p-4 justify-center items-center flex-col border border-dividerDark rounded-md">
                                {media?.icon}
                                <p className="text-secondary">{media?.label}</p>
                            </div>

                    ))}
                </div>

            </div>
        </div>
    )
}
