import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ThreeDotsVertical, TrashCan, Eye, EmptyRecording } from "../assets/index";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import GenericModal from "../components/GenericModal";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";
import { ArrowLeft } from "../assets/index";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import authHeader from "../services/auth-header";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function EmployeeRecordingList() {
  const token = authHeader();

  const { id } = useParams();
  // Numbering the table
  const [numbering, setNumbering] = useState(1);

  // Temporary storage
  const [recList, setRecList] = useState([]);
  const [empName, setEmpName] = useState("");
  const [search, setSearch] = useState("");
  const [currentRecordingId, setCurrentRecordingId] = useState();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);

  // Error message
  const [error, setError] = useState("");

  // Get Employee Name
  const getEmployeeDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/employeeList/getEmployeeDetail/${id}`,
        {
          headers: token,
        }
      );

      response.json().then((data) => {
        setEmpName(data.data.employeeName);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Get All Recording Per Employee
  const getRecList = async () => {
    const params = `?search=${search}`;
    try {
      const response = await fetch(
        `http://localhost:8082/employeeList/getEmployeeRecording/${id}${params}`,
        {
          headers: token,
        }
      );

      response.json().then((data) => {
        setRecList(data.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Download Recording

  const handleDownload = (fileName, timeStamp) => {
    const headers = new Headers();
    headers.append("Authorization", `${token.Authorization}`);

    Swal.fire({
      title: "Downloading...",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    fetch(`http://localhost:8082/audio/download/${timeStamp}_${fileName}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", timeStamp + "_" + fileName);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading audio:", error);
      })
      .finally(() => {
        Swal.close();
      });
  };

  // Delete Recording
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Deleting
        fetch(`http://localhost:8082/recordingList/deleteRecordingById/${id}`, {
          method: "DELETE",
          headers: token,
        })
          .then((res) => res.json())
          .then(
            (result) => {
              getRecList();
            },
            (error) => {
              setError(error);
            }
          );

        // Success message
        Swal.fire("Deleted!", "The recording has been deleted!", "success");
        getRecList();
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getRecList();
    getEmployeeDetail();
  }, [search]);

  // Pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  return (
    <div className="mx-20 pt-16">
      <div className="flex mb-5">
        <Link to="../employeeList">
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
              className="absolute top-1 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 30 30"
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

      <div className="max-h-screen border border-dashed bg-[#F6F4FC]">
        <table className="table table-auto mx-auto w-full text-xs">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                No
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Recording Name
              </th>
              <th className="bg-[#F6F4FC] normal-case  text-sm font-semibold text-center">
                Upload Date
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold text-center">
                Date Recorded
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold text-center">
                Category
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold text-center">
                Sentiment
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {recList && recList.length > 0
              ? recList
                  .slice(firstPostIndex, lastPostIndex)
                  .map((recording, index) => (
                    <tr className="hover">
                      <th className="h-1">
                        {currentPage * postsPerPage - 4 + index}
                      </th>
                      <td className="h-1">{recording.recordingName}</td>
                      <td className="text-center h-1">
                        {recording.uploadDate.replace("T", " ")}
                      </td>
                      <td className="text-center h-1">
                        {recording.recordingDate.replace("T", " ")}
                      </td>
                      <td className="text-center h-1">category</td>
                      <td className="text-center h-1">sentiment</td>
                      <td className="flex justify-center items-center">
                        <div className="dropdown">
                          <label
                            tabIndex={0}
                            className="bg-[#FFFFFF] border-[#FFFFFF] hover:bg-[#F6F4FC] hover:border-[#F6F4FC] hover:outline-none h-1"
                          >
                            <MoreVertIcon
                              style={{ color: "black" }}
                            ></MoreVertIcon>
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] rounded-box w-52 rounded-none border-[#D1D1D1]"
                          >
                            <li className="hover:bg-[#9554FE]">
                              <a
                                className="text-[#9554FE] hover:text-[#FFFFFF]"
                                href={`../../recordingList/analysis/${currentRecordingId}`}
                                onClick={() => {
                                  setCurrentRecordingId(recording.recordingId);
                                }}
                              >
                                <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>{" "}
                                View Analysis
                              </a>
                            </li>
                            <li className="hover:bg-[#9554FE]">
                              <a
                                className="text-[#D55454] hover:text-[#FFFFFF]"
                                onClick={() =>
                                  handleDelete(recording.recordingId)
                                }
                              >
                                <DeleteOutlinedIcon></DeleteOutlinedIcon> Delete
                              </a>
                            </li>
                            <li className="hover:bg-[#9554FE]">
                              <a
                                onClick={() =>
                                  handleDownload(
                                    recording.recordingName,
                                    recording.timeStamp
                                  )
                                }
                                className="text-[#9554FE] hover:text-[#FFFFFF]"
                              >
                                <FileDownloadOutlinedIcon></FileDownloadOutlinedIcon>{" "}
                                Download
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
        {!recList.length ? (
          <>
            <img src={EmptyRecording} className="mx-auto mt-10"></img>
            <p className="text-center font-semibold text-lg">
              You don't have any recordings yet
            </p>
            <p className="text-center font-semibold text-sm mb-10">
              Start adding recording by clicking
              <a
                href="recordingList/AddRecording"
                className="underline underline-offset-2 ml-1"
              >
                Add Recording
              </a>
            </p>
          </>
        ) : null}
      </div>
      <div className="join flex justify-end mt-10 mb-10">
        <Pagination
          totalPosts={recList && recList.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        ></Pagination>
      </div>
    </div>
  );
}

export default EmployeeRecordingList;
