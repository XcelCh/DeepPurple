import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TranscriptCard from "../components/TranscriptCard";
import { AudioPlayer } from "../components/AudioPlayer";
import {
  Category,
  EmployeeSentiment,
  CustomerSentiment,
  CallSentiment,
  Confidence,
  SampleRate,
  AudioFormat,
  EmptySentiment,
} from "../assets/index";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import authHeader from "../services/auth-header";
import Card from "../components/Card";
import Fluency from "@mui/icons-material/Abc";
import Hospitality from "@mui/icons-material/VolunteerActivismOutlined";
import ProblemSolving from "@mui/icons-material/TipsAndUpdatesOutlined";
import Personalization from "@mui/icons-material/SettingsSuggestOutlined";
import Average from "@mui/icons-material/FunctionsOutlined";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import Swal from "sweetalert2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Analysis() {
  const token = authHeader();
  // const navigate = useNavigate();
  // const [isEdited, setIsEdited] = useState(false);
  // const updateIsEdited = (value) => {
  //   setIsEdited(value);
  // };
  const [analysisId, setAnalysisId] = useState();
  const [analysisData, setAnalysisData] = useState({});
  const [suggestions, setSuggestions] = useState([1]);
  const [transcriptData, setTranscriptData] = useState([1]);

  const fromEmployeeList = window.location.pathname.startsWith("/employeeList");

  // recording id
  const { rec_id } = useParams();

  useEffect(() => {
    getAnalysis(true);
    getSuggestions(true);
    getTranscriptions(true);
  }, []);

  useEffect(() => {
    console.log(analysisData);
    console.log(suggestions);
    console.log(transcriptData);
  }, [analysisData, suggestions, transcriptData]);


  // Get Analysis
  const getAnalysis = async (showLoading) => {
    try {
      if (showLoading) {
        Swal.fire({
          title: "Retrieving Analysis",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      }

      const response = await fetch(
        `http://localhost:8082/analysis/getAnalysis/${rec_id}`,
        {
          headers: token,
        }
      );

      response.json().then((data) => {
        setAnalysisData(data.data);
      });

      if (showLoading) {
        Swal.close();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (showLoading) {
        Swal.close();
      }
    }
  };

  // Get Suggestions
  const getSuggestions = async (showLoading) => {
    try {
      if (showLoading) {
        Swal.fire({
          title: "Retrieving suggestions...",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      }

      const response = await fetch(
        `http://localhost:8082/analysis/getSuggestions/${rec_id}`,
        {
          headers: token,
        }
      );

      response.json().then((data) => {
        setSuggestions(data.data);
      });

      if (showLoading) {
        Swal.close();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (showLoading) {
        Swal.close();
      }
    }
  };

  // Get Transcriptions
  const getTranscriptions = async (showLoading) => {
    try {
      if (showLoading) {
        Swal.fire({
          title: "Retrieving transcriptions...",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      }

      const response = await fetch(
        `http://localhost:8082/analysis/getTranscription/${rec_id}`,
        {
          headers: token,
        }
      );

      response.json().then((data) => {
        setTranscriptData(data.data);
      });

      if (showLoading) {
        Swal.close();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (showLoading) {
        Swal.close();
      }
    }
  };

  const calculateTime = (secs) => {
    if (secs < 60) {
      return `${secs.toFixed(2)} ${secs === 1 ? "second" : "seconds"}`;
    } else {
      const minutes = Math.floor(secs / 60);

      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

      const seconds = Math.floor(secs % 60);

      if (seconds === 0) {
        return `${returnedMinutes} ${minutes > 1 ? "minutes " : "minute "}`;
      }

      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      return `${returnedMinutes} ${
        minutes > 1 ? "minutes " : "minute "
      } ${returnedSeconds} ${seconds === 1 ? "second" : "seconds"}`;
    }
  };

  //convert time to percentage
  const timeToPercentage = (secs) => {
    const totalTime =
      analysisData.employeeSpeakTime +
      analysisData.customerSpeakTime +
      analysisData.silentTime;
    return (secs / totalTime) * 100;
  };

  const data = {
    labels: ["Silent", "Customer", "Employee"],
    datasets: [
      {
        data: [
          timeToPercentage(analysisData.silentTime),
          timeToPercentage(analysisData.customerSpeakTime),
          timeToPercentage(analysisData.employeeSpeakTime),
        ],
        backgroundColor: ["#83848A", "#9554FE", "#80F2AA"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return value + "%";
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Set to false to hide the vertical grid lines
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div className="ml-20 mt-16">
      <div className="flex items-center">
        <Link to={fromEmployeeList ? "../employeeList" : "../recordingList"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <p className="text-2xl font-bold text-left ml-4">Recording Analysis</p>
      </div>
      <p className="text-xl font-bold text-left ml-12 mt-4">
        {analysisData.recording?.recordingName}
      </p>
      {/* First Part */}
      <div class="grid w-full gap-6 grid-cols-9 mt-8">
        <div class="flex items-center">
          <div className="w-1/4 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div className="w-3/4 flex flex-col ml-4 border-r border-gray-400 h-1/2 justify-center">
            <div className="flex-grow font-bold text-lg">Agent</div>
            <div className="flex-grow">
              {analysisData.recording?.employee
                ? analysisData.recording?.employee?.employeeName
                : "Not Assigned"}
            </div>
          </div>
        </div>
        <div class="flex items-center col-span-2">
          <div className="w-1/4 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="w-3/4 flex flex-col border-r border-gray-400 h-1/2 justify-center">
            <div className="flex-grow font-bold text-lg">
              Upload Date and Time
            </div>
            <div className="flex-grow">
              {analysisData.recording?.uploadDate.replace("T", " ")}
            </div>
          </div>
        </div>
        <div class="flex items-center col-span-2">
          <div className="w-1/4 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
          </div>
          <div className="w-3/4 flex flex-col border-r border-gray-400 h-1/2 justify-center">
            <div className="flex-grow font-bold text-lg">Date Recorded</div>
            <div className="flex-grow">
              {analysisData.recording?.recordingDate.replace("T", " ")}
            </div>
          </div>
        </div>
        <div class="flex items-center col-span-2">
          <div className="w-1/4 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
              />
            </svg>
          </div>
          <div className="w-3/4 flex flex-col border-r border-gray-400 h-1/2 justify-center">
            <div className="flex-grow font-bold text-lg">Call Duration</div>
            <div className="flex-grow">
              {calculateTime(analysisData.recording?.recordingDuration)}
            </div>
          </div>
        </div>
        <div class="flex items-center col-span-2">
          <div className="w-1/4 flex flex-col items-center">
            <img src={Category} />
          </div>
          <div className="w-3/4 flex flex-col">
            <div className="flex-grow font-bold text-lg">Category</div>
            <div className="flex-grow">{analysisData.category}</div>
          </div>
        </div>
      </div>

      {/* Second Part */}
      <div class="grid w-full gap-6 grid-cols-9 mt-8">
        <div class="flex items-center">
          <div className="w-1/4 flex flex-col items-center">
            <Fluency></Fluency>
          </div>
          <div className="w-3/4 flex flex-col ml-4 border-r border-gray-400 h-1/2 justify-center">
            <div className="flex-grow font-bold text-lg">Fluency</div>
            <div className="flex-grow">{analysisData.fluency}/100</div>
          </div>
        </div>
        <div class="flex items-center col-span-2">
          <div className="w-1/4 flex flex-col items-center">
            <Hospitality></Hospitality>
          </div>
          <div className="w-3/4 flex flex-col border-r border-gray-400 h-1/2 justify-center">
            <div className="flex-grow font-bold text-lg">Hospitality</div>
            <div className="flex-grow">{analysisData.hospitality}/100</div>
          </div>
        </div>
        <div class="flex items-center col-span-2">
          <div className="w-1/4 flex flex-col items-center">
            <ProblemSolving></ProblemSolving>
          </div>
          <div className="w-3/4 flex flex-col border-r border-gray-400 h-1/2 justify-center">
            <div className="flex-grow font-bold text-lg">Problem Solving</div>
            <div className="flex-grow">{analysisData.problemSolving}/100</div>
          </div>
        </div>
        <div class="flex items-center col-span-2">
          <div className="w-1/4 flex flex-col items-center">
            <Personalization></Personalization>
          </div>
          <div className="w-3/4 flex flex-col border-r border-gray-400 h-1/2 justify-center">
            <div className="flex-grow font-bold text-lg">Personalization</div>
            <div className="flex-grow">{analysisData.personalization}/100</div>
          </div>
        </div>
        <div class="flex items-center col-span-2">
          <div className="w-1/4 flex flex-col items-center">
            <Average></Average>
          </div>
          <div className="w-3/4 flex flex-col">
            <div className="flex-grow font-bold text-lg">
              Average Performance
            </div>
            <div className="flex-grow">
              {analysisData.averagePerformance}/100
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full border rounded-lg text-justify p-4">
        <p className="text-xl font-bold">Summary</p>
        <p className="text-md">{analysisData.summary}</p>
      </div>
      <div className="mt-8 grid w-full gap-4 grid-cols-5">
        <div className="grid w-full grid-cols-5 gap-2 p-4 border rounded-lg col-span-3">
          <div className="col-span-2">
            <p className="text-xl font-bold">Speaker Time</p>
            <div className="mt-4">
              <p className="text-lg font-bold">Employee Time</p>
              <p>{calculateTime(analysisData.employeeSpeakTime)}</p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold">Customer Time</p>
              <p>{calculateTime(analysisData.customerSpeakTime)}</p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold">Silent Time</p>
              <p>{calculateTime(analysisData.silentTime)}</p>
            </div>
          </div>
          <div className="col-span-3">
            <p className="text-xl font-bold">Visualization</p>
            <Bar
              style={{
                padding: "10px",
              }}
              data={data}
              options={options}
            ></Bar>
          </div>
        </div>

        <div className="border p-4 rounded-lg col-span-2">
          <p className="flex justify-center text-xl font-bold">
            Recording Sentiment Analysis
          </p>
          <div className="grid grid-rows-2">
            <div class="grid grid-cols-2 mt-2">
              <div class="flex flex-col justify-center items-center">
                <img src={CustomerSentiment} />
                <p className="font-semibold">Customer</p>
                <div className="flex items-center">
                  {analysisData.customerSentiment === "Positive" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#80F2AA"
                      class="w-7 h-7"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FFAFAF"
                      class="w-7 h-7"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )}
                  <p className="ml-1">{analysisData.customerSentiment}</p>
                </div>
              </div>
              <div class="flex flex-col justify-center items-center">
                <img src={EmployeeSentiment} />
                <p className="font-semibold">Employee</p>
                <div className="flex items-center">
                  {analysisData.employeeSentiment === "Positive" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#80F2AA"
                      class="w-7 h-7"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FFAFAF"
                      class="w-7 h-7"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )}
                  <p className="ml-1">{analysisData.employeeSentiment}</p>
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <img src={CallSentiment} />
              <p className="font-semibold">Call</p>
              <div className="flex items-center">
                {analysisData.recordingSentiment === "Positive" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#80F2AA"
                    class="w-7 h-7"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#FFAFAF"
                    class="w-7 h-7"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
                <p className="ml-1">{analysisData.recordingSentiment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">Recording Playback</p>
        <div className="mt-4 grid w-full gap-4 grid-cols-5 items-center">
          <div className="grid w-full p-4 border rounded-lg col-span-3">
            <p className="text-xl font-bold mb-2">
              {analysisData.recording?.recordingName}
            </p>
            <AudioPlayer
              initialParagraphs={transcriptData}
              employeeName={
                analysisData.recording?.employee
                  ? analysisData.recording?.employee?.employeeName
                  : "Not Assigned"
              }
              recordingName={analysisData.recording?.recordingName}
              timeStamp={analysisData.recording?.timeStamp}
            />
          </div>

          <div className="col-span-2">
            <div className="grid grid-rows-2 p-4">
              <div className="flex items-center border-b border-gray-400 p-4">
                <div className="mr-4">
                  <img src={Confidence} />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-xl font-bold">
                      Transcript Confidence Rate
                    </p>
                    <p className="text-xl font-bold">
                      {(analysisData.transcriptConfidence * 100).toFixed(2)}%
                    </p>
                  </div>
                  {(analysisData.transcriptConfidence * 100).toFixed(2) < 50 ? (
                    <p className="inline-block px-3 rounded-full bg-[#D32F2F] text-white">
                      Low
                    </p>
                  ) : (analysisData.transcriptConfidence * 100).toFixed(2) <
                    71 ? (
                    <p className="inline-block px-3 rounded-full bg-[#FBC02D] text-white">
                      Medium
                    </p>
                  ) : (
                    <p className="inline-block px-3 rounded-full bg-[#3CAA1E] text-white">
                      High
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="flex justify-center border-r h-1/3 border-gray-400">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img src={AudioFormat} />
                    </div>
                    <div className="w-full">
                      <p className="text-lg font-bold">Audio Format</p>
                      <p>{analysisData.recording?.audioFormat}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img src={SampleRate} />
                    </div>
                    <div className="w-full">
                      <p className="text-lg font-bold">Sample Rate</p>
                      <p>{analysisData.recording?.sampleRate} Hz</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-12">
        <div className="mt-4 grid w-full gap-4 grid-cols-5">
          <div className="grid w-full rounded-lg col-span-3">
            <div className="p-2">
              <TranscriptCard
                initialParagraphs={transcriptData}
                employeeName={
                  analysisData.recording?.employee
                    ? analysisData.recording?.employee?.employeeName
                    : "Not Assigned"
                }
              />
            </div>
          </div>

          <div className="col-span-2">
            <div className="m-4">
              <p className="text-xl font-bold">Improvement Suggestions</p>
              <div className="h-96 mt-2">
                {suggestions &&
                  suggestions.map((elem) => {
                    return (
                      <Card
                        color="#9554FE"
                        title={elem.title}
                        content={elem.explanation}
                        improvedSentence={elem.improvedSentence}
                        contentStyle={{ backgroundColor: "#FF0000" }}
                      />
                    );
                  })}
                {/* {!suggestions.length ? (
                  <div className="border-x-2 border-b-2 border-t-2 p-2 mr-2 rounded-b-lg rounded-r-lg">
                    <img src={EmptySentiment} className="mx-auto"></img>
                  </div>
                ) : null} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
