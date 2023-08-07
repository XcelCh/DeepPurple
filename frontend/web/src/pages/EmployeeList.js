import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  ThreeDotsVertical,
  TrashCan,
  Eye,
  EmptyRecording,
} from "../assets/index";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import GenericModal from "../components/GenericModal";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TablePagination from "@mui/material/TablePagination";
import authHeader from "../services/auth-header";

function EmployeeList() {
  const [empList, setEmpList] = useState([]);
  const [numbering, setNumbering] = useState(1);
  const [error, setError] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentEmployeeId, setCurrentEmployeeId] = useState();
  const [search, setSearch] = useState("");
  const token = authHeader();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);

  // Get All Employees
  const getEmpList = async () => {
    const params = `?search=${search}`;
    try {
      Swal.fire({
        title: "Retrieving All Employees",
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

   const searchEmpList = async () => {
     const params = `?search=${search}`;
     try {

       const response = await fetch(
         `http://localhost:8082/employeeList/getAllEmployees${params}`,
         {
           headers: token,
         }
       );

       response.json().then((data) => {
         setEmpList(data.data);
       });

     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };
  

  // Pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = empList.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    getEmpList();
  }, []);

  useEffect(() => {
    searchEmpList();
  }, [search]);

  // Delete Employee
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
        fetch(`http://localhost:8082/employeeList/deleteEmployeeById/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(
            (result) => {
              getEmpList();
            },
            (error) => {
              setError(error);
            }
          );

        // Success message
        Swal.fire("Deleted!", "The employee has been deleted!", "success");

        // Reload getEmpList();table
        getEmpList();
      }
    });
  };

  // Update Employee
  const updateEmployee = (empData, currentEmployeeId) => {
    let data = { employeeName: empData };
    fetch(
      `http://localhost:8082/employeeList/updateEmployeeNameById/${currentEmployeeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to indicate JSON data
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          getEmpList();
          // Success message
          Swal.fire(
            "Updated",
            "The employee name has been updated!",
            "success"
          );
        },
        (error) => {
          setError(error);
          console.log(error);
          Swal.fire("Fail", "Fail to update employee name", "error");
        }
      );
  };

  // Add Employee
  const addEmployee = (empData) => {
    let data = { employeeName: empData };
    fetch(`http://localhost:8082/employeeList/addEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to indicate JSON data
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          getEmpList();
          // Success message
          Swal.fire("Updated", "The employee has been added.", "success");
        },
        (error) => {
          setError(error);
          console.log(error);
          Swal.fire("Fail", "Fail to add employee.", "error");
        }
      );
  };

  return (
    <div className="ml-20 mt-16">
      <p className="text-xl font-bold text-left mb-5">Employee List</p>
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
                  getEmpList();
                }
              }}
              value={search}
              name="search"
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>
        </form>
        <div className="place-self-end">
          <label
            htmlFor="addEmployeeModal"
            className="btn btn-sm bg-[#9554FE] normal-case h-11 w-42 border-[#9554FE]"
          >
            <AddCircleOutlineIcon className="mr-2" />
            <p className="mr-2 text-md">Add Employee</p>
          </label>
        </div>
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
                Name
              </th>
              <th className="bg-[#F6F4FC] normal-case  text-sm font-semibold text-center">
                Calls Handled
              </th>
              <th className="bg-[#F6F4FC] normal-case  text-sm font-semibold text-center">
                Positive Sentiment
              </th>
              <th className="bg-[#F6F4FC] normal-case  text-sm font-semibold text-center">
                Negative Sentiment
              </th>
              <th className="bg-[#F6F4FC] normal-case  text-sm font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentPosts.map((employee, index) => (
              <tr className="hover">
                <th className="h-1">
                  {currentPage * postsPerPage - 4 + index}
                </th>
                <td className="h-1">{employee.employeeName}</td>
                <td className="text-center h-1">{employee.numCallsHandled}</td>
                <td className="text-center h-1">
                  {employee.numNegativeSentiment}
                </td>
                <td className="text-center h-1">
                  {employee.numPositiveSentiment}
                </td>
                <td className="flex justify-center items-center">
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="bg-[#FFFFFF] border-[#FFFFFF] hover:bg-[#F6F4FC] hover:border-[#F6F4FC] hover:outline-none h-1"
                    >
                      <MoreVertIcon style={{ color: "black" }}></MoreVertIcon>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] rounded-box w-42 rounded-md border-[#D1D1D1]"
                    >
                      <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                        <a
                          className="text-[#9554FE] hover:text-[#FFFFFF]"
                          href={`/employeeList/recordingList/${currentEmployeeId}`}
                          onClick={() => {
                            setCurrentEmployeeId(employee.employeeId);
                          }}
                        >
                          <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>{" "}
                          View Calls Handled
                        </a>
                      </li>
                      <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                        <label
                          className="text-[#9554FE] hover:font-bold"
                          htmlFor="editNameModal"
                          onClick={() => {
                            setCurrentName(employee.employeeName);
                            setCurrentEmployeeId(employee.employeeId);
                          }}
                        >
                          <EditOutlinedIcon></EditOutlinedIcon>Edit Names
                        </label>
                      </li>
                      <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                        <a
                          className="text-[#D55454] hover:text-[#FFFFFF]"
                          onClick={() => handleDelete(employee.employeeId)}
                        >
                          <DeleteOutlinedIcon></DeleteOutlinedIcon> Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentPosts.length == 0 ? (
          <>
            <img src={EmptyRecording} className="mx-auto mt-10"></img>
            <p className="text-center font-semibold text-lg">
              You don't have any employees yet
            </p>
            <p className="text-center font-semibold text-sm mb-10">
              Start adding employee by clicking
              <a
                href="recordingList/AddRecording"
                className="underline underline-offset-2 ml-1"
              >
                Add Employee
              </a>
            </p>
          </>
        ) : null}
      </div>
      <div className="join flex justify-end mt-10 mb-10">
        <Pagination
          totalPosts={empList.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        ></Pagination>
      </div>
      {/* Modals */}
      {/* Add Employee Modal */}
      <GenericModal
        cardTitle="Add Employee"
        fieldName="Employee Name"
        placeholderContent="Enter Employee Name"
        buttonContent="Add"
        id="addEmployeeModal"
        handleSave={addEmployee}
      ></GenericModal>

      {/* Edit Employee Modal */}
      <GenericModal
        cardTitle="Edit Employee Name"
        fieldName="Employee Name"
        buttonContent="Save"
        id="editNameModal"
        valueContent={currentName}
        empId={currentEmployeeId}
        handleSave={updateEmployee}
      ></GenericModal>
    </div>
  );
}

export default EmployeeList;
