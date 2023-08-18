import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toggle, Upload, Filter, EmptyRecording } from "../assets/index";
import Swal from "sweetalert2";
import DateRange from "../components/DateRange";
import Pagination from "../components/Pagination";
import authHeader from "../services/auth-header";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function RecordingList() {
  // Get the token
  const token = authHeader();

  // Temporary storage
  const [originalList, setOriginalList] = useState([]);
  const [recList, setRecList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentRecordingId, setCurrentRecordingId] = useState();

  // Error Message
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [empIdList, setEmpIdList] = useState([]);

  // Filter
  const [filter, setFilter] = useState({
    handledBy: "",
    category: "",
    overallSentiment: "",
    empSentiment: "",
    custSentiment: "",
  });

  // Keep track of the search bar's value
  const handleSearch = (event) => {
    event.preventDefault();
    let filteredRecList = [...originalList];

    if (filter.category) {
      filteredRecList = filteredRecList.filter(
        (rec) => rec?.category == filter.category
      );
    }

    if (filter.overallSentiment) {
      filteredRecList = filteredRecList.filter(
        (rec) => rec?.sentiment == filter.overallSentiment
      );
    }

    if (filter.handledBy) {
      filteredRecList = filteredRecList.filter(
        (rec) => rec?.employeeId == filter.handledBy
      );
    }

    if (filter.empSentiment) {
      filteredRecList = filteredRecList.filter(
        (rec) => rec?.employeeSentiment == filter.empSentiment
      );
    }

    if (filter.custSentiment) {
      filteredRecList = filteredRecList.filter(
        (rec) => rec?.customerSentiment == filter.custSentiment
      );
    }

    // set recording list to the filtered one
    setRecList(filteredRecList);
    setDisplayList(filteredRecList);
  };

  //check if date is in a range
  const isDateInRange = (date, startDate, endDate) => {
    const parsedDate = new Date(date);

    const parsedDateOnly = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate()
    );

    const parsedStartDateOnly = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    const parsedEndDateOnly = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    return parsedDateOnly >= parsedStartDateOnly && parsedDateOnly <= parsedEndDateOnly;
  };

  //search the recording list based on the search bar value
  const searchRecList = async () => {
    try {
      const searchedRecList = recList.filter(
        (rec) =>
          rec?.recordingName.toLowerCase().includes(search.toLowerCase()) &&
          (!dateRange[0] ||
            !dateRange[1] ||
            isDateInRange(rec?.uploadDate, dateRange[0], dateRange[1]))
      );
      setDisplayList(searchedRecList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    console.log("Reset Filter");
  };

  // Get Employees
  const getEmpList = async () => {
    const params = `?search=${search}`;
    try {
      Swal.fire({
        title: "Retrieving All Recording",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      const response = await fetch(
        `http://localhost:8082/employeeList/getAllEmployees${params}`,
        {
          headers: token,
        }
      );

      response.json().then((data) => {
        setEmpList(data.data);
      });

      Swal.close();
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.close();
    }
  };

  // Get All Recordings
  const getRecList = async () => {
    const params = `?search=${search}`;
    console.log(params);
    try {
      Swal.fire({
        title: "Retrieving All Recordings",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      const response = await fetch(
        `http://localhost:8082/recordingList/getAllRecordings${params}`,
        {
          headers: token,
        }
      );

      response
        .json()
        .then((data) => {
          setRecList(data.data);
          setOriginalList(data.data);
          setDisplayList(data.data);
        })
        .finally(Swal.close());

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Change Employee
  const handleChangeEmployee = (recordingId, employeeId, index) => {
     fetch(
       `http://localhost:8082/recordingList/updateRecordingEmployeeById/${recordingId}`,
       {
         method: "POST",
         headers: {
           "Content-Type": "text/plain", // Set the content type to indicate JSON data
        "Authorization":token.Authorization },
         
         body: employeeId,
       }
     )
       .then((res) => res.json())
       .then(
         (result) => {
           console.log(result);
           getRecList();
         },
         (error) => {
           setError(error);
         }
       );

     // update employee id list
     const updatedEmpIdList = [...empIdList];
     console.log(updatedEmpIdList);
     updatedEmpIdList[index] = employeeId;
     setEmpIdList(updatedEmpIdList);
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
      }).finally(() => {
      Swal.close();
    });
    
    
  };

  useEffect(() => {
    getRecList();
    getEmpList();
  }, []);

  useEffect(() => {
    searchRecList();
  }, [search, dateRange[1]]);

  useEffect(() => {
    // console.log(recList);
    console.log("EMP ID LIST: " + empIdList);
  },[empIdList]);

  useEffect(() => {
    console.log("DISPLAY LIST: " + displayList);
    setEmpIdList(displayList.map((rec) => rec.employeeId));
  }, [displayList]);

  return (
    <div className="ml-20 mt-16">
      <p className="text-xl font-bold text-left mb-5">Recording List</p>

      <div class="grid grid-cols-3 mb-5">
        <div className="col-span-2 flex gap-3">
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
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />

              <div className="dropdown mb-4" id="filterDropdown">
                <label
                  tabIndex={0}
                  className="absolute top-0 bottom-0 w-6 h-6 text-gray-400 right-3"
                >
                  <img src={Filter} className=""></img>
                </label>
                <div
                  tabIndex={0}
                  className="-top-120 dropdown-content z-[1] menu p-5 drop-shadow-sm bg-[#FFFFFF] rounded-box w-128 disabled:hover text-xs border"
                >
                  {/* Filter Pop up */}
                  {/* Handled By */}
                  <div className="grid grid-cols-2 flex items-center mb-5">
                    <p className="font-bold">Handled by</p>
                    <select
                      onChange={(e) =>
                        setFilter({ ...filter, handledBy: e.target.value })
                      }
                      className="select select-bordered font-normal select-xs h-8"
                    >
                      <option value="">Any Employee</option>
                      {empList &&
                        empList.map((emp, index) => (
                          <option value={emp.employeeId}>
                            {emp.employeeName}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div className="grid grid-cols-2 flex items-center mb-5">
                    <p className="font-bold">Category</p>
                    <select
                      onChange={(e) =>
                        setFilter({ ...filter, category: e.target.value })
                      }
                      className="select select-bordered font-normal select-xs h-8"
                    >
                      <option value="">Any Category</option>
                      <option value="Inquiry">Inquiry</option>
                      <option value="Warranty">Warranty</option>
                      <option value="Complaint">Complaint</option>
                    </select>
                  </div>

                  {/* Overall Sentiment */}
                  <div className="grid grid-cols-2 flex items-center mb-5">
                    <p className="font-bold">Overall Sentiment</p>
                    <select
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          overallSentiment: e.target.value,
                        })
                      }
                      className="select select-bordered font-normal select-xs h-8"
                    >
                      <option value="">Any Sentiment</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </select>
                  </div>

                  {/* Employee's Sentiment */}
                  <div className="grid grid-cols-2 flex items-center mb-5">
                    <p className="font-bold">Employee's Sentiment</p>
                    <select
                      onChange={(e) =>
                        setFilter({ ...filter, empSentiment: e.target.value })
                      }
                      className="select select-bordered font-normal select-xs h-8"
                    >
                      <option value="">Any Sentiment</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </select>
                  </div>

                  {/* Customer's Sentiment */}
                  <div className="grid grid-cols-2 flex items-center mb-5">
                    <p className="font-bold">Customer's Sentiment</p>
                    <select
                      onChange={(e) =>
                        setFilter({ ...filter, custSentiment: e.target.value })
                      }
                      className="select select-bordered font-normal select-xs h-8"
                    >
                      <option value="">Any Sentiment</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </select>
                  </div>
                  <div className="flex justify-end items-center">
                    <button
                      className="text-[#9554FE] mr-8 text-xs"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                    <button
                      className="btn btn-sm bg-[#9554FE] normal-case h-5 px-5 border-[#9554FE] text-xs"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <DateRange
            dateRange={dateRange}
            setDateRange={setDateRange}
          ></DateRange>
        </div>

        {/* Upload */}
        <div className="place-self-end">
          <Link to="./AddRecording">
            <button className="btn btn-sm bg-[#9554FE] normal-case h-11 w-42 border-[#9554FE]">
              <AddCircleOutlineIcon className="mr-2" />
              <p className="mr-2 text-md">Add Recording</p>
            </button>
          </Link>
        </div>
      </div>

      <div className="max-h-screen border border-dashed border-[#83848A] bg-[#F6F4FC]">
        {/* table */}
        <table className="table table-auto mx-auto w-full text-xs">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                No
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Recording name
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Upload Date
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Date Recorded
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Employee Name
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Category
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Overall Sentiment
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm text-center font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {displayList && displayList.length > 0
              ? displayList
                  .slice(firstPostIndex, lastPostIndex)
                  .map((recording, index) => (
                    <tr>
                      <th>{currentPage * postsPerPage - 4 + index}</th>
                      <td>
                        {recording.recordingName}-[{recording.recordingId}]
                      </td>
                      <td>{recording.uploadDate.substring(0, 10)}</td>
                      <td>{recording.dateRecorded.substring(0, 10)}</td>

                      <td>
                        <select
                          value={
                            empIdList[
                              currentPage * postsPerPage - 4 + index - 1
                            ]
                          }
                          onChange={(e) =>
                            handleChangeEmployee(
                              recording.recordingId,
                              e.target.value,
                              index
                            )
                          }
                          className="select select-bordered font-normal select-sm h-8"
                        >
                          {empList &&
                            empList
                              .slice(firstPostIndex, lastPostIndex)
                              .map((emp) => (
                                <>
                                  
                                  <option
                                    key={emp.employeeId}
                                    value={emp.employeeId}
                                  >
                                    {emp.employeeName}
                                  </option>
                                </>
                              ))}
                        </select>
                      </td>
                      <td className="">{recording.category}</td>
                      <td className="">{recording.sentiment}</td>
                      <td className="flex justify-center items-center">
                        <div className="dropdown dropdown-end mt-2">
                          <label
                            tabIndex={0}
                            className="bg-[#FFFFFF] border-[#FFFFFF] hover:bg-[#F6F4FC] hover:border-[#F6F4FC] hover:outline-none"
                          >
                            <MoreVertIcon
                              style={{ color: "black" }}
                            ></MoreVertIcon>
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] rounded-box w-36  rounded-md"
                          >
                            <li className="hover:bg-[#9554FE]">
                              <a
                                className="text-[#9554FE] hover:text-[#FFFFFF]"
                                href={`recordingList/analysis/${currentRecordingId}`}
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
                    // );
                  ))
              : null}
          </tbody>
        </table>

        {!displayList.length ? (
          <>
            <img src={EmptyRecording} className="mx-auto mt-10"></img>
            <p className="text-center font-semibold text-lg">
              You don't have any recordings yet
            </p>
            <p className="text-center font-semibold text-sm mb-10">
              Start uploading your audio files by clicking
              <a
                href="recordingList/AddRecording"
                className="underline underline-offset-2"
              >
                Upload
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

export default RecordingList;
