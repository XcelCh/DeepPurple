import React, {useState} from 'react';
import { Camera } from "../assets";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "../components/DatePicker";
function EditProfile() {
 
  return (
    <>
      <div className="bg-gradient-to-tr from-[#D5B4D6] via-[#D3CBEF] via 40% to-[#9487E7] border">
        <div
          className="container md:mx-auto bg-white rounded-t-lg rounded-b-lg h-screen my-5 border max-w-5xl"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <div className="grid grid-cols-2 mx-5 my-5">
            <div className="ml-12 mt-2 mb-5">
              <p className="text-md font-bold text-left col-span-2">
                Edit Profile
              </p>
            </div>

            {/* Profile Picture */}
            <p className="text-xs text-[#A5A5A5] col-span-2 text-center">
              Profile Picture
            </p>

            <div className="col-span-2 flex justify-center my-5">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
                <div className="place-self-end absolute top-17 right-0">
                  <img src={Camera}></img>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className=" flex justify-center mb-7">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  value="Gui Hendro"
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB] text-lg"
                />
              </div>
            </div>
            <div className="flex justify-center mb-7">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Gender
                  </span>
                </label>
                <select className="select select-bordered w-full max-w-xs font-light text-lg">
                  <option selected>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center mb-7">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Phone Number
                  </span>
                </label>
                <input
                  type="text"
                  value="+658031233"
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB] text-lg"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Date of Birth
                  </span>
                </label>
                {/* <input
                  type="text"
                  value="05/08/2002"
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB]"
                /> */}
                {/* <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
                <DatePicker></DatePicker>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Email
                  </span>
                </label>
                <input
                  type="text"
                  value="gui@gmail.com"
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB] text-lg"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Password
                  </span>
                </label>
                <input
                  type="text"
                  value="12345"
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB] text-lg"
                />
              </div>
            </div>

            <div className="ml-12">
              <button className="btn rounded-full btn-sm bg-[#351D4F] mt-10 normal-case min-w-[25%] h-10">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
