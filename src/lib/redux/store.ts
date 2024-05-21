import { combineReducers, configureStore } from "@reduxjs/toolkit";
import addressReducer from "./addressSlice";
const rootReducer = combineReducers({
    address: addressReducer,
});


export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
