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

  console.log(coffeeId);

  //   const handleAddToCart = ({ coffeeId: id }) => {
  //     dispatch(id);
  //   };

  useEffect(() => {
    console.log("fetching coffee data...");
    dispatch(fetchSingleCoffee(coffeeId));
  }, [dispatch, coffeeId]);
  console.log("coffee:", coffee);

  return (
    <div>
      <h1>hello</h1>
      {coffee ? (
        <div>
          why is this not rendering??
          <div key={`single coffee ${coffee.id}`}>
            <h3>{coffee.name}</h3>
            <h3>{coffee.description} </h3>
          </div>
        </div>
      ) : (
        <div>..loading page</div>
      )}
    </div>
  );
};

export default singleCoffee;

// {
/* <img className="coffee-img" src={coffee.imageUrl}></img> */
// }

// {
/* <button onClick={() => handleAddToCart(coffee.id)}>
              add to cart
            </button> */
// }
