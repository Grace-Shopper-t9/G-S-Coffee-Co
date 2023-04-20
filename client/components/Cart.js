import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectCart,
  fetchAllCartsAsync,
  fetchAllOrdersAsync,
  fetchAllCoffeesAsync,
} from "../features/cart/cartSlice";

const Cart = () => {
  const loggedInUserID = useSelector((state) => state.auth.me.id);
  // console.log(loggedInUserID);

  const { cartId } = useParams();

  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  const allOrders = cart.orders;

  const ordersBelongingtoUser = allOrders.filter(
    (e) => e.userId === loggedInUserID && e.fulfilled === "false"
  );
  console.log(ordersBelongingtoUser);
  const [userOrderId] = ordersBelongingtoUser.map((e) => e.id);
  console.log(userOrderId);

  const allCarts = cart.cart;
  console.log(allCarts);

  const userCart = allCarts.filter((cart) => cart.orderId === userOrderId);

  console.log(userCart);

  // console.log(ordersBelongingtoUser.includes(1));
  // console.log(cartBelongingtoUser);
  // console.log("cart:", cart.cart, "cartId:", cartId);

  const allCoffees = cart.coffees;

  // console.log(allCoffees);

  // const coffeesToPurchase = allCoffees.map((e)=> e.id === )

  useEffect(() => {
    dispatch(fetchAllCartsAsync());
    dispatch(fetchAllOrdersAsync());
    dispatch(fetchAllCoffeesAsync());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {cart.length ? (
          <li key={cart.id}>
            <h1>Coffee ID:{cart.coffeeId}</h1>
            <h1>Order Id:{cart.orderId}</h1>
            <h1>User Id:{loggedInUserID}</h1>
          </li>
        ) : (
          <h1>Add Coffee to your Cart</h1>
        )}
      </ul>
    </div>
  );
};

export default Cart;
