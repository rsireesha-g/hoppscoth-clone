import React, { useState } from 'react'
import { Layout } from '../components/layout'
import { RadioButton } from '../components/radioButton'
import { Link } from 'react-router'
import { SlideButton } from '../components/slideButton';
import { Button } from '../components/button';
import { SettingsSection } from '../components/settingsSection';
import DropdownMenu from '../components/dropdownMenu';
import { LuLanguages } from "react-icons/lu";
import { IoIosDesktop } from 'react-icons/io';
import { CiCloud, CiDark, CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';

export type ExperimentKey = 'Telemetry' | 'Expand navigation' | 'Sidebar on left' | 'AI Experiments' | 'Experimental scripting sandbox' | 'Verify Host' | 'Verify Peer' | 'Proxy';

export const Settings = () => {
    const [queryParams, setQueryParams] = useState('Enable');
    const [experimentsValue, setExperimentsValue] = useState<Record<ExperimentKey, boolean>>({
        'Telemetry': true,
        'Expand navigation': false,
        'Sidebar on left': false,
        'AI Experiments': true,
        'Experimental scripting sandbox': true,
        'Verify Host': true,
        'Verify Peer': true,
        'Proxy': false
    });

    const [activeColor, setColor] = useState('Indigo')

    const globalLanguages = [
        { label: 'English' },
        { label: 'Mandarin Chinese' },
        { label: 'Spanish' },
        { label: 'Arabic' },
        { label: 'Hindi' },
        { label: 'Bengali' },
        { label: 'Portuguese' },
        { label: 'Russian' },
        { label: 'Japanese' },
        { label: 'German' },
        { label: 'French' },
        { label: 'Urdu' },
        { label: 'Indonesian' },
        { label: 'Turkish' },
        { label: 'Vietnamese' },
        { label: 'Korean' },
        { label: 'Italian' },
        { label: 'Persian (Farsi)' },
        { label: 'Polish' },
        { label: 'Ukrainian' },
        { label: 'Thai' },
        { label: 'Dutch' },
        { label: 'Swahili' },
        { label: 'Tamil' },
        { label: 'Telugu' },
        { label: 'Malayalam' },
        { label: 'Punjabi' },
        { label: 'Marathi' },
        { label: 'Gujarati' },
        { label: 'Hebrew' }
    ];


    const [interceptorValues, setInterceptorValues] = useState('Browser');

    const handleExperimentsValue = (item: ExperimentKey) => {
        const value = !experimentsValue[item]
        setExperimentsValue({ ...experimentsValue, [item]: value })
    }

    return (
        <Layout page='settings'>
            <div className="md:grid md:grid-cols-3 md:gap-4">
                <div className="md:col-span-1 p-8">
                    <h3 className="font-[700] text-[1.125rem] text-secondaryDark " style={{ lineHeight: '1.75rem' }}>General</h3>
                    <p className="text-secondaryLight my-1">General settings used in the application</p>
                </div>
                <div className="space-y-8 p-8 col-span-2">
                    <SettingsSection heading='Language' >
                        <DropdownMenu position='bottom-left' items={globalLanguages}
                            button={

                                <Button type='secondary' text='English' extraClass=' !flex-row-reverse' >
                                    <LuLanguages size={16} />
                                </Button>
                            }
                        >

                        </DropdownMenu>
                    </SettingsSection>

                    <SettingsSection heading='Query Parameters Encoding' description='Configure encoding for query parameters in requests'>
                        <div className='flex flex-col w-fit'>
                            {['Enable', 'Disable', 'Auto']?.map((btn: string) => (
                                <RadioButton
                                    selected={queryParams}
                                    setSelected={setQueryParams}
                                    text={btn}
                                    key={btn}
                                />
                            ))}
                        </div>
                    </SettingsSection>
                    <SettingsSection heading='Experiments'
                        description='This is a collection of experiments we are working on that might turn out to be useful, fun, both, or neither. They are not final and may not be stable, so if something overly weird happens, do not panic. Just turn the dang thing off. Jokes aside'
                        linkText='Contact Us'
                        linkTo='#'
                    >
                        <div className="flex flex-col w-fit">
                            {(['Telemetry', 'Expand navigation', 'Sidebar on left', 'AI Experiments'] as ExperimentKey[])?.map((item: ExperimentKey) => (
                                <SlideButton
                                    selected={experimentsValue[item]}
                                    setSelected={handleExperimentsValue}
                                    text={item}
                                    key={item}
                                />))}
                        </div>
                        <div className="my-1 text-secondaryLight">
                            Request Naming Style
                        </div>
                        <DropdownMenu position='top-right'

                            items={[
                                { label: 'Descriptive With Spaces' },
                                { label: 'Camel Case (camelCase)' },
                                { label: 'Snake Case (snake_case)' },
                                { label: 'Pascal Case (PascalCase)' },
                                { label: 'Custom' }
                            ]}
                            button={
                                <Button type='secondary' text='Descriptive With Spaces'
                                    extraClass=' !flex-row-reverse w-full justify-start' >
                                </Button>
                            }
                        >

                        </DropdownMenu>
                        <SlideButton
                            selected={experimentsValue?.['Experimental scripting sandbox']}
                            setSelected={handleExperimentsValue}
                            text={'Experimental scripting sandbox'}
                            key={'Experimental scripting sandbox'}
                        />
                    </SettingsSection>
                </div>

            </div>
            <div className="md:grid md:grid-cols-3 md:gap-4">
                <div className="md:col-span-1 p-8">
                    <h3 className="font-[700] text-[1.125rem] text-secondaryDark " style={{ lineHeight: '1.75rem' }}>Theme</h3>
                    <p className="text-secondaryLight my-1">Customize your application theme.</p>
                </div>
                <div className="space-y-8 p-8 col-span-2">
                    <SettingsSection heading='Background' description='Black'>
                        <div className="flex gap-2">
                            <IoIosDesktop size={16} />
                            <CiLight size={18} />
                            <CiCloud size={18} />
                            <CiDark size={18} />
                        </div>
                    </SettingsSection>
                    <SettingsSection heading='Accent color' description={activeColor}>
                        <div className="flex gap-2">
                            {['green', 'teal', 'blue', 'indigo', 'purple', 'yellow', 'orange', 'red', 'pink']
                                ?.map((color: string) => (
                                    <div className={`w-4 h-4 border rounded-full flex justify-center align-middle`} style={{ borderColor: `${color}` }}
                                        onClick={() => setColor(color)}>
                                        {activeColor === color && <div className='w-1 h-1 text-center rounded-full' style={{ backgroundColor: `${color}` }}></div>}
                                    </div>
                                ))}
                        </div>
                    </SettingsSection>
                </div>
            </div>
            <div className="md:grid md:grid-cols-3 md:gap-4">
                <div className="md:col-span-1 p-8">
                    <h3 className="font-[700] text-[1.125rem] text-secondaryDark " style={{ lineHeight: '1.75rem' }}>Interceptor</h3>
                    <p className="text-secondaryLight my-1">Middleware between application and APIs.</p>
                </div>
                <div className="space-y-8 p-8 col-span-2">
                    <SettingsSection heading='Interceptor' description=''>
                        {['Browser', 'Proxy', 'Agent', 'Browser extension']?.map((item: string) => (
                            <RadioButton
                                text={item}
                                selected={interceptorValues}
                                setSelected={setInterceptorValues}
                            />
                        ))}
                    </SettingsSection>
                    <SettingsSection heading='Proxy'
                        description='Official Proxy is hosted by Hoppscotch. Read the'
                        linkText='Proxy privacy policy'
                        linkTo='#'
                    >
                        proxy url
                        <Button text='https://proxy.hoppscotch.io/' type='secondary' extraClass='w-full mt-2' />
                    </SettingsSection>
                    <SettingsSection heading='Agent'
                        description=''
                    >
                        <div className="flex flex-col w-fit">
                            {(['Verify Host', 'Verify Peer'] as ExperimentKey[])?.map((item: ExperimentKey) => (
                                <SlideButton
                                    selected={experimentsValue[item]}
                                    setSelected={handleExperimentsValue}
                                    text={item}
                                    key={item}
                                />))}
                        </div>
                        <div className="flex gap-4 my-2">
                            <Button type='link' text='CA Certificates' extraClass='flex-row' />
                            <Button type='link' text='Client Certificates' extraClass='flex-row' />
                        </div>
                        <SlideButton
                            selected={experimentsValue?.['Proxy']}
                            setSelected={handleExperimentsValue}
                            text={'Proxy'}
                            key={'Proxy'}
                        />
                    </SettingsSection>
                    <SettingsSection heading='Browser extension' description='Extension Version: Not Reported'>
                        <div className="flex gap-4">
                            <Button type='link' text='Chrome' extraClass='flex-row' />
                            <Button type='link' text='Firefox' extraClass='flex-row' />
                        </div>
                    </SettingsSection>
                </div>
            </div>
        </Layout >
    )
}
