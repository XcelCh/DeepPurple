import bgImage from "../assets/Background.png";
import React from 'react';

function LoginForm() {
  return (
    <>
        <section class="bg-[#F6F4FC]">
            <div class="h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${bgImage})` }} >
                <div class="w-1/3 bg-white rounded-3xl shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 text-left">
                        <a href="#" class="flex text-2xl font-semibold text-gray-900 dark:text-white">DeepPurple</a>
                        <h1 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-left">
                            Sign in
                        </h1>
                        <h3 class="text-sm font-normal text-gray-900 dark:text-white text-left">
                            Welcome back! It's nice to see you again.
                        </h3>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></input>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                            </div>
                            
                            <button type="submit" class="w-full text-white bg-[#3C3988] hover:bg-[#351D4F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            
                            <div class="flex flex-col items-left">
                                <p class="text-sm font-regular text-gray-500 dark:text-gray-400">
                                    New to DeepPurple? <a href="#" class="font-regular text-blue-600 hover:underline dark:text-primary-500">Create an account</a>
                                </p>
                                <a href="#" class="text-sm font-regular text-blue-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <p class="mt-4 text-xs text-[#3C3988] dark:text-gray-400">Copyright © DeepPurple Inc. All rights reserved 2023</p>
            </div>
        </section>
    </>
  );
}

export default LoginForm;
