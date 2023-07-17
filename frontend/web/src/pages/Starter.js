import React, { useEffect, useState } from "react";

import { Dropdown } from "flowbite-react";
import { ArrowButton, StarterDummy } from "../assets";
import { Link } from "react-router-dom";

function Starter() {
  const [dropdown, setDropdown] = useState("");
  const [otherInput, setOtherInput] = useState(false);
  const [next, setNext] = useState(false);

  const handleDropdown = (selected) => {
    setDropdown(selected);
    console.log(otherInput);
  };

  const handleNext = () => {
    setNext(true);
    console.log(next);
  }

  useEffect(() => {
    if (dropdown == "other") {
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
                      <option value="">Select</option>
                      <option value="f&B">F&B</option>
                      <option value="fintech">Financial Technology</option>
                      <option value="other">Other</option>
                    </select>
                    {otherInput == true ? (
                      <input
                        type="text"
                        name="phoneNum"
                        id="phoneNum"
                        className="mt-5 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                        // value={phoneNum}
                        // onChange={(e) => setPhoneNum(e.target.value)}
                        placeholder="Enter Industry"
                        required
                      ></input>
                    ) : null}
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
