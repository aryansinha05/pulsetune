import { faEarListen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PlaylistItems = ({ playlist, setMusics }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/playlist/${playlist._id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="p-3 origin-left hover:scale-x-105 hover:bg-gray-800 hover:text-gray-300 w-full transition-all duration-300 flex items-center gap-2 hover:cursor-pointer"
    >
      <FontAwesomeIcon icon={faEarListen} className="mx-4" />
      {playlist.name.charAt(0).toUpperCase() + playlist.name.slice(1)}
    </div>
  );
};

export default PlaylistItems;
