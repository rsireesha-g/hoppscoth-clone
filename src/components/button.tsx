import { ReactNode } from "react"
import { IconType } from "react-icons"
import { Link } from "react-router"

interface buttonProp {
    type: 'primary' | 'bordered' | 'link' | 'secondary',
    text: string,
    children?: ReactNode,
    nextLink?: string,
    extraClass?: string,
    onClick?: () => void
}

export const Button = ({ type, text, children, nextLink, extraClass, onClick }: buttonProp) => {
    const handleClick = onClick ?? (() => console.log(''));
    return (
        <>
            {type === 'primary' &&
                <button className={`
                    relative inline-flex items-center justify-center whitespace-nowrap transition focus:outline-none focus-visible:bg-accentDark bg-accent text-accentContrast hover:bg-accentDark px-4 py-2 rounded h-8 
                `} onClick={handleClick}>
                    <p>{text}</p>
                </button>
            }
            {type === 'bordered' &&
                <button className="flex items-center justify-center gap-2 whitespace-nowrap transition focus:outline-none focus-visible:bg-emerald-600/20 bg-emerald-500/10 text-getColor 
                 hover:bg-emerald-600/20  px-4 py-2 rounded h-8 border border-getColor  "
                    onClick={handleClick}>
                    {children}
                    <p>{text}</p>
                </button>
            }
            {
                type === 'link' &&
                <Link to={nextLink || '#'} className={`flex flex-row-reverse items-center justify-center gap-2 whitespace-nowrap transition 
                focus:outline-none w-fit text-[#a1a1a1] font-semibold hover:text-secondaryDark px-4 py-2 rounded h-8 border border-dividerDark ${extraClass}`}
                    onClick={handleClick}>
                    {children}
                    <p>{text}</p>
                </Link>
            }
            {
                type === 'secondary' &&
                <button className={`flex flex-row-reverse items-center justify-center gap-2 whitespace-nowrap transition focus:outline-none w-fit 
                text-[#a1a1a1] font-semibold hover:text-secondaryDark px-4 py-2 rounded h-8 border border-dividerDark ${extraClass}`}
                    onClick={handleClick}>
                    {children}
                    <p>{text}</p>
                </button>
            }
        </>
    )
}
