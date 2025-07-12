import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import DropMenuItems from './DropMenuItems';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const DropDown = ({ currentMusic, postQueue, preQueue, currentPlaylist, setPostQueue, user, musicInfo, setUser }) => {
  return (
    <Menu as="div" className="relative gap-x-3 w-fit inline-block text-left">
      <MenuButton className="gap-x-1.5 rounded-md text-sm font-semibold text-white shadow-sm opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
        <div className="hover:bg-gray-400 hover:bg-opacity-45 rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200">
          <FontAwesomeIcon icon={faEllipsisVertical} className="text-white text-lg" />
        </div>
      </MenuButton>

      <MenuItems className="scrollbar-hide opacity-95 max-h-44 min-w-36 overflow-y-auto absolute right-0 z-10 mt- origin-top-right bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in hover:opacity-100">
        <div>
          <MenuItem>
            <Link to="/playlist/new" className="text-center block px-4 w-full py-2 text-sm text-gray-200 data-[focus]:bg-gray-600 data-[focus]:outline-none">
              + Create Playlist
            </Link>
          </MenuItem>
        </div>
        <div>
          {user?.playlists?.length > 0 &&
            user.playlists.map((playlist) => (
              <div key={playlist._id}>
                <DropMenuItems
                  currentMusic={currentMusic}
                  postQueue={postQueue}
                  preQueue={preQueue}
                  currentPlaylist={currentPlaylist}
                  setPostQueue={setPostQueue}
                  name={playlist.name}
                  id={playlist._id}
                  musicInfo={musicInfo}
                  setUser={setUser}
                />
              </div>
            ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropDown;
