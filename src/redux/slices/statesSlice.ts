import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface statesSliceProps {
    isShortCutsModalOpen: boolean,
    isSearchModalOpen: boolean,
    isLoggedIn: boolean,
    isLoginModalOpen: boolean,
    email: string | null,
    environments: any,
    isChatBotModalOpen: boolean,
    isInviteModalOpen: boolean,
    showShortCutsPanel: boolean
}

const initialState: statesSliceProps = {
    isShortCutsModalOpen: false,
    isSearchModalOpen: false,
    isLoggedIn: false,
    isLoginModalOpen: false,
    email: localStorage.getItem("email"),
    environments: null,
    isChatBotModalOpen: false,
    isInviteModalOpen: false,
    showShortCutsPanel: true
}

const statesSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        onShortCutsModalClick(state, action: PayloadAction<boolean>) {
            state.isShortCutsModalOpen = action.payload;
        },
        onSearchModalClick(state, action: PayloadAction<boolean>) {
            state.isSearchModalOpen = action.payload;
        },
        onLogout(state) {
            localStorage.removeItem('email');
            state.isLoggedIn = false;
            state.email = ''
        },
        onLogin(state) {
            state.isLoggedIn = true;
            state.email = localStorage.getItem('email');
        },
        isAuth(state) {
            if (state.email) {
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false;
            }
        },
        onLoginModalClick(state, action: PayloadAction<boolean>) {
            if (state.email) {
                state.isLoggedIn = true;
            } else {
                state.isLoginModalOpen = action.payload;
            }
        },
        onChartBotModalClick(state, action: PayloadAction<boolean>) {
            state.isChatBotModalOpen = action.payload
        },
        onInviteModalClick(state, action: PayloadAction<boolean>) {
            state.isInviteModalOpen = action.payload
        },
        onShowShortCutsPanelClick(state, action: PayloadAction<boolean>) {
            state.showShortCutsPanel = action.payload
        }
    }
});

export const {
    onShortCutsModalClick,
    onSearchModalClick,
    onLoginModalClick,
    onLogout,
    onLogin,
    isAuth,
    onChartBotModalClick,
    onInviteModalClick,
    onShowShortCutsPanelClick
} = statesSlice.actions;

export default statesSlice.reducer;
