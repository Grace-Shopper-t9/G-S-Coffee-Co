import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectCoffees,
  fetchCoffeesAsync,
} from "../features/allCoffees/coffeeSlice";

/**
 * COMPONENT
 */
const Home = () => {
  const coffees = useSelector(selectCoffees);
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me?.username);

  useEffect(() => {
    dispatch(fetchCoffeesAsync());
  }, [dispatch]);

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
      <div className="container">
        <video src="/reactcoffeeroaster.mp4" autoPlay muted loop></video>
      </div>
      <div id="allcoffees" className="coffeeColumn">
        {username ? <h3>Welcome, {username}</h3> : <h3>Welcome, Guest</h3>}
        {coffees && coffees.length ? (
          coffees.map((coffee) => (
            <div key={coffee.id} className="renderingwrap">
              <div className="allcoffees" key={coffee.id}>
                <div className="coffeeclickurl">
                  <NavLink to={`/coffees/${coffee.id}`}>
                    <img className="coffeephoto" src={coffee.imageUrl}></img>
                    <h3>{coffee.name}</h3>
                  </NavLink>
                </div>
                <h4>${coffee.price}</h4>
              </div>
            ))
          ) : (
            <div>loading page...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
