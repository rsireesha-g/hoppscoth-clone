import { createSlice } from "@reduxjs/toolkit"

interface statesSliceProps {
    isShortCutsModalOpen: boolean,
}

const initialState: statesSliceProps = {
    isShortCutsModalOpen: false
}

const statesSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        onShortCutsModalClick(state) {
            state.isShortCutsModalOpen = !state.isShortCutsModalOpen
        }
    }
});

export const {
    onShortCutsModalClick
} = statesSlice.actions;
export default statesSlice.reducer;
