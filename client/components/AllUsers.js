/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync } from "../features/admin/Adminslice";

//we are not getting our req.headers.authorization
//passed into our requireToken for the api/users route
//so we decided to create a frontend component that could
//request all users as an admin only, and allow us to send
//req.headers.authorization to our middleware in gateKeeping.js which would all us to block anyone who is not an admin from viewing api/users

const AllUsers = () => {
  const coffees = useSelector(selectCoffees);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.me.isAdmin);

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  return <div>Render All Users</div>;
};

export default AllUsers;
