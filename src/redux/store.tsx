import { configureStore } from '@reduxjs/toolkit';
import statesSliceReducer from "./slices/statesSlice";

export const store = configureStore({
    reducer: {
        statesStatus: statesSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
