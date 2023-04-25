import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchOneCartAsync,
  fetchOneOrderAsync,
  fetchUserAsync,
  editOrderStatusAsync,
  removeItemFromCartAsync,
} from "../features/cart/cartSlice";

const Cart = () => {
  const loggedInUserID = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.cart.user);

  const orderState = user ? useSelector((state) => state.cart.order) : null;
  const userCartItems = orderState
    ? useSelector((state) => state.cart.coffee)
    : null;

  //order from state
  const { order } = user;
  let orderId = null;
  order ? (orderId = order.id) : null;
  //cart from state
  const { cart } = orderState;

  console.log(cart, orderState);

  let cartId = null;
  cart ? (cartId = cart.id) : null;

  useEffect(() => {
    loggedInUserID ? dispatch(fetchUserAsync(loggedInUserID)) : null;

    dispatch(fetchOneOrderAsync(orderId));

    const userId = loggedInUserID;
    console.log(
      "component is sending:",
      "userId:",
      userId,
      "orderId:",
      orderId,
      "cartId:",
      cartId
    );
    dispatch(fetchOneOrderAsync({ orderId, userId }));
    dispatch(fetchOneCartAsync(cartId));
  }, [dispatch, loggedInUserID, orderId, cartId]);

  const handleCheckout = (orderId) => {
    const fulfilled = true;
    dispatch(editOrderStatusAsync({ orderId, fulfilled }));
    navigate("/");
  };
  const handleRemoveItem = (coffeeId) => {
    const cartId = null;
    dispatch(removeItemFromCartAsync({ coffeeId, cartId }));
  };

  return (
    <div>
      <h1>{username}'s Cart</h1>
      <ul>
        {userCartItems.length !== 0 && orderState.fulfilled === "false" ? (
          userCartItems.map((coffee) => (
            <li key={coffee.id}>
              <h1>OrderId :{orderId}</h1>
              <h1>name:{coffee.name}</h1>
              <h1>countryOrigin:{coffee.countryOrigin}</h1>
              <h1>price:{coffee.price}</h1>
              <h1>roast:{coffee.roast}</h1>
              <h1>quantity:{coffee.quantity}</h1>
              <h1>total: ${coffee.price * coffee.quantity}</h1>
              <button onClick={() => handleRemoveItem(coffee.id)}>
                remove from cart
              </button>
            </li>
          ))
        ) : (
          <h1>Add Coffee to your Cart</h1>
        )}
      </ul>
      {userCartItems.length !== 0 && orderState.fulfilled === "false" ? (
        <button onClick={() => handleCheckout(orderId)}>checkout</button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Cart;
