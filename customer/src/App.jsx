import FirstPage from "./FirstPage";
import News from "./News";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NewsDetails from "./NewsDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        [<Route path="/" element={<FirstPage />} />]
        <Route path="/SignUP" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/News" element={<News />} />
        <Route path="News">
          <Route path=":id" element={<NewsDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
