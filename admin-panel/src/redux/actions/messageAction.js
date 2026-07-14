import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

export const getAllMessages = createAsyncThunk(
  "message/getAllMessages",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/webmessage/get-all");
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "get all messages error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const replyToMessage = createAsyncThunk(
  "message/replyToMessage",
  async ({ id, adminReply }, thunkApi) => {
    try {
      const res = await API.patch(`/webmessage/reply/${id}`, { adminReply });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "reply message error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/webmessage/delete/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "delete message error";
      return thunkApi.rejectWithValue(message);
    }
  }
);