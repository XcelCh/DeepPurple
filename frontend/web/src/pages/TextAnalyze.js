import Card from "../components/Card";
import React, { useState, useEffect } from "react";
import { EmptySentiment, Loading } from "../assets/index";
import { data } from "./data.js";
import AuthService from "../services/auth.service";

function TextAnalyze() {
  const [oriPrompt, setOriPrompt] = useState("");
  const [prompt, setPrompt] = useState("");

  // const [oriPrompt, setOriPrompt] = useState(
  //   "Rewired my home network. This cable allowed me to create low cost but reliable data ports in my home office. I even made a few patch cords along the way. This was much better and lower cost than buying 50 or 100 foot patch cords."
  // );
  // const [prompt, setPrompt] = useState(
  //   "Rewired my home network. This cable allowed me to create low cost but reliable data ports in my home office. I even made a few patch cords along the way. This was much better and lower cost than buying 50 or 100 foot patch cords."
  // );

  const [error, setError] = useState(null);

  const [result, setResult] = useState("");
  const [filter, setFilter] = useState("");
  const [processing, setProcessing] = useState(false);
  const [highlight, setHighlight] = useState([]);

  // // temporary
  // useEffect(() => {
  //   setResult(data);
  // }, []);

  // Update Highlight
  useEffect(() => {
    const highlightedSentences = highlight.reduce((result, pair) => {
      const regex = new RegExp(pair[0].trim(), "gi");
      const sentence = pair[0].trim();
      const highlightColor = pair[1].trim();
      return result.replace(
        regex,
        `<span style="background: linear-gradient(to bottom, transparent, ${highlightColor}) 50%;">
        ${sentence}
      </span>`
      );
    }, oriPrompt);

    setPrompt(highlightedSentences);
    console.log(highlightedSentences);
  }, [highlight]);

  // Change prompt content
  const handleChange = (event) => {
    setPrompt(event.target.value);
    setOriPrompt(event.target.value);
    console.log(prompt);
  };

  // Analyze button
  const handleSubmit = () => {
    setProcessing(true);
    const data = new FormData();
    data.append("prompt", prompt);
    setProcessing(true);
    console.log(data);
    fetch("http://localhost:8082/api/auth/analyze", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("called get data");
          console.log(result);
          setProcessing(false);
          setResult(result);
        },
        (error) => {
          setError(error);
        }
      );
  };

  const handleFilter = (title) => {
    setFilter(title);
  };

  const handleEdit = () => {
    setResult("");
    setProcessing(false);
  };

  return (
    <div className="bg-gradient-to-tr from-[#D5B4D6] via-[#D3CBEF] via 40% to-[#9487E7] border">
      <div
        className="container md:mx-auto bg-white rounded-t-lg rounded-b-lg h-screen my-5 border max-w-5xl"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className=" m-4 flex flex-col">
            <p className="text-md font-bold text-left">
              Text Sentiment Analyzer
            </p>

            {/* Input Text */}
            {result === "" ? (
              <textarea
                placeholder="Input your text here ..."
                className=" mt-2 textarea textarea-bordered textarea-md w-full max-w-full h-96"
                value={oriPrompt}
                onChange={handleChange}
              ></textarea>
            ) : (
              <div
                className="border p-4 text-sm leading-loose h-96 rounded-lg bg-[#F2F2F2]"
                dangerouslySetInnerHTML={{ __html: prompt }}
              ></div>
            )}

            {/* Button */}
            {result === "" ? (
              <button
                onClick={handleSubmit}
                className="btn rounded-full btn-sm bg-[#351D4F] mt-3 normal-case  max-w-[100px]"
                disabled={processing}
              >
                Analyze
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="btn rounded-full btn-sm bg-[#351D4F] mt-3 normal-case  max-w-[100px]"
                disabled={processing}
              >
                Edit
              </button>
            )}

            {/* Overall Sentiment Analyzer */}
            <p className="text-sm font-bold text-left mt-4 text-[#67557B]">
              Overall Sentiment Analysis
            </p>
            <div className="card card-compact w-full bg-base-100 shadow-xl">
              <div
                className={`rounded-t-lg h-8 font-bold flex flex-col items-center justify-center ${
                  result.overallSentiment === "Negative"
                    ? "bg-[#FFAFAF]"
                    : result.overallSentiment === "Positive"
                    ? "bg-[#96FF66]"
                    : result.overallSentiment === "Neutral"
                    ? "bg-[#F4EEE1]"
                    : "bg-[#9B9B9B]"
                }`}
              >
                {result.overallSentiment}
              </div>
              <div className="">
                {processing ? (
                  <div className="card-body h-32">
                    <img
                      src={Loading}
                      className="h-8 animate-spin my-auto"
                    ></img>
                  </div>
                ) : result == "" ? (
                  <p className="card-body h-32 overflow-auto text-center place-content-center">
                    Waiting for Input ...
                  </p>
                ) : (
                  <p className="card-body h-32 overflow-auto">
                    {result.overallContent}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right - Emotion classifier */}
          <div className="m-4">
            <p className="text-sm font-bold text-left mt-5 text-[#67557B]">
              Emotion Classifier Based on Sentiment Analysis
            </p>
            <div className="tabs">
              <a
                className={`tab tab-lifted bg-[#E5E6E6] font-bold ${
                  filter === "" ? "tab-active" : ""
                }`}
                onClick={() => handleFilter("")}
              >
                All
              </a>
              {result.emotions &&
                result.emotions.map((elem) => {
                  return (
                    <a
                      className={`tab tab-lifted bg-[#E5E6E6] font-bold ${
                        elem.title === filter ? "tab-active" : ""
                      }`}
                      // className="tab tab-lifted font-bold"
                      style={{ backgroundColor: `${elem.color}` }}
                      onClick={() => handleFilter(elem.title)}
                    >
                      {elem.title}
                    </a>
                  );
                })}
            </div>
            <div className="border-x-2 border-b-2 border-t-2 p-2 mr-2 rounded-b-lg rounded-r-lg">
              {processing ? (
                <div className="card-body">
                  <img src={Loading} className="h-8 animate-spin my-auto"></img>
                </div>
              ) : result == "" ? (
                <img src={EmptySentiment} className="mx-auto my-12"></img>
              ) : (
                result.emotions &&
                result.emotions
                  .filter(
                    (elem) => filter === "" || elem.title.includes(filter)
                  )
                  .map((elem) => {
                    return (
                      <Card
                        // color = {`bg-[${elem.color}]`}
                        color={elem.color}
                        title={elem.title}
                        content={elem.explanation}
                        highlighted={elem.highlighted}
                        contentStyle={{ backgroundColor: "#FF0000" }}
                        highlight={highlight}
                        setHighlight={setHighlight}
                      />
                    );
                  })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextAnalyze;
