import React from 'react'
import { IoLinkOutline } from "react-icons/io5";
import { BiLogoGraphql } from "react-icons/bi";
import { CiGlobe, CiSettings } from "react-icons/ci";
import { Link } from 'react-router';

type sideBarProps = {
    isCollapse: boolean,
    page: string
}

export const SideBar = ({ isCollapse, page }: sideBarProps) => {

    return (
        <div
            className={`${isCollapse ? 'w-12' : 'w-20'} 
        border border-red-400
        flex flex-col text-[10px]
        `}>
            <Link to="/"
                className={`
            ${page === 'home' && 'border-l-2 border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-4 hover:bg-primaryDark hover:text-secondaryDark text-secondaryLight flex gap-2 flex-col
            `}>
                <IoLinkOutline className='w-4 h-4' />
                {!isCollapse &&
                    <p>
                        REST
                    </p>
                }
            </Link>
            <Link to="/graphql"
                className={`
            ${page === 'graphql' && 'border-l-2 border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-4 hover:bg-primaryDark hover:text-secondaryDark text-secondaryLight flex gap-2 flex-col
            `}>
                <BiLogoGraphql className='w-4 h-4' />
                {!isCollapse &&
                    <p>
                        GraphQL
                    </p>
                }
            </Link>
            <Link to="/realtime"
                className={`
            ${page === 'realtime' && 'border-l-2 border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-4 hover:bg-primaryDark hover:text-secondaryDark text-secondaryLight flex gap-2 flex-col
            `}>
                <CiGlobe className='w-4 h-4' />
                {!isCollapse &&
                    <p>
                        Realtime
                    </p>
                }
            </Link>
            <Link to="/settings"
                className={`
            ${page === 'settings' && 'border-l-2 border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-4 hover:bg-primaryDark hover:text-secondaryDark text-secondaryLight flex gap-2 flex-col
            `}>
                <CiSettings className='w-5 h-5' />
                {!isCollapse &&
                    <p>
                        Settings
                    </p>
                }
            </Link>
        </div>
    )
}
