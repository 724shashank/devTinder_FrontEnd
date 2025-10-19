import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDetails } from "../redux/slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router";
import { baseURL } from "../utils/constants";

const Login = () => {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [login, setLogin] = useState({
    emailId: "",
    password: "",
  });

  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLogin((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const loginUser = async () => {
    try {
      const res = await axios.post(baseURL + "/login", login, {
        withCredentials: true,
      });
      dispatch(addDetails(res.data.userObject));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log("Login Failed");
    }
  };

  const handleSignUpInput = (e) => {
    const { name, value } = e.target;
    setSignUp((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(baseURL + "/signup", signUp, {
        withCredentials: true,
      });
      dispatch(addDetails(res.data.data));
      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (user?.firstName) {
      navigate("/");
    }
  }, [user?.firstName, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 mt-10 mb-30">
        <form onSubmit={handleSubmit} className="card-body space-y-3">
          <h2 className="text-center text-2xl font-semibold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {isLogin ? (
            <>
              <input
                name="emailId"
                type="email"
                placeholder="Email"
                value={login.emailId}
                onChange={handleLoginInput}
                className="input input-bordered w-full"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={login.password}
                onChange={handleLoginInput}
                className="input input-bordered w-full"
              />
              <button
                type="submit"
                className="btn btn-primary w-full"
                onClick={loginUser}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={signUp.firstName}
                onChange={handleSignUpInput}
                className="input input-bordered w-full"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={signUp.lastName}
                onChange={handleSignUpInput}
                className="input input-bordered w-full"
              />
              <input
                name="emailId"
                type="email"
                placeholder="Email"
                value={signUp.emailId}
                onChange={handleSignUpInput}
                className="input input-bordered w-full"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={signUp.password}
                onChange={handleSignUpInput}
                className="input input-bordered w-full"
              />

              <button
                type="submit"
                className="btn btn-secondary w-full"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </>
          )}
        </form>
        <p className="text-red-500 text-center ">{error}</p>
        <p
          onClick={() => setIsLogin((prev) => !prev)}
          className="mt-4 mb-4 text-sm text-center text-secondary cursor-pointer hover:underline"
        >
          {isLogin
            ? "Not registered yet? Sign Up"
            : "Already registered? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
