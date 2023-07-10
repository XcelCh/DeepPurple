import React, { useEffect, useState } from "react";

function ChangePassword() {
  const [password, setPassword] = useState("");

  return (
    <>
      {/* Gradient */}
      <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
        {/* Gradient */}
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#A59CE2]/0 to-[#F8F4FC]">
          {/* Card */}
          <div className="flex flex-col justify-center items-center bg-white rounded-3xl shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-16 text-left">
              {/* Change Password */}
              {/* Current password */}
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-left">
                Update Password
              </h1>
              <div className="flex justify-center">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-xs text-[#A5A5A5]">
                      Current Password
                    </span>
                  </label>
                  <input
                    type="Current Password"
                    value={password}
                    className="input input-bordered w-full max-w-xs bg-[#FBFBFB]"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* New password */}
              <div className="flex justify-center">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-xs text-[#A5A5A5]">
                      New Password
                    </span>
                  </label>
                  <input
                    type="New Password"
                    value={password}
                    className="input input-bordered w-full max-w-xs bg-[#FBFBFB]"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* Confirmation Password */}
              <div className="flex justify-center">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-xs text-[#A5A5A5]">
                      Confirm New Password
                    </span>
                  </label>
                  <input
                    type="Confirm New Password"
                    value={password}
                    className="input input-bordered w-full max-w-xs bg-[#FBFBFB]"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="w-full text-white bg-[#3C3988] hover:bg-[#351D4F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick=""
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
