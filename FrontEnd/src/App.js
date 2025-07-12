import Sidebar from "./screenDiv/Sidebar.js";
import Main from "./screenDiv/Main.js";
import { useEffect, useState } from "react";
import Navbar from "./Components/MainBody/Navbar.js";
import Player from "./screenDiv/Player.js";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [musics, setMusics] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(1);
  const [preQueue, setPreQueue] = useState([]);
  const [postQueue, setPostQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const handlefetch = async () => {
      try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/userExist`, {
          method: "GET",
          credentials: "include",
        });
        let data = await res.json();
        if (data.user) setUser(data.user);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    handlefetch();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/fetchdata`, {
          method: "GET",
          credentials: "include",
        });
        res = await res.json();
        if (res.data) setMusics([...res.data]);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="bg-black font-light text-white overflow-y-auto max-h-[100vh] scrollbar-hide select-none">
      <div className=" w-full mb-4 fixed bg-gray-900 border-b-[1px] border-gray-800 top-0 left-0 z-20">
        <Navbar
          setCurrentMusic={setCurrentMusic}
          user={user}
          setUser={setUser}
          search={search}
          setSearch={setSearch}
          setMusics={setMusics}
          musics={musics}
        />
      </div>
      <div className="flex mt-16">
        <div className="w-[16vw] fixed hidden xl:block">
          <Sidebar user={user} setMusics={setMusics} />
        </div>
        <div className="w-[100vw] xl:w-[84vw] ml-auto">
          {loading ? (
            <div className="flex flex-col justify-center items-center min-h-[40vh]">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-3xl text-white mb-3"
              />
              <span className="text-white text-xl">Loading...</span>
            </div>
          ) : (
            <Main
              setCurrentPlaylist={setCurrentPlaylist}
              currentPlaylist={currentPlaylist}
              preQueue={preQueue}
              setPreQueue={setPreQueue}
              postQueue={postQueue}
              setPostQueue={setPostQueue}
              currentMusic={currentMusic}
              setCurrentMusic={setCurrentMusic}
              search={search}
              user={user}
              setUser={setUser}
              musics={musics}
              setMusics={setMusics}
            />
          )}
        </div>
      </div>
      {currentMusic == null || user == null ? (
        <></>
      ) : (
        <div>
          <Player
            setPreQueue={setPreQueue}
            postQueue={postQueue}
            setPostQueue={setPostQueue}
            currentMusic={currentMusic}
            setCurrentMusic={setCurrentMusic}
            preQueue={preQueue}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
export default App;
