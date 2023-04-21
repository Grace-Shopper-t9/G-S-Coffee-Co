import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  selectCart,
  fetchAllCartsAsync,
  fetchAllOrdersAsync,
  fetchAllCoffeesAsync,
  editOrderStatusAsync,
  removeItemFromCartAsync,
} from "../features/cart/cartSlice";

const Cart = () => {
  const loggedInUserID = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  // console.log(loggedInUserID);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);

  const allOrders = cart.orders;

  // console.log(allOrders);

  const ordersBelongingtoUser = allOrders.filter(
    (e) => e.userId === loggedInUserID && e.fulfilled === "false"
  );
  // console.log(ordersBelongingtoUser);

  const [userOrderId] = ordersBelongingtoUser.map((e) => e.id);
  // console.log(userOrderId);

  const allCarts = cart.cart;
  // console.log(allCarts);

  const userCart = allCarts.filter((cart) => cart.orderId === userOrderId);

  // console.log(userCart);

  const [userCoffeeId] = userCart.map((e) => e.coffeeId);

  // console.log(userCoffeeId);

  const allCoffees = cart.coffees;

  const userCoffeeCart = allCoffees.filter((e) => e.id === userOrderId);

  useEffect(() => {
    dispatch(fetchAllCartsAsync());
    dispatch(fetchAllOrdersAsync());
    dispatch(fetchAllCoffeesAsync());
  }, [dispatch]);

  const handleCheckout = (orderId) => {
    const fulfilled = true;
    dispatch(editOrderStatusAsync({ orderId, fulfilled }));
    navigate("/");
  };
  const handleRemoveItem = (orderId) => {
    const userId = null;
    dispatch(removeItemFromCartAsync({ orderId, userId }));
    !userOrderId ? null : navigate("/");
  };

  return (
    <div>
      <h1>{username}'s Cart</h1>
      <ul>
        {ordersBelongingtoUser.length ? (
          userCoffeeCart.map((coffee) => (
            <li key={coffee.id}>
              <h1>OrderId :{userOrderId}</h1>
              <h1>name:{coffee.name}</h1>
              <h1>countryOrigin:{coffee.countryOrigin}</h1>
              <h1>price:{coffee.price}</h1>
              <h1>roast:{coffee.roast}</h1>
              <h1>quantity:{coffee.quantity}</h1>
              <h1>total: ${coffee.price * coffee.quantity}</h1>
              <button onClick={() => handleRemoveItem(userOrderId)}>
                remove from cart
              </button>
            </li>
          ))
        ) : (
          <h1>Add Coffee to your Cart</h1>
        )}
      </ul>
      {ordersBelongingtoUser.length ? (
        <button onClick={() => handleCheckout(userOrderId)}>checkout</button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Cart;
