// import React from 'react'

// interface tooltipProps {
//     text?: string
// }
// export const Tooltip = ({ text = 'hi' }: tooltipProps) => {
//     return (
//         <div>
//             <button data-tooltip-target="tooltip-default" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">tooltip</button>

//             <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
//                 Tooltip content
//                 <div className="tooltip-arrow" data-popper-arrow></div>
//             </div>
//             <div className="relative group">
//                 <button className="px-4 py-2 text-white
//                            bg-blue-500 rounded 
//                            hover:bg-blue-600">
//                     Hover me (Top)
//                 </button>
//                 <div
//                     className="absolute bottom-full left-1/2 
//                        transform -translate-x-1/2 mb-2 
//                        w-max px-2 py-1 text-sm text-white
//                        bg-gray-700 rounded shadow-lg 
//                        opacity-0 group-hover:opacity-100">
//                     Tooltip
//                 </div>
//             </div>
//         </div>
//     )
// }

// Tooltip.tsx
import { ReactNode, useState } from "react";

interface TooltipProps {
    text?: string;
    children?: ReactNode;
    position?: "top" | "bottom" | "left" | "right" | "top-left";
}

export const Tooltip = ({ text = 'hi hello', position = 'bottom', children }: TooltipProps) => {
    const [show, setShow] = useState(false);

    const getPositionClasses = () => {
        switch (position) {
            case "top":
                return "bottom-full mb-2 flex-col";
            case "bottom":
                return "top-full mt-2 flex-col-reverse";
            case "left":
                return "right-full mr-2 flex-row-reverse";
            case "right":
                return "left-full ml-2 flex-row";
            default:
                return "bottom-full mb-2 flex-col";
        }
    };

    const getArrowClasses = () => {
        const base = "w-2 h-2 bg-white rotate-45 absolute";
        switch (position) {
            case "top":
                return `${base} -mt-1`;
            case "bottom":
                return `${base} -mb-1 left-1/2 -top-1`;
            case "left":
                return `${base} -mr-1`;
            case "right":
                return `${base} -ml-1`;
            case "top-left":
                return `${base} -mb-1 left-1/2 -bottom-1`
            default:
                return `${base} -mt-1`;
        }
    };

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {!show && (
                <div className={`absolute z-50 items-center ${getPositionClasses()}`}>
                    <div className="text-[10px] text-secondaryLight hover:text-secondaryDark bg-white text-black px-3 py-1 rounded shadow-md whitespace-nowrap">
                        {text}

                    </div>
                    <div className={getArrowClasses()} />
                </div>
            )}
        </div>
    )
};

