import { createSlice } from "@reduxjs/toolkit"

interface statesSliceProps {
    isShortCutsModalOpen: boolean,
    isSearchModalOpen: boolean,
}

const initialState: statesSliceProps = {
    isShortCutsModalOpen: false,
    isSearchModalOpen: false
}

const statesSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        onShortCutsModalClick(state) {
            state.isShortCutsModalOpen = !state.isShortCutsModalOpen
        },
        onSearchModalClick(state) {
            state.isSearchModalOpen = !state.isSearchModalOpen
        }
    }
});

export const {
    onShortCutsModalClick,
    onSearchModalClick
} = statesSlice.actions;
export default statesSlice.reducer;
