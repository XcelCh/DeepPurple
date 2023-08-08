import React from "react";
import { Unauthorized } from "../assets";
import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div className="pt-20">
      <img className="mx-auto h-40 mt-20" src={Unauthorized}></img>
      <p className="text-center mt-5 font-bold">
        You are not authorized to access this page.
      </p>
      {/* <p className="text-center font-bold">Your token is not valid</p> */}

      <div className="flex items-center justify-center mt-8">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-white bg-[#9554FE] rounded-lg hover:bg-[#6F2DA8] focus:ring-4 focus:ring-blue-300"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
