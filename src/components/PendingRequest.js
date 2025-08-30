import axios from "axios";
import { baseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../redux/slices/pendingRequestSlice";
import { useEffect } from "react";
import ConnectionList from "./ConnectionList";

const PendingRequest = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);
  const fetchReq = async () => {
    try {
      const pendingReq = await axios.get(baseURL + "/user/requests/pending", {
        withCredentials: true,
      });
      dispatch(addRequests(pendingReq?.data?.result));
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  useEffect(() => {
    fetchReq();
  }, []);
  return (
    <>
      <div>
        {request?.length <= 0 ? (
          <div className="text-2xl font-bold text-center mt-5"> No Pending Requests ! </div>
        ) : (
          request?.map((user) => {
            return (
              <ConnectionList
                key={user._id}
                reqID={user._id}
                details={user.fromUserID}
                showSkills={false}
                showButtons={false}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default PendingRequest;
