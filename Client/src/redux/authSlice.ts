import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

type User = {
  email: string;
  username: string;
  uid: string;
  refreshToken: string;
};

type authState = {
  user: User; // type of the main data
  loading: boolean;
  error: string | undefined;
};

const initialState: authState = {
  user: {} as User, // initial value of the main data
  loading: false,
  error: undefined,
};

// optional: create a thunk function (for firebase request)
export const signUpEmailPassword = createAsyncThunk(
  "signUpEmailPassword/auth", // type of the action, must be unique.
  async (
    data: { email: string; password: string }, // type of the payload
    { rejectWithValue }
  ) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        return {
          email: user.email,
          username: user.displayName,
          uid: user.uid,
          refreshToken: user.refreshToken,
        } as User;
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      });
  }
);

export const signInEmailPassword = createAsyncThunk(
  "signInEmailPassword/auth", // type of the action, must be unique.
  async (
    data: { email: string; password: string }, // type of the payload
    { rejectWithValue }
  ) => {
    return signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return {
          email: user.email,
          username: user.displayName,
          uid: user.uid,
          refreshToken: user.refreshToken,
        } as User;
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // optional: add reducer functions
    setAuth: (state, action) => {
      // action type is inferred
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // optional: add the thunk function to the reducer
      .addCase(signUpEmailPassword.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.user = action.payload;
        if (state.user) {
            // save the refresh token to local storage
            localStorage.setItem("refreshToken", state.user.refreshToken);
        }
      })
      .addCase(signInEmailPassword.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.user = action.payload;
      })

      // the below code is for handling the loading and error state of the async thunk (default)
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("auth/pending"),
        (state) => {
          state.loading = true;
          state.error = undefined;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("auth/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = undefined;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("auth/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("rejected auth", action.payload);
        }
      );
  },
});

// export the action creators to be used in the components
export const { setAuth } = authSlice.actions;

// export the reducer to be used in the store
const authReducer = authSlice.reducer;
export default authReducer;
