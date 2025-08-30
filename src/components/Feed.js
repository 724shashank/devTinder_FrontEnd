import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../redux/slices/feedSlice";
import { baseURL } from "../utils/constants";
import UserCard from "./UserCard";
import Toast from "./Toast";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);
  const [toast, setToast] = useState(false);

  const handleToast = (bool) => {
    setToast(bool);
  };

  const handleFeed = async () => {
    try {
      const res = await axios.get(baseURL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(getFeed(res?.data?.result));
    } catch (error) {
      console.log("Nothing to Display !!!");
    }
  };

  useEffect(() => {
    handleFeed();
  }, []);

  return (
    <>
      <div className="flex justify-center min-w-auto -mt-5 sm:-mt-8 md:-mt-12 lg:-mt-15">
        {toast && <Toast message={"Action Taken !"} />}
        {Array.isArray(feed) &&
          feed
            ?.slice(0, 1)
            ?.map((user) => (
              <UserCard
                key={user._id}
                details={user}
                toastFunction={handleToast}
              />
            ))}
      </div>
    </>
  );
};

export default Feed;
