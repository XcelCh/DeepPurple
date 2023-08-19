import React from "react";
import { Linkedin, Instagram } from "../assets";
import { BASE_URL } from "../pages/config";

function ProfileCard({image, name, position, linkedin }) {
    return (
      <div>
        <img src={image} style={{ height: '380px', width: '280px' }} className="rounded-lg"></img>
            <p className="text-xl font-bold text-[#414141] mt-2">{name}</p>
            <p className="text-lg text-[#414141] mt-0">{position}</p>
        <div className="grid grid-cols-9 mt-0">
          <a href={linkedin}>
            <img src={Linkedin} className="mt-1"></img>
          </a>
        </div>
      </div>
  );
}

export default ProfileCard;
