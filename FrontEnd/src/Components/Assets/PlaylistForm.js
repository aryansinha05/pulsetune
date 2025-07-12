import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const PlaylistForm = ({ user, setUser }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/playlist/new`, { name: name.toLowerCase() },{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setUser(response.data.user);
      toast.success(response.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-top mt-10 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight">Create Playlist</h1>
            <form
              noValidate
              className="space-y-4 md:space-y-6 group"
              onSubmit={(e) => {
                e.preventDefault();
                e.target.classList.add('validated');
                if (!e.target.checkValidity()) {
                  e.target.querySelectorAll(':invalid')[0].focus();
                  return;
                }
                handleSubmit();
              }}
            >
              <div>
                <label htmlFor="playlistName" className="block mb-2 text-sm font-medium">
                  Name for your Playlist
                </label>
                <input
                  type="text"
                  name="playlistName"
                  id="playlistName"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  pattern="^.{3,}$"
                  className="hover:border-blue-400 peer border-2 focus:ring-2 [.validated_&]:invalid:border-pink-600 [.validated_&]:invalid:ring-2 [.validated_&]:invalid:ring-pink-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter playlist name"
                  required
                />
                <p className="mt-2 hidden [.validated_&]:peer-invalid:block text-pink-600">
                  Please enter a name with at least 3 characters.
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaylistForm;
