import { createSlice } from "@reduxjs/toolkit"
import { MethodData } from "../../interfaces/restApiInterface";


const methodData: MethodData[] = [
    {
        method: 'GET',
        parameters: [{ key: '', value: '', description: '' }],
        headers: [{ key: '', value: '', description: '' }],
        body: '',
        authorization: '',
        preRequestScript: '',
        postRequestScript: ''
    },
    {
        method: 'POST',
        parameters: [{ key: '', value: '', description: '' }],
        headers: [{ key: '', value: '', description: '' }],
        body: '',
        authorization: '',
        preRequestScript: '',
        postRequestScript: ''
    }
];

const initialState = {
    methodData
}


const restApiSlice = createSlice({
    name: 'restApiSlice',
    initialState,
    reducers: {

    }
});

export const {

} = restApiSlice.actions;

export default restApiSlice.reducer;