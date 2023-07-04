import React from "react";
import { ShortLine, Tick } from "../assets"

function Pricing() {
    return (
      <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]">
        <h2 className="text-4xl text-[#351D4F] font-bold dark:text-white ml-40 mr-40 pt-20 text-center">
          Pricing to suit all sizes of business
        </h2>
        <p className="text-sm text-[#83848A] text-center ml-40 mr-40 mt-2">
          Choose a plan that works best for you and your team.
        </p>
        <div className="grid grid-cols-2 mt-5 ml-40 mr-40 gap-0">
          {/* BASIC */}
          <div className="container md:mx-auto bg-white rounded-3xl h-96 w-80 my-5 border max-w-5xl drop-shadow-lg">
            <h2 className="text-3xl text-[#351D4F] font-bold mt-5 ml-12">
              Basic
            </h2>
            <div className="grid grid-cols-2 mb-8">
              <h2 className="text-6xl text-[#351D4F] font-bold mt-5 text-right">
                $0
              </h2>
              <p className="text-sm text-[#83848A] mt-10 ml-2 ">/MO</p>
            </div>
            <div className="flex justify-center">
              <img src={ShortLine}></img>
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
            <div className="flex ml-10 mt-5">
              <img src={Tick} className="mr-5"></img>
              <p className="text-sm font-bold">Unlimited Text</p>
            </div>
          </div>
          {/* PRO */}
          <div className="container md:mx-auto bg-white rounded-3xl h-96 w-80 my-5 border max-w-5xl drop-shadow-lg">
            <h2 className="text-3xl text-[#351D4F] font-bold mt-5 ml-12">
              Pro
            </h2>
            <div className="grid grid-cols-2 mb-8 ml-14">
              <h2 className="text-6xl text-[#351D4F] font-bold mt-5 text-right">
                $10
              </h2>
              <p className="text-sm text-[#83848A] mt-10 ml-2 ">/MO</p>
            </div>
            <div className="flex justify-center">
              <img src={ShortLine}></img>
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
            <div className="flex ml-10 mt-5">
              <img src={Tick} className="mr-5"></img>
              <p className="text-sm font-bold">Unlimited Text</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Pricing;