import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import coffeeSlice from "../features/allCoffees/coffeeSlice";
import singleCoffeeSlice from "../features/singleCoffee/singleCoffeeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
  },
  reducer: {
    auth: authReducer,
    coffees: coffeeSlice,
    singleCoffee: singleCoffeeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/auth/authSlice";
