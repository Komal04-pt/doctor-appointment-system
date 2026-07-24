import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

//get all appointment
export const getAllAppointments = createAsyncThunk(
  "appointment/getAllAppointments",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/api/v1/appointment/get-all");
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "get all appointments  error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

//get getAppointmentDetails
export const getAppointmentDetails = createAsyncThunk(
  "appointment/getDoctorDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/api/v1/appointment/get-details/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "getAppointmentDetails  error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

//update status appointment status
export const updateAppointmentStatus = createAsyncThunk(
  "appointment/updateAppointmentStatus",
  async ({ id, appointmentStatus }, thunkApi) => {
    try {
      const res = await API.patch(`/api/v1/appointment/update-status/${id}`, {
        appointmentStatus,
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "update appointment/update-status status  doc  error";
      return thunkApi.rejectWithValue(message);
    }
  }
);