import axios from "axios";
import { baseURL } from "../utils/constants";
import { useEffect } from "react";
import { addConnection, removeConnection } from "../redux/slices/connnectionSlice";
import { useDispatch, useSelector } from "react-redux";
import ConnectionList from "./ConnectionList";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionDetails = useSelector((store) => store?.connection);

  const fetchConnection = async () => {
    try {
      const details = await axios.get(baseURL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(removeConnection());
      dispatch(addConnection(details.data.result));
    } catch (error) {}
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center mt-5">
          Your Connections
        </h2>
        <h2 className="p-4 pb-2 text-xl opacity-60 tracking-wide text-center md:-ml-100 mb-3">
          {connectionDetails?.length > 1 ? (
            <div>{connectionDetails?.length} Connections</div>
          ) : (
            <div>{connectionDetails?.length} Connection</div>
          )}
        </h2>
      </div>
      {connectionDetails?.length > 0 ? (
        connectionDetails.map((user) => {
          return <ConnectionList key={user._id} details={user} showSkills={true} showButtons={true} />;
        })
      ) : (
        <div className="text-center font-bold">No Connections Yet !</div>
      )}
    </>
  );
};

export default Connections;
