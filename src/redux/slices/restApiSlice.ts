import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EnvironmentData, MethodData } from "../../interfaces/restApiInterface";


export const methodTabsData: MethodData[] = []



const environmentData: EnvironmentData[] = []

const selectedEnvironment: string = 'Global';

type collectionType = {
    label: string, tabIndexes: number[]
}[]
const collections: collectionType = []

const initialState = {
    methodTabsData,
    environmentData,
    selectedEnvironment,
    collections
}


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
        }
    }
});

export const {
    onSaveEnvironmentVariablesAndSecrets,
    onSelectEnvironmentLabel,
    onDeleteEnvironment,
    onCreateCollection
} = restApiSlice.actions;

export default restApiSlice.reducer;