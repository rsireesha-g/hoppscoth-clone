import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EnvironmentData, MethodData } from "../../interfaces/restApiInterface";


const methodData: MethodData[] = [
    {
        method: 'GET',
        parameters: [{ key: '', value: '', description: '' }],
        headers: [{ key: '', value: '', description: '' }],
        body: '',
        authorization: '',
        preRequestScript: '',
        postRequestScript: '',
        variables: [{ variable: '', value: '' }]
    },
    {
        method: 'POST',
        parameters: [{ key: '', value: '', description: '' }],
        headers: [{ key: '', value: '', description: '' }],
        body: '',
        authorization: '',
        preRequestScript: '',
        postRequestScript: '',
        variables: [{ variable: '', value: '' }]
    }
];



const environmentData: EnvironmentData[] = [
    {
        label: '',
        variables: [{ variable: '', initialValue: '', currentValue: '' }],
        secrets: [{ variable: '', initialValue: '', currentValue: '' }]
    }
];

const selectedEnvironment: string = 'Global'

const initialState = {
    methodData,
    environmentData,
    selectedEnvironment
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
        }
    }
});

export const {
    onSaveEnvironmentVariablesAndSecrets,
    onSelectEnvironmentLabel,
    onDeleteEnvironment
} = restApiSlice.actions;

export default restApiSlice.reducer;