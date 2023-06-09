import FirstPage from "./FirstPage";
import News from "./News";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import CheckList from "./CheckList";
import NewsDetails from "./NewsDetails";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        [<Route path="/" element={<FirstPage />} />]
        <Route path="/SignUP" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/News" element={<News />} />
        <Route path="/CheckList" element={<CheckList />} />
        <Route path="News">
          <Route path=":id" element={<NewsDetails />} />
        </Route>
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
