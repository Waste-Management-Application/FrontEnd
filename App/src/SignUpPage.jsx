import { NavLink } from "react-router-dom";
import { useState } from "react";
function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted!");

    setFirstName("");
    setLastName("");
    setContact("");
    setEmail("");
    setPassword("");
    setCPassword("");
  };
  return (
    <div className="h-screen w-full bg-g1 flex flex-row">
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
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Confirm Password"
              className="border-b-2 w-full m-1 h-10 rounded-lg text-center"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <NavLink
              to="/homepage"
              className="flex justify-center items-center w-full m-2"
            >
              <button
                className="border w-full border-2-white p-2 rounded-lg bg-g3 text-white"
                type="submit"
              >
                submit
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
