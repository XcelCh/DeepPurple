import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Toggle,
  Upload,
  ThreeDotsVertical,
  Filter,
  TrashCan,
  Download,
  Eye,
} from "../assets/index";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import GenericModal from "../components/GenericModal";
import Pagination from "../components/Pagination";

function EmployeeList() {
  return (
    <div className="mx-20">
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

      <div className="max-h-screen">
        <table className="table mx-auto w-full border border-dashed text-sm">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-[#F6F4FC] normal-case text-base">No</th>
              <th className="bg-[#F6F4FC] normal-case text-base">Name</th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Calls Handled
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Positive Sentiment
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Negative Sentiment
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover">
              <th>1</th>
              <td>David</td>
              <td className="text-center">386</td>
              <td className="text-center">311</td>
              <td className="text-center">75</td>
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
                      <a className="text-[#9554FE]">
                        <img src={Eye}></img> View Calls Handled
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <label className="text-[#9554FE]" htmlFor="editNameModal">
                        <EditIcon /> Edit Names
                      </label>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#D55454]">
                        <img src={TrashCan}></img> Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>David</td>
              <td className="text-center">386</td>
              <td className="text-center">311</td>
              <td className="text-center">75</td>
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
                      <a className="text-[#9554FE]">
                        <img src={Eye}></img> View Calls Handled
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <EditIcon /> Edit Name
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#D55454]">
                        <img src={TrashCan}></img> Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            {/* row 3 */}
            <tr className="hover">
              <th>3</th>
              <td>David</td>
              <td className="text-center">386</td>
              <td className="text-center">311</td>
              <td className="text-center">75</td>
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
                      <a className="text-[#9554FE]">
                        <img src={Eye}></img> View Calls Handled
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <EditIcon /> Edit Name
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#D55454]">
                        <img src={TrashCan}></img> Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            {/* Row 4 */}
            <tr className="hover">
              <th>4</th>
              <td>David</td>
              <td className="text-center">386</td>
              <td className="text-center">311</td>
              <td className="text-center">75</td>
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
                      <a className="text-[#9554FE]">
                        <img src={Eye}></img> View Calls Handled
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <EditIcon /> Edit Name
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#D55454]">
                        <img src={TrashCan}></img> Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="join flex justify-end mt-10 mb-10">
        <Pagination></Pagination>
      </div>

      {/* Modals */}
      {/* Add Employee Modal */}
      <GenericModal
        cardTitle="Add Employee"
        fieldName="Employee Name"
        placeholderContent="Enter Employee Name"
        buttonContent="Add"
        id="addEmployeeModal"
      ></GenericModal>

      {/* Edit Employee Modal */}
      <GenericModal
        cardTitle="Edit Employee Name"
        fieldName="Employee Name"
        placeholderContent="Enter Employee Name"
        buttonContent="Save"
        id="editNameModal"
      ></GenericModal>
    </div>
  );
}

export default EmployeeList;
