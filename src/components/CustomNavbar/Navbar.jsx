import React from "react";
import styles from "./Navbar.module.css";
import { FaRegHeart } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";

export default function CustomNavbar() {
  return (
    <>
      <nav className=" border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0  ">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 px-3 text-gray-1000 rounded-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/Products"}
                  className="block py-2 px-3 text-gray-1000 rounded-sm "
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to={"/Products"}
                  className="block py-2 px-3 text-gray-1000 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0"
                >
                  New
                </Link>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
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
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Ghost
            </span>
          </a>
          <div className="flex">
            <div className="p-1 md:p-2 lg:p-2 rounded-full bg-gray-1000">
              <Link to={"/Wishlist"}>
                <FaRegHeart className="text-white mx-0.5 mt-0.5 text-xs md:text-base lg:text-lg " />
              </Link>
            </div>
            <div className="px-3 md:px-4 lg:px-5 text-xs md:text-base rounded-2xl bg-gray-1000 text-white ms-2">
              <Link to={"/Cart"}>
                <p className="py-0.5 md:py-1 lg:pt-1.5">Cart</p>
              </Link>
            </div>
            <div className="ms-4 lg:ms-10">
              <div className="p-1 md:p-2 lg:p-2.5 rounded-full bg-gray-1000">
                <GoPerson className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
{
  /* <nav className="bg-gray-10 shadow fixed w-full z-20 top-0 start-0 ">
<div className="max-w-screen-xl flex lg:flex-wrap items-center justify-between mx-auto p-2">
  {/* <Link
    to="/"
    className="flex items-center w-32 h-16 space-x-2 rtl:space-x-reverse"
  >
    <img src={logo} className="w-3/4 lg:w-full" alt="Shams Logo" />
  </Link> 
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
    <div className="pt-2 px-6 lg:px-16 hidden lg:inline ">
      <span to="/wishlist">
        <li className="fa-solid fa-heart text-xl ps-2.5 text-yellow-1000 cursor-pointer"></li>
        <p className="text-xs cursor-pointer">Wishlist</p>
      </span>
    </div>
    <div className="pt-2 pe-6 lg:pe-16 hidden lg:inline">
      <span to="/MyCart">
        <i className="fa-solid fa-cart-shopping text-xl text-yellow-1000 cursor-pointer"></i>
        <p className="text-xs cursor-pointer">Cart</p>
      </span>
    </div>
    <div
      className="pt-4 cursor-pointer"
      id="dropdownOffsetButton"
      data-dropdown-toggle="dropdownSkidding"
      data-dropdown-offset-distance="10"
      data-dropdown-offset-skidding="200"
      data-dropdown-placement="left"
    >
      <svg
        className="w-4 h-4 "
        aria-hidden="true"
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
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white shams-text pe-2 pt-2 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 9-7 7-7-7"
        />
      </svg>
    </div>
  </div>
  <div
    className="items-center justify-between hidden lg:flex w-full md:w-auto md:order-1"
    id="navbar-cta"
  >
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <p>Home</p>
    </ul>
  </div>
</div>
</nav> */
}
