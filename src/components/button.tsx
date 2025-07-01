import { ReactNode } from "react"
import { IconType } from "react-icons"

interface buttonProp {
    type: 'primary' | 'bordered',
    text: string,
    children?: ReactNode
}

export const Button = ({ type, text, children }: buttonProp) => {
    return (
        <>
            {type === 'primary' &&
                <button className={`
                    relative inline-flex items-center justify-center whitespace-nowrap transition focus:outline-none focus-visible:bg-accentDark bg-accent text-accentContrast hover:bg-accentDark px-4 py-2 rounded h-8 
                `}>
                    <p>{text}</p>
                </button>
            }
            {type === 'bordered' &&
                <button className="flex items-center justify-center gap-2 whitespace-nowrap transition focus:outline-none focus-visible:bg-emerald-600/20 bg-emerald-500/10 text-getColor  hover:bg-emerald-600/20  px-4 py-2 rounded h-8 border border-getColor  ">
                    {children}
                    <p>{text}</p>
                </button>
            }
        </>
    )
}
