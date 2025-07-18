import React from 'react';
import DropDown from './DropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Card = ({ currentPlaylist, setCurrentPlaylist, preQueue, setPreQueue, postQueue, setPostQueue, currentMusic, image, song_name, artist, url, user, id, setUser, setCurrentMusic }) => {
  const musicInfo = {
    _id: id,
    image: image,
    song_name: song_name,
    artist: artist,
    url: url
  };

  const playMusic = () => {
    if (currentMusic == null || musicInfo._id !== currentMusic._id) {
      setPostQueue([]);
      if (currentMusic != null) {
        let prevQueue = [...preQueue.filter(music => music._id !== musicInfo._id), currentMusic];
        if (prevQueue.length > 7) prevQueue.splice(0, prevQueue.length - 7);
        setPreQueue([...prevQueue]);
      }
      setCurrentMusic(musicInfo);
      setCurrentPlaylist(1);
    }
  };

  return (
    <>
      <div
        className="relative bg-gray-900 h-full shadow-lg rounded p-1 sm:p-3 group"
        style={{ minWidth: 0 }}
      >
        <div className="absolute top-1 right-1 z-10 sm:top-3 sm:right-3">
          <DropDown currentMusic={currentMusic} postQueue={postQueue} preQueue={preQueue} currentPlaylist={currentPlaylist} setPostQueue={setPostQueue} user={user} musicInfo={musicInfo} setUser={setUser} />
        </div>
        <div className="group relative">
          <img
            className=" block rounded-md h-fit w-fit sm:h-40 sm:w-full object-cover mx-auto"
            src={image}
            alt={`Album cover for ${song_name} by ${artist}`}
          />
          <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 w-full h-full top-0 flex items-center group-hover:opacity-100 justify-evenly">
            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition" onClick={playMusic}>
              <FontAwesomeIcon icon={faPlay} className="text-xl sm:text-3xl" />
            </button>
          </div>
        </div>
        <div className="mt-1">
          <h3 className="text-white text-xs sm:text-lg truncate">
            {song_name.length > 17 ? `${song_name.slice(0, 14)}...` : song_name}
          </h3>
        </div>
        <div className="flex justify-between">
          <p className="mt-1 text-gray-400 text-[10px] sm:text-base truncate">{artist}</p>
        </div>
      </div>
    </>
  );
};

export default Card;