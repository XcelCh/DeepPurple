import React from 'react';
import { BASE_URL } from "../pages/config";

function Footer() {
  return (
    <footer class="bg-[#5A3D86]">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-24">
          <div class="md:flex md:justify-between items-center">
              <div class="mb-6 md:mb-0">
                  <a href="#" class="flex items-center">
                      <span class="text-2xl font-semibold whitespace-nowrap text-white">DeepPurple</span>
                  </a>

                  <div className="mt-8">
                      <div class="flex items-center">
                          <div class="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
                              <svg class="w-5 h-6" fill="white" stroke="white" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path></svg>
                              <div class="text-white">8886 4332</div>
                          </div>
                      </div>

                      <div class="flex items-center">
                          <div class="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
                              <svg class="w-5 h-6" fill="white" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg>
                              <div class="text-white">deeppurple@gmail.com</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="grid grid-cols-2 gap-8 text-left">
                  <div>
                      <ul class="text-white font-medium">
                          <li class="mb-6">
                              <a href="#" class="hover:underline">Home</a>
                          </li>
                          <li class="mb-6">
                              <a href="/aboutUs" class="hover:underline">About us</a>
                          </li>
                          <li>
                              <a href="/pricing" class="hover:underline">Pricing</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <ul class="text-white font-medium">
                          <li class="mb-6">
                              <a href="/textSentiment" class="hover:underline ">Text Sentiment Analyzer</a>
                          </li>
                          <li class="mb-6">
                              <a href="/customerServiceAnalyzer" class="hover:underline">Customer Service Analyzer</a>
                          </li>
                          <li class="mb-6">
                              <a href="/userGuide" class="hover:underline">User guide</a>
                          </li>
                      </ul>
                  </div>
              </div>
              <div class="mb-6 md:mb-0 text-left">
                  <p class="self-center text-3xl font-extrabold whitespace-nowrap text-white">We turn words into insights.</p>
                  <p class="text-sm text-white">Copyright © DeepPurple Inc. All rights reserved 2023</p>
              </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
