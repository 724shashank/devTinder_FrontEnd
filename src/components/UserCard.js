import axios from "axios";
import { baseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/slices/feedSlice";

const UserCard = ({ details, toastFunction }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, skills, about } =
    details;

  const dispatch = useDispatch();

  const handleProfile = async (status, id) => {
    try {
      await axios.post(
        `${baseURL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      toastFunction(true);
      dispatch(removeUserFromFeed(id));
      setTimeout(() => {
        toastFunction(false);
      }, 2000);
    } catch (error) {
      console.log("Some thing went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card bg-base-300 w-full max-w-md h-[80vh] shadow-xl">
        <figure className="h-[60%]">
          <img
            src={photoUrl}
            alt="photo"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body h-[40%] overflow-y-auto">
          {(firstName || lastName) && (
            <h2 className="card-title">
              {firstName} {lastName}
            </h2>
          )}
          {age && gender && (
            <p>
              {age}, {gender}
            </p>
          )}
          {about && <p>{about}</p>}
          {Array.isArray(skills) && skills?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-0.5">
              {skills?.slice(0, 5)?.map((skill, index) => (
                <span key={index} className="badge badge-outline text-xs">
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-1/3"
              onClick={() => handleProfile("ignore", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary w-1/3"
              onClick={() => handleProfile("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
