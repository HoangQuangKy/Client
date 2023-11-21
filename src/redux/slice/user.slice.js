import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: '',
    address: '',
    dateOfBirth: '',
    username: '',
    password: '',
    phonenumber: ''
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            const { fieldName, value } = action.payload;
            state[fieldName] = value
        },
    },
});
export const { updateFormData } = formSlice.actions;
export default formSlice.reducer