import { MenuItem } from "@headlessui/react";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const DropMenuItems = ({
  currentMusic,
  postQueue,
  preQueue,
  currentPlaylist,
  setPostQueue,
  name,
  id,
  musicInfo,
  setUser,
}) => {
  const [loading, setLoading] = useState(false);

  const handleButton = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/playlist/${id}`,
        musicInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (id === currentPlaylist) {
        const isInQueue =
          postQueue.some((item) => item._id === musicInfo._id) ||
          preQueue.some((item) => item._id === musicInfo._id) ||
          currentMusic?._id === musicInfo._id;

        if (!isInQueue) {
          setPostQueue((prev) => [...prev, musicInfo]);
        }
      }
      setUser(res.data.user);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MenuItem>
      <button
        onClick={handleButton}
        disabled={loading}
        className={`block px-4 w-full py-2 text-sm text-gray-200 data-[focus]:bg-gray-600 data-[focus]:outline-none ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </button>
    </MenuItem>
  );
};

export default DropMenuItems;
