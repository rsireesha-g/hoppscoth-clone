import React from 'react'

type sideBarProps = {
    isCollapse: boolean
}

export const SideBar = ({ isCollapse }: sideBarProps) => {
    return (
        <div className={`${isCollapse ? 'w-12' : 'w-20'} border border-red-400`}>
            Settings
        </div>
    )
}
