import React, { useEffect, useState } from "react";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-left">
                Update Password
              </h1>
              {/* Current password */}
              <div className="pb-2">
                <p className="text-xs text-[#A5A5A5]">Current Password</p>
              </div>
              <label class="relative w-full">
                <input
                  type="text"
                  name="currentPassword"
                  id="currentPassword"
                  class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                  value={formData.currentPassword}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      currentPassword: event.target.value,
                    })
                  }
                  required
                  placeholder="Current Password"
                ></input>
              </label>
              {/* New password */}
              <div className="pb-2">
                <p className="text-xs text-[#A5A5A5]">New Password</p>
              </div>
              <label class="relative w-full">
                <input
                  type="text"
                  name="newPassword"
                  id="newPassword"
                  class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                  value={formData.newPassword}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      newPassword: event.target.value,
                    })
                  }
                  required
                  placeholder="New password"
                ></input>
              </label>
              {/* Confirm Password */}
              <div className="pb-2">
                <p className="text-xs text-[#A5A5A5]">Confirm Password</p>
              </div>
              <label class="relative w-full">
                <input
                  type="text"
                  name="confirmPassword"
                  id="confirmPassword"
                  class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                  value={formData.confirmPassword}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      confirmPassword: event.target.value,
                    })
                  }
                  placeholder="Confirm Password"
                  required
                ></input>
              </label>
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
