import React from 'react';
import PlaylistCard from '../Components/Assets/PlaylistCard';

const PlaylistPage = ({ user, setUser }) => {
  return (
    <div className="p-4 sm:p-8 mt-4 sm:mt-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Your Playlists</h1>
      {user.playlists.length === 0 ? (
        <p className='ml-1 text-gray-400'>No Playlist Exists!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8">
          {user.playlists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} setUser={setUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;