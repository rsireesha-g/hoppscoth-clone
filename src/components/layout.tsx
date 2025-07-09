
import { ReactNode, useState } from 'react'
import { Header } from './header';
import { SideBar } from './sideBar';
import { Footer } from './footer';
import { ShortcutsComponent } from './shortcutsComponent';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { RestPageSideBar } from './restPageComponents/sideBar/sideBar';

export const Layout = ({ children, page }: { children: ReactNode, page: string }) => {
    const [theme, setTheme] = useState('dark');
    const [isCollapse, setIsCollapse] = useState<boolean>(false);
    const [isHorizontalCollapsed, setIsHorizontalCollapsed] = useState<boolean>(false);
    const [isRightSideBarCollapsed, setIsRightSideBarCollapsed] = useState<boolean>(false);

    return (
        <div className={`w-screen h-screen text-xs font-semibold  ${theme === 'dark' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'}`}>
            <Header />
            <div className="w-full flex h-[88vh] overflow-visible relative z-0">
                <SideBar {...{ isCollapse, page }} />

                <PanelGroup direction="horizontal" className="flex-1">
                    <Panel defaultSize={70} minSize={60}>
                        <div className={`w-full h-full flex ${isHorizontalCollapsed ? 'flex-col' : 'flex-row'}`}>
                            <PanelGroup direction={isHorizontalCollapsed ? 'horizontal' : 'vertical'} className="flex-1">
                                <Panel defaultSize={60} minSize={50}>
                                    <div
                                        className={`border border-yellow-500 h-full w-full overflow-visible relative ${page === 'settings' ? 'overflow-y-scroll' : ''
                                            }`}
                                    >
                                        {children}
                                    </div>
                                </Panel>
                                <PanelResizeHandle
                                    className={`${isHorizontalCollapsed ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'
                                        } bg-gray-600 hover:bg-gray-500`}
                                />
                                {page !== 'settings' &&
                                    <Panel defaultSize={40} minSize={30}>
                                        <ShortcutsComponent {...{ isHorizontalCollapsed }} />
                                    </Panel>
                                }
                            </PanelGroup>
                        </div>
                    </Panel>

                    {!isRightSideBarCollapsed && (
                        <PanelResizeHandle className="w-1 bg-gray-600 hover:bg-gray-500 cursor-col-resize" />
                    )}

                    {!isRightSideBarCollapsed &&

                        <Panel defaultSize={30} minSize={20}>
                            {page === 'home' && <RestPageSideBar />}
                            {page === 'graphql' && 'home'}
                        </Panel>
                    }
                </PanelGroup>
            </div>

            <Footer
                {...{
                    setIsCollapse,
                    isCollapse,
                    isRightSideBarCollapsed,
                    setIsRightSideBarCollapsed,
                    isHorizontalCollapsed,
                    setIsHorizontalCollapsed,
                }}
            />
        </div>
    );
};
