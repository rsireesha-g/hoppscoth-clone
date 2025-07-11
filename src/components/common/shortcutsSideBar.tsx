import React, { useRef, useState } from 'react'
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { onShortCutsModalClick } from '../../redux/slices/statesSlice';
import { MdOutlineClose } from "react-icons/md";
import { LuChevronDown } from "react-icons/lu";
import { Modal } from '../modal';
import { useSelector } from 'react-redux';
import { useClickOutside } from '../../hooks/modalHooks';

const shortCutsData = [
    {
        "section": "General",
        "items": [
            { "label": "Help menu", "kbd": ["Ctrl", "/"] },
            { "label": "Search & command menu", "kbd": ["Ctrl", "K"] },
            { "label": "Keyboard shortcuts", "kbd": ["?"] },
            { "label": "Close current menu", "kbd": ["Esc"] }
        ]
    },
    {
        "section": "Request",
        "items": [
            { "label": "Send Request", "kbd": ["Ctrl", "Enter"] },
            { "label": "Save to Collections", "kbd": ["Ctrl", "S"] },
            { "label": "Share Request", "kbd": ["Ctrl", "Shift", "S"] },
            { "label": "Reset Request", "kbd": ["Ctrl", "R"] },
            { "label": "Select Next method", "kbd": ["Ctrl", "↓"] },
            { "label": "Select Previous method", "kbd": ["Ctrl", "↑"] },
            { "label": "Select GET method", "kbd": ["G"] },
            { "label": "Select HEAD method", "kbd": ["H"] },
            { "label": "Select POST method", "kbd": ["P"] },
            { "label": "Select PUT method", "kbd": ["U"] },
            { "label": "Select DELETE method", "kbd": ["D"] }
        ]
    },
    {
        "section": "Response",
        "items": [
            { "label": "Download response as file", "kbd": ["Ctrl", "Shift", "D"] },
            { "label": "Copy response to clipboard", "kbd": ["Ctrl", "Shift", "C"] }
        ]
    },
    {
        "section": "Navigation",
        "items": [
            { "label": "Go back to previous page", "kbd": ["Alt", "←"] },
            { "label": "Go forward to next page", "kbd": ["Alt", "→"] },
            { "label": "Go to REST page", "kbd": ["Ctrl", "1"] },
            { "label": "Go to GraphQL page", "kbd": ["Ctrl", "2"] }
        ]
    }
]



export const ShortcutsSideBar = () => {
    const modalRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch<AppDispatch>();
    const isShortCutsModalOpen = useSelector((state: RootState) => state.statesStatus.isShortCutsModalOpen);
    const [input, setInput] = useState('');

    const filteredItems = shortCutsData
        .flatMap(section =>
            section.items.map(item => ({
                section: section.section,
                ...item
            }))
        )
        .filter(item =>
            item.label.toLowerCase().includes(input.toLowerCase())
        )


    const grouped = filteredItems.reduce((acc: any, item) => {
        if (!acc[item.section]) acc[item.section] = [];
        acc[item.section].push(item);
        return acc;
    }, {});


    return (
        <Modal onClose={() => dispatch(onShortCutsModalClick(false))} isOpen={isShortCutsModalOpen} >
            <div ref={modalRef} className="absolute z-30 right-0 top-0 bg-primary border-l border-dividerDark w-96 h-full flex flex-col gap-2 overflow-auto" >
                <div className="flex items-center justify-between p-2 border-b border-dividerDark ">
                    <h3 className="ml-4 heading">Shortcuts</h3>
                    <MdOutlineClose onClick={() => dispatch(onShortCutsModalClick(false))} className='w-4 h-4 cursor-pointer' />
                </div>
                <div className="sticky top-0 z-10 flex flex-shrink-0 flex-col overflow-x-auto bg-primary">
                    <div className="relative flex px-6 py-4 border-b border-dividerDark">
                        <input placeholder='Search'
                            autoComplete='off'
                            required
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            className='input w-full flex px-4 py-2 border rounded bg-primaryContrast border-divider hover:border-dividerDark focus-visible:border-dividerDark' />
                    </div>
                </div>
                <div className="flex flex-col divide-y divide-dividerDark">
                    {Object.entries(grouped)?.map(([section, items]: any) => {
                        console.log(section, items)
                        return (<details className='flex flex-col' open>
                            <summary className='flex min-w-0 flex-1 cursor-pointer items-center px-6 py-4 font-semibold text-secondaryDark transition hover:text-secondary focus:outline-none'>
                                <LuChevronDown className='w-4 h-4 mr-2' />
                                {section}
                            </summary>
                            <div className="flex flex-col space-y-2 px-6 pb-4">
                                {items?.map((item: any) => (
                                    <div className="flex items-center py-1  text-secondary">

                                        <span className="mr-4 flex flex-1">{item?.label}</span>
                                        {item?.kbd?.map((k: string) => (
                                            <kbd className="kbd">{k}</kbd>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </details>)
                    })}
                </div>
            </div>
        </Modal>
    )
}
