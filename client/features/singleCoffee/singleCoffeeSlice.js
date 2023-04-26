import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { coffee: [], cart: [] };

export const fetchSingleCoffee = createAsyncThunk(
  "/coffees/singlecoffee",
  async (id) => {
    // console.log(id);
    try {
      const { data } = await axios.get(`/api/coffees/${id}`);
      // console.log(data);
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
  async ({ coffeeId, orderId }) => {
    try {
      console.log(coffeeId, orderId);
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
    console.log(coffeeId, quantity);
    try {
      const { data } = await axios.put(`/api/coffees/${coffeeId}`, {
        quantity,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
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
      // console.log(action.payload);
      state.cart = action.payload;
    });
    builder.addCase(editQuantityAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state = action.payload;
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
