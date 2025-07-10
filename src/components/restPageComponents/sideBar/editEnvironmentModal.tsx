import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { Button } from '../../button';
import { EnvVariablesObj } from '../../../interfaces/restApiInterface';
import { Variables } from './variables';
import { onSaveEnvironmentVariablesAndSecrets } from '../../../redux/slices/restApiSlice'

const variablesInitialState: Array<EnvVariablesObj> = [{ variable: '', initialValue: '', currentValue: '' }]

export const EditEnvironmentModal = ({ handleModal, label, setLabel }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const [variables, setVariables] = useState<Array<EnvVariablesObj>>(variablesInitialState);
    const [secrets, setSecrets] = useState<Array<EnvVariablesObj>>(variablesInitialState);

    const handleSave = () => {
        dispatch(onSaveEnvironmentVariablesAndSecrets({ variables: variables, secrets: secrets, label: label }))
        handleModal()
    }
    return (
        <div className='modal'>
            <div className="innerModal top-12 left-[35%] " >
                <div className="flex items-center justify-between p-2 ">
                    <h3 className="ml-4 heading text-center flex-grow">Edit Environment</h3>
                    <MdOutlineClose
                        size={20}
                        onClick={handleModal}
                        className='cursor-pointer' />
                </div >
                <div className='flex justify-between align-middle gap-2'>
                    <div className=""></div>
                    <div className=""></div>
                </div>
                <div className="flex flex-col gap-2" >
                    <input value={label} type='text'
                        placeholder='Add label'
                        className='w-full mt-2 justify-start text-left border border-dividerDark rounded-md'
                        onChange={(e) => {
                            if (label === 'Global') {
                                e.target.value = e.target.value
                            } else {
                                setLabel(e.target.value)
                            }
                        }}
                    />
                    <Variables {...{ data: variables, setData: setVariables, secrets, setSecrets, initialState: variablesInitialState, label, setLabel }} />
                    <div className="flex justify-start w-full gap-2 mt-2">
                        <Button type='primary' text='Save' onClick={handleSave} />
                        <Button type='secondary' text='Cancel' onClick={handleModal} />
                    </div>
                </div>

            </div>
        </div>
    )
}
