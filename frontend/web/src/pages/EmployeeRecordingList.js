import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ThreeDotsVertical, TrashCan, Eye } from "../assets/index";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import GenericModal from "../components/GenericModal";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";
import { ArrowLeft } from "../assets/index";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function EmployeeRecordingList() {
  const { id } = useParams();
  const [numbering, setNumbering] = useState(1);
  const [recList, setRecList] = useState([]);
  const [empName, setEmpName] = useState("");
  const [search, setSearch] = useState("");

  // Get Employee Name 
  const getEmployeeDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/employeeList/getEmployeeDetail/${id}`
      );

      response.json().then((data) => {
        setEmpName(data.data.employeeName);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Get All Recording
  const getRecList = async () => {
    const params = `?search=${search}`;
    try {
      const response = await fetch(
        `http://localhost:8082/employeeList/getEmployeeRecording/${id}${params}`
      );

      response.json().then((data) => {
        setRecList(data.data);
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getRecList();
    getEmployeeDetail();
  },[search]) ;
  
  return (
    <div className="mx-20">
      <div className="flex mb-5">
        <Link to="../RecordingList">
          <img src={ArrowLeft} className="mr-3"></img>
        </Link>
        <p className="text-xl font-bold text-left mr-3">
          {empName}'s Recording List
        </p>
      </div>
      <div class="grid grid-cols-2 mb-5">
        <form className="max-w-xs text-sm">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  getRecList();
                }
              }}
              value={search}
              name="search"
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>
        </form>
      </div>

      <div className="max-h-screen">
        <table className="table mx-auto w-full border border-dashed text-sm">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-[#F6F4FC] normal-case text-base">No</th>
              <th className="bg-[#F6F4FC] normal-case text-base">
                Recording Name
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Upload Date
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Date Recorded
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Category
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Sentiment
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {recList.map((recording, index) => (
              <tr className="hover">
                <th>{numbering + index}</th>
                <td>{recording.recordingName}</td>
                <td className="text-center">{recording.uploadDate}</td>
                <td className="text-center">{recording.recordingDate}</td>
                <td className="text-center">category</td>
                <td className="text-center">sentiment</td>
                <td className="flex justify-center items-center">
                  <div className="dropdown">
                    <label
                      tabIndex={0}
                      className="btn m-1 bg-[#FFFFFF] border-[#FFFFFF] hover:bg-[#F6F4FC] hover:border-[#F6F4FC] hover:outline-none"
                    >
                      <img src={ThreeDotsVertical}></img>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] rounded-box w-52 rounded-none border-[#D1D1D1]"
                    >
                      <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                        <a
                          className="text-[#9554FE]"
                          // href={`/recordingList/${currentEmployeeId}`}
                          // onClick={() => {
                          //   setCurrentEmployeeId(employee.employeeId);
                          // }}
                        >
                          <img src={Eye}></img>{" "}
                          <p className="ml-1">View Analysis</p>
                        </a>
                      </li>
                      <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                        <label
                          className="text-[#D55454]"
                          // onClick={() => handleDelete(recording.recordingId)}
                        >
                          <img src={TrashCan} className="ml-1"></img>{" "}
                          <p className="ml-1">Delete</p>
                        </label>
                      </li>
                      <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                        <a
                          className="text-[#D55454]"
                          // onClick={() => handleDelete(employee.employeeId)}
                        >
                          <FileDownloadOutlinedIcon></FileDownloadOutlinedIcon>{" "}
                          Download
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-end mt-10 mb-10">
        <Pagination></Pagination>
      </div>
    </div>
  );
}

export default EmployeeRecordingList;
