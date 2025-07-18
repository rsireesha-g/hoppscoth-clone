import React from 'react'
import { Button } from '../button'
import { MdOutlineClose } from 'react-icons/md'

export const ConfirmationModal = ({ text, handleDelete, handleCancel }: any) => {
    return (
        <div className="modal">
            <div className="innerModal top-12 left-[35%] " >
                <div className="flex items-center justify-between p-2 ">
                    <h3 className="ml-4 heading text-center flex-grow">Confirm</h3>
                    <MdOutlineClose
                        size={20}
                        onClick={handleCancel}
                        className='cursor-pointer' />
                </div >
                <div className="border-y border-y-dividerDark text-secondary p-4">{text}</div>
                <div className="flex gap-4">
                    <Button type='primary' text='Yes' onClick={handleDelete} />
                    <Button type='secondary' text='No' onClick={handleCancel} />
                </div>
            </div>
        </div>
    )
}
