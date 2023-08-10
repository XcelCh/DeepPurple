import React, { useEffect } from "react";
import aboutUs from "../assets/AboutUs.png";
import profilePicture from "../assets/ProfilePicture.png";
import { Line, Linkedin, Instagram } from "../assets";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="bg-[#F7F2FB] h-full">
        <div className="mb-52 pt-48 px-36">
          <img
            className="float-right h-72 max-w-lg ml-auto"
            src={aboutUs}
            alt="vision image"
          ></img>
          <h2 className="mt-5 text-5xl text-[#7566BB] font-bold text-left">
            We're a team of <br></br> creators & innovators
          </h2>
          <p className="my-4 text-lg text-[#414141] text-left">
            We help businesses like yours grow revenue and improve <br></br>
            product quality with analytical software capable of providing
            <br></br> insights of your client’s feeling towards your product.
          </p>
        </div>
        <div className="px-48">
          <h2 className="text-4xl text-[#7566BB] font-bold text-left">
            The People <br></br> Behind DeepPurple
          </h2>
          {/* Line */}
          <div className="flex justify-center mb-8 mt-8">
            <img src={Line} className="content-center"></img>
          </div>
        </div>

        {/* Card */}
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-3 gap-20">
            <ProfileCard
              image={profilePicture}
              name="Gui Hendro"
              position="Project Leader"
            ></ProfileCard>
            <ProfileCard
              image={profilePicture}
              name="Patricia Natasha"
              position="Technical Lead"
            ></ProfileCard>
            <ProfileCard
              image={profilePicture}
              name="Excel Chendrawan"
              position="Documentation Leader"
            ></ProfileCard>
            <ProfileCard
              image={profilePicture}
              name="Jonathan Bryant Indramadi"
              position="Developer"
            ></ProfileCard>
            <ProfileCard
              image={profilePicture}
              name="Raymond Halim"
              position="Developer"
            ></ProfileCard>
            <ProfileCard
              image={profilePicture}
              name="Teo Wei Jie Alvin"
              position="Developer"
            ></ProfileCard>
          </div>
          {/* End of Card */}
        </div>
        {/* Line */}
        <div className="flex justify-center">
          <img src={Line} className="content-center mt-10 mb-32"></img>
        </div>
        {/* Enquiry */}
        <div className="grid grid-cols-2 py-16 bg-[#B185E0] items-center">
          <div>
            <h2 className="mt-5 ml-32 text-5xl text-[#351D4F] font-bold text-white text-left">
              Have a question? <br></br>
              our team is happy <br></br>
              to assist you
            </h2>
            <p className="ml-32 my-4 text-lg text-[#351D4F] text-left text-white">
              Ask about DeepPurple products, pricing, implementation, <br></br> or
              anything else. Our highly trained reps are standing <br></br> by,
              ready to help.
            </p>
          </div>
          <div>
            <p className="mt-4 mb-4 text-white font-bold">QUESTIONS</p>
            <div className="grid grid-cols-2 mr-40 justify-left gap-2">
              <input
                type="text"
                placeholder="First name"
                className="input input-bordered input-md max-w-s"
              />
              <input
                type="text"
                placeholder="Last name"
                className="input input-bordered input-md max-w-s"
              />
            </div>
            <div className="mr-40">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered input-md w-full mt-4 justify-self-stretch"
              />
              <textarea
                className="textarea textarea-bordered w-full h-40 mt-4"
                placeholder="Notes"
              ></textarea>
              <button className="btn bg-[#FFFFFF] text-[#B185E0] mt-4 border-0">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
