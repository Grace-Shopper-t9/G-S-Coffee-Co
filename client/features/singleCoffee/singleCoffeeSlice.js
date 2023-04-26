import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { coffee: [], cart: [] };

export const fetchSingleCoffee = createAsyncThunk(
  "/coffees/singlecoffee",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/coffees/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchAddToCart = createAsyncThunk(
  "add to cart",
  async ({ coffeeId, orderId }) => {
    try {
      const { data } = await axios.post(`/api/carts`, {
        coffeeId,
        orderId,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const editQuantityAsync = createAsyncThunk(
  "coffee/editQuantity",
  async ({ coffeeId, quantity }) => {
    try {
      const { data } = await axios.put(`/api/coffees/${coffeeId}`, {
        quantity,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const singleCoffeeSlice = createSlice({
  name: "singleCoffee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCoffee.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(editQuantityAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state = action.payload;
    });
  },
});

export const selectSingleCoffee = (state) => {
  return state.singleCoffee;
};

export default singleCoffeeSlice.reducer;
