import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { faEye, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AllArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/fetchdata`, {
          withCredentials: true,
        });
        const data = res.data;
        const items = Array.isArray(data.data) ? data.data : [];
        const artistMap = {};

        items.forEach(item => {
          if (item.artist && typeof item.artist === "string") {
            if (!artistMap[item.artist]) {
              artistMap[item.artist] = {
                name: item.artist,
                coverImage: item.image || "",
                songs: [],
              };
            }
            artistMap[item.artist].songs.push({
              _id: item._id,
              image: item.image,
              song_name: item.song_name,
              url: item.url,
            });
          }
        });

        const sortedArtists = Object.values(artistMap).sort(
          (a, b) => b.songs.length - a.songs.length
        );

        setArtists(sortedArtists);
        localStorage.setItem('allArtists', JSON.stringify(sortedArtists));
      } catch (error) {
        console.error('Failed to fetch artists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[40vh]">
        <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-white mb-3" />
        <span className="text-white text-xl">Loading Artists...</span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8">
        {artists.map((artist, idx) => (
          <Link
            key={artist.name + idx}
            to={`/artists/${encodeURIComponent(artist.name)}`}
            className="bg-gray-900 rounded-xl shadow-lg p-2 sm:p-5 flex flex-col items-center transition hover:scale-105 hover:bg-gray-800 focus:outline-none"
          >
            <img
              src={artist.coverImage}
              alt={artist.name}
              className="w-16 h-16 sm:w-32 sm:h-32 object-cover rounded-full mb-2 sm:mb-4 border-2 sm:border-4 border-gray-700"
              onError={e => { e.target.src = ""; }}
            />
            <h3 className="text-base sm:text-xl font-semibold text-white mb-1 sm:mb-2 truncate w-full text-center">{artist.name}</h3>
            <p className="text-gray-400 text-center mb-1 sm:mb-2 text-xs sm:text-base">Songs: {artist.songs.length}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllArtists;