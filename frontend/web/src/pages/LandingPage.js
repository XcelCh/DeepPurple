import React from 'react';
import accurateImage from "../assets/Accurate.png";
import clockImage from "../assets/Clock.png";
import lampImage from "../assets/Lamp.png";
import { Link } from "react-router-dom";
import {
    LandingPage1
} from "../assets/index";

function LandingPage() {
    return (
        <>
            <div className="h-full bg-[#F7F2FB]">
                <div className="h-screen bg-[#5A3D86] flex justify-center items-center relative">
                    <div className="text-center absolute top-32 z-10">
                        <div className="flex items-center justify-center">
                            <p className="text-8xl font-black text-white mr-4">Improving</p>
                            <p className="text-8xl font-black text-[#9AE8B7]">business</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="text-8xl font-black text-[#FFAFAF] mr-4">services</p>
                            <p className="text-8xl font-black text-white">has never</p>
                        </div>
                        <p className="text-8xl font-black text-white">been easier</p>
                        <p className="mt-4 mb-4 text-2xl text-white">We turn words and audios into insights.</p>
                        <div className="flex items-center justify-center inline-block">
                            <Link to="/signUpForm">
                                <button
                                type="button"
                                className="text-[#414141] bg-white hover:bg-[#7DBC8F] focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-lg px-8 py-3 text-center"
                                >
                                    Get started
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute z-0" style={{ top: '500px' }}>
                        <img
                            src={LandingPage1}
                            alt="Landing Page 1"
                            style={{ width: '1300px', height: '500px' }}
                        />
                    </div>
                </div>
                <div className="h-full pt-80 px-24"> 
                    <p className="text-5xl font-bold text-[#7566BB] text-center">Benefits of using DeepPurple</p>
                    <div className="grid grid-cols-3 items-center gap-24 h-full">
                        <div className="flex flex-col items-center justify-center mt-16">
                            <img src={clockImage} className="w-24 h-24" />
                            <p className="font-semibold text-[#7566BB] text-3xl mt-2">Save Time</p>
                            <p className="text-[#414141] text-lg text-center mt-4">
                                Spend less time doing repetitive tasks. 
                                Our product streamlines your employee 
                                performance review process by swiftly
                                analyzing and extracting key insights.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-8">
                            <img src={accurateImage} className="w-24 h-24" />
                            <p className="font-semibold text-[#7566BB] text-3xl mt-2">Accurate Model</p>
                            <p className="text-[#414141] text-lg text-center mt-4">
                                The advanced capabilities of GPT-3
                                enables us to provide you with a
                                reliable information and suggestions
                                for informed decision-making.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-8">
                            <img src={lampImage} className="w-24 h-24" />
                            <p className="font-semibold text-[#7566BB] text-3xl mt-2">Product Solution</p>
                            <p className="text-[#414141] text-lg text-center mt-4">
                                DeepPurple shares suggestions
                                about how to enhance and optimize
                                employee performance based on their 
                                past call interactions.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="h-full pt-32 px-24"> 
                    <div className="text-5xl font-bold text-[#7566BB] text-center">
                        <p>Work Smarter with our</p>
                        <p>innovative solutions</p>
                    </div>
                    
                </div>
            </div>
        </>
    );
//   return (
//     <>
//         {/* <NavBar /> */}
//         {/* Landing Header */}
//         <div>
//             {/* First layer gradient */}
//             <div className="h-screen bg-gradient-to-tr from-[#D6B4CE] via-[#D3CBEF] via-55% to-[#9487E7]"> 
//                 {/* Second layer gradient */}
//                 <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#A59CE2]/0 to-[#F8F4FC]">
//                       {/* Content */}
//                     <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">We turn words into insights.</h1>
//                     <p className="mb-6 text-lg font-bold text-center text-white lg:text-xl sm:px-16 xl:px-64">DeepPurple helps you to understand the sentiment and emotion <br></br> of your client - all wrapped up into one software tool <br></br> that will helps you improve your product.</p>
//                     <Link to="/textSentiment" className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-[#60388B] bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-blue-300">
//                         Get started
//                         <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
//                     </Link>
//                 </div>
//             </div>
//         </div>

//         <div className="bg-gradient-to-b from-[#F6F4FC] via-white via-30% to-[#F6F4FC] to-50%">
//             {/* Vision */}
//             <div className="mb-32 py-16">
//                 <img className="float-right h-72 max-w-lg ml-auto mr-32" src={trainImage} alt="vision image"></img>
//                 <h2 className="mt-5 ml-32 text-4xl text-[#351D4F] font-extrabold text-left">Ready to get <br></br> more out of your <br></br> business?</h2>
//                 <p className="ml-32 my-4 text-lg text-[#351D4F] text-left">At DeepPurple, our vision is to revolutionize the way businesses<br></br>grow with their revenue. By leveraging our data-driven insights,<br></br> we aim to help you unlock your full business potential by<br></br>providing innovative solutions and strategies.</p>
//             </div>

//             {/* Benefits */}
//             <div className="flex flex-col justify-center items-center py-16">
//                 <h2 className="text-4xl text-[#351D4F] font-extrabold">Benefits of using DeepPurple</h2>
//                 <p className="my-2 text-lg text-[#351D4F]">Elevate your business to new heights with DeepPurple.</p>
//                 <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-16 text-center">
//                     <a className="block max-w-xs h-96 p-6 bg-[#F6F4FC] border border-gray-200 rounded-lg shadow">
//                         <img className="mt-11 w-24 h-24 mx-auto mb-3" src={clockImage} alt="clock image"></img>
//                         <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-[#351D4F] ">Save Time</h5>
//                         <p className="font-normal text-[#351D4F]">Spend less time doing repetitive tasks. Our product streamlines your review process by swiftly analyzing and extracting key insights.</p>
//                     </a>

//                     <a className="block max-w-xs p-6 bg-[#FAF2FE] border border-gray-200 rounded-lg shadow">
//                         <img className="mt-11 w-24 h-24 mx-auto mb-3" src={accurateImage} alt="accurate image"></img>
//                         <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-[#351D4F]">Accurate Model</h5>
//                         <p className="font-normal text-[#351D4F]">The advanced capabilities of GPT-3 enables us to provide you with a reliable information and suggestions for informed decision-making.</p>
//                     </a>

//                     <a className="block max-w-xs p-6 bg-[#F1F3FE] border border-gray-200 rounded-lg shadow">
//                         <img className="mt-11 w-24 h-24 mx-auto mb-3" src={lampImage} alt="lamp image"></img>
//                         <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-[#351D4F]">Product Solution</h5>
//                         <p className="font-normal text-[#351D4F]">DeepPurple shares suggestions about how to enhance and optimize your product based on customer feedbacks.</p>
//                     </a>
//                 </div>
//             </div>

//             {/* Text Sentiment Analyzer */}
//             <div className="py-32 flex items-center text-left">
//                 <img className="float-left h-96 max-w-xl mr-48 ml-32" src={firstPlaceholderImage} alt="image description"></img>
//                 <div>
//                     <span class="bg-[#351D4F] text-white text-sm font-bold px-5 py-3 rounded-2xl">BASIC FEATURES</span>
//                     <h2 className="mt-10 mr-32 text-4xl text-[#351D4F] font-extrabold">Text Sentiment Analyzer</h2>
//                     <p className="mr-32 my-4 text-lg text-[#351D4F]">Discover the Text Sentiment Analyzer, a tool that accurately<br></br>analyzes the sentiment and emotion in a text. Use this tool<br></br>to tailor your strategies and enhance customer experiences<br></br>based on real emotions.<br></br><br></br>Play around with our text sentiment analyzer, below.</p>
//                     <Link to="/textSentiment">
//                         <a href="#" className="inline-flex items-center px-5 py-3 font-bold text-center text-white bg-[#351D4F] rounded-xl hover:bg-[#3C3988] focus:ring-4 focus:outline-none focus:ring-gray-200">Try now</a>
//                     </Link>
//                 </div>
//             </div>

//             {/* Product Reviews Analyzer */}
//             <div className="py-32 flex items-center text-left">
//                 <div>
//                     <span class="ml-32 bg-[#351D4F] text-white text-sm font-bold px-5 py-3 rounded-2xl">PREMIUM FEATURES</span>
//                     <h2 className="mt-10 ml-32 text-4xl text-[#351D4F] font-extrabold text-left">Product Reviews Analyzer</h2>
//                     <p className="ml-32 my-4 text-lg text-[#351D4F]">Introducing the Product Reviews Analyzer, an innovative<br></br>feature that allows you to turn reviews into business<br></br>improvements. Extract key information from hundreds or<br></br>thousands of reviews and receive actionable recommendation,<br></br>presented in an interactive dashboard!</p><br></br>
//                     <a href="#" class="ml-32 inline-flex items-center text-[#5431CA] hover:underline">
//                         Find out more
//                         <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
//                     </a>
//                 </div>
//                 <img className="float-right h-96 max-w-lg ml-auto mr-48" src={secondPlaceholderImage} alt="image description"></img>
//             </div>

//             {/* Join us now */}
//             <div className="py-16 flex justify-center">
//                 <a class="flex w-3/4 items-center text-base font-bold bg-white border border-gray-200 rounded-3xl shadow">
//                     <img class="float-left rounded-t-lg h-96 mr-24" src={cardImage} alt="card image"></img>
//                     <div class="text-left">
//                         <h2 class="mb-2 text-3xl text-[#351D4F] font-extrabold tracking-tight text-gray-900">Join us now!</h2>
//                         <p class="mb-3 font-normal text-lg text-[#351D4F]">Unlock your business full potential with our premium<br></br>services. Choose from our range of tailored plans<br></br>designed to meet your needs and experience<br></br>cutting-edge features that will enhance your products.</p>
//                         <a href="#" className="inline-flex items-center px-5 py-3 font-bold text-center text-white bg-[#351D4F] rounded-xl hover:bg-[#3C3988] focus:ring-4 focus:outline-none focus:ring-gray-200">Compare plans</a>
//                     </div>
//                 </a>
//             </div>
//         </div>
//         <Footer/>

//     </>
//   );
}

export default LandingPage;
