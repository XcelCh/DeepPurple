import trainImage from "../assets/train.jpg";
import accurateImage from "../assets/Accurate.png";
import clockImage from "../assets/Clock.png";
import lampImage from "../assets/Lamp.png";
import firstPlaceholderImage from "../assets/Placeholder1.png";
import secondPlaceholderImage from "../assets/Placeholder2.png";
import cardImage from "../assets/Card.png";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link, useLocation } from "react-router-dom";
import React from 'react';

function LandingPage() {
  return (
    <>
        {/* <NavBar /> */}
        {/* Landing Header */}
        <div>
            {/* First layer gradient */}
            <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]"> 
                {/* Second layer gradient */}
                <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#A59CE2]/0 to-[#F8F4FC]">
                    {/* Content */}
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">We turn words into insights.</h1>
                    <p className="mb-6 text-lg font-bold text-center text-white lg:text-xl sm:px-16 xl:px-64 dark:text-gray-400">DeepPurple helps you to understand the sentiment and emotion <br></br> of your client - all wrapped up into one software tool <br></br> that will helps you improve your product.</p>
                    <Link to="/textSentiment" className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-[#60388B] bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Get started
                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </Link>
                </div>
            </div>
        </div>

        <div className="bg-gradient-to-b from-[#F6F4FC] via-white via-30% to-[#F6F4FC] to-50%">
            {/* Vision */}
            <div className="mb-32 py-16">
                <img className="float-right h-72 max-w-lg ml-auto mr-32" src={trainImage} alt="vision image"></img>
                <h2 className="mt-5 ml-32 text-4xl text-[#351D4F] font-extrabold dark:text-white text-left">Ready to get <br></br> more out of your <br></br> business?</h2>
                <p className="ml-32 my-4 text-lg text-[#351D4F] text-left">At DeepPurple, our vision is to revolutionize the way businesses<br></br>grow with their revenue. By leveraging our data-driven insights,<br></br> we aim to help you unlock your full business potential by<br></br>providing innovative solutions and strategies.</p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col justify-center items-center py-16">
                <h2 className="text-4xl text-[#351D4F] font-extrabold dark:text-white">Benefits of using DeepPurple</h2>
                <p className="my-2 text-lg text-[#351D4F]">Elevate your business to new heights with DeepPurple.</p>
                <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-16 text-center">
                    <a className="block max-w-xs h-96 p-6 bg-[#F6F4FC] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <img className="mt-11 w-24 h-24 mx-auto mb-3" src={clockImage} alt="clock image"></img>
                        <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-[#351D4F] dark:text-white">Save Time</h5>
                        <p className="font-normal text-[#351D4F] dark:text-gray-400">Spend less time doing repetitive tasks. Our product streamlines your review process by swiftly analyzing and extracting key insights.</p>
                    </a>

                    <a className="block max-w-xs p-6 bg-[#FAF2FE] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <img className="mt-11 w-24 h-24 mx-auto mb-3" src={accurateImage} alt="accurate image"></img>
                        <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-[#351D4F] dark:text-white">Accurate Model</h5>
                        <p className="font-normal text-[#351D4F] dark:text-gray-400">The advanced capabilities of GPT-3 enables us to provide you with a reliable information and suggestions for informed decision-making.</p>
                    </a>

                    <a className="block max-w-xs p-6 bg-[#F1F3FE] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <img className="mt-11 w-24 h-24 mx-auto mb-3" src={lampImage} alt="lamp image"></img>
                        <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-[#351D4F] dark:text-white">Product Solution</h5>
                        <p className="font-normal text-[#351D4F] dark:text-gray-400">DeepPurple shares suggestions about how to enhance and optimize your product based on customer feedbacks.</p>
                    </a>
                </div>
            </div>

            {/* Text Sentiment Analyzer */}
            <div className="py-32 flex items-center text-left">
                <img className="float-left h-96 max-w-xl mr-48 ml-32" src={firstPlaceholderImage} alt="image description"></img>
                <div>
                    <span class="bg-[#351D4F] text-white text-sm font-bold px-5 py-3 rounded-2xl">BASIC FEATURES</span>
                    <h2 className="mt-10 mr-32 text-4xl text-[#351D4F] font-extrabold dark:text-white">Text Sentiment Analyzer</h2>
                    <p className="mr-32 my-4 text-lg text-[#351D4F]">Discover the Text Sentiment Analyzer, a tool that accurately<br></br>analyzes the sentiment and emotion in a text. Use this tool<br></br>to tailor your strategies and enhance customer experiences<br></br>based on real emotions.<br></br><br></br>Play around with our text sentiment analyzer, below.</p>
                    <Link to="/textSentiment">
                        <a href="#" className="inline-flex items-center px-5 py-3 font-bold text-center text-white bg-[#351D4F] rounded-xl hover:bg-[#3C3988] focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Try now</a>
                    </Link>
                </div>
            </div>

            {/* Product Reviews Analyzer */}
            <div className="py-32 flex items-center text-left">
                <div>
                    <span class="ml-32 bg-[#351D4F] text-white text-sm font-bold px-5 py-3 rounded-2xl">PREMIUM FEATURES</span>
                    <h2 className="mt-10 ml-32 text-4xl text-[#351D4F] font-extrabold dark:text-white text-left">Product Reviews Analyzer</h2>
                    <p className="ml-32 my-4 text-lg text-[#351D4F]">Introducing the Product Reviews Analyzer, an innovative<br></br>feature that allows you to turn reviews into business<br></br>improvements. Extract key information from hundreds or<br></br>thousands of reviews and receive actionable recommendation,<br></br>presented in an interactive dashboard!</p><br></br>
                    <a href="#" class="ml-32 inline-flex items-center text-[#5431CA] hover:underline">
                        Find out more
                        <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                    </a>
                </div>
                <img className="float-right h-96 max-w-lg ml-auto mr-48" src={secondPlaceholderImage} alt="image description"></img>
            </div>

            {/* Join us now */}
            <div className="py-16 flex justify-center">
                <a class="flex w-3/4 items-center text-base font-bold bg-white border border-gray-200 rounded-3xl shadow">
                    <img class="float-left rounded-t-lg h-96 mr-24" src={cardImage} alt="card image"></img>
                    <div class="text-left">
                        <h2 class="mb-2 text-3xl text-[#351D4F] font-extrabold tracking-tight text-gray-900 dark:text-white">Join us now!</h2>
                        <p class="mb-3 font-normal text-lg text-[#351D4F]">Unlock your business full potential with our premium<br></br>services. Choose from our range of tailored plans<br></br>designed to meet your needs and experience<br></br>cutting-edge features that will enhance your products.</p>
                        <a href="#" className="inline-flex items-center px-5 py-3 font-bold text-center text-white bg-[#351D4F] rounded-xl hover:bg-[#3C3988] focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Compare plans</a>
                    </div>
                </a>
            </div>
        </div>
        <Footer/>

    </>
  );
}

export default LandingPage;
