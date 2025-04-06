import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

export default function CustomNavbar() {
  const { isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="border-gray-200  ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center">
          <img className="w-16 md:w-20 lg:w-24" src={logo} alt="Logo" />
        </Link>

        {/* Center: Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 font-medium">
          <Link to="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/Products" className="text-gray-700 hover:text-black">
            Collections
          </Link>
          <Link to="/Products" className="text-gray-700 hover:text-black">
            New
          </Link>
        </div>

        {/* Right: Icons + Auth Buttons */}
        <div className="flex items-center space-x-4">
          {/* Wishlist */}
          <Link
            to="/Wishlist"
            className="p-2 rounded-full bg-gray-800 text-white"
          >
            <FaRegHeart />
          </Link>

          {/* Cart */}
          <Link
            to="/Cart"
            className="px-4 py-1 bg-gray-800 text-white rounded-2xl text-sm"
          >
            Cart
          </Link>

          {/* Auth button hidden on small screens */}
          {isAuthenticated ? (
            <Link to="/Login">
              <button
                onClick={logout}
                className="hidden md:block px-4 py-1 bg-gray-1000 text-white rounded-2xl text-sm"
              >
                Logout
              </button>
            </Link>
          ) : (
            <Link
              to="/Login"
              className="hidden md:block px-4 py-1 bg-gray-1000 text-white rounded-2xl text-sm"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleDropdown}
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {dropdownOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="block px-2 py-1 text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Products" className="block px-2 py-1 text-gray-700">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/Products" className="block px-2 py-1 text-gray-700">
                New
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <Link to={"/Login"}>
                  <button
                    onClick={logout}
                    className="w-full text-left px-2 py-1 text-red-600"
                  >
                    Logout
                  </button>
                </Link>
              ) : (
                <Link to="/Login" className="block px-2 py-1 text-gray-700">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
