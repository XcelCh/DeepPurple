import React, { useEffect, useState } from "react";
import aboutUs from "../assets/AboutUs.png";
import profilePicture from "../assets/ProfilePicture.png";
import Gui from "../assets/Gui.jpg";
import Alvin from "../assets/Alvin.jpg";
import Bryant from "../assets/Bryant.jpeg";
import Patricia from "../assets/Patricia.JPG";
import Excel from "../assets/Excel.jpeg";
import Raymond from "../assets/Raymond.jpeg";
import { Line, Linkedin, Instagram } from "../assets";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState ({
    firstName : '',
    lastName : '',
    email : '',
    notes : ''
  })

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage]=  useState(false);

  const namePattern = /^(?:[A-Za-z]+){0,10}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //check for entry limit
  useEffect (() => {

    setErrorMessage('');
    console.log(formData.notes.length);

    if(formData.notes.length === 255) {
      setErrorMessage('Max limit is reached.');
    }
  }, [formData.notes])



  //handle submitted form data
  const handleSubmit = (e) => {

    e.preventDefault();
    setErrorMessage('');

    if (formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.notes === '') {
      setErrorMessage('Please fill in all of the above fields.');
      return;
    }

    if (!namePattern.test(formData.firstName)) {
      setErrorMessage('Please fill only alphabetical character in the first name field.');
      return;
    }

    if (!namePattern.test(formData.lastName)) {
      setErrorMessage('Please fill only alphabetical character in the last name field.');
      return;
    }

    if (!emailPattern.test(formData.email)) {
      setErrorMessage('Please fill in a valid email address.');
      return;
    }

    
    
    //send form data to backend
    fetch('http://localhost:8082/sendInquiry', {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(formData)
    })
    .then(response => {
      if(response.ok) {

        console.log('Inquiry Sent.');
        setSuccessMessage(true);
        // navigate('/');
      }
      else if(response.status === 502) {

        console.log('Error Happen.');
        throw new Error('Error Occured');
      }
    })
    .catch(error => {
      console.error(error);
    })
  }

  // console.log(formData);

  return (
    <>
      <div className="bg-[#F7F2FB] h-full">
        <div className="mb-52 pt-48 px-36">
          <img
            className="float-right h-72 max-w-lg ml-auto"
            src={aboutUs}
            alt="vision image"
          ></img>
          <h2 className="mt-5 text-5xl text-[#7566BB] font-bold text-left">
            We're a team of <br></br> creators & innovators
          </h2>
          <p className="my-4 text-lg text-[#414141] text-left">
            We help businesses like yours grow revenue and improve <br></br>
            product quality with analytical software capable of providing
            <br></br> insights of your client’s feeling towards your product.
          </p>
        </div>
        <div className="px-48">
          <h2 className="text-4xl text-[#7566BB] font-bold text-left">
            The People <br></br> Behind DeepPurple
          </h2>
          {/* Line */}
          <div className="flex justify-center mb-8 mt-8">
            <img src={Line} className="content-center"></img>
          </div>
        </div>

        {/* Card */}
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-3 gap-20">
            <ProfileCard
              image={Gui}
              name="Gui Hendro"
              position="Project Leader"
              linkedin="https://www.linkedin.com/in/gui-hendro-295b78217/"
            ></ProfileCard>
            <ProfileCard
              image={Patricia}
              name="Patricia Natasha"
              position="Technical Lead"
              linkedin="https://www.linkedin.com/in/patricia-natasha/"
            ></ProfileCard>
            <ProfileCard
              image={Excel}
              name="Excel Chendrawan"
              position="Documentation Leader"
              linkedin="https://www.linkedin.com/in/excel-chendrawan-5863a7222/"
            ></ProfileCard>
            <ProfileCard
              image={Bryant}
              name="Jonathan Bryant Indramadi"
              position="Developer"
              linkedin="https://www.linkedin.com/in/jonathanbryantindramadi/"
            ></ProfileCard>
            <ProfileCard
              image={Raymond}
              name="Raymond Halim"
              position="Developer"
              linkedin="https://www.linkedin.com/in/raymond-halim-a4352522a/"
            ></ProfileCard>
            <ProfileCard
              image={Alvin}
              name="Teo Wei Jie Alvin"
              position="Developer"
            ></ProfileCard>
          </div>
          {/* End of Card */}
        </div>
        {/* Line */}
        <div className="flex justify-center">
          <img src={Line} className="content-center mt-10 mb-32"></img>
        </div>
        {/* Enquiry */}
        <div className="grid grid-cols-2 py-16 bg-[#B185E0] items-center">
          <div>
            <h2 className="mt-5 ml-32 text-5xl text-[#351D4F] font-bold text-white text-left">
              Have a question? <br></br>
              our team is happy <br></br>
              to assist you
            </h2>
            <p className="ml-32 my-4 text-lg text-[#351D4F] text-left text-white">
              Ask about DeepPurple products, pricing, implementation, <br></br> or
              anything else. Our highly trained reps are standing <br></br> by,
              ready to help.
            </p>
          </div>
          <div>
            <p className="mt-4 mb-4 text-white font-bold">QUESTIONS</p>
            <form>
              <div className="grid grid-cols-2 mr-40 justify-left gap-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="input input-bordered input-md max-w-s"
                  value={formData.firstName}
                  onChange={(event) => setFormData({...formData, firstName : event.target.value})}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="input input-bordered input-md max-w-s"
                  value={formData.lastName}
                  onChange={(event) => setFormData({...formData, lastName : event.target.value})}
                />
              </div>
              <div className="mr-40">
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered input-md w-full mt-4 justify-self-stretch"
                  value={formData.email}
                  onChange={(event) => setFormData({...formData, email : event.target.value})}
                />
                <textarea
                  className="textarea textarea-bordered w-full h-40 mt-4"
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={(event) => setFormData({...formData, notes : event.target.value})}
                  maxLength={255}
                ></textarea>

                {successMessage && (
                  <div className="fixed top-0 left-0 right-0 z-50 pt-32 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full bg-black bg-opacity-50">
                      <div className="relative w-2/5 mx-auto">
                          <div className="relative bg-white rounded-lg shadow">
                              <button onClick={() => setSuccessMessage(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                              </button>
                              <div className="p-8 text-center items-center justify-center flex flex-col">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mb-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                  </svg>
                                  <p className="mb-5 text-lg font-semibold text-[#414141]">Your inquiry has been submitted succesfully! </p>
                                  <button onClick={() => setSuccessMessage(false)} className="text-gray-500 bg-white hover:bg-gray-100 hover:font-semibold focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10">Continue</button>
                              </div>
                          </div>
                      </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="flex items-center text-red-500 text-sm mb-4">
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
                <button className="btn bg-[#FFFFFF] text-[#B185E0] mt-4 border-0" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
