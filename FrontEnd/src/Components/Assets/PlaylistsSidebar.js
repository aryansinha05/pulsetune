import React from 'react';
import PlaylistItems from './PlaylistItems';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const PlaylistsSidebar = ({ user, setMusics }) => {
  return (
    <div className="mt-6">
      <div className="font-bold ml-2 flex justify-between items-center">
        <div>PLAYLISTS</div>
        <Link
          to="/playlist"
          className="transition-all duration-300 hover:origin-left hover:scale-x-125 mr-10"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <div className="mt-3 max-h-52 overflow-y-auto scrollbar-hide">
        {user?.playlists?.length > 0 ? (
          user.playlists.map((playlist) => (
            <PlaylistItems key={playlist._id} playlist={playlist} setMusics={setMusics} />
          ))
        ) : (
          <div>No playlists available.</div>
        )}
      </div>
    </div>
  );
};

export default PlaylistsSidebar;
