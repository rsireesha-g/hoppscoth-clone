import React from 'react'
import { ExperimentKey } from '../pages/settings'

interface radioButtonProps {
    text: ExperimentKey,
    selected: boolean,
    setSelected: (key: ExperimentKey) => void,
    key: string,
}

export const SlideButton = ({ text, selected, setSelected }: radioButtonProps) => {
    return (
        <label className='flex gap-2 py-2 items-center
                hover:text-secondaryDark 
            focus:outline-none focus-visible::bg-primaryDark focus-visible:text-secondaryDark 
            hover:bg-transparent text-secondaryLight '>
            <input
                type="checkbox"
                className="peer hidden"
                name={text}
                value={text}
                checked={selected}
                onChange={() => setSelected(text)}
            />
            <div className={`
                        w-7 h-3 px-1 bg-transparent border-2 border-dividerDark rounded-xl flex items-center peer-checked:border-accent align-middle
                        peer-checked:justify-end justify-start
                        `}>
                <div className={`w-1.5 h-1.5 rounded-full peer-checked:bg-accent ${selected ? 'bg-accent' : 'bg-secondaryLight '}`} />
            </div>
            <span className='max-w-64'>{text}</span>
        </label>
    )
}
