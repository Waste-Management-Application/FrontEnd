import FirstPage from "./FirstPage";
import News from "./News";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import MainPage from "./MainPage";
import Request from "./Request";
import Complaint from "./Complaint";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import NewsDetails from "./NewsDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        [<Route path="/" element={<FirstPage />} />]
        <Route path="/SignUP" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/Request" element={<Request />} />
        <Route path="/Complaint" element={<Complaint />} />
        <Route path="/News" element={<News />} />
        <Route path="News">
          <Route path=":id" element={<NewsDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
