import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { Button } from '../button'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { EmptyDataComponent } from './emptyDataComponent';
import emptyImage from "../../assests/images/workspace.png";
import profileImg from "../../assests/images/profile.png";

export const CreateWorkspace = ({ handleClose, isInviteClick }: any) => {
    const [label, setLabel] = useState('');
    const [createNew, setCreateNew] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleCreateCollection = () => {
        // dispatch(onCreateCollection(label));
        setTimeout(() => handleClose(), 10)
    }

    return (
        <div className="modal">
            <div className="innerModal top-12 left-[35%] " >
                {createNew ?
                    <>
                        <div className="flex items-center justify-between p-2 ">
                            <h3 className="ml-4 heading text-center flex-grow">New workspace</h3>
                            <MdOutlineClose
                                size={20}
                                onClick={() => setCreateNew(false)}
                                className='cursor-pointer' />
                        </div >
                        <div className='w-full flex flex-col gap-4 py-4 border-t border-t-dividerDark'>
                            <input value={label} type='text'
                                placeholder='Add label'
                                className='w-full justify-start text-left border border-dividerDark rounded-md'
                                onChange={(e) => setLabel(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <Button type='primary' text='Save' onClick={handleCreateCollection} />
                                <Button type='secondary' text='Cancel' onClick={handleClose} />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex items-center justify-between p-2 ">
                            <h3 className="ml-4 heading text-center flex-grow">Select a workspace</h3>
                            <MdOutlineClose
                                size={20}
                                onClick={handleClose}
                                className='cursor-pointer' />
                        </div >


                        <div className='flex flex-col gap-2 justify-center items-start w-full text-secondary  py-4 border-t border-t-dividerDark '>
                            <Button type='secondary' text='+ Create new workspace' onClick={() => setCreateNew(true)} />
                            {!isInviteClick
                                ? <div className='m-auto'>
                                    <EmptyDataComponent imageUrl={emptyImage} mainText='You do not belong to any organization' />

                                </div>
                                :
                                <div >
                                    <img loading="lazy" src={profileImg} alt='workspace' width={70} height={70} />
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
