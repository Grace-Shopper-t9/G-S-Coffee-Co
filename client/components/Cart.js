/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchOneOrderAsync,
  fetchUserAsync,
  editOrderStatusAsync,
  removeItemFromCartAsync,
} from "../features/cart/cartSlice";

const Cart = () => {
  const loggedInUserID = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector((state) => state.cart.user);
  const userOrder = user ? useSelector((state) => state.cart.order) : null;
  const allUserCoffees = userOrder.coffees;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //order from state
  const { order } = user;
  let orderId = null;
  order ? (orderId = order.id) : null;

  useEffect(() => {
    loggedInUserID ? dispatch(fetchUserAsync(loggedInUserID)) : null;

    dispatch(fetchOneOrderAsync(orderId));
  }, [dispatch, loggedInUserID, orderId]);

  const handleCheckout = (orderId) => {
    const fulfilled = true;

    dispatch(editOrderStatusAsync({ orderId, fulfilled }));
    navigate("/VerPurchase");
  };
  const handleRemoveItem = (orderId, coffeeId) => {
    console.log(coffeeId, orderId);
    dispatch(removeItemFromCartAsync({ orderId, coffeeId }));
  };

  return (
    <div>
      <h1>{username}'s Cart</h1>
      <ul>
        {allUserCoffees && userOrder.fulfilled === "false" ? (
          allUserCoffees.map((coffee) => (
            <li key={coffee.id}>
              <h1>name:{coffee.name}</h1>
              <h1>countryOrigin:{coffee.countryOrigin}</h1>
              <h1>price:{coffee.price}</h1>
              <h1>roast:{coffee.roast}</h1>
              <h1>quantity:{coffee.quantity}</h1>
              <h1>total: ${coffee.price * coffee.quantity}</h1>
              <button onClick={() => handleRemoveItem(orderId, coffee.id)}>
                remove from cart
              </button>
            </li>
          ))
        ) : (
          <h1>Add Coffee to your Cart</h1>
        )}
      </ul>
      {allUserCoffees && userOrder.fulfilled === "false" ? (
        <button onClick={() => handleCheckout(orderId)}>checkout</button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Cart;
