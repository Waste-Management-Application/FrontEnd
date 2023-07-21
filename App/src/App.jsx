//import Adminstrator from "./Adminstrator";
import "./App.css";
import SignIn from "./SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Scheduling from "./Scheduling";
import Tracking from "./Tracking";
import Announcements from "./Announcements";
import HomePage from "./HomePage";
import Adminstrator from "./Adminstrator";
import DriversPage from "./DriversPage";
import CustomersPage from "./CustomersPage";
import RequestsPage from "./RequestsPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<SignIn />} />
            <Route path="homepage" element={<HomePage />} />
            <Route path="home" element={<Adminstrator />} />
            <Route path="scheduling" element={<Scheduling />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="drivers" element={<DriversPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="requests" element={<RequestsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
