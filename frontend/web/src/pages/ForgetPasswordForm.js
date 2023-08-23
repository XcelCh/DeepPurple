import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "./config";

function ForgetPasswordForm() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        otp: ""
    })

    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [page, setPage] = useState(0);
    const [message, setMessage] = useState("");

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{6,}$/;

    const navigate = useNavigate();
    
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const handleCheckEmail = (e) => {

        e.preventDefault();
        setMessage('');

        if (formData.email.trim() === '' || !formData.email.trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setMessage('Enter your email');
            return;
        }

        fetch (`${BASE_URL}/register/generatePasswordOTP`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status == 200) {
                if (page == 0) {
                    setPage((currPage) => currPage+1);
                }
            }
            else if (response.status == 204) {
                setMessage('Email does not exist.');
                throw new Error('Email not Found.');
            }
        })
        .catch(error => {
            console.error(error);
        })

    }

    const handleOTP = (e) => {

        e.preventDefault();
        setMessage('');

        if (formData.otp.trim() === '') {
            setMessage('Enter the code sent');
            return;
        }

        fetch (`${BASE_URL}/register/validateOTP`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status == 401) {
                setMessage('OTP expired.');
                throw new Error('OTP expired.');
            }
            else if (response.status == 204) {
                setMessage('Invalid OTP');
                throw new Error('Invalid OTP');
            }
            else if (response.status == 200) {
                setPage((currPage) => currPage+1);
            }
        })
        .catch (error => {
            console.error(error);
        })

    }

    const handleReset = (e) => {
        e.preventDefault();
        setMessage("");

        if (formData.newPassword.trim() === '') {
            setMessage('Enter a new password');
            return;
        }

        if (!passwordPattern.test(formData.newPassword)) {
            setMessage('Password must be at least 6 characters and should include a combination of one uppercase, lowercase letter and numbers.');
            return;
          }

        if (confirmPassword.trim() === '') {
            setMessage('Confirm your new password');
            return;
        }

        if (!passwordPattern.test(confirmPassword)) {
            setMessage('Password must be at least 6 characters and should include a combination of one uppercase, lowercase letter and numbers.');
            return;
          }

        if(formData.newPassword != confirmPassword){
            setMessage("Passwords didn't match. Try again.");
            return;
        }

        fetch(`${BASE_URL}/register/resetPassword`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(response => {
            if(response.ok) {
                navigate('/');
            }
            else {
            }
        })
        .catch((error) => {
            console.error(error);
        })
    

    }

    return (
        <>
            <section>
                {/* Gradient */}
                <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
                <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#A59CE2]/0 to-[#F8F4FC] pt-16">
                    {/* Gradient */}
                    {/* Card */}
                    <div className="flex flex-col justify-center items-center w-2/5 h-2/3 bg-white rounded-3xl shadow md:mt-0 xl:p-0">
                        {page === 0 ? (
                            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-16 text-left">
                                <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-left">
                                Reset password
                                </h1>
                                <h3 className="text-sm font-normal text-gray-900 text-left">
                                Forgot your DeepPurple password? Please enter your email below and we will help you reset it.
                                </h3>
                                <form>
                                    <div>
                                        {/* Email */}
                                        <div class="flex items-center mb-4">
                                            <label class="relative w-full">
                                                <input 
                                                type="text"
                                                name="email"
                                                id="email"
                                                class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                                                value={formData.email}
                                                onChange={(event) => setFormData({...formData, email: event.target.value})}
                                                required
                                                ></input>
                                                <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                                                pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                                                peer-valid:text-xs peer-valid:-translate-y-5">Email</span>
                                            </label>
                                        </div>
                                        
                                        {message && (
                                            <div className="flex items-center text-red-500 text-sm mb-4">
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
                                            className="mb-4 w-full text-white bg-[#3C3988] hover:bg-[#351D4F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            onClick={handleCheckEmail}
                                        >
                                            Send
                                        </button>

                                        <div className="flex flex-col items-left">
                                            <p className="text-sm font-regular">
                                            Remembered your password?{" "}
                                            <Link to="/loginForm" className="font-regular text-blue-600 hover:underline">
                                                Sign in
                                            </Link>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : page === 1 ? (
                            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-16 text-left">
                                <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-left">
                                Reset password
                                </h1>
                                <h3 className="text-sm font-normal text-gray-900 text-left">
                                    To help keep your account safe, DeepPurple wants to make sure it's really you trying to sign in.
                                </h3>
                                <h3 className="text-sm font-normal text-gray-900 text-left">
                                    An email with a verification code was just sent to{" "} <span style={{ fontWeight: "bold" }}>{formData.email}</span>
                                </h3>
                                <form>
                                    <div>
                                        {/* Email */}
                                        <div class="flex items-center mb-4">
                                            <label class="relative w-full">
                                                <input 
                                                type="text"
                                                name="code"
                                                id="code"
                                                class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                                                value={formData.otp}
                                                onChange={(event) => setFormData({...formData, otp: event.target.value})}
                                                required
                                                ></input>
                                                <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                                                pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                                                peer-valid:text-xs peer-valid:-translate-y-5">Enter code</span>
                                            </label>
                                        </div>

                                        <div className="flex items-left mb-2">
                                            <button 
                                                className="text-sm font-regular text-blue-600 hover:underline"
                                                onClick={handleCheckEmail}>
                                                Resend verification code
                                            </button>
                                        </div>

                                        {message && (
                                            <div className="flex items-center text-red-500 text-sm mb-4">
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
                                            className="w-full text-white bg-[#3C3988] hover:bg-[#351D4F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            onClick={handleOTP}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-16 text-left">
                                <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-left">
                                Reset password
                                </h1>
                                <h3 className="text-sm font-normal text-gray-900 text-left">
                                    Create a new, strong password that you don't use for other websites.
                                </h3>
                                <form>
                                    <div>
                                        {/* Password */}
                                        <div class="flex items-center mb-4">
                                            <label class="relative w-full">
                                                <input 
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                id="password"
                                                class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                                                value={formData.newPassword}
                                                onChange={(event) => setFormData({...formData, newPassword: event.target.value})}
                                                required
                                                ></input>
                                                <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                                                pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                                                peer-valid:text-xs peer-valid:-translate-y-5">Create password</span>
                                            </label>
                                        </div>
                                        <div class="flex items-center mb-4">
                                            <label class="relative w-full">
                                                <input 
                                                type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                                                value={confirmPassword}
                                                onChange={(event) => setConfirmPassword(event.target.value)}
                                                required
                                                ></input>
                                                <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                                                pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                                                peer-valid:text-xs peer-valid:-translate-y-5">Confirm</span>
                                            </label>
                                        </div>

                                        {message && (
                                            <div className="flex items-center text-red-500 text-sm mb-4">
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

                                        <label className="flex items-center mb-4">
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
                                            onClick={handleReset}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                    <p className="mt-4 text-xs text-[#3C3988]">
                        Copyright © DeepPurple Inc. All rights reserved 2023
                    </p>
                </div>
                </div>
            </section>
        </>
    );
}

export default ForgetPasswordForm;