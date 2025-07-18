import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EnvironmentData, historyStateType, MethodData } from "../../interfaces/restApiInterface";
import axios from "axios";


export const methodTabsData: MethodData[] = []



const environmentData: EnvironmentData[] = []

const selectedEnvironment: string = 'Global';

type collectionType = {
    label: string, tabIndexes: number[]
}[]
const collections: collectionType = [];

const historyData: historyStateType = {
    loading: false,
    error: false,
    data: []
}
const selectedHistoryRequest: MethodData = {
    method: 'GET',
    title: '',
    parameters: [{ key: '', value: '', description: '' }],
    headers: [{ key: '', value: '', description: '' }],
    body: '',
    authorization: '',
    preRequestScript: '',
    postRequestScript: '',
    variables: [{ variable: '', value: '' }],
    index: methodTabsData?.length,
    url: 'https://echo.hoppscotch.io'
};



const initialState = {
    methodTabsData,
    environmentData,
    selectedEnvironment,
    collections,
    historyData,
    selectedHistoryRequest,
    loading: false,
    error: false
}


export const getHistoryData = createAsyncThunk('rest/historyData', async ({ selectedFilterGroup }: { selectedFilterGroup?: string }) => {
    const res = await axios.get(`http://localhost:5000/rest/historyData?groupBy=${selectedFilterGroup?.toLocaleLowerCase()}`);
    return res?.data;
})

export const restoreHistoryData = createAsyncThunk('rest/historyData/:requested_at', async ({ requested_at }: { requested_at: string }) => {
    const res = await axios.get(`http://localhost:5000/rest/historyData/${requested_at}`);
    return res?.data;
})

export const clearAllHistoryData = createAsyncThunk('rest/historyData/deleteAll', async () => {
    const res = await axios.delete(`http://localhost:5000/rest/historyData`);
    return res?.data;
})

const restApiSlice = createSlice({
    name: 'restApiSlice',
    initialState,
    reducers: {
        onSaveEnvironmentVariablesAndSecrets(state, action: PayloadAction<EnvironmentData>) {
            const payload = action.payload;

            // Find the index of the existing label
            const index = state.environmentData.findIndex(
                (env) => env.label === payload.label
            );

            if (index !== -1) {
                // Label exists → update
                state.environmentData[index] = {
                    ...state.environmentData[index],
                    variables: [...payload.variables],
                    secrets: [...payload.secrets]
                };
            } else {
                // Label not found → add new
                state.environmentData.push({
                    label: payload.label,
                    variables: [...payload.variables],
                    secrets: [...payload.secrets]
                });
                state.selectedEnvironment = payload.label
            }

            console.log("Updated environmentData:", state.environmentData);
        },
        onSelectEnvironmentLabel(state, action: PayloadAction<string>) {
            state.selectedEnvironment = action.payload
        },
        onDeleteEnvironment(state, action: PayloadAction<string>) {
            let remainingEnv = state.environmentData?.filter((x) => x.label !== action.payload);
            state.environmentData = remainingEnv;
            console.log(remainingEnv)
        },
        onCreateCollection(state, action: PayloadAction<string>) {
            const isExists = state.collections?.find((x) => x.label === action.payload)
            if (isExists) {
                alert("Collection already exists")
            }
            else {
                state.collections.push({
                    label: action.payload,
                    tabIndexes: []
                })
            }
        },
        onHistoryRestore: (state, action: PayloadAction<MethodData>) => {
            state.selectedHistoryRequest = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getHistoryData.pending, state => {

                state.historyData.loading = true;
                state.historyData.error = false;
            })
            .addCase(getHistoryData.fulfilled, (state, action: any) => {
                state.historyData.loading = false;
                state.historyData.error = false;
                state.historyData.data = action.payload
            })
            .addCase(getHistoryData.rejected, state => {
                state.historyData.loading = false;
                state.historyData.error = true;
            })
            .addCase(restoreHistoryData.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(restoreHistoryData.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = false;
                state.selectedHistoryRequest = action.payload?.[0];
            })
            .addCase(restoreHistoryData.rejected, state => {
                state.loading = false;
                state.error = true;
            })
            .addCase(clearAllHistoryData.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(clearAllHistoryData.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = false;
                state.historyData.data = []

            })
            .addCase(clearAllHistoryData.rejected, state => {
                state.loading = false;
                state.error = true;
            })
    }
});

export const {
    onSaveEnvironmentVariablesAndSecrets,
    onSelectEnvironmentLabel,
    onDeleteEnvironment,
    onCreateCollection,
    onHistoryRestore
} = restApiSlice.actions;

export default restApiSlice.reducer;