import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OnlyArtist = ({
  setCurrentMusic,
  currentMusic,
  preQueue,
  setPreQueue,
  postQueue,
  setPostQueue,
  setCurrentPlaylist
}) => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const allArtists = JSON.parse(localStorage.getItem('allArtists') || '[]');
    const found = allArtists.find(a => a.name === id);
    setArtist(found || null);
  }, [id]);

  const playMusic = (song) => {
    if (!artist) return;
    const index = artist.songs.findIndex(m => m._id === song._id);
    if (index === -1) return;

    setPreQueue(artist.songs.slice(0, index));
    setPostQueue(artist.songs.slice(index + 1));
    setCurrentMusic(song);
    setCurrentPlaylist && setCurrentPlaylist(null);
  };

  if (!artist) {
    return <div className="text-white p-8">Artist not found.</div>;
  }

  return (
    <div className="min-h-screen p-2 sm:p-8"> {/* Removed bg-gray-900 */}
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <img
          src={artist.coverImage}
          alt={artist.name}
          className="w-24 h-24 sm:w-48 sm:h-48 object-cover rounded-full mb-4 sm:mb-6 border-4 border-gray-700"
          onError={e => { e.target.src = ""; }}
        />
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">{artist.name}</h2>
        <p className="text-base sm:text-lg text-gray-300 mb-1 sm:mb-2">Songs: {artist.songs.length}</p>
      </div>
      <div className="grid gap-2 sm:gap-3 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full mt-2 sm:mt-5">
        {artist.songs.map((song) => (
          <div key={song._id} className="relative bg-gray-900 shadow-lg rounded p-1 sm:p-3 group m-0.5 sm:m-2 flex flex-col items-center">
            <div className="group relative w-full">
              <img
                className="w-full aspect-square sm:h-40 block rounded-md object-cover mx-auto"
                src={song.image}
                alt={`Album cover for ${song.song_name} by ${song.artist}`}
                onError={e => { e.target.src = ""; }}
              />
              <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 w-full h-full top-0 flex items-center group-hover:opacity-100 justify-evenly">
                <button
                  aria-label={`Play ${song.song_name} by ${song.artist}`}
                  onClick={() => playMusic(song)}
                  className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-lg sm:text-2xl" />
                </button>
              </div>
            </div>
            <div className="mt-1 w-full">
              <h3 className="text-white text-xs sm:text-lg truncate">
                {song.song_name.length > 17 ? `${song.song_name.slice(0, 14)}...` : song.song_name}
              </h3>
            </div>
            <div className='flex justify-between w-full'>
              <p className="mt-1 text-gray-400 text-[10px] sm:text-base truncate">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlyArtist;