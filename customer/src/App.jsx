import FirstPage from "./FirstPage";
import News from "./News";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import MainPage from "./MainPage";
import Complaint from "./Complaint";
import PaymentPage from "./PaymentPage";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import NewsDetails from "./NewsDetails";
import Feedback from "./Feedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        [<Route path="/" element={<FirstPage />} />]
        <Route path="/SignUP" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/Complaint" element={<Complaint />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/Payment" element={<PaymentPage />} />
        <Route path="/News" element={<News />} />
        <Route path="News">
          <Route path=":id" element={<NewsDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
