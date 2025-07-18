import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  faArrowRightFromBracket,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import MobileDropdown from "./MobileDropdown";
import MobileSidebar from "../../screenDiv/MobileSidebar";

const Navbar = ({
  user,
  setUser,
  search,
  setSearch,
  setMusics,
  setCurrentMusic,
  playlists,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const handleLogOut = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/logout`, {
        withCredentials: true,
      });
      setCurrentMusic(null);
      setUser(null);
      setSearch("");
      toast.success(response.data.message);
      navigate("/login")
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="h-16 flex items-center rounded-tl-xl rounded-tr-xl">
      {/* mobile sidebar division */}
      <div className="flex xl:hidden">
        <MobileSidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          playlists={playlists}
          user={user}
          setMusics={setMusics}
        />
        <button
          className="p-2 text-white"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      <Link
        to="/"
        className="text-xs xl:text-sm flex text-red-500 justify-center items-center w-1/5 h-[6vh]"
      >
        <FontAwesomeIcon icon={faSoundcloud} size="3x" />
        <div className="hidden xl:flex text-4xl caveat-logo">PulseTune</div>
      </Link>
      <div className="w-1/5 hidden xl:block">
        <Link to="/" className="m-5" onClick={() => setSearch("")}>
          MUSIC
        </Link>
        <Link to="/artists" className="m-5">
          ARTISTS
        </Link>
      </div>
      {user != null ? (
        <div className="h-10 w-full xl:w-[35vw] mx-5 flex items-center justify-center rounded-md gap-2 px-3 bg-gray-800 hover:bg-gray-700 xl:focus-within:w-[50vw] border-[1px] border-gray-700 transition-all duration-500">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-lg" />
          <input
            name="search"
            placeholder="Search songs, artists..."
            onClick={handleClick}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            type="text"
            className="h-full w-full text-gray-200 bg-inherit placeholder-gray-400 focus:outline-none"
            autoComplete="off"
          />
        </div>
      ) : (
        <div className="xl:w-1/5"></div>
      )}
      <div className="xl:w-2/5 justify-end hidden xl:flex">
        {user != null ? (
          <>
            <a href="/" className="m-3 my-auto">
              Hey! {user.username?.toString().toUpperCase() || ""}
            </a>

            <button
              onClick={handleLogOut}
              className="text-red-200 m-3 mr-5 my-auto"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="m-3">
              SignUp
            </Link>
            <Link to="/login" className="m-3">
              Login
            </Link>
          </>
        )}
      </div>
      <div className="flex-1 flex justify-end xl:hidden">
        <MobileDropdown user={user} handleLogOut={handleLogOut} />
      </div>
    </div>
  );
};

export default Navbar;