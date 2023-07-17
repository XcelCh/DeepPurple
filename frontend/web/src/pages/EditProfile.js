import React, { useEffect, useState } from "react";
import { Camera } from "../assets/index";
import { useNavigate, userNavigate } from "react-router-dom";
import authHeader from "../services/auth-header";
import DatePicker from "../components/DatePicker";

function EditProfile() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [dob, setDOB] = useState(new Date());

  const navigate = useNavigate();

  const token = authHeader();

  useEffect(() => {
    fetch("http://localhost:8082/editProfile", {
      headers: token,
    })
      .then((response) => {
        // error unauthorized
        if (response.status == 401) {
          navigate("/");
          console.log("401 Unauthorized");
        } else if (response.status == 200) {
          console.log("Success");
          return response.json();
        }
      })
      .then((data) => {
        setEmail(data.email);
        setFullName(data.fullName);
        setGender(data.gender);
        setPhoneNum(data.phoneNum);
        setDOB(new Date(data.dob));
        console.log(email, fullName, gender, phoneNum, dob);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSave = () => {
    const data = {
      email: email,
      fullName: fullName,
      password: "",
      gender: gender,
      phoneNum: phoneNum,
      dob: dob,
      roles: null,
    };

    console.log(JSON.stringify(data));

    fetch("http://localhost:8082/editProfile", {
      method: "POST",
      headers: {
        Authorization: token.Authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Send data failed.");
        } else {
          navigate("/");
          console.log("Success sending data.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                    Full Name
                  </span>
                </label>
                <label class="relative w-full">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    required
                  ></input>
                </label>
              </div>
            </div>

            {/* <div className="flex justify-center mb-7">
              <div className="form-control w-full max-w-xs">
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Dropdown button"
                >
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div> */}
            <div className="flex justify-center mb-7">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Gender
                  </span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs font-normal h-11"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
                  name="phoneNum"
                  id="phoneNum"
                  class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  placeholder="Phone Number"
                  required
                ></input>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Date of Birth
                  </span>
                </label>
                <DatePicker
                  formData={dob}
                  setFormData={(date) => setDOB(date)}
                ></DatePicker>
              </div>
            </div>
            <div className="flex justify-center mb-7">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Email
                  </span>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  disabled
                ></input>
                {/* <input
                  type="text"
                  value={email}
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB]"
                  disabled
                /> */}
              </div>
            </div>

            {/* Save Button */}
            <div></div>
            <div className="ml-20">
              <button
                className="btn rounded-full btn-sm bg-[#351D4F] mt-8 normal-case min-w-[25%] h-10"
                onClick={handleSave}
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

export default EditProfile;
