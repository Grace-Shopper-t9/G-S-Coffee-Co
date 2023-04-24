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

  // const handleIncrement = (coffee.id) => {
  //   updateCart(coffee => coffee.map(item => coffee.id === item.id ? coffee.qty += value : coffee)

  //   handleIncrement(updateCart)}

  const handleAddToCart = ({ coffeeId: id }) => {
    dispatch(id);
  };

  useEffect(() => {
    console.log("fetching coffee data...");
    dispatch(fetchSingleCoffee(coffeeId));
  }, [dispatch, coffeeId]);
  //   console.log("coffee:", coffee);

  return (
    <div>
      <h1></h1>
      {coffee ? (
        <div className="single-coffee">
          <div key={coffee.id}>
            <h2>{coffee.name}</h2>
            {<img className="coffeeimg" src={coffee.image}></img>}
            <h4>${coffee.price}</h4>
            <h5>{coffee.roast}</h5>
            <h5>{coffee.description} </h5>
          </div>

          <div className="incrementaddbutton">
            {
              <button onClick={() => handleAddToCart(coffee.id)}>
                add to cart
              </button>
            }
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
      ) : (
        <div>..loading page</div>
      )}
    </div>
  );
};

export default singleCoffee;
