
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
import { onChartBotModalClick, onInviteModalClick } from '../redux/slices/statesSlice';
import { GraphQlPageSideBar } from './restPageComponents/graphqlSideBar/sideBar';
import { InviteModal } from './common/inviteModal';

type layoutProps = {
    children: any,
    page: string,
    showShortCuts?: boolean,
    showRightSideBar?: boolean,
    showLeftSideBar?: boolean
}


export const Layout = ({ children, page, showShortCuts = true, showLeftSideBar = true, showRightSideBar = true }: layoutProps) => {
    const [theme, setTheme] = useState('dark');
    const [isCollapse, setIsCollapse] = useState<boolean>(false);
    const [isHorizontalCollapsed, setIsHorizontalCollapsed] = useState<boolean>(false);
    const [isRightSideBarCollapsed, setIsRightSideBarCollapsed] = useState<boolean>(false);
    const { isShortCutsModalOpen, isChatBotModalOpen, isInviteModalOpen, showShortCutsPanel } = useSelector((state: RootState) => state.statesStatus);
    const dispatch = useDispatch<AppDispatch>();


    return (
        <div className={`w-screen h-screen text-xs font-semibold  ${theme === 'dark' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'}`}>
            <Header />
            <div className="w-full flex flex-grow h-[calc(100%-50px)] md:h-[88vh] overflow-hidden relative z-0 md:flex-row flex-col-reverse">
                <SideBar {...{ isCollapse, page }} />
                <div className='hidden md:flex w-full'>
                    <PanelGroup direction="horizontal" className="flex-1">
                        <Panel defaultSize={70} minSize={60}>
                            <div className={`w-full h-full overflow-y-auto flex ${isHorizontalCollapsed ? 'flex-col' : 'flex-row'}`}>
                                <PanelGroup direction={isHorizontalCollapsed ? 'horizontal' : 'vertical'} className="flex-1 overflow-y-auto overflow-x-auto">
                                    <Panel defaultSize={60} minSize={50} className='!overflow-visible'>
                                        <div
                                            className={` h-full w-full overflow-visible relative ${page === 'settings' ? 'overflow-y-auto' : ''
                                                }`}
                                        >
                                            {children}
                                        </div>
                                    </Panel>

                                    {showShortCuts && showShortCutsPanel &&
                                        <>
                                            <PanelResizeHandle
                                                className={`${isHorizontalCollapsed ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'
                                                    } bg-primaryDark hover:bg-primaryDark z-10 flex`}
                                            />

                                            <Panel defaultSize={40} minSize={20}>
                                                <ShortcutsComponent {...{ isHorizontalCollapsed }} />
                                            </Panel>
                                        </>
                                    }
                                </PanelGroup>
                            </div>
                        </Panel>


                        {!isRightSideBarCollapsed && showRightSideBar &&
                            <>
                                <PanelResizeHandle className="w-1 bg-primaryDark hover:bg-primaryDark md:visible overflow-auto cursor-col-resize" />
                                <Panel defaultSize={30} minSize={20} style={{ overflow: 'auto !important' }}>
                                    {page === 'home' && <RestPageSideBar />}
                                    {page === 'graphql' && <GraphQlPageSideBar />}
                                </Panel>
                            </>
                        }
                    </PanelGroup>
                </div>
                <div className={`md:hidden w-full h-full !overflow-auto overflow-y-scroll flex flex-col ${isHorizontalCollapsed ? 'flex-col' : 'flex-row'}`}>
                    <PanelGroup direction={isHorizontalCollapsed ? 'horizontal' : 'vertical'} className="flex-1 !overflow-y-scroll">
                        <Panel defaultSize={60} minSize={50} className='!overflow-visible'>
                            <div
                                className={` h-full w-full overflow-visible relative ${page === 'settings' ? 'overflow-y-auto' : ''
                                    }`}
                            >
                                {children}
                            </div>
                        </Panel>

                        {showShortCuts &&
                            <>
                                <PanelResizeHandle
                                    className={`${isHorizontalCollapsed ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'
                                        } bg-primaryDark hover:bg-primaryDark z-10 flex`}
                                />

                                <Panel defaultSize={40} minSize={20}>
                                    <ShortcutsComponent {...{ isHorizontalCollapsed }} />
                                </Panel>
                            </>
                        }
                    </PanelGroup>
                </div>
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
            {isInviteModalOpen && <InviteModal handleClose={() => dispatch(onInviteModalClick(false))} />}

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
