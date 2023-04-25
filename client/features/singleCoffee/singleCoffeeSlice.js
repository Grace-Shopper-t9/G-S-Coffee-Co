import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchSingleCoffee = createAsyncThunk(
  "/coffees/singlecoffee",
  async (id) => {
    console.log(id);
    try {
      const { data } = await axios.get(`/api/coffees/${id}`);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// export const fetchAddCoffee = createAsyncThunk("Add Coffees", async () => {
//   async ()= {}
//   try {
//     const { data } = await axios.post(`/api/coffees/${id}`);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// });

// export const fetchUpdateCoffee = createAsyncThunk(
//   "Update Coffee",
//   async (id) => {
//     try {
//       const { data } = await axios.post(`/api/coffees/${id}`);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

const singleCoffeeSlice = createSlice({
  name: "singleCoffee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCoffee.fulfilled, (state, action) => {
      return action.payload;
    });
    // builder.addCase(fetchAddCoffee.fulfilled, (state, action) => {
    //   state.push(action.payload);
    // });
    // builder.addCase(fetchUpdateCoffee.fulfilled, (state, action) => {
    //   return { ...state, ...action.payload };
    // });
  },
});

export const selectSingleCoffee = (state) => {
  return state.singleCoffee;
};

export default singleCoffeeSlice.reducer;
