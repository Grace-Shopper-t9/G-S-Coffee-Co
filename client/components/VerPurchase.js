/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchOneCartAsync,
  fetchOneOrderAsync,
  fetchUserAsync,
  editOrderStatusAsync,
} from "../features/cart/cartSlice";

const VerPurchase = () => {
  const loggedInUserID = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.cart.user);
  console.log(user, loggedInUserID);
  const orderState = user ? useSelector((state) => state.cart.order) : null;
  const userCartItems = orderState
    ? useSelector((state) => state.cart.coffee)
    : null;

  const { order } = user;
  let orderId = null;
  order ? (orderId = order.id) : null;
  //cart from state
  const { cart } = orderState;
  let cartId = null;
  cart ? (cartId = cart.id) : null;

  useEffect(() => {
    if (loggedInUserID) {
      dispatch(fetchUserAsync(loggedInUserID));
    }
    if (orderId) {
      dispatch(fetchOneOrderAsync(orderId));
    }
    if (cartId) {
      dispatch(fetchOneCartAsync(cartId));
    }
  }, [dispatch, loggedInUserID, orderId, cartId]);

  return (
    <div>
      <h1>{username} You've bought</h1>
      <ul>
        {userCartItems &&
        userCartItems.length !== 0 &&
        orderState &&
        orderState.fulfilled === "true" ? (
          userCartItems.map((coffee) => (
            <li key={coffee.id}>
              <h1>name:{coffee.name}</h1>
              <h1>price:{coffee.price}</h1>
              <h1>quantity:{coffee.quantity}</h1>
              <h1>total: ${coffee.price * coffee.quantity}</h1>
            </li>
          ))
        ) : (
          <div>Would you like to continue with the purchase</div>
        )}
      </ul>
    </div>
  );
};

export default VerPurchase;
