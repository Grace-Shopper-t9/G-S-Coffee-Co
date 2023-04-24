import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <img className="logo" src="faveicoimage.png"></img>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <Link to="/cart">Cart</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
