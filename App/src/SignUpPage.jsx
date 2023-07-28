import { NavLink, useNavigate  } from "react-router-dom";
import { useState } from "react";
import { adminClient } from "../../apiEndpoints/endpoints.js";

function SignUpPage() {
  const navigate = useNavigate(); 
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation]= useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create an object with the form data
      const userData = {
        firstName,
        lastName,
        contact,
        email,
        location,
        password,
        confirmPassword,
      };

      // Send the user data to the backend API
      const response = await adminClient.post("/adminSignUp", userData);

      // Handle the response if needed (e.g., show a success message)
      console.log("User successfully registered:", response.data);

      // Clear the form after successful registration
      setFirstName("");
      setLastName("");
      setContact("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
       setLocation("")


      // Redirect to SignIn page after successful registration
      navigate("/SignIn");
    } catch (error) {
      // Handle errors if any (e.g., show an error message)
      console.error("Error during registration:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="h-screen w-full bg-g2 flex flex-row">
      <div className="h-screen w-full  rounded-full p-4 flex justify-center items-center">
        <img
          src="./src/assets/splash2.png"
          alt="Splash"
          className=" bg-white h-[50%] rounded-full cursor-pointer"
        />
      </div>
      <div className=" w-full h-full   ">
        <div className="h-screen w-full shadow-lg border border-teal rounded-lg flex flex-col justify-center items-center bg-white">
          <div className="h-10 m-6 p-4 flex w-full">
            <h1 className="text-3xl text-black-300">Sign Up</h1>
          </div>
          <form className=" h-[80%] w-[80%] p-4 " onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Contact"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              className="border w-full border-2-white p-2 rounded-lg bg-g3 text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
