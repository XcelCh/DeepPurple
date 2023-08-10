import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import accurateImage from "../assets/Accurate.png";
import clockImage from "../assets/Clock.png";
import lampImage from "../assets/Lamp.png";
import landingPage1 from "../assets/LandingPage1.png";
import landingPage2 from "../assets/LandingPage2.png";
import landingPage3 from "../assets/LandingPage3.png";
import cardImage from "../assets/Card.png";
import { Link } from "react-router-dom";
import 'flowbite';

function LandingPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTab, setActiveTab] = useState('tab1');

    const tabStyle = 'inline-block p-4 border-b-2 rounded-t-lg cursor-pointer';
    const activeTabStyle = 'border-[#7566BB] text-[#7566BB]';

    const tabContentStyle = 'hidden';
    const activeTabContentStyle = 'block';

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

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
                                className="text-[#414141] bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-lg px-8 py-3 text-center"
                                >
                                    Get started
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute z-0" style={{ top: '500px' }}>
                        <img
                            src={landingPage1}
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
                        <div className="flex flex-col items-center justify-center mt-16">
                            <img src={accurateImage} className="w-24 h-24" />
                            <p className="font-semibold text-[#7566BB] text-3xl mt-2">Accurate Model</p>
                            <p className="text-[#414141] text-lg text-center mt-4">
                                The advanced capabilities of GPT-3
                                enables us to provide you with a
                                reliable information and suggestions
                                for informed decision-making.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-16">
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
                    <div>
                        <div className="flex items-center justify-center mb-4 mt-4">
                            <ul className="flex flex-wrap -mb-px text-xl font-medium text-center">
                            <li className="mr-24 border-b-2">
                                <button
                                className={`${tabStyle} ${activeTab === 'tab1' ? activeTabStyle : ''}`}
                                onClick={() => handleTabClick('tab1')}
                                >
                                Text sentiment analyzer
                                </button>
                            </li>
                            <li className="border-b-2">
                                <button
                                className={`${tabStyle} ${activeTab === 'tab2' ? activeTabStyle : ''}`}
                                onClick={() => handleTabClick('tab2')}
                                >
                                Customer service analyzer
                                </button>
                            </li>
                            </ul>
                        </div>

                        <div>
                            <div className={`${activeTab === 'tab1' ? activeTabContentStyle : tabContentStyle}`}>
                                <div className="grid grid-cols-2 items-center gap-24 h-full pt-8">
                                    <div>
                                        <div className="flex flex-col">
                                            <div className="mb-6">
                                                <p className="text-3xl font-bold text-[#7566BB]">Text Sentiment Analyzer</p>
                                            </div>
                                            <p className="text-lg text-[#414141]">
                                                Discover the Text Sentiment Analyzer, a tool that accurately
                                                analyzes the sentiment and emotion in a text. Use this tool
                                                to tailor your strategies and enhance customer experiences
                                                based on real emotions.
                                                <br></br><br></br>
                                                Play around with our text sentiment analyzer, below.
                                            </p>
                                            <div className="inline-block mt-6">
                                                <Link to="/textSentiment">
                                                    <button
                                                    type="button"
                                                    className="text-[#F7F2FB] bg-[#7566BB] hover:bg-[#5E519A] focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-lg px-8 py-3 text-center"
                                                    >
                                                    Try for free!
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={landingPage2}></img>
                                    </div>
                                </div>
                            </div>
                            <div className={`${activeTab === 'tab2' ? activeTabContentStyle : tabContentStyle}`}>
                                <div className="grid grid-cols-2 items-center gap-24 h-full pt-8">
                                    <div>
                                        <div className="flex flex-col">
                                            <div className="mb-6">
                                                <p className="text-3xl font-bold text-[#7566BB]">Customer Service Analyzer</p>
                                            </div>
                                            <p className="text-lg text-[#414141]">
                                                Introducing the Product Reviews Analyzer, an innovative
                                                feature that allows you to turn reviews into business
                                                improvements. Extract key information from hundreds or 
                                                thousands of reviews and receive actionable recommendation,
                                                presented in an interactive dashboard!
                                            </p>
                                            <a href="/customerServiceAnalyzer" className="mt-4 text-lg inline-flex items-center text-[#5431CA] hover:underline">
                                                Find out more
                                                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={landingPage3}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-24 px-24">
                        <div className="border rounded-4xl bg-white grid grid-cols-2 items-center gap-24 shadow shadow-lg">
                            <div className="">
                                <img
                                    src={cardImage}
                                />
                            </div>
                            <div className="">
                                <div className="flex flex-col mr-16">
                                    <p className="text-3xl font-bold text-[#7566BB] mb-4">Join us now!</p>
                                    <p className="text-lg text-[#414141] mb-4">
                                        Unlock the full potential of your business with
                                        our premium services. Sign up now to fulfill
                                        your needs and experience cutting-edge
                                        features that will save you time 
                                        and headache.
                                    </p>
                                    <div className="flex items-center inline-block">
                                        <Link to="/pricing">
                                            <button
                                            type="button"
                                            className="text-[#F7F2FB] bg-[#7566BB] hover:bg-[#5E519A] focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold rounded-full text-lg px-8 py-3 text-center"
                                            >
                                                View pricing
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default LandingPage;
