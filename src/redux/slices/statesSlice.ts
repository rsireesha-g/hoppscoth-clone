import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface statesSliceProps {
    isShortCutsModalOpen: boolean,
    isSearchModalOpen: boolean,
    isLoggedIn: boolean,
    isLoginModalOpen: boolean
}

const initialState: statesSliceProps = {
    isShortCutsModalOpen: false,
    isSearchModalOpen: false,
    isLoggedIn: false,
    isLoginModalOpen: false
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
            state.isLoggedIn = false
        },
        onLogin(state) {
            state.isLoggedIn = true
        },
        isAuth(state) {
            const email = localStorage.getItem("email");
            console.log(email)
            if (email) {
                console.log(' insi')
                state.isLoggedIn = true;

            } else {
                console.log('out')
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
