import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Toggle,
  Upload,
  ThreeDotsVertical,
  Filter,
  TrashCan,
  Download,
  Eye
  
} from "../assets/index";

function RecordingList() {
  return (
    <div className="mx-20">
      <p className="text-xl font-bold text-left mb-5">Recording List</p>

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
            {/* The button to open modal */}
            <label
              htmlFor="my_modal_6"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-3"
            >
              <img src={Filter} className=""></img>
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">This modal works with a hidden checkbox!</p>
                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn">
                    Close!
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="place-self-end">
          <Link to="./AddRecording">
            <button className="btn btn-sm bg-[#9554FE] normal-case h-11 w-42 border-[#9554FE]">
              <img src={Upload} className="mr-2 h-5"></img>
              <p className="mr-2 text-md">Upload</p>
              <img src={Toggle} className="h-5"></img>
            </button>
          </Link>
        </div>
      </div>
      <div className="max-h-screen">
        <table className="table mx-auto w-full border border-dashed text-sm">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-[#F6F4FC] normal-case text-base">No</th>
              <th className="bg-[#F6F4FC] normal-case text-base">
                Recording name
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base">
                Upload Date
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base">
                Date Recorded
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base">
                Employee Name
              </th>
              <th className="bg-[#F6F4FC] normal-case text-base">Category</th>
              <th className="bg-[#F6F4FC] normal-case text-base">Sentiment</th>
              <th className="bg-[#F6F4FC] normal-case text-base text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover">
              <th>1</th>
              <td>Sample recording 1</td>
              <td>2023-01-01 01:01:01</td>
              <td>2023-01-01 01:01:01</td>
              <td>David</td>
              <td>Inquiry</td>
              <td>Positive</td>
              <td className="flex justify-center items-center">
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="btn m-1 bg-[#FFFFFF] border-[#FFFFFF] hover:bg-[#F6F4FC] hover:border-[#F6F4FC] hover:outline-none"
                  >
                    <img src={ThreeDotsVertical} className="mt-2"></img>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] rounded-box w-36 rounded-none border-[#D1D1D1]"
                  >
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <img src={Eye}></img> View Analysis
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#D55454]">
                        <img src={TrashCan}></img> Delete
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <img src={Download}></img> Download
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Sample recording 1</td>
              <td>2023-01-01 01:01:01</td>
              <td>2023-01-01 01:01:01</td>
              <td>David</td>
              <td>Inquiry</td>
              <td>Positive</td>
              <td className="flex justify-center items-center">
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="btn m-1 bg-[#FFFFFF] border-[#FFFFFF] hover:bg-[#F6F4FC] hover:border-[#F6F4FC] hover:outline-none"
                  >
                    <img src={ThreeDotsVertical} className="mt-2"></img>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] rounded-box w-36 rounded-none border-[#D1D1D1]"
                  >
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <img src={Eye}></img> View Analysis
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#D55454]">
                        <img src={TrashCan}></img> Delete
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <img src={Download}></img> Download
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            {/* row 3 */}
            <tr className="hover">
              <th>3</th>
              <td>Sample recording 1</td>
              <td>2023-01-01 01:01:01</td>
              <td>2023-01-01 01:01:01</td>
              <td>David</td>
              <td>Inquiry</td>
              <td>Positive</td>
              <td className="flex justify-center items-center">
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="btn m-1 bg-[#FFFFFF] border-[#FFFFFF] hover:bg-[#F6F4FC] hover:border-[#F6F4FC] hover:outline-none"
                  >
                    <img src={ThreeDotsVertical} className="mt-2"></img>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] rounded-box w-36 rounded-none border-[#D1D1D1]"
                  >
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <img src={Eye}></img> View Analysis
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#D55454]">
                        <img src={TrashCan}></img> Delete
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <img src={Download}></img> Download
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr className="hover">
              <th>4</th>
              <td>Sample recording 1</td>
              <td>2023-01-01 01:01:01</td>
              <td>2023-01-01 01:01:01</td>
              <td>David</td>
              <td>Inquiry</td>
              <td>Positive</td>
              <td className="flex justify-center items-center">
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="btn m-1 bg-[#FFFFFF] border-[#FFFFFF] hover:bg-[#F6F4FC] hover:border-[#F6F4FC] hover:outline-none"
                  >
                    <img src={ThreeDotsVertical} className="mt-2"></img>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] rounded-box w-36 rounded-none border-[#D1D1D1]"
                  >
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <img src={Eye}></img> View Analysis
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#D55454]">
                        <img src={TrashCan}></img> Delete
                      </a>
                    </li>
                    <li className="hover:bg-[#9554FE] hover:text-[#FFFFFF]">
                      <a className="text-[#9554FE]">
                        <img src={Download}></img> Download
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

export default RecordingList;