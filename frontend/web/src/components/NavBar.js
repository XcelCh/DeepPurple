import ProfilePicture from "../assets/ProfilePicture.jpg";
import { Link, useLocation } from "react-router-dom";
import { TextIcon, ProductIcon } from '../assets';
import React, { useState } from 'react';

function NavBar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="navbar bg-[#60388B] text-[#FFFFFF] flex justify-between">
      <p className="btn btn-ghost normal-case text-xl">
        <Link to="/">DeepPurple</Link>
      </p>

      <div className="">
        <ul className="menu menu-horizontal px-1">
          {/* Solutions */}
          <li tabIndex={0}>
            <a>
              Solutions
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-[#60388B] shadow-md">
              <li>
                <Link to="/textSentiment">
                  <p className="flex mr-5">
                    <img src={TextIcon} className="mr-4 ml-1"></img>Text Sentiment Analyzer
                  </p>
                </Link>
              </li>
              <li>
                <p className="flex">
                  <img src={ProductIcon}></img> Product Review Analyzer
                </p>
              </li>
            </ul>
          </li>
          {/* Pricing */}
          <li>
            <a>Pricing</a>
          </li>

          {/* About Us */}
          <li>
            <a>About Us</a>
          </li>
        </ul>
      </div>

      <div>
        {isLoggedIn ? (
          <div class="avatar mr-2">
            <div class="w-10 rounded-full">
              <img src={ProfilePicture} alt="Dog" />
            </div>
            <svg
              className="fill-current ml-1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </div>
        ) : (
          <Link to="/loginForm">
            <button type="button" class="text-[#60388B] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-1.5 text-center mr-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
