import { ReactNode, useState } from 'react'
import { Header } from './header';
import { SideBar } from './sideBar';
import { Footer } from './footer';



export const Layout = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('dark');
    const [isCollapse, setIsCollapse] = useState<boolean>(false);
    const [isHorizontalCollapsed, setIsHorizontalCollapsed] = useState<boolean>(false);
    const [isRightSideBarCollapsed, setIsRightSideBarCollapsed] = useState<boolean>(false);
    return (
        <div className={`w-[100vw] h-[100vh] text-xs font-semibold  ${theme === 'dark' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'}`}>
            <div className={``}>
                <Header />
            </div>
            <div className={`w-full flex flex-1 h-[88vh] border border-red-500`}>
                <SideBar isCollapse={isCollapse} />
                <div className={`flex-grow border border-blue-950 h-full bg-slate-200 flex ${isHorizontalCollapsed ? 'flex-col' : 'flex-row'}`}>
                    <p className={`border border-yellow-500 ${isHorizontalCollapsed ? 'h-1/2 w-full' : 'h-full w-1/2'}`}>hi</p>
                    <p className={`${isHorizontalCollapsed ? 'h-1/2 w-full' : 'h-full w-1/2'}`}>hello</p>
                </div>
                <div className={`${isRightSideBarCollapsed ? 'hidden' : 'w-1/4'} border border-red-500 h-full flex gap-2`}>
                    <div className='w-12 h-full'>hi</div>
                    <div>sgadjwgh</div>
                </div>
            </div>
            <div className={``}>
                <Footer
                    {...{ setIsCollapse, isCollapse, isRightSideBarCollapsed, setIsRightSideBarCollapsed, isHorizontalCollapsed, setIsHorizontalCollapsed }}
                />
            </div>

        </div>
    )
}
