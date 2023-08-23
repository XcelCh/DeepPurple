import React, { useEffect, useState } from "react";
import authHeader from "../services/auth-header";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { BASE_URL } from "./config";

function ChangePassword() {

  useEffect(() => {
      window.scrollTo(0, 0);
      const user = AuthService.getCurrentUser();
      if (!user) {
        navigate('/unauthorizedPage');
      }
  }, []);

  const token = authHeader();
  const navigate = useNavigate();

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{6,}$/; //regex to check valid passwords


  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [currentMessage, setCurrentMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  //save new valid password
  const handleSave = (e) => {

    e.preventDefault();
    setCurrentMessage('');
    setConfirmMessage('');
    setNewMessage('');

    if (formData.currentPassword.trim() === '') {
      setCurrentMessage('Enter a password');
      return;
    }

    if (formData.newPassword.trim() === '') {
      setNewMessage('Enter a password');
      return;
    }

    if (!passwordPattern.test(formData.newPassword)) {
      setNewMessage('Password must be at least 6 characters and should include a combination of one uppercase, lowercase letter and numbers.');
      return;
    }

    if (formData.confirmPassword.trim() === '') {
      setConfirmMessage('Confirm your password');
      return;
    }

    if (!passwordPattern.test(formData.confirmPassword)) {
      setConfirmMessage('Password must be at least 6 characters and should include a combination of one uppercase, lowercase letter and numbers.');
      return;
    }

    if(formData.newPassword != formData.confirmPassword){
      setConfirmMessage("Passwords didn't match. Try again.");
      return;
    }

    if((formData.currentPassword == formData.newPassword)) {
      setConfirmMessage('New password and current password is similar. Try again.')
      return;
    }

    fetch(`${BASE_URL}/profile/changePassword`, {
        method: 'POST',
        headers: {'Authorization' : token.Authorization,
                  'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
    }) 
    .then (response => {
        if (response.status == 200) {

          navigate('/');

        }
        else if (response.status == 401) {

          navigate('/unauthorizedPage');
          throw new Error('Not Authorized.');

        }
        else if (response.status == 400) {

          setCurrentMessage('Current password does not match.');
          throw new Error('Current password does not match.');
        }
        else {
          throw new Error('Could not process. Something happened.');
        }
    })
    .catch(error => {

      console.error(error);
    })


  }
  

  return (
    <>
      {/* Gradient */}
      <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
        {/* Gradient */}
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#A59CE2]/0 to-[#F8F4FC] pt-16">
          {/* Card */}
          <div className="w-1/3">
            <div className="flex flex-col justify-center items-center bg-white rounded-3xl shadow md:mt-0 xl:p-0">
              <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-16 text-left">
                {/* Change Password */}
                <form className="space-y-4 md:space-y-6">
                  <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-left">
                    Update Password
                  </h1>
                  {/* Current password */}
                  <div>
                    <div class="flex items-center">
                      <label class="relative w-full">
                        <input 
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none focus:border-primary-600 duration-200 peer bg-white"
                        value={formData.currentPassword}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            currentPassword: event.target.value,
                          })
                        }
                        required
                        ></input>
                        <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                        pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                        peer-valid:text-xs peer-valid:-translate-y-5">Current Password</span>
                      </label>
                    </div>
                    {currentMessage && (
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
                            {currentMessage}
                        </div>
                    )}
                  </div>
                  {/* New password */}
                  <div>
                    <div class="flex items-center">
                      <label class="relative w-full">
                        <input 
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        id="newPassword"
                        class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none focus:border-primary-600 duration-200 peer bg-white"
                        value={formData.newPassword}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            newPassword: event.target.value,
                          })
                        }
                        required
                        ></input>
                        <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                        pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                        peer-valid:text-xs peer-valid:-translate-y-5">New Password</span>
                      </label>
                    </div>
                    {newMessage && (
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
                            {newMessage}
                        </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <div class="flex items-center">
                      <label class="relative w-full">
                        <input 
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        id="newPassword"
                        class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none focus:border-primary-600 duration-200 peer bg-white"
                        value={formData.confirmPassword}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            confirmPassword: event.target.value,
                          })
                        }
                        required
                        ></input>
                        <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                        pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                        peer-valid:text-xs peer-valid:-translate-y-5">Confirm Password</span>
                      </label>
                    </div>
                    {confirmMessage && (
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
                            {confirmMessage}
                        </div>
                    )}
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
                  <button
                    className="w-full text-white bg-[#3C3988] hover:bg-[#351D4F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <p class="mt-4 text-xs text-[#3C3988]">
            Copyright © DeepPurple Inc. All rights reserved 2023
          </p>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
