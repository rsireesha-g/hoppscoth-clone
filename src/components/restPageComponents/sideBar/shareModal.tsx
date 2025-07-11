import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { Button } from '../../button'

export const ShareModal = ({ handleModal }: any) => {
    const [index, setIndex] = useState(-1);

    const data = [
        { label: 'Embed', description: 'Add a mini Hoppscotch API Playground to your website, blog or documentation.' },
        { label: 'Button', description: 'Create a Run in Hoppscotch button for your website, blog or a README.' },
        { label: 'Link', description: 'Create a shareable link to share with anyone on the internet with view access.' }
    ]
    return (
        <div className='modal'>
            <div className="innerModal top-12 left-[35%] !max-w-[40vw]" >
                <div className="flex items-center justify-between p-2 sticky top-0">
                    <h3 className="ml-4 heading text-center flex-grow">Share Request</h3>
                    <MdOutlineClose
                        size={20}
                        onClick={() => handleModal()}
                        className='cursor-pointer' />
                </div >
                <div className="flex flex-col border border-dividerDark my-1 overscroll-y-auto">
                    <p className="border-b border-b-dividerDark p-2">Select a widget, you can change and customize this later</p>
                    <div className="flex flex-col gap-3 w-full p-4">
                        {data?.map((list, ind) => (
                            <div className={`flex flex-col gap-1 justify-start p-2 border rounded-md ${index === ind ? 'border-accentDark' : 'border-dividerDark'}`}
                                onClick={() => setIndex(ind)}>
                                <p className="text-secondaryDark">{list?.label}</p>
                                <p className="text-secondary text-[10px]">{list?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-start w-full gap-2 mt-2 sticky bottom-0">
                    <Button type='primary' text='Share'
                        onClick={() => {
                            alert("Shared Request");
                            setTimeout(() => handleModal(), 10)
                        }} />
                    <Button type='secondary' text='Cancel' onClick={handleModal} />
                </div>
            </div>

        </div>
    )
}
