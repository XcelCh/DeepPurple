import React, { useState, useEffect } from 'react';
import { Tick } from "../assets"
import { Link, useNavigate } from 'react-router-dom';

import AuthService from "../services/auth.service";
import Datepicker from '../components/DatePicker2';
import { BASE_URL } from "./config";

function SignUpForm() {

    useEffect(() => {
        window.scrollTo(0, 0);
        const user = AuthService.getCurrentUser();
        if (user) {
          navigate('/unauthorizedPage');
        }
    }, []);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNum: "",
        dob: '',
        gender: "Gender",
        companyField: "-"
    })
    const [page, setPage] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [accountMessage, setAccountMessage] = useState('');
    const [credentialsMessage, setCredentialsMessage] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{6,}$/;
    const phonePattern = /^\d{8,}$/;

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };
    
    const handleContinue = (e) => {
        e.preventDefault();
        setAccountMessage("");

        if (formData.fullName.trim() === '') {
            setAccountMessage('Enter your full name');
            return;
        }
        
        if (formData.email.trim() === '' || !formData.email.trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            setAccountMessage('Enter an email');
            return;
        }

        if (formData.password.trim() === '') {
            setAccountMessage('Enter a password');
            return;
        }

        if (!passwordPattern.test(formData.password)) {
            setAccountMessage('Password must be at least 6 characters and should include a combination of one uppercase, lowercase letter and numbers.');
            return;
          }

        if (formData.confirmPassword.trim() === '') {
            setAccountMessage('Confirm your password');
            return;
        }

        if (!passwordPattern.test(formData.confirmPassword)) {
            setAccountMessage('Password must be at least 6 characters and should include a combination of one uppercase, lowercase letter and numbers.');
            return;
          }

        if(formData.password != formData.confirmPassword){
            setAccountMessage("Passwords didn't match. Try again.");
            return;
        }


        fetch (`${BASE_URL}/register/checkEmail`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({email : formData.email})
            
        })
        .then (response => {
            if (response.status == 200) {

                setPage((currPage) => currPage + 1);
                
            }
            else if (response.status == 409) {
                setAccountMessage("Email has been used.")
                throw new Error('Email has been used.');
            }
        })
        .catch (error => {
            console.error(error);
        })
        
    };

    const handleSecondContinue = (e) => {
        e.preventDefault();
        setCredentialsMessage("");

        if (formData.phoneNum.trim() === '') {
            setCredentialsMessage('Enter your phone number');
            return;
        }

        if (!phonePattern.test(formData.phoneNum)) {
            setCredentialsMessage('Please enter a valid Singapore phone number.');
            return;
          }

        if (formData.dob === '') {
            setCredentialsMessage('Please enter your Date of Birth.');
            return;
        }

        if (new Date().setFullYear(new Date().getFullYear() - 18) < new Date(formData.dob)) {
            
            setCredentialsMessage('You must be at least 18 years old.');
            return;
        }

        if (formData.gender != "Female" && formData.gender != "Male") {
            setCredentialsMessage('Select your gender');
            return;
        }

        fetch (`${BASE_URL}/register/createAccount`, {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(formData)
        })
        .then(async response => {
            if (response.ok) {

                await AuthService.login(formData.email, formData.password)
                    .then(() => {
                        
                        navigate('/');
                    },
                    (error) => {
                        
                        console.error(error);
                    }
                );

                

                
            }
            else if (!response.ok) {
                throw new Error('Create account FAILED.')
            }
        })
        .catch(error => {
            console.error(error);
        })

       
    };

    return (
        <>
            <section>
                {/* Gradient */}
                <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
                    {/* Gradient */}
                    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#A59CE2]/0 to-[#F8F4FC] pt-16">
                        {/* Card */}
                        <div className="flex flex-col justify-center items-center w-2/5 h-4/7 bg-white rounded-3xl shadow md:mt-0 xl:p-0">
                            {page === 0 ? (
                                <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-16 text-left">
                                    <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-left">
                                    Create an account
                                    </h1>
                                    <h3 className="text-sm font-normal text-gray-900 text-left">
                                    Welcome! Please enter your details.
                                    </h3>
                                    <form>
                                        <div>
                                            {/* Full name */}
                                            <div class="flex items-center mb-4">
                                                <label class="relative w-full">
                                                    <input 
                                                    type="text"
                                                    name="fullName"
                                                    id="fullName" 
                                                    class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                                                    value={formData.fullName}
                                                    onChange={(event) => setFormData({...formData, fullName: event.target.value})}
                                                    required
                                                    ></input>
                                                    <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                                                    pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                                                    peer-valid:text-xs peer-valid:-translate-y-5">Full Name</span>
                                                </label>
                                            </div>

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

                                            {/* Password */}
                                            <div class="grid grid-cols-2 gap-4 mb-4">
                                                <label class="relative w-full">
                                                    <input 
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    id="password"
                                                    class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                                                    value={formData.password}
                                                    onChange={(event) => setFormData({...formData, password: event.target.value})}
                                                    required
                                                    ></input>
                                                    <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                                                    pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                                                    peer-valid:text-xs peer-valid:-translate-y-5">Password</span>
                                                </label>
                                                <label class="relative w-full">
                                                    <input 
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                                                    value={formData.confirmPassword}
                                                    onChange={(event) => setFormData({...formData, confirmPassword: event.target.value})}
                                                    required
                                                    ></input>
                                                    <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                                                    pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                                                    peer-valid:text-xs peer-valid:-translate-y-5">Confirm</span>
                                                </label>
                                            </div>

                                            {/* Show password checkbox */}
                                            <label className="flex items-center mb-4">
                                                <input
                                                type="checkbox"
                                                className="form-checkbox h-4 w-4 text-primary-600"
                                                checked={showPassword}
                                                onChange={handleCheckboxChange}
                                                />
                                                <span className="ml-2 text-sm font-normal text-gray-900 text-left">Show password</span>
                                            </label>

                                            {accountMessage && (
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
                                                    {accountMessage}
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            className="mb-4 w-full text-white bg-[#3C3988] hover:bg-[#351D4F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            onClick={handleContinue}
                                        >
                                            Continue
                                        </button>

                                        <div className="flex flex-col items-left">
                                            <p className="text-sm font-regular">
                                            Already have an account?{" "}
                                            <Link to="/loginForm" className="font-regular text-blue-600 hover:underline">
                                                Sign in
                                            </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="w-full p-6 sm:p-16 text-left">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <button 
                                                onClick={() => {
                                                    setPage((currPage) => currPage - 1)
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                                </svg>
                                            </button>
                                            <h1 className="ml-4 text-xl font-bold text-gray-900 md:text-2xl text-left">
                                                Fill in your credentials
                                            </h1>
                                        </div>
                                        <div className="flex items-center mb-4"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ml-4">
                                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                            </svg>
                                            <h3 className="ml-2 text-sm font-medium text-gray-900 text-left">
                                                {formData.email}
                                            </h3>
                                        </div>
                                        <form>
                                            {/* Phone number */}
                                            <div class="flex items-center mb-4">
                                                <label class="relative w-full">
                                                    <input 
                                                    type="text"
                                                    name="phoneNum"
                                                    id="phoneNum"
                                                    class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                                                    value={formData.phoneNum}
                                                    onChange={(event) => setFormData({...formData, phoneNum: event.target.value})}
                                                    required
                                                    ></input>
                                                    <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                                                    pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                                                    peer-valid:text-xs peer-valid:-translate-y-5">Phone Number</span>
                                                </label>
                                            </div>
                                            
                                            <div className="form-control w-full mb-4">
                                                <label className="relative w-full">
                                                {/* <DatePicker formData={formData} setFormData={setFormData}></DatePicker> */}
                                                <Datepicker formData = {formData} setFormData={setFormData}></Datepicker>
                                                <span class="absolute left-0 top-2.5 px-1 text-lg text-gray-400 tracking-wide
                                                pointer-events-none duration-200 text-xs -translate-y-5 bg-white ml-2">Date of Birth</span>
                                                </label>
                                            </div>
                                            
                                            <div class="relative mb-4">
                                                <select 
                                                    className="bg-gray-50 block appearance-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" 
                                                    id="grid-state"
                                                    value={formData.gender}
                                                    onChange={(event) => setFormData({ ...formData, gender: event.target.value })}
                                                >
                                                    <option disabled selected hidden>Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>

                                            {credentialsMessage && (
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
                                                    {credentialsMessage}
                                                </div>
                                            )}

                                            <button
                                                className="mb-4 w-full text-white bg-[#3C3988] hover:bg-[#351D4F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                onClick={handleSecondContinue}
                                            >
                                                Create account
                                            </button>

                                            <div className="flex flex-col items-left">
                                                <p className="text-sm font-regular">
                                                Already have an account?{" "}
                                                <Link to="/loginForm" className="font-regular text-blue-600 hover:underline">
                                                    Sign in
                                                </Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div> 
                            ) 
                            }
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

export default SignUpForm;