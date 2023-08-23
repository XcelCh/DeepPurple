import Card from "../components/Card";
import React, { useState, useEffect } from "react";
import { EmptySentiment, Loading } from "../assets/index";
import AuthService from "../services/auth.service";
import { BASE_URL } from "./config";
import Swal from "sweetalert2";

function TextAnalyze() {
  const [oriPrompt, setOriPrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [filter, setFilter] = useState("");
  const [processing, setProcessing] = useState(false);
  const [highlight, setHighlight] = useState([]);
  // const [limitReached, setLimitReached] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update Highlight
  useEffect(() => {

    const highlightedSentences = highlight.reduce((result, pair) => {
      const sentence = pair[0].trim().replaceAll('"', "");
      const sentence_regex = sentence
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replaceAll('"', "");
      const regex = new RegExp(sentence_regex, "gi");
      const highlightColor = pair[1].trim();
      // debug
      return result.replace(
        regex,
        `<span style="background: linear-gradient(to bottom, transparent 65%, ${highlightColor}) 50%;">
        ${sentence}
      </span>`
      );
    }, oriPrompt);

    setPrompt(highlightedSentences);
  }, [highlight]);

  // Change prompt content
  const handleChange = (event) => {
    if (event.target.value.length < 1200) {
      setPrompt(event.target.value);
      setOriPrompt(event.target.value);
      setError("");
    } else {
      setError("Sorry, the text cannot exceed 1200 characters.");
    }
  };

  // Analyze button
  const handleSubmit = () => {
    setError("");
    if (prompt === "") {
      setError("Please input at least one sentence to be analyzed.");
    } else {
      Swal.fire({
        title: "Analyzing...",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      setProcessing(true);
      const data = new FormData();
      data.append("prompt", prompt);
      setProcessing(true);
      fetch(`${BASE_URL}/analyze`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setProcessing(false);
            setResult(result);
            setOriPrompt(prompt);
            
            Swal.close();
          },
          (error) => {
            setError(error);
            Swal.close();
          }
        );
    }
  };

  const handleFilter = (title) => {
    setFilter(title);
  };

  const handleEdit = () => {
    setResult("");
    setProcessing(false);
    setPrompt(oriPrompt);
    setHighlight([]);
  };

  return (
    <div className="bg-gradient-to-tr from-[#D5B4D6] via-[#D3CBEF] via 40% to-[#9487E7] border">
      <div
        className="md:mx-20 bg-white rounded-t-lg rounded-b-lg my-5 border min-w-fit mt-24"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className=" m-4 flex flex-col">
            <p className="text-md font-bold text-left">
              Text Sentiment Analyzer
            </p>

            {/* Input Text */}
            {result === "" && processing === false ? (
              <textarea
                placeholder="Input your text here ..."
                className=" mt-2 textarea textarea-bordered textarea-md w-full max-w-full h-96"
                value={oriPrompt}
                onChange={handleChange}
                maxLength={1200}
              ></textarea>
            ) : (
              <div
                className="border p-4 text-sm leading-loose h-96 rounded-lg bg-[#FFFFFF]"
                dangerouslySetInnerHTML={{ __html: prompt }}
              ></div>
            )}

            {/* Error Message */}
            {Error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
                  <p className="card-body h-40 overflow-auto">
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
                      className={`tab tab-lifted bg-[#E5E6E6] font-bold text-[#FFFFFF]${
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
                        sentiment={true}
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
