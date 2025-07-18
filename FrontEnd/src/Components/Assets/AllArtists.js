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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/ffghjkl;'
          etchdata`, {
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
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Artists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {artists.map((artist, idx) => (
          <div key={artist.name + idx} className="bg-gray-900 rounded-xl shadow-lg p-5 flex flex-col items-center">
            <img
              src={artist.coverImage}
              alt={artist.name}
              className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-700"
              onError={e => { e.target.src = ""; }}
            />
            <h3 className="text-xl font-semibold text-white mb-2">{artist.name}</h3>
            <p className="text-gray-400 text-center mb-2">Songs: {artist.songs.length}</p>
            <Link
              to={`/artists/${encodeURIComponent(artist.name)}`}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              <FontAwesomeIcon icon={faEye} className='mr-1' />
              <span className="hidden sm:inline">Artist</span>
              <span className="hidden sm:inline">`${process.env.REACT_APP_API_URL}`</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArtists;