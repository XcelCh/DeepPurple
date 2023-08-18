import ProfilePicture from "../assets/ProfilePicture.jpg";
import { Link, useLocation } from "react-router-dom";
import { TextIcon, ProductIcon } from '../assets';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profilePicture from "../assets/Default.png";

import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = AuthService.getCurrentUser();
  // const [cardExist, setCardExist] = useState(false);
  // const [profilePic, setProfilePic] = useState('');

  // useEffect(() => {
  //   const token = authHeader();
  //   if(user) {
  //     fetch ('http://localhost:8082/check', {
  //       headers : token,
  //     })
  //     .then(response => {
  //       if (response.ok) { 
  //           // Card exist
  //           setCardExist(true);
  //       }
  //     })
  //     .catch (error => {
  //       console.error(error);
  //     })
  //   }
  // }, [])

  // console.log(cardExist);

  // useEffect(() => {
  // // if (user) {
  //   console.log('nav');
  //   setProfilePic(sessionStorage.getItem("profilepic"));
  // }, [user])
  // // }  
  
  const logOut = () => {
    AuthService.logout();
    window.location.href = "/";
  };

  return (
    <div className="navbar bg-[#5A3D86] text-[#FFFFFF] flex justify-between fixed z-[1000]">
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
            <ul className="p-2 bg-[#5A3D86] shadow-lg">
              <li>
                <Link to="/textSentiment">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                  Text Sentiment Analyzer
                </Link>
              </li>
              <li>
                {/* <Link to={cardExist ? "/Starter" : "/CustomerServiceAnalyzer"}> */}
                <Link to={"/CustomerServiceAnalyzer"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>
                  Customer Call Analyzer
                </Link>
              </li>
            </ul>
          </li>
          {/* Pricing */}
          <li>
            <Link to="/pricing">
              <a>Pricing</a>
            </Link>
          </li>

          {/* About Us */}
          <li>
            <Link to="/aboutUs">
              <a>About Us</a>
            </Link>
          </li>
        </ul>
      </div>

      <div>
        {user ? (
          <div>
            <div class="avatar mr-2">
              <div class="w-10 rounded-full">
                <img src={profilePicture} alt="profile" />
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <svg
                className="fill-current ml-1 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                tabIndex={0}
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow shadow-lg bg-[#5A3D86] rounded-box w-52 mr-5"
              >
                <li className="h-8">
                  <Link to="/editProfile" className="h-8">
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <p className="text-sm">View profile</p>
                  </Link>
                </li>
                <li className="h-8">
                  <Link to="/changePassword" className="h-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                    <p className="text-sm">Change password</p>
                  </Link>
                </li> 
                <li className="h-8">
                  <Link to="/billing" className="h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                    <p className="text-sm">Payment and usage</p>
                  </Link>
                </li>
                <li className="h-8">
                  <Link onClick={logOut} className="h-8">
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <p className="text-sm">Sign out</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/loginForm">
            <button
              type="button"
              class="text-[#5A3D86] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-1.5 text-center mr-8"
            >
              Log in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
