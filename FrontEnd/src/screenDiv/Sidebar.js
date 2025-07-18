import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSlack, faWpexplorer } from '@fortawesome/free-brands-svg-icons';
import PlaylistsSidebar from '../Components/Assets/PlaylistsSidebar';
import { Link } from 'react-router-dom';

const Sidebar = ({ user, setMusics }) => {
  return (
    <div className="pt-6 text-gray-100 text-[17px] h-screen border-r-[1px] border-gray-800 overflow-x-auto">
      {/* <div className="border-b-[1px] mb-4 border-gray-800">
        <h1 className="font-bold pl-2 mb-2">MENU</h1>
        <div className="p-3 origin-left hover:scale-x-105 hover:bg-gray-800 w-full transition-all duration-300 flex items-center gap-2 hover:cursor-pointer">
          <FontAwesomeIcon icon={faWpexplorer} className="mx-4" />
          Explore
        </div>
        <div className="p-3 origin-left hover:scale-x-105 hover:bg-gray-800 w-full transition-all duration-300 flex items-center gap-2 hover:cursor-pointer">
          <FontAwesomeIcon icon={faCompactDisc} className="mx-4" />
          Albums
        </div>
        <div className="p-3 origin-left hover:scale-x-105 hover:bg-gray-800 w-full transition-all duration-300 flex items-center gap-2 hover:cursor-pointer">
          <FontAwesomeIcon icon={faSlack} className="mx-4" />
          Genres
        </div> */}
      {/* </div> */}
      {
        user==null && (<>
        <div className=" mb-4 border-gray-800 px-4">
  <h1 className="font-bold mb-2 text-white text-lg">🎧 Welcome</h1>
  <div className="bg-gray-800/40 p-4 rounded-md text-sm text-gray-300 leading-6">
    Sign up or log in to start exploring music, creating playlists, and discovering artists you love.
    <p className="mt-3 italic text-gray-400">
      New here? Click <span className="text-white font-semibold">SignUp</span> in the top right to begin.
    </p>
  </div>
</div>

</>)
      }
      {user && (
        <>
          <div>
            <PlaylistsSidebar user={user} setMusics={setMusics} />
          </div>
          <div className="mt-5 flex justify-center">
            <Link
              to="/playlist/new"
              className="flex my-auto w-full bg-gray-900 hover:bg-gray-800 hover:text-gray-300 m-3 rounded-3xl px-5 py-2 border border-gray-700 items-center justify-center gap-2 transition-all duration-200"
            >
              <FontAwesomeIcon
                className="opacity-70 text-red-500 text-lg"
                icon={faPlus}
              />
              <span className="text-sm font-light">New Playlist</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;