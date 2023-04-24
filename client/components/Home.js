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
  console.log(coffees);
  const username = useSelector((state) => state.auth.me?.username);

  useEffect(() => {
    dispatch(fetchCoffeesAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <video src="/reactcoffeeroaster.mp4" autoPlay muted loop></video>
      </div>
      <div id="allcoffees" className="coffeeColumn">
        {username ? (
          <h3>Welcome, {username}</h3>
        ) : (
          <h3>
            glad to see you here checking out our coffee blends for the fuel you
            need as a creative!
          </h3>
        )}
        {coffees && coffees.length ? (
          coffees.map((coffee) => (
            <div className="allcoffeecontainer">
              <div className="allcoffees" key={`All Coffees ${coffee.id}`}>
                <img className="coffeeimg" src={coffee.image}></img>
                <div className="coffeeclickurl">
                  <NavLink to={`/coffees/${coffee.id}`}>
                    <h3>{coffee.name}</h3>
                  </NavLink>
                </div>
                <h4>{coffee.price}</h4>
              </div>
            </div>
          ))
        ) : (
          <div>loading page...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
