
interface radioButtonProps {
    text: string,
    selected: string,
    setSelected: (x: string) => void,
}

export const RadioButton = ({ text, selected, setSelected }: radioButtonProps) => {
    return (
        <label
            key={text}
            className='flex gap-2 align-middle py-2 items-center
            rounded transition hover:text-secondaryDark
            focus:outline-none focus-visible::bg-primaryDark focus-visible:text-secondaryDark
            hover:bg-transparent text-secondaryLight'
        >


            <input
                type="radio"
                className="peer hidden"
                name={text}
                value={text}
                checked={selected === text}
                onChange={() => setSelected(text)}
            />
            <div
                className={`
          w-3 h-3 rounded-full border-2 flex items-center justify-center
          border-dividerDark transition peer-checked:border-blue-600
        `}
            >
                <div
                    className={`
            w-1.5 h-1.5 rounded-full bg-accent 
            ${selected === text ? 'opacity-100' : 'opacity-0'}
            transition-opacity
          `}
                ></div>
            </div>
            <span className='max-w-64'>{text}</span>
        </label>
    )
}

