import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PlaylistCard = ({ playlist, setUser }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/playlist/${playlist._id}`, {
        withCredentials: true,
      });
      setUser(response.data.user);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting playlist");
    }
  };

  // Use first song's image if available
  const firstSong = playlist.list && playlist.list.length > 0 ? playlist.list[0] : null;
  const coverImage = firstSong && firstSong.image
    ? firstSong.image
    : "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const altText = firstSong
    ? `${playlist.name} playlist`
    : "No song in playlist";

  return (
    <Link
      to={`/playlist/${playlist._id}`}
      className="bg-gray-900 rounded-xl shadow-lg p-2 sm:p-5 flex flex-col items-center transition hover:scale-105 hover:bg-gray-800 focus:outline-none"
      title="View Playlist"
      style={{ minHeight: 'auto', height: 'auto' }}
    >
      <img
        src={coverImage}
        alt={altText}
        className="w-14 h-14 sm:w-24 sm:h-24 object-cover rounded-full mb-1 sm:mb-3 border-2 sm:border-4 border-gray-700"
        onError={e => { e.target.src = ""; }}
      />
      <h3 className="text-base sm:text-lg font-semibold text-white mb-0.5 sm:mb-1 truncate w-full text-center">
        {playlist.name.charAt(0).toUpperCase() + playlist.name.slice(1)}
      </h3>
      <p className="text-gray-400 text-center mb-1 text-xs sm:text-base">Songs: {playlist.list.length}</p>
      <button
        onClick={e => { e.preventDefault(); handleDelete(); }}
        className="flex items-center gap-1 px-2 py-1 bg-red-700 text-white rounded hover:bg-red-800 transition text-xs sm:text-sm mt-0.5"
        title="Delete Playlist"
      >
        <FontAwesomeIcon icon={faTrash} />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </Link>
  );
};

export default PlaylistCard;