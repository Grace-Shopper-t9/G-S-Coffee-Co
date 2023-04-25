/* eslint-disable no-unused-vars */
import React from "react";
import { axios } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleadmindelete = createAsyncThunk(
  // console.log("delete"),
  "coffee/delete",
  async (coffeeId) => {
    await axios.delete(`/api/coffee/${coffeeId}`);
    return coffeeId;
  }
);

export const handleadminadd = createAsyncThunk(
  // console.log("add"),
  "coffee/add",
  async (coffeeId) => {
    await axios.create(`/api/coffee/${coffeeId}`);
    return coffeeId;
  }
);
