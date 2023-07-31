import { BiMenu } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { client } from "../../apiEndpoints/endpoints";

function SideBar({ open, toggle }) {
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    // Function to fetch customer data from the backend
    const fetchCustomerData = async () => {
      try {
        // Decode the token and retrieve the customer ID
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Authentication token not found.");
          return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const customerId = decodedToken.id;

        // Fetch the customer data from the backend
        const response = await client.get(`/customers/${customerId}`);
        setCustomer(response.data.data.customer);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);


  return (
    <div className="z-[9999]">
      <div className="h-screen flex items-start justify-end z-20 ">
        {open ? (
          ""
        ) : (
          <BiMenu className={`h-10 w-auto duration-300`} onClick={toggle} />
        )}
        <div
          className={`${
            open ? "w-48" : "w-0"
          } bg-white h-screen relative duration-500  opacity-80`}
        >
          <div
            className={`flex flex-col justify-center items-center ${
              !open && `invisible`
            }`}
          >
            <div className="flex justify-center items-center  bg-g3 h-28 w-full">
              <h2 className="text-white font-semibold">{`${customer.firstName} ${customer.lastName}`}</h2>
              <div className=" flex items-start h-full">
                <h1
                  onClick={toggle}
                  className="text-2xl m-4 hover:cursor-pointer"
                >
                  x
                </h1>
              </div>
            </div>
            <NavLink
              to="/profile"
              className="flex items-center  bg-white h-20 w-full p-4 border border-y-g4"
            >
              <FaUser className="text-g4" />
              <h1 className="mx-5 text-g4 text-2xl">Profile</h1>
            </NavLink>
            <NavLink
              to="/signin"
              className="flex items-center  bg-white h-20 w-full p-4 border border-y-g4"
            >
              <GiExitDoor className="text-g4" />
              <h1 className="mx-5 text-g4 text-2xl">Log Out</h1>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
SideBar.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
