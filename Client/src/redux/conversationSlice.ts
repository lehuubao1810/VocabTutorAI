import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./store";
import { AxiosError } from "axios";
import { ErrorResponse } from "../type/ErrorResponse";
import { ConversationAIType, MessageAIType } from "../type/ConversationAI";
import { axiosInstance } from "../utils/axiosInstance";

type conversationState = {
  conversation: ConversationAIType; // type of the main data
  loading: boolean;
  loaddingMessage: boolean;
  error: string | undefined;
};

const initialState: conversationState = {
  conversation: {} as ConversationAIType,
  loading: false,
  loaddingMessage: false,
  error: undefined,
};

// optional: create a thunk function (for axios request)
export const getConversation = createAsyncThunk(
  "getConversations/conversation", // type of the action, must be unique.
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chat/getConversation/${id}`);
      const conversation = response.data.conversation;
      console.log("conversation", conversation);

      return conversation;
    } catch (_err) {
      const error = _err as AxiosError;
      const data = error.response?.data as ErrorResponse;
      return rejectWithValue(data.message);
    }
  }
);

export const createConversation = createAsyncThunk(
  "createConversation/conversation", // type of the action, must be unique.
  async (data: { character: string; uid: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/chat/createConversation`,
        data
      );
      const conversation = response.data.conversation;
      console.log("conversation", conversation);

      return conversation;
    } catch (_err) {
      const error = _err as AxiosError;
      const data = error.response?.data as ErrorResponse;
      return rejectWithValue(data.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "sendMessage/conversation", // type of the action, must be unique.
  async (
    data: { conversationID: string; message: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/chat/sendMessage/${data.conversationID}`,
        {
          message: data.message,
        }
      );
      const modelPart = response.data.response;

      return [
        {
          role: "model",
          parts: modelPart,
        } as MessageAIType,
      ];
    } catch (_err) {
      const error = _err as AxiosError;
      const data = error.response?.data as ErrorResponse;
      return rejectWithValue(data.message);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    // optional: add reducer functions
    setConversation: (state, action) => {
      // action type is inferred
      state.conversation = action.payload;
    },
    setMessageUser: (state, action) => {
      state.conversation.history.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // optional: add the thunk function to the reducer
      .addCase(getConversation.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.conversation = action.payload;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.conversation = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.conversation.history.push(...action.payload);
        state.loaddingMessage = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loaddingMessage = true;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.loaddingMessage = false;
      })

      // the below code is for handling the loading and error state of the async thunk (default)
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("conversation/pending"),
        (state) => {
          state.loading = true;
          state.error = undefined;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("conversation/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = undefined;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("conversation/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("rejected conversation", action.payload);
        }
      );
  },
});

// export the action creators to be used in the components
export const { setConversation, setMessageUser } = conversationSlice.actions;

// export the reducer to be used in the store
const conversationReducer = conversationSlice.reducer;
export default conversationReducer;
