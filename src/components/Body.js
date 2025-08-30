import Navbar from "./Navbar";
import { useNavigate, Outlet } from "react-router";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addDetails } from "../redux/slices/userSlice";
import { baseURL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const loggedInUser = async () => {
    try {
      const res = await axios.get(baseURL+"/profile/view", {
        withCredentials: true,
      });
      dispatch(addDetails(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      } else {
        console.log("Some error Occured");
      }
    }
  };

  useEffect(() => {
    loggedInUser();
  },[]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;

//For any children routes we use Outlet
