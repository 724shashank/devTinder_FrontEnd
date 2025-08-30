import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import reduxStore from "./redux/store";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import PendingRequest from "./components/PendingRequest";
const App = () => {
  return (
    <>
    <Provider store={reduxStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
             <Route path="connnections" element={<Connections />} />
             <Route path="requests" element={<PendingRequest />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
