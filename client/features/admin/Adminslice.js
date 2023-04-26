/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [];

const TOKEN = "token";

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

//we are not getting our req.headers.authorization
//passed into our requireToken for the api/users route
//so we decided to create a frontend component that could
//request all users as an admin only, and allow us to send
//req.headers.authorization to our middleware in gateKeeping.js which would all us to block anyone who is not an admin from viewing api/users
export const fetchAllUsersAsync = createAsyncThunk("All user", async () => {
  const token = window.localStorage.getItem(TOKEN);

  try {
    if (token) {
      const res = await axios.get("/api/users", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
});

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
