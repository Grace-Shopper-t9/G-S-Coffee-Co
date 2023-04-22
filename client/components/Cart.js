import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  selectCart,
  fetchOneCartAsync,
  fetchOneOrderAsync,
  fetchUserAsync,
  editOrderStatusAsync,
  removeItemFromCartAsync,
} from "../features/cart/cartSlice";

const Cart = () => {
  const loggedInUserID = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  // console.log(loggedInUserID);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.cart.user);
  const orderState = user ? useSelector((state) => state.cart.order) : null;
  const cartStateCoffees = orderState
    ? useSelector((state) => state.cart.cart.coffees)
    : null;
  // console.log(cartStateCoffees);
  const { order } = user;
  let orderId = null;
  order ? (orderId = order.id) : null;

  const { cart } = orderState;
  let cartId = null;
  cart ? (cartId = cart.id) : null;

  useEffect(() => {
    loggedInUserID ? dispatch(fetchUserAsync(loggedInUserID)) : null;
    dispatch(fetchOneOrderAsync(orderId));
    dispatch(fetchOneCartAsync(cartId));
  }, [dispatch, loggedInUserID, orderId, cartId]);

  // if (user.length !== 0) {
  //   // console.log(user.order);
  //   const userOrderId = user.order.id;
  //   console.log(userOrderId);
  // }

  // const { id } = user.order;
  // console.log(id);
  // const ordersId = user.order.filter(
  //   (e) => e.userId === loggedInUserID && e.fulfilled === "false"
  // );
  // const orderId = user.order.map((e) => e.id);
  // console.log(orderId);
  // // console.log(ordersBelongingtoUser);

  // const [userOrderId] = ordersBelongingtoUser.map((e) => e.id);
  // // console.log(userOrderId);

  // const allCarts = cart.cart;
  // console.log(allCarts);

  // const userCart = allCarts.filter((cart) => cart.orderId === userOrderId);

  // // console.log(userCart);

  // const [userCoffeeId] = userCart.map((e) => e.coffeeId);

  // // console.log(userCoffeeId);

  // const allCoffees = cart.coffees;

  // const userCoffeeCart = allCoffees.filter((e) => e.id === userOrderId);

  const handleCheckout = (orderId) => {
    const fulfilled = true;
    dispatch(editOrderStatusAsync({ orderId, fulfilled }));
    navigate("/");
  };
  const handleRemoveItem = (coffeeId) => {
    const cartId = null;
    dispatch(removeItemFromCartAsync({ coffeeId, cartId }));
    !orderId ? null : navigate("/");
  };

  return (
    <div>
      <h1>{username}'s Cart</h1>
      <ul>
        {cartStateCoffees ? (
          cartStateCoffees.map((coffee) => (
            <li key={coffee.id}>
              <h1>OrderId :{orderId}</h1>
              <h1>name:{coffee.name}</h1>
              <h1>countryOrigin:{coffee.countryOrigin}</h1>
              <h1>price:{coffee.price}</h1>
              <h1>roast:{coffee.roast}</h1>
              <h1>quantity:{coffee.quantity}</h1>
              <h1>total: ${coffee.price * coffee.quantity}</h1>
              <button onClick={() => handleRemoveItem(orderId)}>
                remove from cart
              </button>
            </li>
          ))
        ) : (
          <h1>Add Coffee to your Cart</h1>
        )}
      </ul>
      {cartStateCoffees ? (
        <button onClick={() => handleCheckout(orderId)}>checkout</button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Cart;
