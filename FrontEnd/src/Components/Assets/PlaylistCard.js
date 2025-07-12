import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

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
    <div className="bg-gray-900 rounded-xl shadow-lg p-5 flex flex-col items-center">
      <img
        src={coverImage}
        alt={altText}
        className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-700"
        onError={e => { e.target.src = ""; }}
      />
      <h3 className="text-xl font-semibold text-white mb-2">
        {playlist.name.charAt(0).toUpperCase() + playlist.name.slice(1)}
      </h3>
      <p className="text-gray-400 text-center mb-2">Songs: {playlist.list.length}</p>
      <div className="flex gap-2 mb-2">
        <Link
          to={`/playlist/${playlist._id}`}
          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
          title="View Playlist"
        >
          <FontAwesomeIcon icon={faEye} />
          <span className="hidden sm:inline">Playlist</span>
        </Link>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 px-3 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition text-sm"
          title="Delete Playlist"
        >
          <FontAwesomeIcon icon={faTrash} />
          <span className="hidden sm:inline"></span>
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
