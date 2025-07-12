import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (user.password !== user.confirm_password) {
      setError("Password and confirm password are different.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          username: user.username,
          email: user.email,
          password: user.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-top mt-10 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight">
              Create an account
            </h1>
            {error && <p className="text-red-600 font-semibold">{error}</p>}
            <form
              noValidate
              autoComplete="off"
              className="space-y-4 md:space-y-6 group"
              onSubmit={(e) => {
                e.preventDefault();
                e.target.classList.add("validated");
                if (!e.target.checkValidity()) {
                  e.target.querySelectorAll(":invalid")[0].focus();
                  return;
                }
                handleSubmit(e);
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="name"
                  autoComplete="off"
                  onChange={handleChange}
                  pattern="^[a-zA-Z][a-zA-Z0-9_]{3,16}$"
                  className="hover:border-blue-400 peer border-2 focus:ring-2 [.validated_&]:peer-invalid:border-pink-600 [.validated_&]:peer-invalid:ring-2 [.validated_&]:peer-invalid:ring-pink-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                  aria-describedby="username-error"
                />
                <p
                  id="username-error"
                  className="mt-2 hidden [.validated_&]:peer-invalid:block text-pink-600"
                >
                  Please provide a valid username.
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  onChange={handleChange}
                  className="hover:border-blue-400 peer border-2 focus:ring-2 [.validated_&]:peer-invalid:border-pink-600 [.validated_&]:peer-invalid:ring-2 [.validated_&]:peer-invalid:ring-pink-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  aria-describedby="email-error"
                />
                <p
                  id="email-error"
                  className="mt-2 hidden [.validated_&]:peer-invalid:block text-pink-600"
                >
                  Please enter a valid email address.
                </p>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$"
                  className="hover:border-blue-400 peer border-2 focus:ring-2 [.validated_&]:peer-invalid:border-pink-600 [.validated_&]:peer-invalid:ring-2 [.validated_&]:peer-invalid:ring-pink-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  aria-describedby="password-error"
                />
                <p
                  id="password-error"
                  className="mt-2 hidden [.validated_&]:peer-invalid:block text-pink-600"
                >
                  Provide a password with letters, numbers, and optionally
                  special characters (min 8 chars).
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm-password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="hover:border-blue-400 peer border-2 focus:ring-2 [.validated_&]:peer-invalid:border-pink-600 [.validated_&]:peer-invalid:ring-2 [.validated_&]:peer-invalid:ring-pink-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <p className="mt-2 hidden [.validated_&]:peer-invalid:block text-pink-600">
                  Please confirm your password.
                </p>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-black-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
