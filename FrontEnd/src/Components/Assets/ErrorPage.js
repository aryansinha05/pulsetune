import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full mt-20 flex items-center justify-center bg-black px-4">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-300">404</h1>
        <p className="text-lg md:text-xl mt-4 text-gray-200 font-medium">
          Oops! Page not found.
        </p>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-6">
          The page you're looking for doesn't exist or requires login.
        </p>
      </div>
    </div>
  )
}

export default ErrorPage