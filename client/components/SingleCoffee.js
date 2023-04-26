import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleCoffee,
  fetchSingleCoffee,
  fetchAddToCart,
  editQuantityAsync,
  handleAdminEditAsync,
} from "../features/singleCoffee/singleCoffeeSlice";
import { fetchUserAsync } from "../features/cart/cartSlice";

const SingleCoffee = () => {
  let { coffeeId } = useParams();
  const dispatch = useDispatch();
  const coffee = useSelector(selectSingleCoffee);
  coffeeId = +coffeeId;
  const admin = useSelector((state) => state.auth.me.isAdmin);
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
  }, [dispatch, coffeeId, loggedInUserID, quantity, orderId]);

  const [name, setName] = useState("");
  const [countryOrigin, setCountryOrigin] = useState("");
  const [roast, setRoast] = useState("");
  const [price, setPrice] = useState(0);

  const handleAddToCart = () => {
    dispatch(fetchAddToCart({ coffeeId, orderId }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editQuantityAsync({ coffeeId, quantity }));
    dispatch(fetchSingleCoffee(coffeeId));
  };

  const handleEditSubmit = () => {
    dispatch(
      handleAdminEditAsync({ coffeeId, name, countryOrigin, roast, price })
    );
    setName("");
    setCountryOrigin("");
    setRoast("");
    setPrice(Number);
    dispatch(fetchCoffeesAsync());
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
      {admin ? (
        <form onSubmit={handleEditSubmit}>
          <h6>
            Coffee Name
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </h6>
          <h6>
            Country-Origin
            <input
              name="countryOrigin"
              type="text"
              value={countryOrigin}
              onChange={(e) => setCountryOrigin(e.target.value)}
            />
          </h6>
          <h6>
            Price
            <input
              name="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </h6>
          <h6>
            Roast
            <input
              name="roast"
              type="text"
              value={roast}
              onChange={(e) => setRoast(e.target.value)}
            />
          </h6>
          <button type="submit">Edit Coffee</button>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SingleCoffee;
