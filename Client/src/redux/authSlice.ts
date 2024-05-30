import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./store";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db, ggProvider } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../type/User";

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

export const signUpEmailPassword = createAsyncThunk(
  "signUpEmailPassword/auth", // type of the action, must be unique.
  async (
    data: { email: string; password: string; username: string }, // type of the payload
    { rejectWithValue }
  ) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        return user;
      })
      .then((user) => {
        updateProfile(user, {
          displayName: data.username,
        });
        return user;
      })
      .then((user) => {
        setDoc(doc(db, "users", user.uid), {
          username: data.username,
          email: user.email,
        });
        return {
          email: user.email,
          username: data.username,
          uid: user.uid,
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
        return user;
      })
      .then(async (user) => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          auth.signOut().then(() => {
            throw new Error("User does not exist");
          });
        }
        const userData = userDoc.data();
        return {
          email: user.email,
          username: userData?.username,
          uid: user.uid,
          photoURL: userData?.photoURL,
        } as User;
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      });
  }
);

export const SignInWithGoogle = createAsyncThunk(
  "SignInWithGoogle/auth", // type of the action, must be unique.
  async (_, { rejectWithValue }) => {
    return signInWithPopup(auth, ggProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const user = result.user;
        console.log(user);

        // Add user to firestore
        setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        return {
          email: user.email,
          username: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        } as User;
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        return rejectWithValue(errorMessage);
      });
  }
);

export const logOut = createAsyncThunk(
  "logOut/auth", // type of the action, must be unique.
  async (_, { rejectWithValue }) => {
    console.log(_);
    return auth
      .signOut()
      .then(() => {
        return {} as User;
      })
      .catch((error) => {
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
      })
      .addCase(signInEmailPassword.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.user = action.payload;
      })
      .addCase(SignInWithGoogle.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, (state, action) => {
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
