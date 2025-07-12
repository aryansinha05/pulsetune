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
    <div className="mt-9">
      <h1 className="text-2xl mb-5">Playlist Songs</h1>
      {playlistMusics.length === 0 ? (
        <div>No musics found in this playlist.</div>
      ) : (
        <div className="grid gap-3 grid-cols-1 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 w-full mt-5">
          {playlistMusics.map((music) => (
            <div key={music._id} className="m-2">
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
