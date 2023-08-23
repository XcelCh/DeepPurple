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
  EmptyRecording,
} from "../assets/index";
import { RxCross2 } from "react-icons/rx";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Swal from "sweetalert2";
import GenericModal from "../components/GenericModal";
import authHeader from "../services/auth-header";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";
import Cloud from "../assets/Cloud.png";

//store time when user enters the add recording page
const today = new Date();
var dateTimeString;

//this dateTimeString is to display the uploaded recordings
//which are after the time the page was loaded on.
//this is to prevent displaying other past uploaded audio files in this page.
dateTimeString =
  today.getFullYear() +
  "-" +
  ("0" + (today.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + today.getDate()).slice(-2) +
  "T" +
  ("0" + today.getHours()).slice(-2) +
  ":" +
  ("0" + today.getMinutes()).slice(-2) +
  ":" +
  ("0" + today.getSeconds()).slice(-2);

function AddRecording() {
  const [empList, setEmpList] = useState([]); //useState to store all employees linked to the account
  const [recList, setRecList] = useState([]);  //useState to store all recording files linked to the account

  const [numbering, setNumbering] = useState(1); //for pagination
  const [showAssigning, setShowAssigning] = useState(false); //show configuration
  const [assignEmployee, setAssignEmployee] = useState(""); //handle user's selection method for assigning employee
  const [selectedEmployee, setSelectedEmployee] = useState(""); 
  const [employee, setEmployee] = useState("");
  const [showEmployee, setShowEmployee] = useState(true);
  const [showOtherTB, setShowOtherTB] = useState(false); //toggler to show the add and assign button if the user chooses 'Other' while assigning existing employee
  const [employeeNameToAssign, setEmployeeNameToAssign] = useState("");
  const [employeeIdToAssign, setEmployeeIdToAssign] = useState("");
  const [showDelimiter, setShowDelimiter] = useState(false); //handle file delimiter
  const [delimiter, setDelimiter] = useState(""); //handle file delimiter
  const [delimitedFields, setDelimitedFields] = useState([]); //handle file delimiter
  const [error, setError] = useState("");
  const [limitError, setLimitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const token = authHeader();
  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
  // Get All Recordings
 const getRecList = async () => {  
   const params = `?currentDate=${dateTimeString}`;
  try {
    const response = await fetch(`${BASE_URL}/audio/getRecordings${params}`, {
      headers: token,
    });

    response.json().then((data) => {
      if(data.data != null) {        
        setRecList(data.data);
      }
      
    });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
 }; 

 useEffect(() => {
  getRecList();
 },[]);

 // Get All Employees
 const getEmpList = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/employeeList/getAllEmployees`,
        {
          headers : token,
        }
      );

      response.json().then((data) => {
        if(data.data != null) {
          setEmpList(data.data);
        }        
      });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
  useEffect(() => {    
    getEmpList();
  }, [assignEmployee]);

  //toggle assign employee options
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

    if (assignEmployee == "none") {
      const params = `?currentDate=${dateTimeString}`;
      Swal.fire({
      title: 'Updating Employee..',      
      didOpen: () => {
        Swal.showLoading()
        return fetch(`${BASE_URL}/audio/unassignEmployees${params}`, {
          method: "POST",
          headers: token             
        })
        .then (response => {
    
          if (response.ok && recList.length !== 0) {
            Swal.close();
            getRecList()
            // Success message
            Swal.fire(            
              "Updated",
              "Employees have been unassigned!",
              "success"
            )
          } else{
            throw new error;
          }  
        })
        .catch (error => {    
          setError(error)
          console.error(error)          
          Swal.fire("Fail", "Fail to unassign employee", "error")
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
    }
  }, [assignEmployee]);

  //toggle showOtherTB during assigning existing employee
  useEffect(() => {
    if (selectedEmployee == "other") {
      setShowOtherTB(true);
    } else {
      setShowOtherTB(false);
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  //toggle showAssigning
  useEffect(() => {
    if(recList.length > 0) {
      setShowAssigning(true);
    } else {
      setShowAssigning(false);
    }
  }, [recList]);

  //listen for user's selection for assigning employee method
  const handleAssignEmployee = (selected) => {
    setAssignEmployee(selected);
  };

  //update the audio files based on user's selection
  const handleSelectedEmployee = (value) => {
    if(value == "other"){
      setShowOtherTB(true);
      return;
    }
    var val = decodeValue(value);
    const params = `?currentDate=${dateTimeString}&employeeId=${val.id}&employeeName=${val.name}`;    
    let name = val.name;
    let data = val.id;       
    Swal.fire({
      title: 'Updating Employee..',      
      didOpen: () => {
        Swal.showLoading()
        return fetch(`${BASE_URL}/audio/updateAudioEmployee${params}`, {
          method: "POST",
          headers: token,
          body: data          
        })
        .then (response => {
    
          if (response.ok && recList.length !== 0) {
            Swal.close();
            getRecList()
            // Success message
            Swal.fire(            
              "Updated",
              "The employee name has been updated!",
              "success"
            )
          } else{
            throw new error;
          }  
        })
        .catch (error => {    
          setError(error)
          console.error(error)          
          Swal.fire("Fail", "Fail to assign employee", "error")
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })

  }

  //if user chooses 'other' for assigning existing employee, 
  //create new employee then immediately assign that new employee.
  const handleAddAndAssign = async (value) =>{
    var empId = "";
    var empName = "";
    await fetch(`${BASE_URL}/employeeList/addEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain", // Set the content type to indicate JSON data
      "Authorization" : token.Authorization
    },
    body: value,
  })
    .then((res) => res.json())
    .then(
      (result) => {       
        if (result.success) {
          empId = result.data.employeeId;
          empName = result.data.employeeName;
          getEmpList();
          Swal.fire(
            "Added",
            "The employee has been added.",
            "success"
          );

        } else {
             Swal.fire("Fail", "Fail to add employee. Try again", "error");
          
        }
       
          
      },
      (error) => {
        setError(error); 
      }
    );   

    const param = encodeValue(empId, empName);
    handleSelectedEmployee(param);
  }

  //handle folder upload
  const handleUpload = () => {    
    const data = new FormData();
    const audioInput = document.getElementById("audioInput");        
    
    let totalFiles = audioInput.files.length;
    let uploadedFilesCount = 0;
    let rejectedFile = 0;

    Swal.fire({
      title: 'Uploading Files..',
      didOpen: () => {
        Swal.showLoading();
  
        // Define a helper function to upload each file sequentially
        const uploadFile = (file, rejectedFile, modDate) => {
          const data = new FormData();
          data.set("audio", file);
          
          const dateParam = `?lastModifiedDate=${modDate}`;
  
          return fetch(`${BASE_URL}/audio/uploadAudio${dateParam}`, {
            method: "POST",
            headers: token,
            body: data
          })
          .then(response => {
            if (response.ok) {
              uploadedFilesCount++;
              if (uploadedFilesCount === (totalFiles-rejectedFile)) {
                Swal.close();
                getRecList();
                // Success message for all files uploaded
                Swal.fire(
                  "Updated",
                  "All recordings have been added.",
                  "success"
                );
              }
            } else {
              throw new Error();
            }
          })
          .catch(error => {
            setError(error);
            console.error(error);
            Swal.fire("Fail", "Fail to add recording.", "error");
          });
        };
  
        // Upload each file one by one
        for(let i = 0; i < totalFiles; i++){

          const file = audioInput.files[i];

          const inputDateString = audioInput.files[i].lastModifiedDate;

          // Parse the input date string
          const parsedDate = new Date(inputDateString);

          // Extract individual components
          const year = parsedDate.getFullYear();
          const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
          const day = String(parsedDate.getDate()).padStart(2, "0");
          const hours = String(parsedDate.getHours()).padStart(2, "0");
          const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
          const seconds = String(parsedDate.getSeconds()).padStart(2, "0");

          // Format the components into the desired format
          const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

          if (file.type.startsWith('audio/wav')) {


            if (file.webkitRelativePath) {
              const modifiedFile = new File([file], file.name);
              uploadFile(modifiedFile, rejectedFile, formattedDate);
            }
          }
          else {
            rejectedFile++;
          }
        }
        
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  };

  //handle multiple file upload
  const handleUploadMultipleFiles = () => {    
    const audioInput = document.getElementById("audioInputMultiple");           
    const totalFiles = audioInput.files.length;
    let uploadedFilesCount = 0;
  
    Swal.fire({
      title: 'Uploading Files..',
      didOpen: () => {
        Swal.showLoading();
  
        // Define a helper function to upload each file sequentially
        const uploadFile = (file, modDate) => {
          const data = new FormData();
          data.set("audio", file);

          const dateParam = `?lastModifiedDate=${modDate}`;
  
          return fetch(`${BASE_URL}/audio/uploadAudio${dateParam}`, {
            method: "POST",
            headers: token,
            body: data
          })
          .then(response => {
            if (response.ok) {
              uploadedFilesCount++;
              if (uploadedFilesCount === totalFiles) {
                Swal.close();
                getRecList();
                // Success message for all files uploaded
                Swal.fire(
                  "Updated",
                  "All recordings have been added.",
                  "success"
                );
              }
            } else {
              throw new Error();
            }
          })
          .catch(error => {
            setError(error);
            console.error(error);
            Swal.fire("Fail", "Fail to add recording.", "error");
          });
        };
  
        // Upload each file one by one
        for(let i = 0; i < totalFiles; i++){

          const inputDateString = audioInput.files[i].lastModifiedDate;

          // Parse the input date string
          const parsedDate = new Date(inputDateString);

          // Extract individual components
          const year = parsedDate.getFullYear();
          const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
          const day = String(parsedDate.getDate()).padStart(2, "0");
          const hours = String(parsedDate.getHours()).padStart(2, "0");
          const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
          const seconds = String(parsedDate.getSeconds()).padStart(2, "0");

          // Format the components into the desired format
          const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

          uploadFile(audioInput.files[i], formattedDate);
        }
        
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  };
  
  //function to handle if user chooses to delete an uploaded recording
  const handleDelete = (recName, recId) => {
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
        const params = `?fileName=${recName}&recID=${recId}`;
        // Deleting
        fetch(`${BASE_URL}/audio/deleteFile${params}`, {
          method: "DELETE",
          headers: token
        })          
        .then(response => {

          if(response.ok){
            getRecList();
            // Success message       
            Swal.fire("Deleted!", "The recording has been deleted!", "success");        
          }            
        })
        .catch (error => {      
          setError(error)
          console.error(error)
          Swal.fire("Fail", "Fail to delete recording.", "error")
        })
      }
    });
  }

  //function to handle user's input for file delimiter  
  const handleFileDelimiter = () => {    
    const audioInput = document.getElementById("audioInput");
    const audioInputMultiple = document.getElementById("audioInputMultiple");
    var initSize = 0;     
    if(audioInput.files.length != 0 && delimiter != ""){      
      initSize = audioInput.files[0].name.split(delimiter).length;
    } else if(audioInputMultiple.files.length != 0) {
      initSize = audioInputMultiple.files[0].name.split(delimiter).length;     
    } else {
      initSize = 0;
    }
    
    var fields = [];
    for(let i = 1; i <= initSize; i++) {
      fields.push(i);
    }

    setDelimitedFields(fields);
  }

  useEffect(() => {    
    handleFileDelimiter();    
  }, [delimiter]);


// Add new Employee
const addEmployee = async (empData) => {
  await fetch(`${BASE_URL}/employeeList/addEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain", // Set the content type to indicate JSON data
      "Authorization" : token.Authorization
    },
    body: empData,
  })
    .then((res) => res.json())
    .then(
      (result) => {       
        setEmployeeIdToAssign(result.data.employeeId);
        setEmployeeNameToAssign(result.data.employeeName);
        getEmpList();
        // Success message
        Swal.fire("Added", "The employee has been added.", "success");        
      },
      (error) => {
        setError(error);
        Swal.fire("Fail", "Fail to add employee.", "error");
      }
    );
  };

  //update assign employee based on the name inside the file's delimited value.
  const updateEmployeeDelimiter = async (recID, empName) => {
    const params = `?recordingID=${recID}&empName=${empName}`;
    const data = recID;
    await fetch(`${BASE_URL}/audio/updateRecordingEmployeeByDelimiter${params}`, {
      method: "POST",
      body: data,
      headers: token
    })
    .then (response => {
      if(response.ok) {
        getRecList()
        //Swal.fire("Updated", "Employees have been assigned.", "success");
      }
    })
    .catch (error => {
      Swal.fire("Fail", "Fail to assign employee.", "error");
    })
  }

  //handle choosing the columns of the delimited fields.
  const handleSelectColumn = (col) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          var addedEmployees = [];
          if(recList.length != 0 && delimiter != "") {
            for(let i = 0; i < recList.length; i++) {
              var name = "";
              if(recList[i].recordingName.split(delimiter).length >= col-1) {
                name = recList[i].recordingName.split(delimiter)[col-1];
              } else {
                continue;
              }
              var filteredName = empList.filter((emp) => emp.employeeName.toLowerCase() == (name.toLowerCase()));
              if(filteredName.length == 0 && !(addedEmployees.includes(name))) {
                await addEmployee(name);
                addedEmployees.push(name);
              }
              await updateEmployeeDelimiter(recList[i].recordingId, name);
            }
          }

          Swal.close();
          Swal.fire("Updated", "Employees have been assigned.", "success");
        } catch (error) {
         Swal.fire("Fail", "Some error has occured!", "error");
        }        
      }
    });    
  }      

  //handle analyzing recordings after upload
  const analyzeRecordings = () => {
    const ids = recList.map((recording) => recording.recordingId);
    setIsButtonDisabled(true);
     Swal.fire({
          title: "Analyzing... Please wait for a while...",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });

    // make transcription + analysis id
    fetch(`${BASE_URL}/recordingList/analyzeLambda`, {
      method: "POST",
      headers: {
        Authorization: token.Authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((response) => {
        if (response.status === 400) {
          setErrorMessage("Limit is not sufficient to analyse!");
          setLimitError(true);
          throw new Error("Limit Exceeded");

        } else if (response.ok) {
          // Perform operations related to the first fetch's success

          // Second Fetch
          return fetch(`${BASE_URL}/audio/analyze`, {
            method: "POST",
            headers: {
              Authorization: token.Authorization,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ids),
          });
        } else if (response.status === 401) {
          navigate("/");
        } else {
          setErrorMessage("An error has occured. Please try again.");
          setLimitError(true);
          throw new Error("Error Happened.");
        }
      })
      .then((secondResponse) => {
        if (secondResponse.status === 400) {
          setErrorMessage("Limit is not sufficient to analyse!");
          setLimitError(true);
          throw new Error("Limit Exceeded");
        } else if (secondResponse.ok) {
          navigate("/RecordingList");
        } else if (secondResponse.status === 401) {
          navigate("/");
        } else {
          setErrorMessage("An error has occured. Please try again.");
          setLimitError(true);
          throw new Error("Error Happened.");
        }
      })
      .catch((error) => {
        if (error.message === 'Failed to fetch') {
          setErrorMessage("An error has occured. Please try again.");
          setLimitError(true);
        }
        console.error(error);
      }).finally(() => {
      Swal.close();
    });
    
  }

  //helper function to encode 2 strings to 1
  const encodeValue = (id, name) => {
    // Using a pipe "|" as the delimiter to separate id and name
    return `${id}|${name}`;
  };

  //helper function to separate 2 values from encoded string 
  const decodeValue = (value) => {
    // Split the value using the pipe delimiter and return an object with id and name
    const [id, name] = value.split('|');
    return { id, name };
  };

  return (
    <div className="pt-16 ml-20">
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
              {/* <input
                className="hidden"
                type="file"
                id="audioInput"
                accept="audio/*"
                onChange={handleUpload}
              />
              <label for="audioInput">Select file</label> */}
              <input
                className="hidden"
                type="file"
                id="audioInputMultiple"
                accept="audio/wav"
                onChange={handleUploadMultipleFiles}
                multiple
              />
              <label for="audioInputMultiple">Select file</label>
            </form>
          </li>
          <li className="hover:bg-[#9554FE] ">
            <a className="text-[#9554FE] hover:text-[#FFFFFF]">
              <DriveFolderUploadIcon />
              <input
                className="hidden"
                type="file"
                id="audioInput"
                // accept="audio/*"
                webkitdirectory =""
                directory =""
                onChange={handleUpload}
              />
              <label for="audioInput">Select folder</label>
              {/* <input
                className="hidden"
                type="file"
                id="audioInputMultiple"
                accept="audio/*"
                onChange={handleUploadMultipleFiles}
                multiple
              />
              <label for="audioInputMultiple">Select folder</label> */}
            </a>
          </li>
        </ul>
      </div>

      {/* Uploaded File Configurations */}
      {showAssigning == true ? (
        <>
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
              <option value="folderName">Folder Name</option>
              <option value="splitFileName">Split File Name</option>
              <option value="none">None</option>
            </select>
          </div>      
        </>
      ) : null}      

      {/* Existing Employee */}
      <div className="flex">
        {showEmployee == true ? (
          <div className="grid grid-cols-2 flex w-2/5 items-center mb-5">
            <p>Employee</p>
            <select
              // value={gender}
              onChange={(e) => handleSelectedEmployee(e.target.value)}
              className="select select-bordered font-normal select-sm h-11"
            >
              <option value="" selected disabled>Select Employee</option>
              {empList &&
                empList.map((emp) => {
                  return (
                    <option
                      value={encodeValue(emp.employeeId, emp.employeeName)}
                    >
                      {emp.employeeName}
                    </option>
                  );
                })}
              <option value="other">Other</option>
            </select>
          </div>
        ) : null}

        {showOtherTB == true ? (
          <div className="ml-10 flex items-center mb-5 ">
            <label
              htmlFor="addEmployeeModal"
              className="btn btn-sm bg-[#9554FE] normal-case h-11 w-42 border-[#9554FE]"
            >
              <p className="mr-2 text-md">Add & Assign Employee</p>
            </label>
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
                className=" border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block duration-200 peer focus:border-indigo-60 bg-white"
                // value={phoneNum}
                // onChange={(e) => setPhoneNum(e.target.value)}
                placeholder="Enter Delimiter"
                onChange={(e) => setDelimiter(e.target.value)}
                required
              ></input>
            </div>
            <select
              // value={gender}
              onChange={(e) => handleSelectColumn(e.target.value)}
              className="select select-bordered font-normal select-sm h-11 ml-5 w-72"
            >
              <option value="">Select Column</option>
              {delimitedFields.map((column) => {
                return <option value={column}>Column {column}</option>;
              })}
            </select>
          </>
        ) : null}
      </div>

      <div className="max-h-screen border border-dashed border-[#83848A]  bg-[#F6F4FC]">
        <table className="table mx-auto w-full text-sm">
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
            {recList && recList.length > 0
              ? recList
                  .slice(firstPostIndex, lastPostIndex)
                  .map((recording, index) => (
                    <tr className="hover">
                      <th>{currentPage * postsPerPage - 4 + index}</th>
                      <td>{recording.recordingName}</td>
                      <td>{recording.employeeName}</td>
                      <td>
                        <RxCross2
                          onClick={() =>
                            handleDelete(
                              recording.recordingName,
                              recording.recordingId
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
        {!recList.length ? (
          <>
            <img src={Cloud} className="mx-auto mt-10 my-4"></img>
            <p className="text-center font-semibold text-lg">
              Press the upload button to upload your recordings
            </p>
            <p className="text-center font-semibold text-sm mb-10">
              Only .wav files are allowed
            </p>
          </>
        ) : null}
      </div>

      {limitError && (
        <div className="fixed top-0 left-0 right-0 z-50 pt-32 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full bg-black bg-opacity-50">
          <div className="relative w-2/5 mx-auto">
            <div className="relative bg-white rounded-lg shadow">
              <button
                onClick={() => setLimitError(false)}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-8 text-center items-center justify-center flex flex-col">
                <svg
                  className="mx-auto mb-4 text-[#414141] w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="mb-5 text-lg font-semibold text-[#414141]">
                  {errorMessage}
                </p>
                <button
                  onClick={() => setLimitError(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 hover:font-semibold focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="join flex justify-end mt-10 mb-10">
        <Pagination
          totalPosts={recList && recList.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        ></Pagination>
      </div>
      <div className="flex justify-end">
        <button
          onClick={analyzeRecordings}
          className="btn btn-sm bg-[#9554FE] normal-case h-11 w-42 border-[#9554FE]"
          disabled={isButtonDisabled}
        >
          <img src={Analyze} className="mr-2 h-5"></img>
          <p className="mr-2 text-md">Analyze</p>
        </button>
      </div>
      <GenericModal
        cardTitle="Add & Assign Employee"
        fieldName="Employee Name"
        placeholderContent="Enter Employee Name"
        buttonContent="Add and Assign"
        id="addEmployeeModal"
        handleSave={handleAddAndAssign}
      ></GenericModal>
    </div>
  );
}

export default AddRecording;
