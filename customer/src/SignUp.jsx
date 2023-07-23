import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {client} from "../../apiEndpoints/endpoints.js";


function SignUp() {
  const [error, setError] = useState(null);
  const [formInfo, setFormInfo] = useState({});
  const form = useRef(null);
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const jsonData = Object.fromEntries(formData);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          const location = {
            type: "Point",
            coordinates: [longitude, latitude],
            digitalAddress: jsonData.digitalAddress,
          };

          jsonData.location = location;

          client
            .post("/customerSignUp/", jsonData)
            .then((response) => {
              console.log(response.data);
              navigate("/SignIn");
            })
            .catch((error) => {
              console.error(error);
              if (
                error.response &&
                error.response.data &&
                error.response.data.error
              ) {
                setError(error.response.data.error);
              } else {
                setError("An error occurred. Please try again later.");
              }
            });
        },
        (error) => {
          console.error("Error retrieving geolocation:", error);
          // Handle error retrieving geolocation here
        }
      );
    }
  };

  return (
    <div className="flex  justify-center items-center h-screen w-fill overflow-auto shadow- ">
      <div className="  h-screen w-full overflow-auto ">
        <div className="flex h-24 bg-gradient-to-r from-g2 to-g3 text-white text-2xl font-semibold justify-center items-center">
          <h1>BinBuddy</h1>
        </div>
        <div className="flex flex-row p-4 text-g2 shadow-lg justify-between">
          <NavLink to="/SignIn">Sign In</NavLink>
          <NavLink to="/SignUp">Get Started</NavLink>
        </div>
        <div className="flex flex-col scroll-smooth justify-center  items-center p-4">
          <h1 className="text-black text-xl font-semibold">
            Become Part of the Future
          </h1>
        </div>
        <form
          onSubmit={handle}
          ref={form}
          className=" flex flex-col items-center h-[80%] p-2 m-2 w-fill overflow-auto rounded-md"
        >
          <div className=" h-[8%] w-fill  grid grid-cols-2 gap-4">
            <input
              type="text"
              className="h-9 shadow-md w-[90%] rounded-md text-center"
              placeholder="First Name"
              name="firstName"
              required
            />
            <input
              type="text"
              className="h-9 shadow-md w-[95%]  rounded-md text-center"
              placeholder="Last Name"
              name="lastName"
              required
            />
          </div>

          <input
            type="email"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Email"
            name="email"
            required
          />
          <input
            type="text"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Contact"
            name="contact"
            required
          />
          <input
            type="text"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Digital Address"
            name="digitalAddress"
            required
          />
          <input 
            type="password"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Create Password"
            name="password"
            required
          />
          <input
            type="password"
            className="h-[8%] shadow-md text-center w-[90%] my-2 rounded-md "
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />

          <select
            name="gender"
            id="gender "
            className="border h-[8%] shadow-md text-center w-[90%] my-2 rounded-md  "
            required
          >
           <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

          {error && (
            <div className="text-red-500 mt-2">{error}</div>
          )}

          <div
            className="flex border text-white my-12 shadow-xl font-semibold h-12 p-4 bg-g3 rounded-3xl m-4 justify-center items-center hover:bg-white hover:text-g3 hover:border-g3 "
          >
            <button >Join The Community</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
