import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleCoffee,
  fetchSingleCoffee,
  fetchAddToCart,
} from "../features/singleCoffee/singleCoffeeSlice";

const SingleCoffee = () => {
  const { coffeeId } = useParams();
  const dispatch = useDispatch();
  const coffee = useSelector(selectSingleCoffee);
  const id = coffee.id;

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
  let cartId = null;
  cart ? (cartId = cart.id) : null;

  useEffect(() => {
    console.log("fetching coffee data...");
    dispatch(fetchSingleCoffee(coffeeId));
  }, [dispatch, coffeeId]);
  //   console.log("coffee:", coffee);

  const handleAddToCart = () => {
    dispatch(fetchAddToCart({ id, cartId }));
  };

  // const handleIncrement = (coffee.id) => {
  //   updateCart(coffee => coffee.map(item => coffee.id === item.id ? coffee.qty += value : coffee)

  return (
    <div>
      {coffee ? (
        <div className="single-coffee">
          <div className="coffee-details">
            <p>lets get you fueled up!</p>
            <div key={coffee.id}>
              {<img className="coffeeimg" src={coffee.imageUrl}></img>}
              <h4>${coffee.price}</h4>
              <h2>{coffee.name}</h2>
              <h5>{coffee.description} </h5>
              <h5>{coffee.roast} roast</h5>
            </div>
          </div>
          <div className="incrementaddbutton">
            <div className="coffee-details">
              {<button onClick={handleAddToCart}>add to cart</button>}
              <div>
                <button onClick={() => props.handleDecrement(coffee.id, +1)}>
                  -
                </button>
                {coffee.qty}
                <span>{coffee.qty === 1 ? coffee.qty : coffee.qty}</span>
                <button onClick={() => props.handleIncrement(coffee.id, -1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>..loading page</div>
      )}
    </div>
  );
};

export default SingleCoffee;
