import { NavLink } from "react-router-dom";
import { useRef } from "react";

function SignUp() {
  const [formInfo, setFormInfo] = useState({});
  const form = useRef(null);
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const jsonData = Object.fromEntries(formData)
    const email = formData.get("email");
    const contact = formData.get("contact");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    setFormInfo({
      email,
      contact,
      firstName,
      lastName,
    });
    console.log(jsonData)
    client
      .post("/driverSignUp/", jsonData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate("/SignIn");

  return false; // Prevent default form submission behavior
  };

  return (
    <div className="flex  justify-center items-center h-screen w-fill overflow-auto ">
      <div className="  h-screen w-full overflow-auto ">
        <div className="flex h-24 bg-g3 text-white text-2xl font-semibold justify-center items-center">
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
          onSubmit={handleSubmit}
          className=" flex flex-col items-center h-[80%] p-2 m-2 w-fill overflow-auto rounded-md"
        >
          <input
            type="text"
            className="h-[8%] shadow-md w-[90%] rounded-md text-center"
            placeholder="First Name"
            name="firstName"
            // required
          />
          <input
            type="text"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Last Name"
            name="lasttName"
            // required
          />
          <input
            type="email"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Email"
            name="email"
            // required
          />
          <input
            type="text"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Contact"
            name="contact"
            // required
          />
          <input
            type="text"
            className="h-[8%] shadow-md w-[90%] my-2 rounded-md text-center"
            placeholder="Where do you stay"
            name="location"
            // required
          />

          <NavLink
            to="/MainPage"
            className="flex border text-white my-12 shadow-xl font-semibold h-12 p-4 bg-g3 rounded-3xl m-4 justify-center items-center hover:bg-white hover:text-g3 hover:border-g3 "
          >
            <button>Join The Community</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
