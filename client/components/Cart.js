import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCart, fetchCartAsync } from "../features/cart/cartSlice";

const Cart = () => {
  const { cartId } = useParams();

  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCartAsync(cartId));
  }, [dispatch]);

  return (
    <div>
      <ul>
        {cart ? (
          <li key={cart.id}>
            <h1>Coffee ID:{cart.coffeeId}</h1>
            <h1>Order Id:{cart.orderId}</h1>
          </li>
        ) : (
          <h1>Add Coffee to your Cart</h1>
        )}
      </ul>
    </div>
  );
};

export default Cart;
