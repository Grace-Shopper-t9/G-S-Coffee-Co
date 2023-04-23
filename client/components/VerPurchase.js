import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCart, fetchCartAsync } from "../features/cart/cartSlice";

const VerPurchase = () => {
  const { cartId } = useParams();

  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCartAsync(cartId));
  }, [dispatch]);

  return (
    <div>
      <h1>You're Buying</h1>
      <ul>
        {cart ? (
          <li key={cart.id}>
            <h3>{cart.coffeeId}</h3>
            <h3>{cart.orderId}</h3>
          </li>
        ) : (
          <h2>Would you like to complete transaction?</h2>
        )}
      </ul>

      <button>Complete Transaction</button>
    </div>
  );
};

export default VerPurchase;
