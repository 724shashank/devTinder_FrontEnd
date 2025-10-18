import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import reduxStore from "./redux/store";
import Body from "./components/Body";
import Login from "./components/Login";
//import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import PendingRequest from "./components/PendingRequest";
import Subscription from "./components/Subscription";
import Chat from "./components/Chat"
import { AnimatedTestimonials } from "./components/AnimatedTestimonials";


const App = () => {
  return (
    <div className="background" >
    <Provider store={reduxStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<AnimatedTestimonials autoplay={false} />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
             <Route path="connnections" element={<Connections />} />
             <Route path="requests" element={<PendingRequest />} />
             <Route path="subscribe" element={<Subscription />} />
             <Route path="chat/:targetId" element={<Chat  />} />
  
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
