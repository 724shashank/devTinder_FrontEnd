"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getFeed, removeUserFromFeed } from "../redux/slices/feedSlice";
import { baseURL } from "../utils/constants";
import { IoClose, IoHeart } from "react-icons/io5";

export const AnimatedTestimonials = ({ autoplay = false }) => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);

  // Fetch feed
  const handleFeed = async () => {
    try {
      const res = await axios.get(`${baseURL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(getFeed(res?.data?.result || []));
    } catch (error) {
      console.log("Nothing to Display !!!");
    }
  };

  useEffect(() => {
    handleFeed();
  }, []);

  // Autoplay is off
  useEffect(() => {
    if (autoplay && feed?.length > 1) {
      const interval = setInterval(() => handleNext(), 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, feed]);

  const handleNext = () =>
    setActive((prev) =>
      feed && feed.length > 0 ? (prev + 1) % feed.length : 0
    );

  const handlePrev = () =>
    setActive((prev) =>
      feed && feed.length > 0 ? (prev - 1 + feed.length) % feed.length : 0
    );

  // Handle Ignore / Interested
  const handleProfile = async (status, id) => {
    try {
      await axios.post(
        `${baseURL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));

      // Adjust active index safely
      if (feed.length === 1) {
        setActive(0);
      } else if (active >= feed.length - 1) {
        setActive(feed.length - 2); // move to previous if last user removed
      } else {
        setActive((prev) => prev); // stay at same index
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const isActive = (index) => index === active;
  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  if (!feed || feed.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        Check Later for more Developer...
      </div>
    );
  }

  const activeUser = feed[active];

  if (!activeUser) {
    return <div className="text-center text-gray-500 py-20">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        {/* LEFT SIDE IMAGE */}
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {feed.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : feed.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={user.photoUrl}
                    alt={user.firstName}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={activeUser._id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {activeUser.firstName} {activeUser.lastName}
            </h3>
            <p className="text-sm text-gray-300 dark:text-gray-200 mt-1">
              {activeUser.age
                ? `${activeUser.age} years old`
                : "Age not available"}{" "}
              • {activeUser.gender || "Gender not available"}
            </p>
            <p className="text-sm text-gray-500 dark:text-neutral-500 mt-1 flex flex-wrap gap-2">
              {activeUser.skills && activeUser.skills.length > 0
                ? activeUser.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-dash badge-info px-2 py-1 text rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                : "No skills listed"}
            </p>

            <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
              {activeUser.about.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* CROSS / HEART BUTTONS */}
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={() => handleProfile("ignore", activeUser._id)}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-[#605DFF] dark:bg-neutral-800 transition-colors duration-300"
            >
              <IoClose className="text-4xl text-white group-hover:scale-110 transition-transform duration-300" />
            </button>

            <button
              onClick={() => handleProfile("interested", activeUser._id)}
              className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-[#F43098] dark:bg-neutral-800 transition duration-300"
            >
              <span className="text-4xl text-white group-hover/button:scale-110 transition-transform duration-300">
                <IoHeart />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
