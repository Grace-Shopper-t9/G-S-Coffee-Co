import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "./store";

import { addOneOrderAsync } from "../features/cart/cartSlice";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const loggedInUserID = useSelector((state) => state.auth.me.id);
  const user = useSelector((state) => state.cart.user);

  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formName, setFormName] = useState("");

  const { order } = user;
  let orderId = null;
  order ? (orderId = order.id) : null;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    dispatch(authenticate({ username, password, email, method: formName }));
    setUserName("");
    setPassword("");
    setEmail("");
    setFormName(formName);
    navigate("/");
  };

  useEffect(() => {
    loggedInUserID ? dispatch(fetchUserAsync(loggedInUserID)) : null;
    formName === "signup" ? dispatch(fetchOneOrderAsync(orderId)) : null;
  }, [formName]);

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input
            name="username"
            value={username}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            name="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {name === "signup" ? (
          <div>
            <label htmlFor="email">
              <small>email</small>
            </label>
            <input
              name="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : null}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
