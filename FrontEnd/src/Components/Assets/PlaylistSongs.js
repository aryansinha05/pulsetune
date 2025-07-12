import { faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const PlaylistSongs = ({ setCurrentPlaylist, playlistMusics, preQueue, setPreQueue, postQueue, setPostQueue, music, playlistID, setUser, currentMusic, setCurrentMusic }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      if (currentMusic && music._id === currentMusic._id) {
        if (postQueue.length !== 0) {
          setCurrentMusic(postQueue[0]);
          setPostQueue(prev => prev.slice(1));
        } else {
          setCurrentMusic(null);
        }
      } else {
        setPreQueue(prev => prev.filter(elem => elem._id !== music._id));
        setPostQueue(prev => prev.filter(elem => elem._id !== music._id));
      }
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/playlist/${playlistID}/music/${music._id}`, {
        withCredentials: true,
      });
      setUser(response.data.user);
      toast.success(response.data.message);
      navigate(`/playlist/${playlistID}`);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const playMusic = () => {
    const index = playlistMusics.findIndex(m => m._id === music._id);
    if (index === -1) return;

    setPreQueue(playlistMusics.slice(0, index));
    setPostQueue(playlistMusics.slice(index + 1));
    setCurrentMusic(music);
    setCurrentPlaylist(playlistID);
  };

  return (
    <div className="relative bg-gray-900 h-full shadow-lg rounded p-3 group">
      <div
        aria-label="Delete song"
        role="button"
        tabIndex={0}
        onClick={handleDelete}
        onKeyDown={(e) => { if (e.key === 'Enter') handleDelete(); }}
        className="absolute cursor-pointer top-3 right-3 z-50 hover:bg-gray-400 hover:bg-opacity-45 rounded-full h-8 w-8 flex items-center justify-center transition-all gap-x-1.5 text-sm font-semibold text-white shadow-sm opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-300"
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
      <div className="group relative">
        <img
          className="w-full block rounded-md"
          src={music.image}
          alt={`Album cover for ${music.song_name} by ${music.artist}`}
        />
        <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 w-full h-full top-0 flex items-center group-hover:opacity-100 justify-evenly">
          <button
            aria-label={`Play ${music.song_name} by ${music.artist}`}
            onClick={playMusic}
            className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          >
            <FontAwesomeIcon icon={faPlay} className="text-3xl" />
          </button>
        </div>
      </div>
      <div className="mt-1">
        <h3 className="text-white text-lg">{music.song_name.length > 17 ? `${music.song_name.slice(0, 14)}...` : music.song_name}</h3>
      </div>
      <div className='flex justify-between'>
        <p className="mt-1 text-gray-400">{music.artist}</p>
      </div>
    </div>
  );
};

export default PlaylistSongs;
