import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeDetails } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { removeFeed } from "../redux/slices/feedSlice";
import { removeConnection } from "../redux/slices/connnectionSlice";
import { baseURL } from "../utils/constants";
import {dummy} from "../utils/constants"
import { IoSend } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);

  const handleLogout = async () => {
    try {
      await axios.post(baseURL + "/logout", {}, { withCredentials: true });
      dispatch(removeDetails());
      dispatch(removeFeed());
      dispatch(removeConnection());
      navigate("/login");
    } catch (error) {
      console.log("Logout Failed");
    }
  };

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
          DevTinder
          </Link>
        </div>
        {user && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                   {user?.photoUrl ? <img
                    className="Tailwind CSS Navbar component"
                    src={user?.photoUrl}
                    alt="user-image"
                  />:
                  <img 
                    className="Tailwind CSS Navbar component"
                    src={dummy}
                    alt="dummy-user"
                  />}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/connnections"} className="justify-between">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to={"/requests"} className="justify-between">
                    Requests
                  </Link>
                </li>
                <li>
                  <Link to={"/subscribe"} className="justify-between">
                    Subscribe
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
