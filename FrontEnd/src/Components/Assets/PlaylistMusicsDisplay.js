import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistSongs from "./PlaylistSongs";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const PlaylistMusicsDisplay = ({
  setCurrentPlaylist,
  preQueue,
  setPreQueue,
  postQueue,
  setPostQueue,
  user,
  setUser,
  currentMusic,
  setCurrentMusic,
}) => {
  const { id } = useParams();
  const [playlistMusics, setPlaylistMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylistMusics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/playlist/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setPlaylistMusics(response.data.result);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistMusics();
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[40vh]">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-3xl text-white mb-3"
        />
        <span className="text-white text-xl">Loading Musics...</span>
      </div>
    );
  }
  if (error)
    return (
      <div aria-live="assertive" className="text-red-500 p-4">
        Error: {error}
      </div>
    );

  return (
    <div className="mt-9 px-2 sm:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
        Playlist Songs
      </h1>
      {playlistMusics.length === 0 ? (
        <div className="text-gray-400">No musics found in this playlist.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 w-full mt-2 sm:mt-5">
          {playlistMusics.map((music) => (
            <div key={music._id}>
              <PlaylistSongs
                setCurrentPlaylist={setCurrentPlaylist}
                playlistMusics={playlistMusics}
                preQueue={preQueue}
                setPreQueue={setPreQueue}
                postQueue={postQueue}
                setPostQueue={setPostQueue}
                music={music}
                playlistID={id}
                setUser={setUser}
                currentMusic={currentMusic}
                setCurrentMusic={setCurrentMusic}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistMusicsDisplay;