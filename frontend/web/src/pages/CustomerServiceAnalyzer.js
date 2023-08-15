import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import agentPicture from "../assets/AgentPicture.png";
import customerAnalyzer1 from "../assets/CustomerAnalyzer1.png";
import customerAnalyzer2 from "../assets/CustomerAnalyzer2.png";
import customerAnalyzer3 from "../assets/CustomerAnalyzer3.png";
import { Link } from "react-router-dom";
import authHeader from "../services/auth-header";
import AuthService from "../services/auth.service";

function CustomerServiceAnalyzer() {
    const token = authHeader();
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch ('http://localhost:8082/check', {
            headers : token,
        })
        .then(response => {
            if (response.ok) { 
                // Card exist
                navigate("/recordingList");
            }
        })
        .catch (error => {
            console.error(error);
        })
    }, []);

    return(
        <>
            <div className="h-full bg-[#F7F2FB]">
                <div className="h-screen bg-[#5A3D86]">
                    <div className="grid grid-cols-2 items-center gap-24 h-full px-24">
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <p className="text-6xl font-black text-[#9AE8B7]">Customer</p>
                                <div className="flex items-center text-6xl font-black">
                                    <p className="text-white mr-4">Service</p>
                                    <p className="text-[#FFAFAF]">Analyzer</p>
                                </div>
                            </div>
                            <p className="text-lg text-white">Analyze your customer service recordings, gain valuable insights such as sentiment analysis, and leverage the findings to enhance employee performance, ultimately delivering exceptional customer experiences.</p>
                            <div className="inline-block mt-6">
                                {user ? (
                                    <Link to="/billing">
                                        <button
                                        type="button"
                                        className="text-[#60388B] bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-lg px-8 py-3 text-center"
                                        >
                                        Add payment
                                        </button>
                                    </Link>
                                ) : (
                                    <Link to="/signUpForm">
                                        <button
                                        type="button"
                                        className="text-[#60388B] bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-lg px-8 py-3 text-center"
                                        >
                                        Create account
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div>
                            <img src={agentPicture}></img>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-24 h-full pt-24 px-24">
                    <div>
                        <img src={customerAnalyzer1}></img>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <p className="text-3xl font-bold text-[#7566BB]">Efficient Recording Assignment</p>
                            </div>
                            <p className="text-lg text-[#414141]">
                                Effortlessly upload your recording files or folders, simplifying
                                the assignment process to designated employees responsible
                                for managing the calls. This user-friendly feature enables
                                automatic allocation based on folder names, delimiters, or
                                specific employee criteria, effectively enhancing the
                                organization of your data and efficiently saving you precious
                                time.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-24 h-full pt-24 px-24">
                    <div>
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <p className="text-3xl font-bold text-[#7566BB]">Comprehensive Sentiment Analysis</p>
                            </div>
                            <p className="text-lg text-[#414141]">
                                Gain comprehensive insights from your customer service recordings,
                                delving into customer sentiment, employee/agent sentiment, and call
                                sentiment. Additionally, dissect the sentiment of each employee across
                                all managed calls, enabling a thorough understanding of individual
                                performance and enhancing overall service quality.
                            </p>
                        </div>
                    </div>
                    <div>
                        <img src={customerAnalyzer2}></img>
                    </div>
                </div>
                <div className="py-24 px-24 relative">
                    {/* card */}
                    <div className="border rounded-4xl bg-[#414141] p-24 grid grid-cols-5 items-center gap-24 relative">
                        <div className="col-span-2">
                            <div className="flex flex-col">
                                <div className="mb-6 font-bold">
                                    <div className="flex items-center text-5xl">
                                        <p className="text-white mr-4">Start</p>
                                        <p className="text-[#9AE8B7]">improving</p>
                                    </div>
                                    <p className="text-5xl text-white">your services</p>
                                    <p className="text-5xl text-[#FFAFAF]">today!</p>
                                </div>
                                <div className="flex items-center inline-block">
                                    {user ? (
                                        <Link to="/billing">
                                            <button
                                            type="button"
                                            className="text-[#414141] bg-[#ABE5BB] hover:bg-[#7DBC8F] focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-lg px-8 py-3 text-center"
                                            >
                                                Add payment
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link to="/signUpForm">
                                            <button
                                            type="button"
                                            className="text-[#414141] bg-[#ABE5BB] hover:bg-[#7DBC8F] focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-lg px-8 py-3 text-center"
                                            >
                                                Create account
                                            </button>
                                        </Link>
                                    )}
                                    
                                    <a href="/pricing" className="ml-8 inline-flex items-center text-white hover:underline">
                                        <p>View pricing</p>
                                        <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 absolute top-8 right-16">
                            <img
                                src={customerAnalyzer3}
                                alt="Customer Analyzer"
                                style={{ width: '600px', height: '450px' }}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default CustomerServiceAnalyzer;