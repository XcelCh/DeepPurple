import trainImage from "../assets/train.jpg";
import NavBar from '../components/NavBar';
import React from 'react';

function LandingPage() {
  return (
    <>
        <NavBar />
        <br></br><br></br>
        {/* Landing Header */}
        <h1 class="mt-20 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We turn words into insights.</h1>
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-64 dark:text-gray-400">DeepPurple helps you to understand the sentiment and emotion <br></br> of your client - all wrapped up into one software tool <br></br> that will helps you improve your product.</p>
        <a href="#" class="mb-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Get started
            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
        <br></br>
        {/* Vision */}
        <img class="float-right h-auto max-w-lg ml-auto mr-20" src={trainImage} alt="image description"></img>
        <h2 class="mt-5 ml-20 text-4xl text-[#351D4F] font-extrabold dark:text-white text-left">Ready to get <br></br> more out of your <br></br> business?</h2>
        <p class="ml-20 my-4 text-lg text-[#351D4F] text-left">At DeepPurple, our vision is to revolutionize the way businesses<br></br>grow with their revenue. By leveraging our data-driven insights,<br></br> we aim to help you unlock your full business potential by<br></br>providing innovative solutions and strategies.</p>
    </>
  );
}

export default LandingPage;
