/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const handleAdminDeleteAsync = createAsyncThunk(
  "coffee/delete",
  async (coffeeId) => {
    const { data } = await axios.delete(`/api/coffees/${coffeeId}`);
    return data;
  }
);

export const handleAdminAddAsync = createAsyncThunk(
  "coffees/add",
  async ({ name, countryOrigin, price, roast }) => {
    const { data } = await axios.post(`/api/coffees`, {
      name,
      countryOrigin,
      roast,
      price,
    });
    return data;
  }
);
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleAdminAddAsync.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(handleAdminDeleteAsync.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const selectAdmin = (state) => state.admin;

export default adminSlice.reducer;
