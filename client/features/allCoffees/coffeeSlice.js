import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoffeesAsync = createAsyncThunk("All coffees", async () => {
  try {
    const { data } = await axios.get(`/api/coffees`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const coffeeSlice = createSlice({
  name: "coffees",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoffeesAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      return action.payload;
    });
  },
});

export const selectCoffees = (state) => {
  return state.coffees;
};

export default coffeeSlice.reducer;
