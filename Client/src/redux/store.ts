import { AsyncThunk, configureStore } from "@reduxjs/toolkit";
import templateReducer from "./templateSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    templateReducer,
    authReducer
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;