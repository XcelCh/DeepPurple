import React, {useEffect, useState} from 'react';
import { Camera } from "../assets/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, userNavigate } from "react-router-dom";
import authHeader from "../services/auth-header";

function EditProfile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [dob , setDOB] = useState(new Date());


    const navigate = useNavigate();

    const token = authHeader();

    useEffect(() => {

      fetch ("http://localhost:8080/editProfile",{
          headers: token
        })
          .then(response => {
            // error unauthorized
            if (response.status == 401) {
                navigate("/");
                console.log("401 Unauthorized");
            }
            else if (response.status == 200) {
              console.log("Success");
              return response.json();
            }
          })
          .then(data => {
            
            setEmail(data.email);
            setFullName(data.fullName);
            setGender(data.gender);
            setPhoneNum(data.phoneNum);
            setDOB(new Date(data.dob));
            console.log(email, fullName, gender, phoneNum, dob);
          })
          .catch(error => {
            console.error(error);
          });

    }, [])
    
    useEffect(() => {

      if (password == '') {
        
        setPassword(null);
      }
    }, [password])

    const handleSave = () => {


      const data = {
        'email': email,
        'fullName': fullName,
        'password': password,
        'gender': gender,
        'phoneNum': phoneNum,
        'dob': dob,
        'roles': null
      }

      console.log(JSON.stringify(data));

      fetch ("http://localhost:8080/editProfile", {
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
                  value={fullName}
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB]"
                  onChange = {(e) => setFullName(e.target.value)}
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
                <select value = {gender} onChange = {(e) => setGender(e.target.value)} className="select select-bordered w-full max-w-xs">
                  <option value = "Male">Male</option>
                  <option value = "Female">Female</option>
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
                  value={phoneNum}
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB]"
                  onChange={(e) => setPhoneNum(e.target.value)}
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
                <DatePicker
                  selected={dob}
                  onChange={(date) => setDOB(date)}
                />
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
                  value={email}
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB]"
                  disabled
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
                  type="password"
                  value={password}
                  className="input input-bordered w-full max-w-xs bg-[#FBFBFB]"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="ml-12">
              <button 
                className="btn rounded-full btn-sm bg-[#351D4F] mt-10 normal-case min-w-[25%] h-10"
                onClick = {handleSave}
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
