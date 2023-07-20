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
          {/* The button to open modal */}
          <label
            htmlFor="my_modal_6"
            className="btn btn-sm bg-[#9554FE] normal-case h-11 w-42 border-[#9554FE]"
          >
            <AddCircleOutlineIcon className="mr-2" />
            <p className="mr-2 text-md">Add Employee</p>
          </label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box p-0 rounded-lg w-fit">
              {/* Title */}
              <div className="grid grid-cols-2 bg-[#9554FE] p-5">
                <p className="font-bold text-xl text-[#FFFFFF]">Add Employee</p>
                <div className="modal-action m-0">
                  <label htmlFor="my_modal_6">
                    <CloseIcon
                      style={{ fill: "#FFFFFF" }}
                      className="place-self-end"
                    />
                  </label>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mx-auto">
                  <p className="mb-2">Employee Name</p>
                  <input
                    type="text"
                    name="phoneNum"
                    id="phoneNum"
                    className="mb-7 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-72 duration-200 peer focus:border-indigo-60 bg-white"
                    // value={phoneNum}
                    // onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="Enter Employee Name"
                    required
                  ></input>
                </div>
                <div className="flex justify-end">
                  <button
                    className="btn btn-sm bg-[#9554FE] normal-case h-11 px-5 border-[#9554FE]"
                    // onClick={handleNext}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
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
    </div>
  );
}

export default EmployeeList;
