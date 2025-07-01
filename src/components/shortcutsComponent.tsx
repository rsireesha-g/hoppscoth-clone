import React from 'react'

type shortcutsProps = {
    isHorizontalCollapsed: boolean
}

export const ShortcutsComponent = ({
    isHorizontalCollapsed
}: shortcutsProps) => {
    return (
        <div className={`${isHorizontalCollapsed ? 'flex-grow w-full' : 'h-full w-1/2'} 
        border border-blue-700`}>
            hello
        </div>
    )
}
