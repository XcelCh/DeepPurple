import bgImage from "../assets/Background.png";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authHeader from "../services/auth-header";
import AuthService from "../services/auth.service";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
          navigate('/unauthorizedPage');
        }
    }, []);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleCheckboxChange = () => {
      setShowPassword(!showPassword);
  };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");

        if (email.trim() === '' || !email.trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          setMessage('Enter an email');
          return;
        }
        
        if (password.trim() === '') {
          setMessage('Enter a password');
          return;
        }

        AuthService.login(email, password)
        .then(
            () => {
              
              console.log('login');
              navigate('/');
            },
            (error) => {
                setMessage("Wrong email or password. Try again or click Forgot password to reset it.");
            }
        );

        

    };
    
  return (
    <>
      <section>
        {/* Gradient */}
        <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
          <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#A59CE2]/0 to-[#F8F4FC]">
            {/* Gradient */}
            {/* Card */}
            <div class="flex flex-col justify-center items-center w-2/5 h-2/3 bg-white rounded-3xl shadow md:mt-0 xl:p-0">
              <div class="w-full p-6 space-y-4 md:space-y-6 sm:p-16 text-left">
                <h1 class="text-xl font-bold text-gray-900 md:text-2xl text-left">
                  Sign in
                </h1>
                <h3 class="text-sm font-normal text-gray-900 text-left">
                  Welcome back! It's nice to see you again.
                </h3>
                <form class="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                  {/* Email */}
                  <div class="flex items-center">
                      <label class="relative w-full">
                          <input 
                          type="text"
                          name="email"
                          id="email"
                          class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                          value={email}
                          onChange={onChangeEmail}
                          required
                          ></input>
                          <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                          pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                          peer-valid:text-xs peer-valid:-translate-y-5">Email</span>
                      </label>
                  </div>

                  {/* Password */}
                  <div class="flex items-center">
                      <label class="relative w-full">
                          <input 
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          id="password"
                          class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                          value={password}
                          onChange={onChangePassword}
                          required
                          ></input>
                          <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                          pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                          peer-valid:text-xs peer-valid:-translate-y-5">Password</span>
                      </label>
                  </div>
                  {/* Show password checkbox */}
                  <label className="flex items-center">
                      <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={showPassword}
                      onChange={handleCheckboxChange}
                      />
                      <span className="ml-2 text-sm font-normal text-gray-900 text-left">Show password</span>
                  </label>
                  {message && (
                    <div className="flex items-center text-red-500 text-sm mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {message}
                    </div>
                  )}
                  <button
                    type="submit"
                    class="w-full text-white bg-[#3C3988] hover:bg-[#351D4F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>

                  <div class="flex flex-col items-left text-sm font-regular ">
                    <p>
                      New to DeepPurple?{" "}
                      <Link to="/signUpForm" class="font-regular text-blue-600 hover:underline">
                          Sign Up
                      </Link>
                    </p>
                    <Link to="/forgetPasswordForm" class="font-regular text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <p class="mt-4 text-xs text-[#3C3988]">
              Copyright © DeepPurple Inc. All rights reserved 2023
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginForm;
