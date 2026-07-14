import { createSlice } from "@reduxjs/toolkit";
import {
  getAllMessages,
  replyToMessage,
  deleteMessage,
} from "../actions/messageAction";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    loading: false,
    success: false,
    messages: null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.webMessages;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(replyToMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(replyToMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(replyToMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;