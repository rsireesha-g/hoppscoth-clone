import React from 'react'

interface tooltipProps {
    text?: string
}
export const Tooltip = ({ text = 'hi' }: tooltipProps) => {
    return (
        <div>
            <button data-tooltip-target="tooltip-default" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">tooltip</button>

            <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                Tooltip content
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="relative group">
                <button className="px-4 py-2 text-white
                           bg-blue-500 rounded 
                           hover:bg-blue-600">
                    Hover me (Top)
                </button>
                <div
                    className="absolute bottom-full left-1/2 
                       transform -translate-x-1/2 mb-2 
                       w-max px-2 py-1 text-sm text-white
                       bg-gray-700 rounded shadow-lg 
                       opacity-0 group-hover:opacity-100">
                    Tooltip
                </div>
            </div>
        </div>
    )
}
