import React, { useState } from 'react'
import DropdownMenu from '../../dropdownMenu'
import { Button } from '../../button'
import { BsArrowRepeat, BsCheck } from 'react-icons/bs';

export const BodyComponent = ({ onOverRide }: any) => {
    const [contentType, setContentType] = useState('None');

    const typeItems: { label: string, values: string[] }[] = [
        {
            label: 'Text',
            values: ['application/json', 'application/Id+json', 'application/hal+json',
                'application/vnd.api+json', 'application/xml', 'text/xml'
            ]
        },
        {
            label: 'Structured', values: ['application/x-www-form-urlencoded', 'multipart/form-data']
        },
        { label: 'Binary', values: ['application/octet-stream'] },
        { label: 'Others', values: ['text/html', 'text/plain'] }
    ]
    return (
        <div className='flex flex-col gap-2 justify-start'>
            <div className="flex gap-2 align-middle justify-start p-2">
                <p className="py-1">Content Type</p>
                <DropdownMenu
                    position='bottom-left'
                    button={
                        <Button extraClass='!flex-row border-none'
                            text={contentType}
                            type='secondary'
                            chevronExists={true}
                        />
                    }
                    items={[]}

                >{({ closeDropdown }: any) => (
                    <>
                        <div
                            onClick={() => {
                                setContentType('None');
                                closeDropdown()
                            }}
                            className="flex justify-between items-center text-xs gap-2 px-2 py-1 text-secondary hover:bg-primaryDark  hover:text-secondaryDark cursor-pointer"
                        >
                            <span className={`flex-grow truncate max-w-[16rem]`} >
                                None
                            </span>
                            {contentType === 'None' && <BsCheck className='text-accentDark' size={16} />}
                        </div>
                        {typeItems?.map((x: { label: string, values: string[] }) => (
                            <div key={x?.label} className='flex flex-col'>
                                <span className='text-[10px] pt-2 pl-2 text-stone-700 border-t border-t-dividerDark' >{x?.label}</span>
                                {x?.values?.map((val: string, index: number) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setContentType(val);
                                            closeDropdown()
                                        }}
                                        className="flex justify-between items-center text-xs gap-2 px-2 py-1 text-secondary hover:bg-primaryDark  hover:text-secondaryDark cursor-pointer"
                                    >
                                        <span className={`flex-grow truncate max-w-[16rem]`} >
                                            {val}
                                        </span>
                                        {contentType === val && <BsCheck className='text-accentDark' size={16} />}
                                    </div>
                                ))}
                            </div>
                        ))}

                    </>
                )}
                </DropdownMenu>
                <Button type='secondary' extraClass='!flex-row border-0  !p-1 bg-primaryDark' text='Override'
                    onClick={() => onOverRide('headers')}>
                    <BsArrowRepeat size={14} />
                </Button>
            </div>
        </div>
    )
}
