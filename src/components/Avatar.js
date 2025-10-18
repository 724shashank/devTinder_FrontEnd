import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Avatar = ({ reciever, online }) => {
  const connections = useSelector((store) => store?.connection);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (connections && reciever) {
      const details = connections.find((u) => u?._id === reciever);
      setUser(details || null);
    }
  }, [reciever, connections]);

  if (!user) return null; 

  return (
    <div className="flex items-center gap-3 p-3 rounded-t-2xl bg-black shadow-sm hover:shadow-md transition">
   
      <div className="avatar">
        <div
          className={`w-12 rounded-full ring ${
            online ? "ring-success" : "ring-gray-400"
          } ring-offset-base-100 ring-offset-2`}
        >
          <img src={user.photoUrl} alt={user.firstName} />
        </div>
      </div>

      {/* User info */}
      <div className="flex flex-col">
        <p className="font-semibold text-white">{user.firstName}</p>
        <p
          className={`text-sm font-medium flex items-center gap-1 ${
            online ? "text-green-500" : "text-gray-400"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              online ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
          {online ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default Avatar;
