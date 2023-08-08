import React from "react";
import Footer from "../components/Footer";
import {
    AgentPicture
} from "../assets/index";
import { Link } from "react-router-dom";

function CustomerServiceAnalyzer() {
    return(
        <>
            <div className="grid grid-cols-2 h-screen bg-[#60388B] gap-24 items-center">
                <div className="flex flex-col ml-36">
                    <div className="mb-6">
                        <p className="text-6xl font-black text-[#9AE8B7]">Customer</p>
                        <div className="flex items-center text-6xl font-black">
                            <p className="text-white mr-4">Service</p>
                            <p className="text-[#FFAFAF]">Analyzer</p>
                        </div>
                    </div>
                    <p className="text-lg text-white">Analyze your customer service recordings, gain valuable insights such as sentiment analysis, and leverage the findings to enhance employee performance, ultimately delivering exceptional customer experiences.</p>
                    <Link to="/signUpForm">
                        <button
                        type="button"
                        class="text-[#60388B] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-1.5 text-center mr-8"
                        >
                        Log in
                        </button>
                    </Link>
                </div>
                <div>
                    asd
                </div>
            </div>
        </>
    );
}

export default CustomerServiceAnalyzer;