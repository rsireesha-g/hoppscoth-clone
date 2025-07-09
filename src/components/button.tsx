import { ReactNode } from "react"
import { IconType } from "react-icons"
import { BsChevronDown } from "react-icons/bs"
import { Link } from "react-router"

interface buttonProp {
    type: 'primary' | 'bordered' | 'link' | 'secondary',
    text: string,
    children?: ReactNode,
    nextLink?: string,
    extraClass?: string,
    onClick?: () => void,
    chevronExists?: boolean,
    textColor?: string
}

export const Button = ({ type, text, children, nextLink, extraClass, chevronExists = false, onClick, textColor = '' }: buttonProp) => {
    const handleClick = onClick ?? (() => console.log(''));
    return (
        <>
            {type === 'primary' &&
                <button className={`
                    relative inline-flex gap-2 items-center justify-center whitespace-nowrap transition focus:outline-none focus-visible:bg-accentDark bg-accent text-accentContrast hover:bg-accentDark px-4 py-2 rounded h-8 
                ${extraClass}
                `} onClick={handleClick}
                >
                    <p style={{ color: `${textColor ? textColor : ''}` }}>{text}</p>
                    {children}
                    {chevronExists && <BsChevronDown size={12} />}
                </button>
            }
            {type === 'bordered' &&
                <button className={`flex items-center justify-center gap-2 whitespace-nowrap transition focus:outline-none focus-visible:bg-emerald-600/20 bg-emerald-500/10 text-getColor 
                 hover:bg-emerald-600/20  px-4 py-2 rounded h-8 border border-getColor  ${extraClass}`}
                    onClick={handleClick}>
                    {children}
                    <p>{text}</p>
                    {chevronExists && <BsChevronDown size={12} />}

                </button>
            }
            {
                type === 'link' &&
                <Link to={nextLink || '#'} target="_blank" className={`flex flex-row-reverse items-center justify-center gap-2 whitespace-nowrap transition 
                focus:outline-none w-fit text-[#a1a1a1] font-semibold hover:text-secondaryDark px-4 py-2 rounded h-8 border border-dividerDark ${extraClass}`}
                    onClick={handleClick}>
                    {children}
                    <p>{text}</p>
                    {chevronExists && <BsChevronDown size={12} />}

                </Link>
            }
            {
                type === 'secondary' &&
                <button className={`flex flex-row-reverse items-center justify-center gap-2 whitespace-nowrap transition focus:outline-none w-fit 
                text-[#a1a1a1] font-semibold hover:text-secondaryDark px-4 py-2 rounded h-8 border border-dividerDark ${extraClass}`}
                    onClick={handleClick}>
                    {children}
                    <p style={{ color: `${textColor ? `${textColor}!important` : ''}` }}>{text}</p>
                    {chevronExists && <BsChevronDown size={12} />}

                </button>
            }
        </>
    )
}
