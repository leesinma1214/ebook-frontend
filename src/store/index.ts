import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";

const reducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;

export const getAuthState = (state: RootState) => state.auth;

export default store;
