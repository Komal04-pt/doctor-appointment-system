import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/api/v1/user/get-all");
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "login error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getStats = createAsyncThunk(
  "user/getStats",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/api/v1/user/get-stats");
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "get-stats error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/api/v1/user/get-user/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "user details error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getUserAppointments = createAsyncThunk(
  "user/getUserAppointments",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/api/v1/appointment/user-appointments/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "appointments error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createAdmin = createAsyncThunk(
  "user/createAdmin",
  async ({ name, email, password, phone }, thunkApi) => {
    try {
      const res = await API.post("/api/v1/user/create-admin", { name, email, password, phone });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "create admin error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAllAdmins = createAsyncThunk(
  "user/getAllAdmins",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/api/v1/user/get-all-admins");
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "get all admins error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAdminDetails = createAsyncThunk(
  "user/getAdminDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/api/v1/user/get-admin/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "admin details error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "user/updateAdmin",
  async ({ id, name, phone }, thunkApi) => {
    try {
      const res = await API.patch(`/api/v1/user/update-admin/${id}`, { name, phone });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "update admin error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "user/deleteAdmin",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/api/v1/user/delete-admin/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "delete admin error";
      return thunkApi.rejectWithValue(message);
    }
  }
);