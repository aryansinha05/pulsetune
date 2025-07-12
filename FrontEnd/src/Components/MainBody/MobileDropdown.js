import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const MobileDropdown = ({ user, handleLogOut }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="flex xl:hidden items-center relative" ref={dropdownRef}>
      <button
        className="p-3 px-5 rounded-full hover:bg-gray-700 transition"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        <FontAwesomeIcon icon={faEllipsisV} className="text-gray-300 text-lg" />
      </button>
      {open && (
        <div className="absolute right-0 top-12 bg-gray-900 rounded shadow-lg z-50 w-44">
          <ul className="py-2">
            {user ? (
              <>
                <li>
                  <span className="block px-4 py-2 text-white cursor-default">
                    Hey! {user.username?.toString().toUpperCase() || ""}
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => { setOpen(false); handleLogOut(); }}
                    className="w-full text-left px-4 py-2 text-red-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileDropdown;