import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleCoffee,
  fetchSingleCoffee,
  fetchAddToCart,
  editQuantityAsync,
} from "../features/singleCoffee/singleCoffeeSlice";
import { fetchUserAsync } from "../features/cart/cartSlice";

const SingleCoffee = () => {
  let { coffeeId } = useParams();
  const dispatch = useDispatch();
  const coffee = useSelector(selectSingleCoffee);
  coffeeId = +coffeeId;

  const loggedInUserID = useSelector((state) => state.auth.me.id);
  const user = useSelector((state) => state.cart.user);

  const userOrder = user ? useSelector((state) => state.cart.order) : null;

  //order from state
  const { order } = user;
  let orderId = null;
  order ? (orderId = order.id) : null;

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    console.log("fetching coffee data...");
    dispatch(fetchSingleCoffee(coffeeId));
    loggedInUserID ? dispatch(fetchUserAsync(loggedInUserID)) : null;
  }, [dispatch, coffeeId, loggedInUserID, quantity]);
  //   console.log("coffee:", coffee);

  const handleAddToCart = () => {
    console.log(coffeeId, orderId);
    dispatch(fetchAddToCart({ coffeeId, orderId }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editQuantityAsync({ coffeeId, quantity }));
    dispatch(fetchSingleCoffee(coffeeId));
  };

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
              <h5>Purchase quantity:{coffee.quantity}</h5>
            </div>
          </div>
          <div className="incrementaddbutton">
            <div className="coffee-details">
              {<button onClick={handleAddToCart}>add to cart</button>}
            </div>
            quantity:
            <form onSubmit={handleSubmit}>
              <input
                key={coffee.id}
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              ></input>{" "}
              <button type="submit">Add</button>
            </form>
            <hr />
          </div>
        </div>
      ) : (
        <div>..loading page</div>
      )}
    </div>
  );
};

export default SingleCoffee;
