import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./store";
import { AxiosError } from "axios";
import { ErrorResponse } from "../type/ErrorResponse";
import { CharacterAIType } from "../type/CharacterAI";
import { axiosInstance } from "../utils/axiosInstance";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
import { ConversationAIType } from "../type/ConversationAI";

type characterState = {
  charactersAI: CharacterAIType[]; // type of the main data
  loading: boolean;
  error: string | undefined;
};

const initialState: characterState = {
  charactersAI: [],
  loading: false,
  error: undefined,
};

// optional: create a thunk function (for axios request)
export const getListCharacterAI = createAsyncThunk(
  "getListCharacterAI/character", // type of the action, must be unique.
  async (uid: string, { rejectWithValue }) => {
    try {
      //   const uid = onAuthStateChanged(auth, (user) => {
      //     if (user) {
      //       return user.uid;
      //     }
      //     return;
      //   });

      const responseCharacters = await axiosInstance.get(
        `/character/getCharacters`
      );
      const characters = responseCharacters.data.characters;
    //   console.log("characters", characters);
      const responseConversations = await axiosInstance.get(
        `/chat/getConversationsByUser/${uid}`
      );
      const conversations = responseConversations.data.conversations;
    //   console.log("conversations", conversations);

      const charactersAI = characters.map((character: CharacterAIType) => {
        const conversationAI = conversations.find(
          (conversation: ConversationAIType) =>
            conversation.character._id === character._id
        );

        if (!conversationAI) {
          return { ...character, isChat: false };
        }

        return {
          ...character,
          isChat: true,
          conversationID: conversationAI._id,
        };
      });
    //   console.log("charactersAI", charactersAI);

      return charactersAI;
    } catch (_err) {
      console.log(_err);
      const error = _err as AxiosError;
      const data = error.response?.data as ErrorResponse;
      return rejectWithValue(data.message);
    }
  }
);

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    // optional: add reducer functions
    setCharacter: (state, action) => {
      // action type is inferred
      state.charactersAI = action.payload;
    },
    changeStatusCharacter: (state, action) => {
      state.charactersAI = state.charactersAI.map((character) => {
        if (character._id === action.payload.characterID) {
          return {
            ...character,
            isChat: action.payload.status,
            conversationID: action.payload.conversationID,
          };
        }
        return character;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // optional: add the thunk function to the reducer
      .addCase(getListCharacterAI.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.charactersAI = action.payload;
      })

      // the below code is for handling the loading and error state of the async thunk (default)
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("character/pending"),
        (state) => {
          state.loading = true;
          state.error = undefined;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("character/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = undefined;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("character/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("rejected character", action.payload);
        }
      );
  },
});

// export the action creators to be used in the components
export const { setCharacter, changeStatusCharacter } = characterSlice.actions;

// export the reducer to be used in the store
const characterReducer = characterSlice.reducer;
export default characterReducer;
