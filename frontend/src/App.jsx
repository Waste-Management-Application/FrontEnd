import FirstPage from "./FirstPage";
import News from "./News";
import SignIn from "./SignIn";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import CheckList from "./CheckList";
import NewsDetails from "./NewsDetails";
import ProfilePage from "./ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        [<Route path="/" element={<FirstPage />} />]
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/News" element={<News />} />
        <Route path="/CheckList" element={<CheckList />} />
        <Route path="News">
          <Route path=":id" element={<NewsDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
