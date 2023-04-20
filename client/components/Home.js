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
  const handleAddToCart = ({ coffeeId: id }) => {
    dispatch(id);
  };
  useEffect(() => {
    dispatch(fetchCoffeesAsync());
  }, [dispatch]);

  return (
    <div>
      <div id="coffees" className="coffeeColumn">
        {username ? <h3>Welcome, {username}</h3> : <h3>Welcome, Guest</h3>}
        {coffees && coffees.length ? (
          coffees.map((coffee) => (
            <div className="coffees" key={`All Coffees ${coffee.id}`}>
              <NavLink to={`/${coffee.id}`}>
                <h3>{coffee.name}</h3>
                <h4>{coffee.price}</h4>
                <h4>{coffee.roast}</h4>
                <h4>{coffee.countryOrigin}</h4>
                <h4>{coffee.description}</h4>
                <img
                  className="coffee-img"
                  src={coffee.imageUrl}
                  alt={coffee.name}
                ></img>
              </NavLink>
              <button onClick={() => handleAddToCart(coffee.id)}>add</button>
              <hr />
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
