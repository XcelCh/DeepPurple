import React, {useEffect, useState} from "react";
import { ShortLine, Tick } from "../assets"
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";

function Pricing() {

  const user = AuthService.getCurrentUser();
  const [basicPlan, setBasicPlan] = useState({
    planName: '',
    planPrice: 0.0
  })

  const [proPlan, setProPlan] = useState({
    planName: '',
    planPrice: 0.0
  })

  useEffect (() => {

    fetch('http://localhost:8082/getPricing')
    .then(response => {

      if(response.ok){

        console.log('Get Price Success.');
        return response.json();
      }
    })
    .then(data => {

      console.log(data.Basic);
      setBasicPlan({...basicPlan, planPrice: data.Basic});
      setProPlan({...proPlan, planPrice: data.Professional});
      
    })
    .catch(error => {
      console.error(error);
    })

  }, [])


  


  
  return (
    <div className="bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
      <h2 className="text-4xl text-[#351D4F] font-bold dark:text-white ml-40 mr-40 pt-16 text-center">
        Pricing to suit all sizes of business
      </h2>
      <p className="text-md font-semibold text-white text-center ml-40 mr-40 mt-2">
        Choose a plan that works best for you and your team.
      </p>
      <div className="grid grid-cols-2 mt-5 ml-40 mr-40 gap-0 mb-20">
        {/* BASIC */}
        <div className="md:mx-auto bg-white rounded-3xl h-full w-80 my-5 border max-w-5xl drop-shadow-lg">
          <h2 className="text-3xl text-[#351D4F] font-bold mt-5 ml-12">
            {basicPlan.planName}
          </h2>
          <div className="grid grid-cols-2 mb-8">
            <h2 className="text-6xl text-[#351D4F] font-bold mt-5 text-right">
              ${basicPlan.planPrice}
            </h2>
            <p className="text-sm text-[#83848A] mt-10 ml-2 ">/MO</p>
          </div>
          <div className="flex justify-center">
            <img src={ShortLine}></img>
          </div>
            <div className="flex mt-5 justify-center">
              <img src={Tick} className="mr-5"></img>
              <p className="text-sm font-bold">Unlimited Text</p>
            </div>
            <div className="flex mt-5 justify-center">
              <img src={Tick} className="mr-5"></img>
              <p className="text-sm font-bold">Unlimited Text</p>
            </div>
            <div className="flex mt-5 justify-center">
              <img src={Tick} className="mr-5"></img>
              <p className="text-sm font-bold">Unlimited Text</p>
            </div>
            <div className="flex mt-5 justify-center">
              <img src={Tick} className="mr-5"></img>
              <p className="text-sm font-bold">Unlimited Text</p>
            </div>
          <div className="flex items-center justify-center mt-8">
            <Link to={user ? "/paymentForm" : "/signUpForm"} state={basicPlan} className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-white bg-[#3C3988] rounded-lg hover:bg-[#351D4F] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Buy now
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
          </div>
          
        </div>
        {/* PRO */}
        <div className="md:mx-auto bg-white rounded-3xl h-full w-80 my-5 border max-w-5xl drop-shadow-lg">
          <h2 className="text-3xl text-[#351D4F] font-bold mt-5 ml-12">
            {proPlan.planName}
          </h2>
          <div className="grid grid-cols-2 mb-8 ml-14">
            <h2 className="text-6xl text-[#351D4F] font-bold mt-5 text-right">
              ${proPlan.planPrice}
            </h2>
            <p className="text-sm text-[#83848A] mt-10 ml-2 ">/MO</p>
          </div>
          <div className="flex justify-center">
            <img src={ShortLine}></img>
          </div>
          <div className="flex mt-5 justify-center">
            <img src={Tick} className="mr-5"></img>
            <p className="text-sm font-bold">Unlimited Text</p>
          </div>
          <div className="flex mt-5 justify-center">
            <img src={Tick} className="mr-5"></img>
            <p className="text-sm font-bold">Unlimited Text</p>
          </div>
          <div className="flex mt-5 justify-center">
            <img src={Tick} className="mr-5"></img>
            <p className="text-sm font-bold">Unlimited Text</p>
          </div>
          <div className="flex mt-5 justify-center">
            <img src={Tick} className="mr-5"></img>
            <p className="text-sm font-bold">Unlimited Text</p>
            </div>
          <div className="flex items-center justify-center mt-8">
            <Link to={user ? "/paymentForm" : "/signUpForm"} state={proPlan} className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-white bg-[#3C3988] rounded-lg hover:bg-[#351D4F] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Buy now
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;