import React from "react";

function Card({ color, title, content }) {
  return (
    <div tabindex="0" className="collapse group rounded-lg shadow-md">
      <div
        className={`collapse-title ${color} text-sm mt-2 font-bold rounded-t-lg`}
      >
        {title}
      </div>
      <div className="collapse-content bg-[#FFFFFF] text-sm">
        <p className="mt-2">{content}</p>
      </div>
    </div>
  );
}

export default Card;
