import Card from "../components/Card";
import React, { useState, useEffect } from "react";

function TextAnalyze() {
  const [state, setState] = useState([]);
  const [error, setError] = useState(null);

  const [result, setResult] = useState([]);

  const handleChange = (event) => {
    setState(event.target.value); 
    console.log(state);
  }

  const handleSubmit = () => {
    const data = new FormData();
    data.append("prompt", state);
    
    console.log(data);
    fetch("http://localhost:8082", {
    method: "POST",
    body: data
  })
    .then((res) => res.json())
    .then(
      (result) => {
        console.log("called get data");
        console.log(result);
        setResult(result);
      },
      (error) => {
        setError(error);
      }
    );
};

  return (
    <div className="bg-gradient-to-tr from-[#D5B4D6] via-[#D3CBEF] via 40% to-[#9487E7] border">
      <div
        className="container md:mx-auto bg-white rounded-t-lg rounded-b-lg h-screen my-5 border max-w-5xl"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Left Side */}
          <div className=" m-4 flex flex-col">
            {/* Text Sentiment Analyzer */}
            <p className="text-md font-bold text-left">
              Text Sentiment Analyzer
            </p>
            <textarea
              placeholder="Input your text here ..."
              className=" mt-2 textarea textarea-bordered textarea-md w-full max-w-full h-96"
              value={state}
              onChange = {handleChange}
            ></textarea>

            <button onClick = {handleSubmit} className="btn rounded-full btn-sm bg-[#351D4F] mt-3 normal-case  max-w-[100px]">
              Analyze
            </button>

            {/* Overall Sentiment Analyzer */}
            <p className="text-sm font-bold text-left mt-4 text-[#67557B]">
              Overall Sentiment Analysis
            </p>

            <div className="card card-compact w-full bg-base-100 shadow-xl">
            <div className={`rounded-t-lg h-8 font-bold flex flex-col items-center justify-center ${result.overallSentiment === 'Negative' ? 'bg-[#FFAFAF]' : result.overallSentiment === 'Positive' ? 'bg-[#96FF66]' : result.overallSentiment === 'Neutral' ? 'bg-[#F4EEE1]' :'bg-[#9B9B9B]'}`}>{result.overallSentiment}</div>
              <div className="">
                <p className="card-body h-32 overflow-auto">{result.overallContent}</p>
              </div>
            </div>
          </div>

          {/* Right - Emotion classifier */}
          <div className="m-4">
            <p className="text-sm font-bold text-left mt-4 text-[#67557B]">
              Emotion Classifier Based on Sentiment Analysis
            </p>
            <div className="tabs">
              <a className="tab tab-lifted bg-[#FFFFFF] tab-active">All</a>
              <a className="tab tab-lifted bg-[#FFFDAF]">Happiness</a>
              <a className="tab tab-lifted bg-[#AFFFF1] ">Sadness</a>
              <a className="tab tab-lifted bg-[#FFAFAF]">Fear</a>
              <a className="tab tab-lifted bg-[#AFC5FF]">Disgust</a>
              <a className="tab tab-lifted bg-[#DCAFFF]">Anger</a>
            </div>
            <div className="border-x-2 border-b-2 p-4 mr-2 rounded-b-lg]">
              {/* First card */}
              <Card
                color="bg-[#FFFDAF]"
                title="All emotions"
                content={result.emotion}
                contentStyle={{ backgroundColor: '#FF0000' }}
              />
              {/* Second card */}
              <Card
                color="bg-[#AFFFF1]"
                title="Sadness"
                content=" Lorem ipsum dolor sit amet consectetur adipiscing elit sapien,
                  in nascetur etiam nec neque magnis. Erat vitae potenti
                  torquent placerat tempus donec quis orci, vehicula arcu augue
                  non convallis magna parturient vulputate curabitur, egestas
                  blandit dictum inceptos fermentum class ridiculus. Cursus et
                  leo ullamcorper tincidunt commodo egestas proin purus rutrum
                  ante, fringilla euismod auctor fames mollis facilisis
                  ultricies magnis enim, taciti varius montes eget posuere quis
                  vel curabitur aptent."
              />
              {/* Third Card*/}
              <Card
                color="bg-[#FFAFAF]"
                title="Fear"
                content=" Lorem ipsum dolor sit amet consectetur adipiscing elit sapien,
                  in nascetur etiam nec neque magnis. Erat vitae potenti
                  torquent placerat tempus donec quis orci, vehicula arcu augue
                  non convallis magna parturient vulputate curabitur, egestas
                  blandit dictum inceptos fermentum class ridiculus. Cursus et
                  leo ullamcorper tincidunt commodo egestas proin purus rutrum
                  ante, fringilla euismod auctor fames mollis facilisis
                  ultricies magnis enim, taciti varius montes eget posuere quis
                  vel curabitur aptent."
              />
              {/* Third Card*/}
              <Card
                color="bg-[#AFC5FF]"
                title="Disgust"
                content=" Lorem ipsum dolor sit amet consectetur adipiscing elit sapien,
                  in nascetur etiam nec neque magnis. Erat vitae potenti
                  torquent placerat tempus donec quis orci, vehicula arcu augue
                  non convallis magna parturient vulputate curabitur, egestas
                  blandit dictum inceptos fermentum class ridiculus. Cursus et
                  leo ullamcorper tincidunt commodo egestas proin purus rutrum
                  ante, fringilla euismod auctor fames mollis facilisis
                  ultricies magnis enim, taciti varius montes eget posuere quis
                  vel curabitur aptent."
              />
              {/* Third Card*/}
              <Card
                color="bg-[#DCAFFF]"
                title="Anger"
                content=" Lorem ipsum dolor sit amet consectetur adipiscing elit sapien,
                  in nascetur etiam nec neque magnis. Erat vitae potenti
                  torquent placerat tempus donec quis orci, vehicula arcu augue
                  non convallis magna parturient vulputate curabitur, egestas
                  blandit dictum inceptos fermentum class ridiculus. Cursus et
                  leo ullamcorper tincidunt commodo egestas proin purus rutrum
                  ante, fringilla euismod auctor fames mollis facilisis
                  ultricies magnis enim, taciti varius montes eget posuere quis
                  vel curabitur aptent."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextAnalyze;
