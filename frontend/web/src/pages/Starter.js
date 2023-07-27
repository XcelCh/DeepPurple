import React, { useEffect, useState } from "react";

import { ArrowButton, StarterDummy } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import authHeader from "../services/auth-header";

function Starter() {

  const token = authHeader();
  const navigate = useNavigate();
  const [companyField, setCompanyField] = useState('');
  const [fetchDone, setFetchDone] = useState(false);
  


  useEffect (() => {

    console.log("1 called");
    fetch ('http://localhost:8082/starter/check', {
    
    headers : token,
  })
  .then(response => {

    if (response.ok) { 

      console.log('Role Allowed.');

    }
    else if (response.status == 403) {

      console.log('Forbidden.');
      navigate('/unauthorizedPage');
    }
    else if (response.status == 401) {

      console.log('Unauthorized.');
      navigate('/loginForm');
    }
  })
  .catch (error => {

    console.error(error);
  })

  console.log("2 called");

    fetch('http://localhost:8082/profile/getCompanyField', {
      headers:token,
    })
    .then(response => {
      if (response.ok) {
        console.log('Company Field fetch successfully.');
        return response.text();
      }
      else {
        throw new Error('Error Occured')
      }
    })
    .then (data => {
      setCompanyField(data);
    })
    .catch(error => {
      console.error(error);
    })
    
  }, [])

  // console.log(fetchDone);

  useEffect (() => {
    console.log('here2'+companyField, fetchDone);

    if (companyField.trim() !== '') {
      console.log('run here');
      setFetchDone(true);
    }
    
  }, [companyField])

 
  useEffect (() => {
    console.log(fetchDone);
    console.log('here'+companyField);
    if ((companyField.trim() !== "-") && (companyField.trim() !== '')) {

      setNext(true);
    }
    
  }, [fetchDone])

  const [dropdown, setDropdown] = useState("");
  const [otherInput, setOtherInput] = useState(false);
  const [next, setNext] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  

  const handleNext = () => {

    setErrorMessage('');

      if (companyField === '') {
        setErrorMessage('Company Field cannot be empty!');
        return ;
      }


    

    console.log(companyField);
    fetch('http://localhost:8082/profile/setCompanyField', {
      method: 'POST',
      headers: {'Authorization': token.Authorization, 
                'Content-Type': 'text/plain'},
      body : companyField
    })
    .then (response => {

      if(!response.ok) {
        throw new Error ('Set Company Field Failed');
      }
      else {

        console.log('Set Company Field Successful');
        setNext(true);
      }
    })
    .catch(error => {
      console.error(error);
    })

    
    console.log(next);
  }

  const handleDropdown = (selected) => {
    setDropdown(selected);
    setCompanyField(selected);
    console.log(otherInput + selected);
  };

  useEffect(() => {
    
    if (dropdown == "other") {
      setCompanyField('');
      setOtherInput(true);
    } else {
      setOtherInput(false);
    }
  }, [dropdown]);

  return (
    <>
      {/* Gradient */}
      <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
        {/* Gradient */}
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#A59CE2]/0 to-[#F8F4FC]">
          {/* FIRST PAGE */}
          {next == false ? (
            <>
              {/* Card */}
              <div className="flex flex-col justify-center bg-white rounded-3xl shadow px-20 py-12 pt-20">
                <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-left mb-2">
                  What is Your Company's Industry/Field?
                </h1>
                <h3 className="text-sm font-normal text-[#83848A] text-left text-center">
                  Select the option that is most relevant or choose <br></br>
                  “Other” and enter your own.
                </h3>
                <div className="flex justify-center mb-7">
                  <div className="form-control max-w-xs">
                    <select
                      // value={gender}
                      onChange={(e) => handleDropdown(e.target.value)}
                      className="select select-bordered font-normal  bg-[#9554FE] mt-10 text-[#FFFFFF] select-sm h-11"
                    >
                      <option value="-">Select</option>
                      <option value="F&B">F&B</option>
                      <option value="FinTech">Financial Technology</option>
                      <option value="other">Other</option>
                    </select>
                    {otherInput == true ? (
                      <input
                        type="text"
                        name="companyField"
                        id="companyField"
                        className="mt-5 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                        value={companyField}
                        onChange={(e) => setCompanyField(e.target.value)}
                        placeholder="Enter Industry"
                        required
                      ></input>
                    ) : null}
                    {errorMessage && (
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
                            {errorMessage}
                        </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="btn btn-sm bg-[#9554FE] normal-case h-11"
                    onClick={handleNext}
                  >
                    Next <img src={ArrowButton} className="ml-2"></img>
                  </button>
                </div>
              </div>
            </>
          ) : (
            // SECOND PAGE
            <div className="flex flex-col justify-center bg-white rounded-3xl shadow p-12">
              <img src={StarterDummy} className="mb-10" />
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl mb-2 text-center mb-10">
                Start by Uploading Your Call Records
              </h1>
              <h3 className="text-md font-normal text-[#83848A] text-center mb-10">
                Upload your call recordings for analysis and automatically{" "}
                <br></br>
                assign to the respective employee.
              </h3>
              <Link to="/RecordingList" className="mx-auto">
                <button className="btn btn-sm bg-[#9554FE] normal-case h-11 w-72  ">
                  Start
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Starter;
