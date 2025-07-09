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
        variables: [{ variable: '', initialValue: '', currentValue: '' }],
        secrets: [{ variable: '', initialValue: '', currentValue: '' }]
    }
]

const initialState = {
    methodData,
    environmentData
}


const restApiSlice = createSlice({
    name: 'restApiSlice',
    initialState,
    reducers: {
        onSaveEnvironmentVariablesAndSecrets(state, action: PayloadAction<EnvironmentData>) {
            const { variables, secrets } = action.payload;

            state.environmentData.push({
                variables: [...variables],
                secrets: [...secrets]
            });
            console.log(state.environmentData)
        }
    }
});

export const {
    onSaveEnvironmentVariablesAndSecrets
} = restApiSlice.actions;

export default restApiSlice.reducer;