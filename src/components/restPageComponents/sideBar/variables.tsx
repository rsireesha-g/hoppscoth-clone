import React, { useEffect, useState } from 'react'
import { Tooltip } from '../../tooltip'
import { CiCircleQuestion } from 'react-icons/ci'
import { MdOutlineDeleteForever, MdOutlineDeleteOutline, MdOutlineWrapText } from 'react-icons/md'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { Link } from 'react-router'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import DropdownMenu from '../../dropdownMenu'
import { BsBoxArrowInLeft, BsBoxArrowInRight } from 'react-icons/bs'
import { EnvVariablesObj } from '../../../interfaces/restApiInterface'
import { Button } from '../../button'
import { IoAdd } from 'react-icons/io5'
import emptyImg from "../../../assests/images/environment.png"




interface variableProps {
    data: Array<EnvVariablesObj>,
    setData: any,
    initialState: Array<EnvVariablesObj>,
    secrets: Array<EnvVariablesObj>,
    setSecrets: any,
    label: string
}

export const Variables = ({ data, setData, initialState, secrets, setSecrets, label }: variableProps) => {
    const [selectedTab, setSelectedTab] = useState('variables');
    const [showSecret, setShowSecret] = useState({ initial: false, current: false });
    const [isAddNew, setIsAddNew] = useState(false);

    const handleAddRow = () => {
        let newRow: EnvVariablesObj = { variable: '', initialValue: '', currentValue: '' }
        selectedTab === 'variables'
            ? setData([...data, newRow])
            : setSecrets([...secrets, newRow])
    };

    const handleChange = (index: number, field: keyof EnvVariablesObj, newValue: string) => {
        const isVariableTab = selectedTab === 'variables';
        const rows = isVariableTab ? [...data] : [...secrets];
        const updatedRow = { ...rows[index], [field]: newValue };
        rows[index] = updatedRow;

        if (field === 'variable' && index === rows.length - 1) {
            rows.push({ variable: '', initialValue: '', currentValue: '' });
        }
        isVariableTab ? setData(rows) : setSecrets(rows); selectedTab === 'variables' ? setData(rows) : setSecrets(rows);
    }


    const handleClearAll = () => {
        let newRow: EnvVariablesObj = { variable: '', initialValue: '', currentValue: '' }
        selectedTab === 'variables' ? setData([newRow]) : setSecrets([newRow]);
    };

    const handleDeleteRow = (index: number) => {
        let x = selectedTab === 'variables' ? [...data] : [...secrets];
        let newRow: EnvVariablesObj = { variable: '', initialValue: '', currentValue: '' }
        const remainingRows = x?.filter((_: any, ind: number) => ind !== index);
        console.log(remainingRows, remainingRows?.length === 0)
        if (remainingRows?.length === 0) {
            selectedTab === 'variables' ? setData((prev: any) => initialState) : setSecrets((prev: any) => [newRow]);
        } else {
            selectedTab === 'variables' ? setData(remainingRows) : setSecrets(remainingRows);
        }
    };

    const handleReplaceInitialWithCurr = () => {
        let x = selectedTab === 'variables' ? [...data] : [...secrets];
        const updatedRows = x.map((row) => ({
            ...row,
            initialValue: row?.currentValue,
        }));

        selectedTab === 'variables' ? setData(updatedRows) : setSecrets(updatedRows);
    }

    const handleReplaceCurrWithInitial = () => {
        let x = selectedTab === 'variables' ? data : secrets;
        const updatedRows = x.map((row) => ({
            ...row,
            currentValue: row?.initialValue,
        }));

        selectedTab === 'variables' ? setData(updatedRows) : setSecrets(updatedRows);
    }

    useEffect(() => {
        setData(initialState);
        setSecrets(initialState)
    }, [])


    return (
        <div>
            {/* top */}
            <div className="flex  justify-between p-2  border border-dividerDark px-4">
                <div className="text-secondaryLight flex gap-4 justify-start align-middle">
                    <div onClick={() => setSelectedTab('variables')}
                        className={`${selectedTab === 'variables' && 'border-b-2 border-b-accentDark text-secondaryDark'} cursor-pointer text-secondaryLight`}>Variables</div>
                    <div onClick={() => setSelectedTab('secrets')}
                        className={`${selectedTab === 'secrets' && 'border-b-2 border-b-accentDark text-secondaryDark'} cursor-pointer text-secondaryLight`}>Secret</div>
                </div>
                <div className="flex gap-2 align-middle text-[#e1e0e0]">
                    <Tooltip position='top-left' text='Wiki'>
                        <Link to="https://docs.hoppscotch.io/documentation/features/environments" target='_blank' >
                            <CiCircleQuestion size={16} className='cursor-pointer' />
                        </Link>
                    </Tooltip>
                    <Tooltip position='top-left' text='Clear All'>
                        <MdOutlineDeleteForever size={16} onClick={handleClearAll} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-left' text='Add New'>
                        <IoIosAdd size={20} onClick={handleAddRow} className='cursor-pointer' />
                    </Tooltip>
                    <DropdownMenu
                        position='bottom-right'
                        button={
                            <Tooltip text='More' position='top-right'>
                                <PiDotsThreeVerticalBold size={16} />
                            </Tooltip>
                        }
                        items={[
                            { label: 'Replace all initial with current', icon: <BsBoxArrowInLeft size={16} className='cursor-pointer' />, onClick: () => handleReplaceInitialWithCurr() },
                            { label: 'Replace all current with initial', icon: <BsBoxArrowInRight size={16} className='cursor-pointer' />, onClick: () => handleReplaceCurrWithInitial() }
                        ]}
                    />
                </div>
            </div>
            {/* grid */}

            {(label === 'Global' || isAddNew) ?
                (selectedTab === 'variables' ?
                    data?.map((param: EnvVariablesObj, ind: number) => (
                        <div className="w-full flex gap-0 align-middle text-secondaryLight justify-end  border border-dividerDark" key={ind}>
                            <div className="p-1 w-8 border-r border-r-dividerDark"></div>
                            <div className="flex-gow-1 w-1/2 p-1 border-r border-r-dividerDark">
                                <input type='text' placeholder={`Variable ${ind + 1}`} className='bg-transparent p-2 w-full' name='key' value={param?.variable} onChange={(e) => handleChange(ind, "variable", e.target.value)} />
                            </div>
                            <div className="flex-gow-2 w-1/2 p-1 flex justify-between border-r border-r-dividerDark">
                                <input type='text' placeholder={`Initial Value ${ind + 1}`} className='bg-transparent p-2 w-full' name='value' value={param?.initialValue} onChange={(e) => handleChange(ind, "initialValue", e.target.value)} />
                                <Tooltip text='Replace with current' position='top-right'>
                                    <BsBoxArrowInLeft size={16} className='cursor-pointer ml-1' onClick={handleReplaceInitialWithCurr} />
                                </Tooltip>                    </div>
                            <div className="flex-gow-2 w-1/2 p-1 flex justify-between  border-r border-r-dividerDark">
                                <input
                                    type='text'
                                    placeholder={`Current Value ${ind + 1}`} className='bg-transparent p-2 w-full' name='value'
                                    value={param?.currentValue}
                                    onChange={(e) => handleChange(ind, "currentValue", e.target.value)}
                                />
                                <Tooltip text='Replace with initial' position='top-right'>
                                    <BsBoxArrowInRight size={16} className='cursor-pointer ml-1' onClick={handleReplaceCurrWithInitial} />
                                </Tooltip>
                            </div>
                            <div className="p-3 w-fit ">
                                <Tooltip position='top-right' text='Remove'>
                                    <MdOutlineDeleteOutline className='text-deleteColor cursor-pointer' size={16} onClick={() => handleDeleteRow(ind)} />
                                </Tooltip>
                            </div>
                        </div>
                    ))
                    : secrets?.map((param: EnvVariablesObj, ind: number) => (
                        <div className="w-full flex gap-0 align-middle text-secondaryLight justify-end  border border-dividerDark" key={ind}>
                            <div className="p-1 w-8 border-r border-r-dividerDark"></div>
                            <div className="flex-gow-1 w-1/2 p-1 border-r border-r-dividerDark">
                                <input type='text' placeholder={`Variable ${ind + 1}`} className='bg-transparent p-2 w-full' name='key' value={param?.variable} onChange={(e) => handleChange(ind, "variable", e.target.value)} />
                            </div>
                            <div className="flex-gow-2 w-1/2 p-1 flex justify-between border-r border-r-dividerDark">
                                <input type={`${(!showSecret?.initial) ? 'password' : 'text'}`} placeholder={`Initial Value ${ind + 1}`} className='bg-transparent p-2 w-full' name='value' value={param?.initialValue} onChange={(e) => handleChange(ind, "initialValue", e.target.value)} />

                                <Tooltip text={`${showSecret?.initial ? 'Hide Secret' : 'Show Secret'}`} position='top-right'>
                                    {showSecret?.initial ?
                                        <FaRegEyeSlash size={16} className={`cursor-pointer`}
                                            onClick={() => setShowSecret({ ...showSecret, initial: !showSecret?.initial })}
                                        /> :
                                        <FaRegEye size={16} className={`cursor-pointer`}
                                            onClick={() => setShowSecret({ ...showSecret, initial: !showSecret?.initial })}
                                        />
                                    }
                                </Tooltip>

                                <Tooltip text='Replace with current' position='top-right'>
                                    <BsBoxArrowInLeft size={16} className='cursor-pointer ml-1' onClick={handleReplaceInitialWithCurr} />
                                </Tooltip>                    </div>
                            <div className="flex-gow-2 w-1/2 p-1 flex justify-between  border-r border-r-dividerDark">
                                <input
                                    type={`${(!showSecret?.current) ? 'password' : 'text'}`}
                                    placeholder={`Current Value ${ind + 1}`} className='bg-transparent p-2 w-full' name='value'
                                    value={param?.currentValue}
                                    onChange={(e) => handleChange(ind, "currentValue", e.target.value)}
                                />

                                <Tooltip text={`${showSecret?.current ? 'Hide Secret' : 'Show Secret'}`} position='top-right'>
                                    {showSecret?.current ?
                                        <FaRegEyeSlash size={16} className={`cursor-pointer`}
                                            onClick={() => setShowSecret({ ...showSecret, current: !showSecret?.current })}
                                        /> :
                                        <FaRegEye size={16} className={`cursor-pointer`}
                                            onClick={() => setShowSecret({ ...showSecret, current: !showSecret?.current })}
                                        />
                                    }
                                </Tooltip>

                                <Tooltip text='Replace with initial' position='top-right'>
                                    <BsBoxArrowInRight size={16} className='cursor-pointer ml-1' onClick={handleReplaceCurrWithInitial} />
                                </Tooltip>
                            </div>
                            <div className="p-3 w-fit ">
                                <Tooltip position='top-right' text='Remove'>
                                    <MdOutlineDeleteOutline className='text-deleteColor cursor-pointer' size={16} onClick={() => handleDeleteRow(ind)} />
                                </Tooltip>
                            </div>
                        </div>
                    ))
                )
                :
                <div className='flex flex-col gap-2 align-middle items-center text-sec'>
                    <img alt='empty collections ' width={70} height={70} src={emptyImg} />
                    <p className="text-[10px]">Environments are empty</p>
                    <Button type='secondary' text='Add new' extraClass='!flex-row' onClick={() => {
                        setIsAddNew(true);
                    }}>
                        <IoAdd size={16} />
                    </Button>
                </div>
            }

        </div >
    )
}
