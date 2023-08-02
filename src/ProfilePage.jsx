import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { client } from "../apiEndpoints/endpoints.js";
import { NavLink } from "react-router-dom";

function ProfilePage() {
  const mapboxApiKey =
    "pk.eyJ1IjoiZGFiYXJkZW4iLCJhIjoiY2xrZmQzY3MyMGMzbTNzbzVydWM0d3ZueCJ9.BtD3WGO5D3C8fbfCDyDlhg";

  const [customer, setCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [locationString, setLocationString] = useState("Loading...");
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Fetch customer data from the backend
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authentication token not found.");
          return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const customerId = decodedToken.id;

        const response = await client.get(`/customers/${customerId}`);
        const customerData = response.data?.data?.customer;
        setCustomer(customerData);

        if (customerData && customerData.location) {
          const { longitude, latitude } = customerData.location.coordinates;

          if (latitude && longitude) {
            fetchLocationString(latitude, longitude);
          } else {
            setLocationString("Unknown Location");
          }
        } else {
          console.error("Invalid customer data format:", customerData);
          setLocationString("Unknown Location");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        // setError(error.message);
      }
    };

    fetchCustomerData();
  }, []);

  const fetchLocationString = async (latitude, longitude) => {
    try {
      const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxApiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        setLocationString(data.features[0].place_name);
      } else {
        setLocationString("Unknown Location");
      }
    } catch (error) {
      console.error("Error fetching location data:", error.message);
      setLocationString("Unknown Location");
    }
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  // Destructure firstName, lastName, email, contact, and gender from customer object
  const { firstName, lastName, email, contact, gender } = customer;
  const { city } = customer.location; // Use default value if city is not available

  // Function to handle opening the edit modal
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  // Function to handle closing the edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <div className="h-screen w-full overflow-clip">
        <div className="h-52 bg-g3 border-none opacity-90 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div>
              <div className="flex justify-center items-center bg-white h-16 w-16 rounded-full m-4">
                <div className="flex justify-center items-center bg-g2 h-12 w-12 rounded-full"></div>
              </div>
            </div>
            <div>
              <div>
                <h1 className="text-3xl text-white">{`${firstName} ${lastName}`}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10 rounded-b-full bg-g3 border-b-none opacity-90 shadow-xl mb-5"></div>
        <div className="flex flex-col h-screen p-4 ">
          <div className="m-3">
            <h1 className="text-gray-500">Email</h1>
            <h1 className="text-xl">{email}</h1>
          </div>
          <div className="m-3">
            <h1 className="text-gray-500">Contact</h1>
            <h1 className="text-xl">{contact}</h1>
          </div>
          <div className="m-3">
            <h1 className="text-gray-500">City/Town</h1>
            <h1 className="text-xl">{city}</h1>
          </div>
          <div className="m-3">
            <h1 className="text-gray-500">Gender</h1>
            <h1 className="text-xl">{gender}</h1>
          </div>
          <div
            onClick={handleOpenEditModal}
            className="w-full flex justify-center"
          >
            <button className="flex border-[2px] shadow-xl border-g2 text-g2 font-semibold h-12  p-4 bg-white rounded-3xl m-4 justify-center items-center hover:bg-g3 hover:text-white w-[40%]">
              Edit
            </button>
            <NavLink
              to="/MainPage"
              className="flex border-[2px] shadow-xl border-white text-white font-semibold h-12  p-4 bg-g3 rounded-3xl m-4 justify-center items-center hover:bg-g3 hover:text-white w-[40%]"
            >
              <button>Home</button>
            </NavLink>
            {/* {error && (
              <div className="text-red-500 mt-2">
                {error}
                <button
                  className="ml-2 text-sm underline"
                  onClick={handleDismissError}
                >
                  Dismiss
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Modal to edit the profile */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        user={customer}
      />
    </div>
  );
}

export default ProfilePage;
