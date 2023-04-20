import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import coffeeSlice from "../features/allCoffees/coffeeSlice";

const store = configureStore({
  reducer: { auth: authReducer, coffees: coffeeSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
