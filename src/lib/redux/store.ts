import { combineReducers, configureStore } from "@reduxjs/toolkit";
import addressReducer from "./addressSlice";
import userReducer from "./userSlice";
const rootReducer = combineReducers({
    address: addressReducer,
    user: userReducer,
});


export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
