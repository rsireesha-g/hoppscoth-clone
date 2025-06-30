import { IconType } from "react-icons"

interface buttonProp {
    type: 'primary' | 'bordered',
    text: string
}

export const Button = ({ type, text }: buttonProp) => {
    return (
        <>
            {type === 'primary' &&
                <button className={`
                    relative inline-flex items-center justify-center font-semibold whitespace-nowrap transition focus:outline-none focus-visible:bg-accentDark bg-accent text-accentContrast hover:bg-accentDark focus-visible:bg-accentDark px-4 py-2 rounded h-8 ${type === 'primary' && 'bg-[#6366f1]'} 
                `}>
                    <p>{text}</p>
                </button>
            }
        </>
    )
}
