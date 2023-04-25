/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectCoffees,
  fetchCoffeesAsync,
} from "../features/allCoffees/coffeeSlice";
import {
  handleadminadd,
  handleadmindelete,
} from "../features/admin/Adminslice";

const Home = () => {
  const coffees = useSelector(selectCoffees);
  const dispatch = useDispatch();
  console.log(coffees);
  const username = useSelector((state) => state.auth.me.username);
  const admin = useSelector((state) => state.auth.me.admin);
  useEffect(() => {
    dispatch(fetchCoffeesAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <video src="/reactcoffeeroaster.mp4" autoPlay muted loop></video>
      </div>
      <div id="allcoffees" className="coffeeColumn">
        {username ? <h3>Welcome, {username}</h3> : <h3>Welcome, Guest</h3>}
        {coffees && coffees.length ? (
          coffees.map((coffee) => (
            <div className="renderingwrap">
              <div className="allcoffees" key={coffee.id}>
                <div className="coffeeclickurl">
                  <NavLink to={`/coffees/${coffee.id}`}>
                    <h3>{coffee.name}</h3>
                  </NavLink>
                </div>
                <h4>{coffee.price}</h4>
                <h4>{coffee.roast}</h4>
                <h4>{coffee.countryOrigin}</h4>
                <h4>{coffee.description}</h4>
                <img
                  className="coffee-img"
                  src={coffee.imageUrl}
                  alt={coffee.name}
                ></img>
                {admin ? (
                  <button onClick={() => handleadmindelete()}>
                    Delete Posting
                  </button>
                ) : (
                  <hr />
                )}
              </div>
            </div>
          ))
        ) : (
          <div>loading page...</div>
        )}
      </div>
      {admin ? (
        <form>
          <h6>
            Coffee Name
            <input name="Coffee Name" type="text" />
          </h6>
          <h6>
            Country-Origin
            <input name="country origin" type="text" />
          </h6>
          <h6>
            Price
            <input name="Price" type="text" />
          </h6>
          <h6>
            Roast
            <input name="Roast" type="text" />
          </h6>
          <h6>
            Stock
            <input name="Stock" type="text" />
          </h6>
          <button onClick={() => handleadminadd(console.log("hello"))}>
            Add Coffee
          </button>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
