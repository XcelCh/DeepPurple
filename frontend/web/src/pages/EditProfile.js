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
      phoneNum: "",
      dob: "",
      gender: "Gender",
      companyField: "-"
    })

    const navigate = useNavigate();

    const token = authHeader();
    const [dropdown, setDropdown] = useState("");
    const [otherInput, setOtherInput] = useState(false);
    const [message, setMessage] = useState('');
    const [limitError, setLimitError] = useState(false);
    const [success, setSuccess] = useState(false);

    const phonePattern = /^\d{8,}$/;

    const companyFieldArray = ['Education', 'Entertainment/Media', 'F&B', 'FinTech', 
                              'Healthcare/Pharmaceuticals', 'Retail/E-Commerce', 'Technology', 'Telecommunications'];
    useEffect(() => {
      window.scrollTo(0, 0);
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

    }, [])


    const handleSave = () => {

      setMessage('');
      setSuccess(false);

      if (formData.fullName.trim() === '') {
        setMessage('Name field cannot be empty!');
        setLimitError(true);
        return;
      }

      if (formData.phoneNum.trim() === '') {
        setMessage('Phone Number cannot be empty!');
        setLimitError(true);
        return;
      }

      if (!phonePattern.test(formData.phoneNum)) {
          setMessage('Please enter a valid Singapore phone number!');
          setLimitError(true);
          return;
      }

      if (formData.dob === '') {
          setMessage('Date of Birth field cannot be empty!');
          setLimitError(true);
          return;
      }

      if (new Date().setFullYear(new Date().getFullYear() - 18) < new Date(formData.dob)) {
          
          setMessage('You must be at least 18 years old!');
          setLimitError(true);
          return;
      }

      if (formData.gender != "Female" && formData.gender != "Male") {
          setMessage('Select your gender');
          setLimitError(true);
          return;
      }

      if (formData.companyField.trim() === '') {

        setMessage('Company field cannot be empty!');
        setLimitError(true);
        return ;
      }



      const data = {
        'email': formData.email,
        'fullName': formData.fullName,
        'gender': formData.gender,
        'phoneNum': formData.phoneNum,
        'dob': formData.dob,
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
          setMessage('Account has been successfully edited!');
          setSuccess(true);
          setLimitError(true);
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

      if ((!companyFieldArray.includes(formData.companyField)) && formData.companyField !== '-') {
        setDropdown('other');
        setSelectValue('other');
      }
      else {
        setSelectValue(formData.companyField);
      }
    }, [formData.companyField])

  return (
    <>
      <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
        <div className="pt-32">
          <div
            className="md:mx-auto bg-white rounded-t-lg rounded-b-lg border max-w-5xl py-8"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >

            <div className="ml-16">
              <p className="text-xl font-bold text-left col-span-2">
                Edit Profile
              </p>
            </div>
            <div className="grid grid-cols-2 mx-5 my-5">
              {/* Input */}
              <div className="flex justify-center mb-7">
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
                    <option value="Education">Education</option>
                    <option value="Entertainment/Media">Entertainment and Media</option>
                    <option value="F&B">F&B</option>
                    <option value="FinTech">Financial Technology</option>
                    <option value="Healthcare/Pharmaceuticals">Healthcare and Pharmaceuticals</option>
                    <option value="Retail/E-Commerce">Retail and E-Commerce</option>
                    <option value="Technology">Technology</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="other">Other</option>
                  </select>
                  {otherInput == true ? (
                        <input
                          type="text"
                          name="companyField"
                          id="companyField"
                          className="mt-5 mb-5 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                          value={formData.companyField}
                          onChange={(e) => setFormData({...formData, companyField: e.target.value})}
                          placeholder="Enter Industry"
                          required
                        ></input>
                        
                      ) : null}
                      {limitError && (
                        <div className="fixed top-0 left-0 right-0 z-50 pt-32 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full bg-black bg-opacity-50">
                            <div className="relative w-2/5 mx-auto">
                                <div className="relative bg-white rounded-lg shadow">
                                    <button onClick={() => setLimitError(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-8 text-center items-center justify-center flex flex-col">
                                      {success ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-16 h-16 mb-4">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                      ) : (    
                                        <svg className="mx-auto mb-4 text-[#414141] w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                      )}
                                        <p className="mb-5 text-lg font-semibold text-[#414141]">{message}</p>
                                        <button onClick={() => setLimitError(false)} className="text-gray-500 bg-white hover:bg-gray-100 hover:font-semibold focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10">Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                      )}
                </div>
              </div>


              {/* Save Button */}
              <div></div>
              <div className="justify-end flex mr-20">
                <button
                  className="btn rounded-full btn-sm bg-[#5A3D86] normal-case min-w-[25%] h-10"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
