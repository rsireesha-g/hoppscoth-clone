import React, { useState } from 'react'
import { CiCircleQuestion } from 'react-icons/ci'
import { BiChevronRight } from 'react-icons/bi'
import { HiFolderDownload } from 'react-icons/hi'
import { Link } from 'react-router'
import { IoAdd, IoSearch } from 'react-icons/io5'
import { Tooltip } from '../../tooltip'
import { Button } from '../../button';
import collectionImg from "../../../assests/images/collection.png"

interface collectionProps {
    selectedTab: string,
}

export const Collections = () => {
    const [search, setSearch] = useState("");
    const searchedResults = [];

    return (
        <div className='w-full h-full flex flex-col gap-1 '>
            <input type='search' placeholder='Search'
                className='w-full'
                value={search}
                onChange={(el) => setSearch(el.target.value)}
            />
            <div className="p-2 text-stone-400 border-y border-y-dividerDark flex justify-between align-middle items-center">
                <div className="flex gap-2">
                    <IoAdd size={16} className='cursor-pointer' />
                    <div className="">New</div>
                </div>
                <div className="flex gap-2">
                    <Tooltip text='wiki' position='top-right'>
                        <Link to="https://docs.hoppscotch.io/documentation/features/collections" target='_blank'>
                            <CiCircleQuestion size={16} className='cursor-pointer' />
                        </Link>
                    </Tooltip>
                    <Tooltip text='Export / Import' position='top-right'>
                        <HiFolderDownload size={16} className='cursor-pointer' />
                    </Tooltip>
                </div>
            </div>
            <div className="p-2 text-secondaryLight">
                {search === '' ?
                    <div className='flex flex-col gap-2 align-middle items-center'>
                        <img alt='empty collections ' width={70} height={70} src={collectionImg} />
                        <p className="text-[10px]">Collections are empty</p>
                        <p className="text-xs">Import or create a collection</p>
                        <Button type='primary' text='Import' extraClass='flex-row-reverse'>
                            <HiFolderDownload size={16} />
                        </Button>
                        <Button type='secondary' text='Add new' extraClass='!flex-row'>
                            <IoAdd size={16} />
                        </Button>
                    </div>
                    :
                    searchedResults?.length !== 0 ?
                        "Exists"
                        :
                        <div className='flex flex-col gap-2 align-middle items-center'>
                            <IoSearch size={16} />
                            <p className="text-[10px]">Nothing found for "`{search}`"</p>
                        </div>
                }
            </div>
        </div>
    )
}
