import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface statesSliceProps {
    isShortCutsModalOpen: boolean,
    isSearchModalOpen: boolean,
    isLoggedIn: boolean,
    isLoginModalOpen: boolean,
    email: string
}

const initialState: statesSliceProps = {
    isShortCutsModalOpen: false,
    isSearchModalOpen: false,
    isLoggedIn: false,
    isLoginModalOpen: false,
    email: ''
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
            state.isLoggedIn = true
        },
        isAuth(state) {
            const email = localStorage.getItem("email");
            if (email) {
                state.isLoggedIn = true;
                state.email = email;

            } else {
                state.isLoggedIn = false;
                state.isLoginModalOpen = true
            }
        },
        onLoginModalClick(state, action: PayloadAction<boolean>) {
            state.isLoginModalOpen = action.payload;
        }
    }
});

export const {
    onShortCutsModalClick,
    onSearchModalClick,
    onLoginModalClick,
    onLogout,
    onLogin,
    isAuth
} = statesSlice.actions;
export default statesSlice.reducer;
