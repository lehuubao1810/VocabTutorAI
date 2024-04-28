import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./store";
import { AxiosError } from "axios";
import { ErrorResponse } from "../type/ErrorResponse";

type templateState = {
  template: string; // type of the main data
  loading: boolean;
  error: string | undefined;
};

const initialState: templateState = {
  template: "",
  loading: false,
  error: undefined,
};

// optional: create a thunk function (for axios request)
export const axiosFunction = createAsyncThunk(
  "axiosFunction/template", // type of the action, must be unique.
  async (
    payload: { data: string }, // type of the payload
    { rejectWithValue }
  ) => {
    try {
      // do something async

      return payload.data;
    } catch (_err) {
      const error = _err as AxiosError;
      const data = error.response?.data as ErrorResponse;
      return rejectWithValue(data.message);
    }
  }
);

// optional: create a thunk function (for firebase request)
export const firebaseFunction = createAsyncThunk(
  "firebaseFunction/template", // type of the action, must be unique.
  async (
    payload: { data: string }, // type of the payload
    { rejectWithValue }
  ) => {
    try {
      // do something async

      return payload.data;
    } catch (_err) {
      const error = _err as AxiosError;
      const data = error.response?.data as ErrorResponse;
      return rejectWithValue(data.message);
    }
  }
);

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    // optional: add reducer functions
    setTemplate: (state, action) => {
      // action type is inferred
      state.template = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // optional: add the thunk function to the reducer
      .addCase(axiosFunction.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.template = action.payload;
      })

      // the below code is for handling the loading and error state of the async thunk (default)
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("template/pending"),
        (state) => {
          state.loading = true;
          state.error = undefined;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("template/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = undefined;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("template/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("rejected template", action.payload);
        }
      );
  },
});

// export the action creators to be used in the components
export const { setTemplate } = templateSlice.actions;

// export the reducer to be used in the store
const templateReducer = templateSlice.reducer;
export default templateReducer;
