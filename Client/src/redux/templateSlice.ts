import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./store";

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

// optional: create a thunk function
export const thunkFunction = createAsyncThunk(
  "thunkFunction/template", // type of the action, must be unique.
  async () => {
    // do something async
    const data = "";
    return data;
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
      .addCase(thunkFunction.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.template = action.payload;
      })

      // the below code is for handling the loading and error state of the async thunk (default)
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("quizs/pending"),
        (state) => {
          state.loading = true;
          state.error = undefined;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("quizs/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = undefined;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("quizs/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("rejected quizs", action.payload);
        }
      );
  },
});

// export the action creators to be used in the components
export const { setTemplate } = templateSlice.actions;


// export the reducer to be used in the store
const templateReducer = templateSlice.reducer;
export default templateReducer;
