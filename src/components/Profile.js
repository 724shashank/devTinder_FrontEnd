import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../utils/constants";
import { addDetails } from "../redux/slices/userSlice";
import Toast from "./Toast";
import UserCard from "./UserCard";

const Profile = () => {
  const dispatch = useDispatch();

  const [toast, setToast] = useState(false);
  const [photo, setPhoto] = useState("");

  const handleFileChange = (e) => {
    setPhoto(e?.target?.files[0]);
  };

  const userProfile = useSelector((store) => store?.user);

  const [details, setDetails] = useState({
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    mobileNo: userProfile?.mobileNo || "",
    age: userProfile?.age || "",
    gender: userProfile?.gender || "",
    photoUrl: userProfile?.photoUrl || "",
    skills: userProfile?.skills || "",
    about: userProfile?.about || "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setDetails((oldData) => {
      return { ...oldData, [name]: value };
    });
  };

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", details.firstName);
      formData.append("lastName", details.lastName);
      formData.append("mobileNo", details.mobileNo);
      formData.append("age", details.age);
      formData.append("gender", details.gender);
      formData.append("about", details.about);

      // Convert skills properly
      const skillsArray =
        typeof details.skills === "string"
          ? details.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : Array.isArray(details.skills)
          ? details.skills
          : [];

      skillsArray.forEach((skill) => formData.append("skills", skill));

      // File
      if (photo) {
        formData.append("photoUrl", photo);
      }

      const res = await axios.patch(`${baseURL}/profile/edit`, formData, {
        withCredentials: true,
      });
      dispatch(addDetails(res.data.userResponse));

      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } catch (error) {
      console.log("Error in updating the profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveProfile();
  };

  useEffect(() => {
    setDetails({
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      mobileNo: userProfile?.mobileNo || "",
      age: userProfile?.age || "",
      gender: userProfile?.gender || "",
      photoUrl: userProfile?.photoUrl || "",
      skills: userProfile?.skills || "",
      about: userProfile?.about || "",
    });
  }, [userProfile]);

  return (
    <>
      {userProfile && (
        <div className="min-h-screen flex items-center justify-center p-6 -mt-15">
          <div className="flex gap-6 w-full max-w-5xl">
            {/* Profile Form */}
            <div className="card flex-1 shadow-2xl bg-base-100">
              <form
                onSubmit={handleSubmit}
                className="card-body space-y-3"
                method="post"
                encType="multipart/form-data"
              >
                <h2 className="text-center text-2xl font-semibold">Profile</h2>

                <input
                  name="firstName"
                  value={details?.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full"
                />
                <input
                  name="lastName"
                  value={details?.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                />
                <input
                  name="mobileNo"
                  value={details?.mobileNo}
                  onChange={handleChange}
                  type="text"
                  placeholder="Mobile No."
                  className="input input-bordered w-full"
                />
                <input
                  name="age"
                  value={details?.age}
                  onChange={handleChange}
                  type="number"
                  placeholder="Age"
                  className="input input-bordered w-full"
                />

                <select
                  name="gender"
                  value={details?.gender}
                  onChange={handleChange}
                  id="gender"
                  className="select select-bordered w-full"
                >
                  <option value="">Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>

                <input
                  name="photoUrl"
                  onChange={handleFileChange}
                  type="file"
                  className="input input-bordered w-full"
                />
                <input
                  name="skills"
                  value={details?.skills}
                  onChange={handleChange}
                  type="text"
                  placeholder="Skills"
                  className="input input-bordered w-full"
                />
                <textarea
                  name="about"
                  value={details?.about}
                  onChange={handleChange}
                  placeholder="About"
                  className="textarea textarea-bordered w-full"
                ></textarea>

                <button type="submit" className="btn btn-primary w-full">
                  Save Profile
                </button>
              </form>
            </div>

            {/* User Card */}
            <div className="card flex-1 shadow-2xl bg-base-100 flex items-center justify-center">
              {details.photoUrl && <UserCard details={details} />}
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={"Profile Saved Successfuly !!!"} />}
    </>
  );
};

export default Profile;
