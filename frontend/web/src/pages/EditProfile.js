import React, {useEffect, useState} from 'react';
import { Camera } from "../assets/index";
import { useNavigate, userNavigate } from "react-router-dom";
import authHeader from "../services/auth-header";

import Datepicker from '../components/DatePicker2';
import AuthService from '../services/auth.service';

function EditProfile() {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNum: "",
      dob: "",
      gender: "Gender",
      companyField: "-"
    })
    const [profilePic, setProfilePic] = useState('');

    const navigate = useNavigate();

    const token = authHeader();
    const [dropdown, setDropdown] = useState("");
    const [otherInput, setOtherInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

      fetch ("http://localhost:8082/profile/editProfile",{
          headers: token
        })
          .then(response => {
            // error unauthorized
            if (response.status == 401) {

                const user = AuthService.getCurrentUser();
                if (user) {
                  AuthService.logout();
                }
                console.log("401 Unauthorized");
                navigate("/unauthorizedPage");
                
            }
            else if (response.status == 200) {
              console.log("Success");
              return response.json();
            }
          })
          .then(data => {

            console.log(data);

            setFormData((formData) => ({
                        ...formData, 
                        fullName: data.fullName,
                        email: data.email, 
                        gender: data.gender, 
                        phoneNum: data.phoneNum, 
                        dob: data.dob,
                        companyField: data.companyField}));
                
            
          })
          .catch(error => {
            console.error(error);
          });

      setProfilePic(sessionStorage.getItem("profilepic"));

    }, [])


    const handleSave = () => {

      setErrorMessage('');

      if (formData.companyField === '') {
        setErrorMessage('Company Field cannot be empty!');
        return ;
      }

      const data = {
        'email': formData.email,
        'fullName': formData.fullName,
        'password': null,
        'gender': formData.gender,
        'phoneNum': formData.phoneNum,
        'dob': formData.dob,
        'roles': null,
        'profilePic': null,
        'companyField': formData.companyField
      }

      console.log(JSON.stringify(data));

      fetch ("http://localhost:8082/profile/editProfile", {
        method : 'POST',
        headers : {'Authorization' : token.Authorization,
                 'Content-Type' : 'application/json'} ,
        body : JSON.stringify(data),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Send data failed.');
        }
        else {
          navigate('/');
          console.log('Success sending data.');
        }
      })
      .catch (error =>  {
          console.error(error);
      })
 
    }

    const [selectValue, setSelectValue] = useState('');

    const handleDropdown = (selected) => {
      console.log(selected);
      setDropdown(selected);
      if (selected !== 'other') {
        setFormData({...formData, companyField: selected});
      }
      else {
        setFormData({...formData, companyField:''});
      }
    };

    useEffect(() => {
    
      if (dropdown == "other") {

        setOtherInput(true);
      } else {
        setOtherInput(false);
      }
    }, [dropdown]);

    useEffect (() => {

      if (formData.companyField !== 'FnB' && formData.companyField !== 'FinTech' && formData.companyField !== '-') {
        setDropdown('other');
        setSelectValue('other');
      }
      else {
        setSelectValue(formData.companyField);
      }
    }, [formData.companyField])

  return (
    <>
      <div className="bg-gradient-to-tr from-[#D5B4D6] via-[#D3CBEF] via 40% to-[#9487E7] border">
        <div
          className="md:mx-auto bg-white rounded-t-lg rounded-b-lg my-5 border max-w-5xl"
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
                  <img src={profilePic} />
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
                  value={formData.fullName}
                  className="input input-bordered w-full max-w-xs "
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
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
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="select select-bordered w-full max-w-xs font-normal"
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
                  value={formData.phoneNum}
                  className="input input-bordered w-full max-w-xs "
                  onChange={(e) => setFormData({...formData, phoneNum: e.target.value})}
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
                <Datepicker formData={formData} setFormData={setFormData} ></Datepicker>
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
                  value={formData.email}
                  className="input input-bordered w-full max-w-xs "
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-xs text-[#A5A5A5]">
                    Company Field
                  </span>
                </label>
                <select
                  value={selectValue}
                  onChange={(e) => handleDropdown(e.target.value)}
                  className="select select-bordered w-full max-w-xs font-normal"
                >
                  <option value ="-" selected>-</option>
                  <option value="FnB">F&B</option>
                  <option value="FinTech">Financial Technology</option>
                  <option value="other">Other</option>
                </select>
                {otherInput == true ? (
                      <input
                        type="text"
                        name="companyField"
                        id="companyField"
                        className="mt-5 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                        value={formData.companyField}
                        onChange={(e) => setFormData({...formData, companyField: e.target.value})}
                        placeholder="Enter Industry"
                        required
                      ></input>
                      
                    ) : null}
                    {errorMessage && (
                        <div className="flex items-center text-red-500 text-sm mt-2">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 mr-2"
                            >
                            <path
                                fillRule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                            </svg>
                            {errorMessage}
                        </div>
                    )}
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
