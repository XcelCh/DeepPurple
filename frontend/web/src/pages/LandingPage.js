import trainImage from "../assets/train.jpg";
import accurateImage from "../assets/Accurate.png";
import clockImage from "../assets/Clock.png";
import lampImage from "../assets/Lamp.png";
import firstPlaceholderImage from "../assets/Placeholder1.png";
import secondPlaceholderImage from "../assets/Placeholder2.png";
import cardImage from "../assets/Card.png";
import NavBar from '../components/NavBar';
import React from 'react';

function LandingPage() {
  return (
    <>
        <NavBar />
        {/* Landing Header */}
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We turn words into insights.</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-64 dark:text-gray-400">DeepPurple helps you to understand the sentiment and emotion <br></br> of your client - all wrapped up into one software tool <br></br> that will helps you improve your product.</p>
            <a href="#" className="mb-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>

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
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-16">
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
                <a href="#" className="inline-flex items-center px-5 py-3 font-bold text-center text-white bg-[#351D4F] rounded-xl hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Try now</a>
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
                    <a href="#" className="inline-flex items-center px-5 py-3 font-bold text-center text-white bg-[#351D4F] rounded-xl hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Compare plans</a>
                </div>
            </a>
        </div>

        {/* Footer */}
        <footer class="bg-[#60388B]">
            <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div class="md:flex md:justify-between items-center">
                    <div class="mb-6 md:mb-0">
                        <a href="https://flowbite.com/" class="flex items-center">
                            <span class="text-2xl font-semibold whitespace-nowrap text-white">DeepPurple</span>
                        </a>
                        <div class="sm:flex sm:items-center sm:justify-between">
                            <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                                <a href="#" class="text-white hover:text-gray-900 dark:hover:text-white">
                                    <svg class="w-5 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                                    <span class="sr-only">Facebook page</span>
                                </a>
                                <a href="#" class="text-white hover:text-gray-900 dark:hover:text-white">
                                    <svg class="w-5 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                                    <span class="sr-only">Instagram page</span>
                                </a>
                                <a href="#" class="text-white hover:text-gray-900 dark:hover:text-white">
                                    <svg class="w-5 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                    <span class="sr-only">Twitter page</span>
                                </a>
                                <a href="#" class="text-white hover:text-gray-900 dark:hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                    <span class="sr-only">Linkedin page</span>
                                </a>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
                                <svg class="w-5 h-6" fill="white" stroke="white" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path></svg>
                                <div class="text-white">1234 5678</div>
                            </div>
                        </div>

                        <div class="flex items-center">
                            <div class="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
                                <svg class="w-5 h-6" fill="white" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg>
                                <div class="text-white">deeppurple@gmail.com</div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-8 text-left">
                        <div>
                            <ul class="text-white font-medium">
                                <li class="mb-6">
                                    <a href="https://flowbite.com/" class="hover:underline">Home</a>
                                </li>
                                <li class="mb-6">
                                    <a href="https://tailwindcss.com/" class="hover:underline">About us</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" class="hover:underline">Pricing</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul class="text-white font-medium">
                                <li class="mb-6">
                                    <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Text Sentiment Analyzer</a>
                                </li>
                                <li class="mb-6">
                                    <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Product Reviews Analyzer</a>
                                </li>
                                <li class="mb-6">
                                    <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">User guide</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mb-6 md:mb-0 text-left">
                        <p class="self-center text-2xl font-semibold whitespace-nowrap text-white">We turn words into insights.</p>
                        <p class="text-sm text-white sm:text-center dark:text-gray-400">Copyright © DeepPurple Inc. All rights reserved 2023</p>
                    </div>
                </div>
            </div>
        </footer>

    </>
  );
}

export default LandingPage;
