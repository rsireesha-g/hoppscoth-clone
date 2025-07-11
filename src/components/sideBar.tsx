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
            className={`${!isCollapse ? 'w-full  md:w-12' : 'w-full md:w-20'} 
        border border-dividerDark
        grid md:flex flex-row text-[10px]
        grid-cols-4
        md:flex-col
        justify-between md:justify-start
        `}>
            <Link to="/"
                className={`
            ${page === 'home' && 'md:border-l-2 md:border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-2 md:p-4  hover:bg-primaryDark hover:text-secondaryDark 
             text-secondary flex gap-2 flex-col
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
            ${page === 'graphql' && 'md:border-l-2 md:border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-2 md:p-4  hover:bg-primaryDark hover:text-secondaryDark text-secondary flex gap-2 flex-col
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
            ${page === 'realtime' && 'md:border-l-2 md:border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-2 md:p-4  hover:bg-primaryDark hover:text-secondaryDark text-secondary flex gap-2 flex-col
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
            ${page === 'settings' && 'md:border-l-2 md:border-accent !text-secondaryDark !bg-primaryDark'}
             cursor-pointer items-center p-2 md:p-4  hover:bg-primaryDark hover:text-secondaryDark text-secondary flex gap-2 flex-col
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
