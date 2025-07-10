import React from 'react'
import { IoLinkOutline } from "react-icons/io5";
import { BiLogoGraphql } from "react-icons/bi";
import { CiGlobe, CiSettings } from "react-icons/ci";
import { Link } from 'react-router';
import { Tooltip } from './tooltip';

type sideBarProps = {
    isCollapse: boolean,
    page: string
}

export const SideBar = ({ isCollapse, page }: sideBarProps) => {

    return (
        <div
            className={`${!isCollapse ? 'w-12' : 'w-20'} 
        border border-red-400
        flex flex-col text-[10px]
        `}>
            <Link to="/"
                className={`
            ${page === 'home' && 'border-l-2 border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-4 hover:bg-primaryDark hover:text-secondaryDark text-secondary flex gap-2 flex-col
            `}>

                {!isCollapse ?
                    <Tooltip position='side-right' text='Rest'>
                        <IoLinkOutline size={16} />
                    </Tooltip>
                    :
                    <>
                        <IoLinkOutline size={16} />
                        <p>
                            REST
                        </p>
                    </>
                }
            </Link>
            <Link to="/graphql"
                className={`
            ${page === 'graphql' && 'border-l-2 border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-4 hover:bg-primaryDark hover:text-secondaryDark text-secondary flex gap-2 flex-col
            `}>

                {!isCollapse ?
                    <Tooltip position='side-right' text='GraphQL'>
                        <BiLogoGraphql className='w-4 h-4' />
                    </Tooltip>
                    :
                    <>
                        <BiLogoGraphql className='w-4 h-4' />
                        <p>
                            GraphQL
                        </p>
                    </>
                }

            </Link>
            <Link to="/realtime/websocket"
                className={`
            ${page === 'realtime' && 'border-l-2 border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-4 hover:bg-primaryDark hover:text-secondaryDark text-secondary flex gap-2 flex-col
            `}>
                {!isCollapse ?
                    <Tooltip position='side-right' text='Realtime'>
                        <CiGlobe className='w-4 h-4' />
                    </Tooltip>
                    :
                    <><CiGlobe className='w-4 h-4' />
                        <p>
                            Realtime
                        </p>
                    </>
                }
            </Link>
            <Link to="/settings"
                className={`
            ${page === 'settings' && 'border-l-2 border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-4 hover:bg-primaryDark hover:text-secondaryDark text-secondary flex gap-2 flex-col
            `}>
                {!isCollapse ?
                    <Tooltip position='side-right' text='Settings'>
                        <CiSettings className='w-5 h-5' />
                    </Tooltip>
                    :
                    <>
                        <CiSettings className='w-5 h-5' />
                        <p>
                            Settings
                        </p>
                    </>
                }
            </Link>
        </div>
    )
}
