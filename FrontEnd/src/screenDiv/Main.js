import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../Components/Assets/LoginForm";
import SignUp from "../Components/Assets/SignUp";
import Home from "../Components/MainBody/Home";
import ErrorPage from "../Components/Assets/ErrorPage";
import PlaylistForm from "../Components/Assets/PlaylistForm";
import PlaylistPage from "./PlaylistPage";
import PlaylistMusicsDisplay from "../Components/Assets/PlaylistMusicsDisplay";
import AllArtists from "../Components/Assets/AllArtists";
import OnlyArtist from "../Components/Assets/OnlyArtist";

const Main = ({
  setCurrentPlaylist,
  currentPlaylist,
  preQueue,
  setPreQueue,
  postQueue,
  setPostQueue,
  currentMusic,
  setCurrentMusic,
  search,
  user,
  setUser,
  musics,
  setMusics
}) => {
  return (
    <div className="mx-5 mb-16">
      <Routes>
        {user ? (
          <>
            <Route
              path="/"
              element={
                <Home
                  setCurrentPlaylist={setCurrentPlaylist}
                  currentPlaylist={currentPlaylist}
                  preQueue={preQueue}
                  setPreQueue={setPreQueue}
                  postQueue={postQueue}
                  setPostQueue={setPostQueue}
                  currentMusic={currentMusic}
                  setCurrentMusic={setCurrentMusic}
                  search={search}
                  setUser={setUser}
                  musics={musics}
                  user={user}
                  setMusics={setMusics}
                />
              }
            />
            <Route
              path="/playlist"
              element={<PlaylistPage user={user} setUser={setUser} />}
            />
            <Route
              path="/playlist/new"
              element={<PlaylistForm user={user} setUser={setUser} />}
            />
            <Route
              path="/playlist/:id"
              element={
                <PlaylistMusicsDisplay
                  setCurrentPlaylist={setCurrentPlaylist}
                  currentMusic={currentMusic}
                  preQueue={preQueue}
                  setPreQueue={setPreQueue}
                  postQueue={postQueue}
                  setPostQueue={setPostQueue}
                  user={user}
                  setUser={setUser}
                  setCurrentMusic={setCurrentMusic}
                />
              }
            />
            <Route path="/artists" element={<AllArtists />} />
            <Route path="/artists/:id" element={<OnlyArtist
              setCurrentMusic={setCurrentMusic}
              currentMusic={currentMusic}
              preQueue={preQueue}
              setPreQueue={setPreQueue}
              postQueue={postQueue}
              setPostQueue={setPostQueue}
              setCurrentPlaylist={setCurrentPlaylist}
            />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm user={user} setUser={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default Main;
