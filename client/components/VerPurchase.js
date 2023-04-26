/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneOrderAsync, fetchUserAsync } from "../features/cart/cartSlice";

const VerPurchase = () => {
  const loggedInUserID = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.cart.user);

  const userOrder = user ? useSelector((state) => state.cart.order) : null;

  const allUserCoffees = userOrder ? userOrder.coffees : null;

  const { order } = user;
  let orderId = null;
  order ? (orderId = order.id) : null;

  useEffect(() => {
    if (loggedInUserID) {
      dispatch(fetchUserAsync(loggedInUserID));
    }
    if (orderId) {
      dispatch(fetchOneOrderAsync(orderId));
    }
  }, [dispatch, loggedInUserID, orderId]);

  return (
    <div>
      {" "}
      Thank you for ordering from REACT COFFEE
      <h1>{username} You've bought</h1>
      <ul>
        {userOrder.fulfilled === "true" ? (
          allUserCoffees.map((coffee) => (
            <li key={coffee.id}>
              <h1>name:{coffee.name}</h1>
              <img className="coffeephoto" src={coffee.imageUrl}></img>
              <h1>price:{coffee.price}</h1>
              <h1>quantity:{coffee.quantity}</h1>
              <h1>total: ${coffee.price * coffee.quantity}</h1>
            </li>
          ))
        ) : (
          <div>loading...</div>
        )}
      </ul>
    </div>
  );
};

export default VerPurchase;
