//import Adminstrator from "./Adminstrator";
import "./App.css";
import SignIn from "./SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Scheduling from "./Scheduling";
import Tracking from "./Tracking";
import HomePage from "./HomePage";
import DriversPage from "./DriversPage";
import CustomersPage from "./CustomersPage";
import RequestsPage from "./RequestsPage";
import FeedbacksPage from "./FeedbacksPage";
import FirstPage from "./FirstPage";
import ComplaintsPage from "./ComplaintsPage";
import AnnouncementsPage from "./AnnouncementsPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<FirstPage />} />
            <Route path="homepage" element={<HomePage />} />
            <Route path="signin" element={<SignIn />} />

            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="scheduling" element={<Scheduling />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="drivers" element={<DriversPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="requests" element={<RequestsPage />} />
            <Route path="feedbacks" element={<FeedbacksPage />} />
            <Route path="complaints" element={<ComplaintsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
