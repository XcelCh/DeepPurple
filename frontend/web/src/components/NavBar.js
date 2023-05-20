import dogImage from "../assets/dog.jpg";
import React from 'react';

function NavBar() {
  return (
    <div className="navbar bg-[#60388B] text-[#FFFFFF] flex justify-between">
      <div className="">
        <a className="btn btn-ghost normal-case text-xl">DeepPurple</a>
      </div>
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
                <a>
                  <p>Text Sentiment Analyzer</p>
                </a>
              </li>
              <li>
                <a>Product Review Analyzer</a>
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

      <div class="avatar mr-2">
        <div class="w-10 rounded-full">
          <img src={dogImage} alt="Dog" />
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
    </div>
  );
}

export default NavBar;
