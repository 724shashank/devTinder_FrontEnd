import axios from "axios";
import { baseURL } from "../utils/constants";
import { removeRequest } from "../redux/slices/pendingRequestSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

const ConnectionList = ({ details, showSkills, showButtons, reqID }) => {
  const { firstName, lastName, age, gender, photoUrl, skills, about,_id } = details;
  const dispatch = useDispatch();

  const handleAction = async (e, reqID) => {
    try {
      await axios.post(
        `${baseURL}/request/review/${e.target.value}/${reqID}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(reqID));
    } catch (error) {
      console.log("Some error Occured", error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <ul className="space-y-4">
        <li className="flex items-start gap-4 p-4 bg-base-300 shadow rounded-lg hover:shadow-xs hover:shadow-white">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              {firstName} {lastName}
            </h3>
            <p className="text-sm text-gray-500">
              {age} years old • {gender}
            </p>
            <p className="text-sm mt-1">{about.slice(0, 49)}</p>

            {showSkills && skills?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="badge badge-outline text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
          {showButtons ? (
            <div className="flex flex-col gap-2">
            <Link to={`/chat/${_id}`}><button className="btn btn-sm btn-primary">Message</button></Link>
              <button className="btn btn-sm btn-secondary">Remove</button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                className="btn btn-sm btn-primary"
                value="accepted"
                onClick={(e) => handleAction(e, reqID)}
              >
                Accept
              </button>
              <button
                className="btn btn-sm btn-secondary"
                value="rejected"
                onClick={(e) => handleAction(e, reqID)}
              >
                Reject
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ConnectionList;
