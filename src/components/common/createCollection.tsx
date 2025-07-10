import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { Button } from '../button'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { onCreateCollection } from '../../redux/slices/restApiSlice';

export const CreateCollection = ({ handleClose }: any) => {
    const [label, setLabel] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleCreateCollection = () => {
        dispatch(onCreateCollection(label));
        setTimeout(() => handleClose(), 10)
    }

    return (
        <div className="modal">
            <div className="innerModal top-12 left-[35%] " >
                <div className="flex items-center justify-between p-2 ">
                    <h3 className="ml-4 heading text-center flex-grow">New Collection</h3>
                    <MdOutlineClose
                        size={20}
                        onClick={handleClose}
                        className='cursor-pointer' />
                </div >
                <div className='w-full  py-4 border-y border-y-dividerDark'>
                    <input value={label} type='text'
                        placeholder='Add label'
                        className='w-full justify-start text-left border border-dividerDark rounded-md'
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button type='primary' text='Save' onClick={handleCreateCollection} />
                    <Button type='secondary' text='Cancel' onClick={handleClose} />
                </div>
            </div>
        </div>
    )
}
