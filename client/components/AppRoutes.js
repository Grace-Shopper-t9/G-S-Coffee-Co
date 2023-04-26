/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./AuthForm";
import Home from "./Home";
import About from "./About";
import { me } from "./store";
import SingleCoffee from "./SingleCoffee";
import { fetchCoffeesAsync } from "../features/allCoffees/coffeeSlice";
import Cart from "./Cart";
import VerPurchase from "./VerPurchase";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(fetchCoffeesAsync());
  }, []);

  return (
    <div>
      <div></div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/coffees/:coffeeId" element={<SingleCoffee />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/VerPurchase" element={<VerPurchase />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/coffees/:coffeeId" element={<SingleCoffee />} />
          <Route
            path="/"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route path="/VerPurchase" element={<VerPurchase />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<Home />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
