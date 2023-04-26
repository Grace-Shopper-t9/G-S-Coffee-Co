/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectCoffees,
  fetchCoffeesAsync,
} from "../features/allCoffees/coffeeSlice";
import {
  handleAdminAddAsync,
  handleAdminDeleteAsync,
} from "../features/admin/Adminslice";
import AllUsers from "./AllUsers";

const Home = () => {
  const coffees = useSelector(selectCoffees);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.me.username);
  const admin = useSelector((state) => state.auth.me.isAdmin);

  const [name, setName] = useState("");
  const [countryOrigin, setCountryOrigin] = useState("");
  const [roast, setRoast] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchCoffeesAsync());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAdminAddAsync({ name, countryOrigin, roast, price }));
    setName("");
    setCountryOrigin("");
    setRoast("");
    setPrice(Number);
    dispatch(fetchCoffeesAsync());
  };
  const handleDelete = async (coffeeId) => {
    dispatch(handleAdminDeleteAsync(coffeeId));
    dispatch(fetchCoffeesAsync());
  };

  return (
    <div>
      <div id="allcoffeespage">
        <div id="welcomediv">
          {username ? (
            <h3>Welcome back, {username}</h3>
          ) : (
            <h2>Glad you're here. Checkout our blends...</h2>
          )}
        </div>
        <div className="container">
          <video src="/reactcoffeeroaster.mp4" autoPlay muted loop></video>
        </div>
        <div id="allcoffees">
          {coffees && coffees.length ? (
            coffees.map((coffee) => (
              <div className="allcoffees" key={coffee.id}>
                <div className="coffeeclickurl">
                  <NavLink to={`/coffees/${coffee.id}`}>
                    <img className="coffeephoto" src={coffee.imageUrl}></img>
                    <h3>{coffee.name}</h3>
                  </NavLink>
                </div>
                <h4>${coffee.price}</h4>
                {admin ? (
                  <button onClick={() => handleDelete(coffee.id)}>
                    Delete Posting
                  </button>
                ) : (
                  <hr />
                )}
              </div>
            ))
          ) : (
            <div>loading page...</div>
          )}
        </div>
        {admin ? (
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Add Coffee</button>
          </form>
        ) : (
          <div></div>
        )}
      </div>
      <AllUsers />
    </div>
  );
};

export default Home;
