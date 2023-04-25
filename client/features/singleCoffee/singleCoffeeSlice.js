import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { coffee: [], cart: [] };

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

export const fetchAddToCart = createAsyncThunk(
  "add to cart",
  async ({ id, cartId }) => {
    try {
      const { data } = await axios.post(`/api/coffees/${id}`, { cartId });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// export const fetchIncrement = createAsyncThunk("AddToCart", async () => {

//   try {
//     const { data } = await axios.post(`/api/coffees/${id}`);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// });

const singleCoffeeSlice = createSlice({
  name: "singleCoffee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCoffee.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
      state.cart(action.payload);
    });
    builder.addCase(fetchAddToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
    });

    // const newState = state.coffee.filter(
    //   (coffee) => coffee.id !== action.payload.id
    // );
    // state.coffee = newState;
    // builder.addCase(fetchUpdateCoffee.fulfilled, (state, action) => {
    //   return { ...state, ...action.payload };
    // });
  },
});

export const selectSingleCoffee = (state) => {
  return state.singleCoffee;
};

export default singleCoffeeSlice.reducer;
