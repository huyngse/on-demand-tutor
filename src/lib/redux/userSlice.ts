import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface userState {
    loggedUser: any;
}

const initialState: userState = {
    loggedUser: null,
};

export const userSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setLoggedUser: (state, action: PayloadAction<any>) => {
            state.loggedUser = action.payload;
        },
    },
});
export const { setLoggedUser } = userSlice.actions;
export default userSlice.reducer;
