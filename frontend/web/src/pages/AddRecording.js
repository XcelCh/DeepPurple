import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import {
  Toggle,
  Upload,
  Cross,
  ArrowLeft,
  Analyze,
  TrashCan,
  Download,
  Eye,
} from "../assets/index";
import { RxCross2 } from "react-icons/rx";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

function AddRecording() {
  const [assignEmployee, setAssignEmployee] = useState("");
  const [employee, setEmployee] = useState("");
  const [showEmployee, setShowEmployee] = useState(true);
  const [showOtherTB, setShowOtherTB] = useState(false);
  const [showDelimiter, setShowDelimiter] = useState(false);

  const handleAssignEmployee = (selected) => {
    setAssignEmployee(selected);
    console.log(assignEmployee);
  };

  const handleEmployee = (selected) => {
    setEmployee(selected);
    console.log(employee);
  };

  useEffect(() => {
    if (assignEmployee == "existingEmployee") {
      setShowEmployee(true);
      setShowDelimiter(false);
    } else if (assignEmployee == "splitFileName") {
      setShowDelimiter(true);
      setShowOtherTB(false);
      setShowEmployee(false);
    } else {
      setShowEmployee(false);
      setShowDelimiter(false);
      setShowOtherTB(false);
    }
  }, [assignEmployee]);

  useEffect(() => {
    if (employee == "other") {
      setShowOtherTB(true);
    } else {
      setShowOtherTB(false);
    }
  }, [employee]);

  const handleUpload = () => {    
    const data = new FormData();
    const audioInput = document.getElementById("audioInput");        
    data.set("audio2", audioInput.files[0])    
    console.log(audioInput.files[0]);
    fetch("http://localhost:8082/audio/uploadAudio2", {
      method: "POST",
      body: data
    })
    .then (response => {

      if (response.ok) {
        console.log('upload file successful');
      }
    })
    .catch (error => {
      console.error(error);
    })

  };

  return (
    <div className="mx-20">
      <div className="flex mb-5">
        <Link to="../RecordingList">
          <img src={ArrowLeft} className="mr-3"></img>
        </Link>
        <p className="text-xl font-bold text-left mr-3">Add Recording</p>
      </div>
      
      <div className="dropdown mb-5">
        <label
          tabIndex={0}
          className="btn bg-[#9554FE] border-[#FFFFFF] hover:bg-[#60388B] hover:border-[#F6F4FC] hover:outline-none ml-0"
        >
          <img src={Upload} className="mr-2 h-5"></img>
          <p className="mr-2 text-md normal-case">Upload</p>
          <img src={Toggle} className="h-5"></img>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] w-44 rounded border border-[#9554FE]"
        >
          <li className="hover:bg-[#9554FE]">
            {/* <a className="text-[#9554FE] hover:text-[#FFFFFF]" onClick={handleUpload}>
              <UploadFileIcon />
              File Upload
            </a> */}
            <form>
              <UploadFileIcon />
              <input type="file" id="audioInput" accept="audio/*" onChange={handleUpload} multiple/>
            </form>            
          </li>
          <li className="hover:bg-[#9554FE] ">
            <a className="text-[#9554FE] hover:text-[#FFFFFF]">
              <DriveFolderUploadIcon />
              Folder Upload
            </a>
          </li>
        </ul>
      </div>

      <p className="font-bold mb-1">Configuration</p>
      <div className="grid grid-cols-2 flex w-2/5 items-center mb-5">
        <p>Assign employee by</p>
        <select
          // value={gender}
          onChange={(e) => handleAssignEmployee(e.target.value)}
          className="select select-bordered font-normal select-sm h-11"
        >
          <option value="">Select</option>
          <option value="existingEmployee">Existing Employee</option>
          <option value="metadata">Metadata</option>
          <option value="folderName">Folder Name</option>
          <option value="splitFileName">Split File Name</option>
          <option value="none">None</option>
        </select>
      </div>

      {/* Existing Employee */}
      <div className="flex">
        {showEmployee == true ? (
          <div className="grid grid-cols-2 flex w-2/5 items-center mb-5">
            <p>Employee</p>
            <select
              // value={gender}
              onChange={(e) => handleEmployee(e.target.value)}
              className="select select-bordered font-normal select-sm h-11"
            >
              <option value="">Select</option>
              <option value="excel">Excel</option>
              <option value="raymond">Raymond</option>
              <option value="gui">Gui</option>
              <option value="alvin">Alvin</option>
              <option value="bryant">Bryant</option>
              <option value="other">Other</option>
            </select>
          </div>
        ) : null}

        {showOtherTB == true ? (
          <div className="ml-10 flex items-center mb-5 ">
            <p className="w-1/2 mr-0 my-0">Employee Name</p>
            <input
              type="text"
              name="phoneNum"
              id="phoneNum"
              className=" border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-72 duration-200 peer focus:border-indigo-60 bg-white"
              // value={phoneNum}
              // onChange={(e) => setPhoneNum(e.target.value)}
              placeholder="Enter Employee Name"
              required
            ></input>
          </div>
        ) : null}

        {/* Split File Name */}
        {showDelimiter == true ? (
          <>
            <div className="grid grid-cols-2 flex w-2/5 items-center mb-5">
              <p>Delimiter </p>
              <input
                type="text"
                name="phoneNum"
                id="phoneNum"
                className=" border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block duration-200 peer focus:border-indigo-60 bg-white"
                // value={phoneNum}
                // onChange={(e) => setPhoneNum(e.target.value)}
                placeholder="Enter Delimiter"
                required
              ></input>
            </div>
            <select
              // value={gender}
              onChange={(e) => handleEmployee(e.target.value)}
              className="select select-bordered font-normal select-sm h-11 ml-5 w-72"
            >
              <option value="">Employee Name</option>
              <option value="excel">Excel</option>
              <option value="raymond">Raymond</option>
              <option value="gui">Gui</option>
              <option value="alvin">Alvin</option>
              <option value="bryant">Bryant</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : null}
      </div>

      <div className="max-h-screen">
        <table className="table mx-auto w-full border border-dashed border-[#83848A] text-sm">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-[#F6F4FC] normal-case text-base">No</th>
              <th className="bg-[#F6F4FC] normal-case text-base">
                Recording Name
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base">
                Employee Name
              </th>
              <th className="bg-[#F6F4FC] text-[#F6F4FC]">h</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover">
              <th>1</th>
              <td>Sample recording 1</td>
              <td>Excel</td>
              <td>
                <RxCross2 />
              </td>
            </tr>
            <tr className="hover">
              <th>2</th>
              <td>Sample recording 1</td>
              <td>Excel</td>
              <td>
                <RxCross2 />
              </td>
            </tr>
            <tr className="hover">
              <th>3</th>
              <td>Sample recording 1</td>
              <td>Excel</td>
              <td>
                <RxCross2 />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="join flex justify-end mt-10 mb-10">
        <button className="join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded">
          1
        </button>
        <button className="join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded">
          2
        </button>
        <button className="join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded">
          3
        </button>
        <button className="join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded">
          4
        </button>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-sm bg-[#9554FE] normal-case h-11 w-42 border-[#9554FE]">
          <img src={Analyze} className="mr-2 h-5"></img>
          <p className="mr-2 text-md">Analyze</p>
        </button>
      </div>
    </div>
  );
}

export default AddRecording;
