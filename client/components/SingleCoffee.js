import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleCoffee,
  fetchSingleCoffee,
} from "../features/singleCoffee/singleCoffeeSlice";

const singleCoffee = () => {
  const { coffeeId } = useParams();
  const dispatch = useDispatch();

  const coffee = useSelector(selectSingleCoffee);

  useEffect(() => {
    console.log("fetching coffee data...");
    dispatch(fetchSingleCoffee(coffeeId));
  }, [dispatch, coffeeId]);
  console.log("coffee:", coffee);

  return (
    <div>
      <h1></h1>
      {coffee ? (
        <div className="single-coffee">
          <div key={coffee.id}>
            <h3>{coffee.name}</h3>
            <h5>{coffee.description} </h5>
            <h4>$ {coffee.price}</h4>
            <h4>{coffee.countryOrigin}</h4>
            <h5>{coffee.roast}</h5>
          </div>
          {<img className="coffee-img" src={coffee.imageUrl}></img>}
          {
            <button onClick={() => handleAddToCart(coffee.id)}>
              add to cart
            </button>
          }
          <div>
            <button onClick={() => props.handleIncrement(coffee.id, +1)}>
              -
            </button>
            {coffee.qty}
            <span>{coffee.qty === 1 ? coffee.qty : coffee.qty}</span>
            <button onClick={() => props.handleDecrement(coffee.id, -1)}>
              +
            </button>
          </div>
        </div>
      ) : (
        <div>..loading page</div>
      )}
    </div>
  );
};

export default singleCoffee;
