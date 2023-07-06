import React from "react";
import { ShortLine, Tick } from "../assets"
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";

function Pricing() {

  const user = AuthService.getCurrentUser();
  const toPath = user ? "/" : "/signUpForm" // Later change the else to subscription form

    return (
      <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
        <h2 className="text-4xl text-[#351D4F] font-bold dark:text-white ml-40 mr-40 pt-16 text-center">
          Pricing to suit all sizes of business
        </h2>
        <p className="text-md font-semibold text-white text-center ml-40 mr-40 mt-2">
          Choose a plan that works best for you and your team.
        </p>
        <div className="grid grid-cols-2 mt-5 ml-40 mr-40 gap-0 place-items-center">
          {/* BASIC */}
          <div className="container bg-white rounded-3xl h-full w-80 border max-w-5xl drop-shadow-lg">
            <h2 className="text-3xl text-[#351D4F] font-bold mt-5 ml-12">
              Basic
            </h2>
            <div className="grid grid-cols-2 mb-8 ml-5 flex items-center justify-center">
              <h2 className="text-6xl text-[#351D4F] font-bold mt-5 text-right">
                $0
              </h2>
              <p className="text-sm text-[#83848A] mt-10 ml-2 ">/MO</p>
            </div>
            <div className="flex justify-center">
              <img src={ShortLine}></img>
            </div>
            <div className="ml-12">
              <div className="flex ml-10 mt-5">
                <img src={Tick} className="mr-5"></img>
                <p className="text-sm font-bold">Unlimited Text</p>
              </div>
              <div className="flex ml-10 mt-5">
                <img src={Tick} className="mr-5"></img>
                <p className="text-sm font-bold">Unlimited Text</p>
              </div>
              <div className="flex ml-10 mt-5">
                <img src={Tick} className="mr-5"></img>
                <p className="text-sm font-bold">Unlimited Text</p>
              </div>
              <div className="flex ml-10 mt-5">
                <img src={Tick} className="mr-5"></img>
                <p className="text-sm font-bold">Unlimited Text</p>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">
              <Link
                to={toPath}
                className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-white bg-[#9554FE] rounded-lg hover:bg-[#6F2DA8] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Buy now
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          {/* PRO */}
          <div className="container bg-white rounded-3xl h-full w-80 my-5 border max-w-5xl drop-shadow-lg">
            <h2 className="text-3xl text-[#351D4F] font-bold mt-5 ml-12">
              Pro
            </h2>
            <div className="grid grid-cols-2 mb-8 ml-14 flex items-center justify-center">
              <h2 className="text-6xl text-[#351D4F] font-bold mt-5 text-right">
                $10
              </h2>
              <p className="text-sm text-[#83848A] mt-10 ml-2 ">/MO</p>
            </div>
            <div className="flex justify-center">
              <img src={ShortLine}></img>
            </div>
            <div className="ml-12">
              <div className="flex ml-10 mt-5">
                <img src={Tick} className="mr-5"></img>
                <p className="text-sm font-bold">Unlimited Text</p>
              </div>
              <div className="flex ml-10 mt-5">
                <img src={Tick} className="mr-5"></img>
                <p className="text-sm font-bold">Unlimited Text</p>
              </div>
              <div className="flex ml-10 mt-5">
                <img src={Tick} className="mr-5"></img>
                <p className="text-sm font-bold">Unlimited Text</p>
              </div>
              <div className="flex ml-10 mt-5">
                <img src={Tick} className="mr-5"></img>
                <p className="text-sm font-bold">Unlimited Text</p>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">
              <Link
                to={toPath}
                className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-white bg-[#9554FE] rounded-lg hover:bg-[#6F2DA8] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Buy now
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Pricing;