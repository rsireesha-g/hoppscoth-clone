import { configureStore } from '@reduxjs/toolkit';
import statesSliceReducer from "./slices/statesSlice";
import restApiSliceReducer from "./slices/restApiSlice";

export const store = configureStore({
    reducer: {
        statesStatus: statesSliceReducer,
        restApi: restApiSliceReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
