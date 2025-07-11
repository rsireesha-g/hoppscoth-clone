
import { ReactNode, useState } from 'react'
import { Header } from './header';
import { SideBar } from './sideBar';
import { Footer } from './footer';
import { ShortcutsComponent } from './shortcutsComponent';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { RestPageSideBar } from './restPageComponents/sideBar/sideBar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ShortcutsSideBar } from './common/shortcutsSideBar';
import { ChatBot } from './common/chatBot';
import { MdOutlineClose } from 'react-icons/md';
import { onChartBotModalClick } from '../redux/slices/statesSlice';
import { GraphQlPageSideBar } from './restPageComponents/graphqlSideBar/sideBar';

export const Layout = ({ children, page, showShortCuts = true }: { children: ReactNode, page: string, showShortCuts?: boolean }) => {
    const [theme, setTheme] = useState('dark');
    const [isCollapse, setIsCollapse] = useState<boolean>(false);
    const [isHorizontalCollapsed, setIsHorizontalCollapsed] = useState<boolean>(false);
    const [isRightSideBarCollapsed, setIsRightSideBarCollapsed] = useState<boolean>(false);
    const { isShortCutsModalOpen, isChatBotModalOpen } = useSelector((state: RootState) => state.statesStatus);
    const dispatch = useDispatch<AppDispatch>();

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
                                {page !== 'settings' && showShortCuts !== false &&
                                    <>
                                        <PanelResizeHandle
                                            className={`${isHorizontalCollapsed ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'
                                                } bg-gray-600 hover:bg-gray-500`}
                                        />

                                        <Panel defaultSize={40} minSize={30}>
                                            <ShortcutsComponent {...{ isHorizontalCollapsed }} />
                                        </Panel>
                                    </>
                                }
                            </PanelGroup>
                        </div>
                    </Panel>


                    {!isRightSideBarCollapsed && (page === "home" || page === 'graphql') &&
                        <>
                            <PanelResizeHandle className="w-1 bg-gray-600 md:visible hover:bg-gray-500 cursor-col-resize" />
                            <Panel defaultSize={30} minSize={20}>
                                {page === 'home' && <RestPageSideBar />}
                                {page === 'graphql' && <GraphQlPageSideBar />}
                            </Panel>
                        </>
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
            {isShortCutsModalOpen && <ShortcutsSideBar />}
            {
                isChatBotModalOpen &&
                <div className="modal">
                    <div className="w-64 innerModal bottom-10 right-2 bg-secondaryDark text-primaryDark">
                        <div className='flex justify-between'>
                            <div>
                                Welcome to chat bot!
                            </div>
                            <MdOutlineClose
                                size={20}
                                onClick={() => dispatch(onChartBotModalClick(false))}
                                className='cursor-pointer text-primaryDark' />
                        </div>
                    </div>
                </div>
            }
        </div >
    );
};
