import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSlack, faWpexplorer } from '@fortawesome/free-brands-svg-icons';
import PlaylistsSidebar from '../Components/Assets/PlaylistsSidebar';
import { Link } from 'react-router-dom';

const MobileSidebar = ({ open, setOpen, user, setMusics }) => {
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, setOpen]);

  return (
    <>
      {/* Overlay To darken the rest of the page, focusing attention on the sidebar. */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
      />
      {/* Sidepanel */}
      <div
        ref={panelRef}
        className={`fixed top-0 left-0 h-full w-0 overflow-x-hidden bg-opacity-95 bg-gray-900 z-50 transition-all duration-500 pt-6 text-gray-100 text-[17px] border-r-[1px] border-gray-800 ${open ? "w-64" : "w-0"}`}
        style={{ minWidth: open ? 200 : 0 }}
      >
        <button
          className="absolute top-2 right-4 text-3xl text-white"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <div className="border-b-[1px] my-4 border-gray-800">
          {/* <h1 className="font-bold pl-2 mb-2">MENU</h1> */}
          <div className="p-3 origin-left hover:scale-x-105 hover:bg-gray-800 w-full transition-all duration-300 flex items-center gap-2 hover:cursor-pointer">
            <FontAwesomeIcon icon={faWpexplorer} className="mx-4" />
            <Link to="/">Music</Link>
          </div>
          <div className="p-3 origin-left hover:scale-x-105 hover:bg-gray-800 w-full transition-all duration-300 flex items-center gap-2 hover:cursor-pointer">
            <FontAwesomeIcon icon={faCompactDisc} className="mx-4" />
            <Link to="/artists">Artists</Link>
          </div>
          {/* <div className="p-3 origin-left hover:scale-x-105 hover:bg-gray-800 w-full transition-all duration-300 flex items-center gap-2 hover:cursor-pointer">
            <FontAwesomeIcon icon={faSlack} className="mx-4" />
            Genres
          </div> */}
        </div>
        {/* Playlist section */}
        {user && (
          <>
            <div onClick={() => setOpen(false)}>
              <PlaylistsSidebar user={user} setMusics={setMusics} />
            </div>
            <div className="mt-5 flex justify-center">
              <Link
                to="/playlist/new"
                className="whitespace-nowrap overflow-x-hidden flex my-auto w-full bg-gray-900 hover:bg-gray-800 hover:text-gray-300 m-3 rounded-3xl px-5 py-2 border border-gray-700 items-center justify-center gap-2 transition-all duration-200"
                onClick={() => setOpen(false)}
              >
                <FontAwesomeIcon
                  className="opacity-70 text-red-500 text-lg"
                  icon={faPlus}
                />
                <span className="flex text-sm font-light">Playlist</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MobileSidebar;