import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Toggle, Upload, ThreeDotsVertical } from "../assets/index";

function RecordingList() {
  return (
    <>
      <div class="grid grid-cols-2 mb-5 mx-20">
        <p className="text-xl font-bold text-left">Recording List</p>
        <input
          type="text"
          name="fullName"
          id="fullName"
          class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
        //   value={fullName}
        //   onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          required
        ></input>
        <div className="place-self-end">
          <Link to="/RecordingList">
            <button className="btn btn-sm bg-[#9554FE] normal-case h-11 w-42 border-[#9554FE]">
              <img src={Upload} className="mr-2 h-5"></img>
              <p className="mr-2 text-md">Upload</p>
              <img src={Toggle} className="h-5"></img>
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto flex justify-center">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-[#F6F4FC]">No</th>
              <th className="bg-[#F6F4FC]">Recording name</th>
              <th className="bg-[#F6F4FC]">Upload Date</th>
              <th className="bg-[#F6F4FC]">Date Recorded</th>
              <th className="bg-[#F6F4FC]">Employee Name</th>
              <th className="bg-[#F6F4FC]">Category</th>
              <th className="bg-[#F6F4FC]">Sentiment</th>
              <th className="bg-[#F6F4FC]">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="bg-base-200">
              <th>1</th>
              <td>Sample recording 1</td>
              <td>2023-01-01 01:01:01</td>
              <td>2023-01-01 01:01:01</td>
              <td>David</td>
              <td>Inquiry</td>
              <td>Positive</td>
              <td className="flex justify-center items-center">
                <img src={ThreeDotsVertical} className="mt-2"></img>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Sample recording 1</td>
              <td>2023-01-01 01:01:01</td>
              <td>2023-01-01 01:01:01</td>
              <td>David</td>
              <td>Inquiry</td>
              <td>Positive</td>
              <td className="flex justify-center items-center">
                <img src={ThreeDotsVertical} className="mt-2"></img>
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Sample recording 1</td>
              <td>2023-01-01 01:01:01</td>
              <td>2023-01-01 01:01:01</td>
              <td>David</td>
              <td>Inquiry</td>
              <td>Positive</td>
              <td className="flex justify-center items-center">
                <img src={ThreeDotsVertical} className="mt-2"></img>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="join flex justify-end mt-10 mr-20 ">
        <button className="join-item btn btn-xs bg-[#9554FE] border-[#9554FE]">
          1
        </button>
        <button className="join-item btn btn-xs btn-active bg-[#9554FE] border-[#9554FE]">
          2
        </button>
        <button className="join-item btn btn-xs bg-[#9554FE] border-[#9554FE]">
          3
        </button>
        <button className="join-item btn btn-xs bg-[#9554FE] border-[#9554FE]">
          4
        </button>
      </div>
    </>
  );
}

export default RecordingList;
