import React, { useState} from "react";
import { BASE_URL } from "../pages/config";

function Card({ color, title, content, improvedSentence, highlight, setHighlight, highlighted, sentiment}) {
  
  const [isChecked, setIsChecked] = useState(false);

  // open or close collapse
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);

    if (sentiment == true) {
      if (event.target.checked == true) {
        setHighlight([...highlight, [highlighted, color]]);
        console.log("add: " + highlight);
      } else {
        setHighlight(
          highlight.filter(
            (item) => item[0] !== highlighted || item[1] !== color
          )
        );
        console.log("remove: " + highlight);
      }
    }
  };

  return (
    <div tabIndex="0" className="collapse rounded-lg shadow-md">
      <input type="checkbox" onClick={handleCheckboxChange} />
      <div
        className="collapse-title text-sm mt-2 font-bold rounded-t-lg text-[#FFFFFF]"
        style={{ backgroundColor: `${color}` }}
      >
        {title}
      </div>
      <div className="collapse-content bg-[#FFFFFF] text-sm">
        <p className="mt-2">{content}</p>
        {!sentiment ? (
          <p>
            <br></br>
            Suggestion <br></br>
            {improvedSentence}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Card;
