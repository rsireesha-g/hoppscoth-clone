import React from 'react'

type footerProps = {
    setIsCollapse: (x: boolean) => void,
    isCollapse: boolean,
    isRightSideBarCollapsed: boolean,
    setIsRightSideBarCollapsed: (x: boolean) => void,
}

export const Footer = ({ setIsCollapse, isCollapse, isRightSideBarCollapsed, setIsRightSideBarCollapsed }: footerProps) => {
    return (
        <div className='flex justify-between p-2 border border-top-[#666]'>
            <div className='flex gap-2'>
                <div onClick={() => setIsCollapse(!isCollapse)}>Collapse</div>
                <div>Settings</div>
            </div>
            <div className='flex gap-2'>
                <div>upload</div>
                <div>settings</div>
                <div>share</div>
                <div onClick={() => setIsRightSideBarCollapsed(!isRightSideBarCollapsed)}>collapse</div>
                <div>download</div>
            </div>
        </div >
    )
}
