import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./store";
import { AxiosError } from "axios";
import { ErrorResponse } from "../type/ErrorResponse";
import { axiosTranslate } from "../utils/axiosInstance";

type dictionaryState = {
  original: string; // type of the main data
  translated: string;
  loading: boolean;
  error: string | undefined;
};

const initialState: dictionaryState = {
  original: "",
  translated: "",
  loading: false,
  error: undefined,
};

// optional: create a thunk function (for axios request)
export const translateText = createAsyncThunk(
  "translateText/dictionary", // type of the action, must be unique.
  async (
    data: { text: string; language: string }, // type of the payload
    { rejectWithValue }
  ) => {
    try {
      // do something async
      const response = await axiosTranslate.post(
        "/",
        [
          {
            Text: data.text,
          },
        ],
        {
          params: {
            "to[0]": data.language,
            "api-version": "3.0",
            profanityActprion: "NoAction",
            textType: "plain",
          },
        }
      );
      console.log("response", response);
      const translatedText = response.data[0].translations[0].text;

      return {
        original: data.text,
        translated: translatedText,
      };
    } catch (_err) {
      const error = _err as AxiosError;
      const data = error.response?.data as ErrorResponse;
      return rejectWithValue(data.message);
    }
  }
);

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    // optional: add reducer functions
    setDictionary: (state, action) => {
      // action type is inferred
      state.translated = action.payload.translated;
      state.original = action.payload.original;
    },
  },
  extraReducers: (builder) => {
    builder
      // optional: add the thunk function to the reducer
      .addCase(translateText.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.translated = action.payload.translated;
        state.original = action.payload.original;
      })

      // the below code is for handling the loading and error state of the async thunk (default)
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("dictionary/pending"),
        (state) => {
          state.loading = true;
          state.error = undefined;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("dictionary/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = undefined;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("dictionary/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("rejected dictionary", action.payload);
        }
      );
  },
});

// export the action creators to be used in the components
export const { setDictionary } = dictionarySlice.actions;

// export the reducer to be used in the store
const dictionaryReducer = dictionarySlice.reducer;
export default dictionaryReducer;
