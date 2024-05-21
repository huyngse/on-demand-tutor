import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface addressState {
    value: any[];
}

const initialState: addressState = {
    value: [],
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<any[]>) => {
            state.value = action.payload;
        },
    },
});
export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
