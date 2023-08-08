import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import mastercardImage from "../assets/Mastercard.png";
import visaImage from "../assets/Visa.png";
import AuthService from "../services/auth.service";
import authHeader from '../services/auth-header';

// PAYMENT NEEDS TO GET PLAN INFO FROM DATABASE
// INSTEAD OF HARD CODING $10 $20

function PaymentForm() {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.state);
    const selectedPlan = location.state;

    const token = authHeader();

    const [formData, setFormData] = useState({
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      securityCode: ""
    })

    const [cardholderNameMessage, setCardholderNameMessage] = useState('');
    const [cardNumberMessage, setCardNumberMessage] = useState('');
    const [expiryDateMessage, setExpiryDateMessage] = useState('');
    const [securityCodeMessage, setSecurityCodeMessage] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;


    useEffect(() => {
      // Get today's date
      const today = new Date();
      const day = today.getDate();
      const month = today.toLocaleString('default', { month: 'short' });
      const year = today.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;
      setCurrentDate(formattedDate);
    }, []);

    const restrictCardNumberInput = (event) => {
      setCardNumberMessage('');
      let inputValue = event.target.value;
      
      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');
      inputValue = inputValue.substring(0, 19);
      setFormData({...formData, cardNumber: inputValue})
    }

    const restrictSecurityCodeInput = (event) => {
      setSecurityCodeMessage('');
      let inputValue = event.target.value;

      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.substring(0, 3);
      setFormData({...formData, securityCode: inputValue})
    }

    const restrictExpiryDateInput = (event) => {
      setExpiryDateMessage('');
      let inputValue = event.target.value;
      inputValue = inputValue.replace(/\D/g, '');

      if (inputValue.length > 0) {
        if(inputValue.length == 1){
          let month = inputValue.substring(0, 1);
          if (parseInt(month) > 1) {
            month = '0' + month;
            inputValue = month + '/';
          } else{
            inputValue = month;
          }
        } else{
          let month = inputValue.substring(0, 2);
          const year = inputValue.substring(2, 4);

          if (parseInt(month) > 12) {
            setExpiryDateMessage("Enter a valid month.")
          } 

          inputValue = month + '/' + year;
        }
      }
      setFormData({...formData, expiryDate: inputValue})
    }

    const handleExpiryDateKeyDown = (event) => {
      if (event.key === 'Backspace' && event.target.value.replace(/\D/g, '').length == 2) {
        setFormData({...formData, expiryDate: event.target.value.substring(0, 2)})
      }
    };

    const handleCardholderNameBlur = (event) => {
      if(event.target.value.trim() === "") {
        setCardholderNameMessage('Cardholder name required.')
      }

      if (!namePattern.test(event.target.value)) {
        setCardholderNameMessage('Enter a valid name.');
      }


    };

    const handleCardNumberBlur = (event) => {
      if(event.target.value.length != 19) {
        setCardNumberMessage('Enter a valid credit card number.')
      }
    };

    const handleExpiryDateBlur = (event) => {
      const expiry = event.target.value.replace(/\D/g, '');
      const month = parseInt(expiry.substring(0, 2));
      const year = parseInt(expiry.substring(2, 4));
      if(expiry.trim() === "" || expiry.length < 4) {
        setExpiryDateMessage('Enter a valid expiration date.')
      } else if(expiry.length == 4) {
        if((month < new Date().getMonth() && year == new Date().getFullYear() % 100)|| year < new Date().getFullYear() % 100) {
          setExpiryDateMessage("Card expired.");
        }
        if(year > new Date().getFullYear() % 100 + 20) {
          setExpiryDateMessage("Year is too far into the future.");
        }
      }
    };

    const handleSecurityCodeBlur = (event) => {
      if(event.target.value.length != 3) {
        setSecurityCodeMessage('Security code is required.')
      }
    };

    const handlePayment = (e) => {

      e.preventDefault();

      if(cardholderNameMessage != "" || cardNumberMessage != "" || expiryDateMessage != "" || securityCodeMessage != "") {

        
        
      } else{

        fetch ('http://localhost:8082/addSubs', {
          method: 'POST',
          headers: {'Authorization': token.Authorization,
                    'Content-Type': 'applicaiton/json'},
          body: JSON.stringify({subs: selectedPlan.planName})
        })
        .then (response => {

          if (response.status == 200) {
            
            console.log('Subscription Added.');
            navigate('/');
          }
          else if (!response.ok) {
            console.log(response.status);
            console.log("Subscription Failed.");
          }
        })

      }

    };
    
  return (
    <>
      <section>
        {/* Gradient */}
        <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
          {/* Gradient */}
          <div className="relative h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#A59CE2]/0 to-[#F8F4FC]">
            {/* Card */}
            <form class="space-y-4 md:space-y-6 flex flex-col justify-center items-center h-2/3" onSubmit={handlePayment}>
              <div class="grid grid-cols-3 w-3/5 h-full bg-white rounded-3xl shadow md:mt-0 xl:p-0">
                <div class="col-span-2 border-r border-gray-400 p-6 space-y-4 sm:p-12 mr-8 text-left flex flex-col justify-center">
                  <h1 class="text-xl font-bold text-gray-900 md:text-2xl text-left">
                    Payment details
                  </h1>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <h3 class="text-sm font-normal text-gray-900 text-left">
                      All fields required
                    </h3>
                    <div className="flex justify-end items-center">
                      <img class="h-5 justify-self-end" src={visaImage} alt="Visa image"></img>
                      <img class="h-7 justify-self-end" src={mastercardImage} alt="Mastercard image"></img>
                    </div>
                  </div>
                    {/* Cardholder name */}
                    <div>
                      <div class="flex items-center">
                          <label class="relative w-full">
                              <input 
                              type="text"
                              name="cardholderName"
                              id="cardholderName"
                              class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                              value={formData.cardholderName}
                              onBlur={handleCardholderNameBlur}
                              onChange={(event) => {
                                setCardholderNameMessage('');
                                setFormData({...formData, cardholderName: event.target.value});
                              }}
                              required
                              >
                              </input>
                              <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                              pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                              peer-valid:text-xs peer-valid:-translate-y-5">Cardholder name</span>
                          </label>
                      </div>
                      {cardholderNameMessage && (
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
                          {cardholderNameMessage}
                        </div>
                      )}
                    </div>

                    {/* Card number */}
                    <div>
                      <div class="flex items-center">
                          <label class="relative w-full">
                              <input 
                              type="text"
                              name="cardNumber"
                              id="cardNumber"
                              class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                              value={formData.cardNumber}
                              onBlur={handleCardNumberBlur}
                              onChange={restrictCardNumberInput}
                              required
                              ></input>
                              <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                              pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                              peer-valid:text-xs peer-valid:-translate-y-5">Card number</span>
                              <div class="absolute right-2 top-1/2 transform -translate-y-1/2">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="grey" class="w-8 h-8">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                  </svg>
                              </div>
                          </label>
                      </div>
                      {cardNumberMessage && (
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
                          {cardNumberMessage}
                        </div>
                      )}
                    </div>

                    {/* Expiry date and security */}
                    <div>
                      <div class="grid grid-cols-2 gap-4">
                          <label class="relative w-full">
                              <input 
                              type="text"
                              name="expiryDate"
                              id="expiryDate"
                              class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                              value={formData.expiryDate}
                              onKeyDown={handleExpiryDateKeyDown}
                              onBlur={handleExpiryDateBlur}
                              onChange={restrictExpiryDateInput}
                              required
                              ></input>
                              <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                              pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                              peer-valid:text-xs peer-valid:-translate-y-5">MM/YY</span>
                          </label>
                          <label class="relative w-full">
                              <input 
                              type="password"
                              name="securityCode"
                              id="securityCode"
                              class="border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-indigo-600 block w-full p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full duration-200 peer focus:border-indigo-60 bg-white"
                              value={formData.securityCode}
                              onBlur={handleSecurityCodeBlur}
                              onChange={restrictSecurityCodeInput}
                              required
                              ></input>
                              <span class="absolute left-0 top-2.5 px-1 text-sm text-gray-400 tracking-wide peer-focus:text-indigo-600
                              pointer-events-none duration-200 peer-focus:text-xs peer-focus:-translate-y-5 bg-white ml-2
                              peer-valid:text-xs peer-valid:-translate-y-5">Security code</span>
                          </label>
                      </div>
                      <div class="grid grid-cols-2 gap-4">
                        {expiryDateMessage && (
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
                            {expiryDateMessage}
                          </div>
                        )}
                        {!expiryDateMessage && (
                          <div>&nbsp;</div>
                        )}
                        {securityCodeMessage && (
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
                            {securityCodeMessage}
                          </div>
                        )}
                      </div>
                    </div>
                </div>
                
                {/* Right part */}
                <div className="pr-6 col-span-1 text-left flex flex-col justify-center">
                  <div>
                    <h1 class="text-xl font-bold text-gray-900 md:text-2xl text-left mb-4">
                      Order summary
                    </h1>
                    <hr class="col-span-2 my-2 border-gray-400"></hr>
                  </div>
                  <div>
                    <div className="grid grid-cols-2">
                      <h3 class="text-base font-semibold text-gray-900 text-left">
                        {selectedPlan.planName} plan
                      </h3>
                      <h3 class="text-base font-semibold text-gray-900 text-right">
                        ${selectedPlan.planPrice}/mo
                      </h3>
                    </div>
                    <h3 class="text-sm font-normal text-gray-500 text-left">
                      Monthly charge
                    </h3>
                    <h3 class="text-sm font-normal text-gray-500 text-left">
                      Biling starts: {currentDate}
                    </h3>
                    <hr class="col-span-2 my-2 border-gray-400"></hr>
                  </div>
                  <div className="grid grid-cols-2 mb-4">
                    <h3 class="text-base font-semibold text-gray-900 text-left">
                      Subtotal
                    </h3>
                    <h3 class="text-base font-semibold text-gray-900 text-right">
                      ${selectedPlan.planPrice}
                    </h3>
                  </div>
                  <div class="flex flex-col items-left text-sm text-justify font-regular mb-4">
                    <p>
                      By continuing, you verify that you are at least 18 years old and agree to the DeepPurple Payments{" "}
                      <Link to="/" class="font-regular text-blue-600 hover:underline">
                          Terms of Service
                      </Link>
                      .
                    </p>
                  </div>
                  <button
                    type="submit"
                    class="w-full text-white bg-[#3C3988] hover:bg-[#351D4F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </form>
            <p class="mt-4 text-xs text-[#3C3988]">
              Copyright © DeepPurple Inc. All rights reserved 2023
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentForm;
