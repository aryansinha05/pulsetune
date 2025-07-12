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
    <div className="relative bg-gray-900 min-h-screen p-8">
      <div className="flex flex-col items-center mb-8">
        <img
          src={artist.coverImage}
          alt={artist.name}
          className="w-48 h-48 object-cover rounded-full mb-6 border-4 border-gray-700"
          onError={e => { e.target.src = ""; }}
        />
        <h2 className="text-4xl font-bold text-white mb-2">{artist.name}</h2>
        <p className="text-lg text-gray-300 mb-2">Songs: {artist.songs.length}</p>
      </div>
      <div className="grid gap-3 grid-cols-1 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 w-full mt-5">
        {artist.songs.map((song) => (
          <div key={song._id} className="relative bg-gray-900 h-full shadow-lg rounded p-3 group m-2">
            <div className="group relative">
              <img
                className="w-full block rounded-md"
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
                  <FontAwesomeIcon icon={faPlay} className="text-2xl" />
                </button>
              </div>
            </div>
            <div className="mt-1">
              <h3 className="text-white text-lg">{song.song_name.length > 17 ? `${song.song_name.slice(0, 14)}...` : song.song_name}</h3>
            </div>
            <div className='flex justify-between'>
              <p className="mt-1 text-gray-400">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlyArtist;