//import Adminstrator from "./Adminstrator";
import "./App.css";
import SignIn from "./SignIn";
import SignUpPage from "./SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tracking from "./Tracking";
import HomePage from "./HomePage";
import DriversPage from "./DriversPage";
import CustomersPage from "./CustomersPage";
import RequestsPage from "./RequestsPage";
import FeedbacksPage from "./FeedbacksPage";
import FirstPage from "./FirstPage";
import ComplaintsPage from "./ComplaintsPage";
import AnnouncementsPage from "./AnnouncementsPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import RegistrationPage from "./RegistrationPage";
import ProfilePage from "./ProfilePage";
import SchedulingPage from "./SchedulingPage";

import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<FirstPage />} />
            <Route path="homepage" element={<HomePage />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="drivers" element={<DriversPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="schedules" element={<SchedulingPage />} />

            <Route path="requests" element={<RequestsPage />} />
            <Route path="feedbacks" element={<FeedbacksPage />} />
            <Route path="complaints" element={<ComplaintsPage />} />
            <Route path="forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
