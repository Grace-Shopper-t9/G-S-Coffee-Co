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
  console.log(coffeeId);

  //   const handleAddToCart = ({ coffeeId: id }) => {
  //     dispatch(id);
  //   };
  const coffee = useSelector(selectSingleCoffee);
  useEffect(() => {
    console.log(dispatch(fetchSingleCoffee(coffeeId)));
  }, [dispatch]);

  console.log(coffee);
  return (
    <div>
      <h1>hello</h1>
      {coffee ? (
        <div>
          <div key={`single coffee ${coffee.id}`}>
            {/* {`${coffee.id}} */}
            <h3>{coffee.name}</h3>
            <h3>{coffee.description} </h3>
            {/* <img className="coffee-img" src={coffee.imageUrl}></img> */}

            {/* <button onClick={() => handleAddToCart(coffee.id)}>
              add to cart
            </button> */}
          </div>
        </div>
      ) : (
        <div>..loading page</div>
      )}
    </div>
  );
};

export default singleCoffee;
