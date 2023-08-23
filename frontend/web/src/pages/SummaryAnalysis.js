import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Duration, Inquiries, Complaints, Warranties, PositiveRectangle, NegativeRectangle, Heart, RedHeart } from "../assets/index";
import randomColor from 'randomcolor';
import authHeader from "../services/auth-header";
import { 
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  DoughnutController,
  ArcElement,
  Legend,
  Title,
  PointElement,
  LineController,
  LineElement
} from "chart.js";

import { Bar } from 'react-chartjs-2';
import { BASE_URL } from "./config";
import Swal from "sweetalert2";
import QuestionIcon from "@mui/icons-material/HelpOutline";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
  Legend,
  Title,
  PointElement,
  LineController,
  LineElement
)

function SummaryAnalysis() {
  const navigate = useNavigate();
  const token = authHeader();

  const [analysisForm, setAnalysisForm] = useState({

    averageCallDuration : 0.00,
    inquiry : 0,
    complaint : 0, 
    warranty : 0,
    positiveRecSentiment : 0,
    negativeRecSentiment : 0,
    positiveEmpSentiment : 0,
    negativeEmpSentiment : 0,
    suggestion: ''
  })

  
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [sortedCallsHandled, setSortedCallsHandled] = useState([]);
  const employeeDetail = [];

  const calculateTime = (secs) => {
    if (isNaN(secs) || secs === 0) {
      return 'No calls';
    }
    if(secs < 60) {
        return `${Math.floor(secs.toFixed(2))} ${secs === 1 ? "second" : "seconds"}`;
    } else {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;  
        const seconds = Math.floor(secs % 60);
        if(seconds === 0) {
            return `${returnedMinutes} ${minutes > 1 ? 'minutes ' : 'minute '}`;
        }
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes} ${minutes > 1 ? 'minutes ' : 'minute '} ${returnedSeconds} ${seconds === 1 ? 'second' : 'seconds'}`;
    }
  }

  const countToPercentage = (num, otherHalf) => {
    const totalCount = num + otherHalf;
    return Math.round(num / totalCount * 100);
  }

  const [randomColors, setRandomColors] = useState([]);
  const [employeeName, setEmployeeName] = useState(0);
  const [employeeKey, setEmployeeKey] = useState(0);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [employeePerformances, setEmployeePerformances] = useState([]);
  const [totalCalls, setTotalCalls] = useState(0);
  const [recordingExist, setRecordingExist] = useState(true);

  useEffect (() => {

      var totalDuration = 0;
      var totalCalls = 0;

      for (var x = 0 ; x < employeeDetails.length; x++) {
        totalCalls += employeeDetails[x].numberOfCalls;
        totalDuration += employeeDetails[x].totalDuration;
      }

      setTotalCalls(totalCalls);

    }, [employeeDetails])

  useEffect( () => {
    window.scrollTo(0, 0);

    Swal.fire({
      title: "Retrieving Analysis...",
      didOpen: () => {
        Swal.showLoading();

        fetch(`${BASE_URL}/summaryAnalysis/getAnalysis`, {
          headers : token
        })
          .then(response => {
              // error unauthorized
              if (response.status == 401) {
                navigate("/");
              }
              else if (response.status == 204) {
                setRecordingExist(false);
                Swal.close();
              }
              else if (response.status == 200) {
                setRecordingExist(true);
                return response.json();
              }
          })
          .then(data => {
              setEmployeeNames(data.employeeList.map(employee => employee.employeeName));
              setEmployeePerformances(data.employeeList.map(employee => employee.employeeAvgPerformance));
              setAnalysisForm({
                averageCallDuration : data.averageCallDuration,
                inquiry : data.inquiry,
                complaint : data.complaint, 
                warranty : data.warranty,
                positiveRecSentiment : data.positiveRecSentiment,
                negativeRecSentiment : data.negativeRecSentiment,
                positiveEmpSentiment : data.positiveEmpSentiment,
                negativeEmpSentiment : data.negativeEmpSentiment,
                suggestion: data.suggestion
    
              })
    
              const sorted = [...data.employeeList].sort((a, b) => b.numberOfCalls - a.numberOfCalls);
              setSortedCallsHandled(sorted);
    
              for(let x = 0; x < data.employeeList.length; x++) {
      
                employeeDetail.push(data.employeeList[x]);
              }
    
            setEmployeeDetails(employeeDetail);
             Swal.close();
          })
          .catch(error => {
              console.error(error);
          })

      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    
    
    

  }, []);

  useEffect(() => {
    if (analysisForm.averageCallDuration === 0) {
      // Data is not available yet, skip rendering the chart
      return;
    }

    if (employeeDetails.length > 0) {
      const colors = employeeDetails.map(randomColor);
      setRandomColors(colors);
    }

    // Chart data
    const dataDoughnut = {
      labels: ["Positive", "Negative"],
      datasets: [
        {
          label: "Number of calls",
          data: [analysisForm.positiveRecSentiment, analysisForm.negativeRecSentiment],
          backgroundColor: [
            "#80F2AA",
            "#EE5B3D",
          ],
          hoverOffset: 4,
        },
      ],
    };

    // Chart configuration
    const configDoughnut = {
      type: "doughnut",
      data: dataDoughnut,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };

    const canvas = document.getElementById("chartDoughnut");
    // Destroy any existing chart instance on the canvas
    if (canvas.chart) {
      canvas.chart.destroy();
    }
    // Render the doughnut chart
    canvas.chart = new ChartJS(canvas, configDoughnut);

  }, [employeeDetails])

  const handleEmployeeSentiment = (employee) => {
    setEmployeeName(employee);

    for (var x = 0; x < employeeDetails.length; x++) {
      if(employeeDetails[x].employeeName === employee) {
        setEmployeeKey(x);
      }
    }

  }

  const employeePerformanceData = {
    labels: employeeNames,
    datasets: [
      {
        data: employeePerformances,
        backgroundColor: randomColors,
        borderWidth: 0,
      },
    ],
  };

  const employeePerformanceOptions = {
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      }
    },
    scales: {
      x: {
        grid: {
          display: false, // Set to false to hide the vertical grid lines
        },
      },
      y: {
        min: Math.round(Math.min(...employeePerformances) - 1),
        max: Math.round(Math.max(...employeePerformances) + 1),
      },
    },
  };

  return (
    <>
      {/* No recording exist modal */}
      {!recordingExist && (
        <div className="fixed top-0 left-0 right-0 z-50 pt-32 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full bg-black bg-opacity-50">
          <div className="relative w-2/5 mx-auto">
            <div className="relative bg-white rounded-lg shadow">
              <button
                onClick={() => navigate("/recordingList")}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-8 text-center items-center justify-center flex flex-col">
                <svg
                  className="mx-auto mb-4 text-[#414141] w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="mb-5 text-lg font-semibold text-[#414141]">
                  You have to analyze at least 1 recording before viewing the
                  summary analysis!
                </p>
                <button
                  onClick={() => navigate("/recordingList")}
                  className="text-gray-500 bg-white hover:bg-gray-100 hover:font-semibold focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Upload now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {(employeeDetails.length > 0) ? ( */}
      <div className="pt-16 pl-16">
        <div className="flex items-center">
          <p className="text-2xl font-bold text-left ml-4">Analysis Summary</p>
        </div>

        {/* Categories card */}
        <div className="grid w-full gap-8 grid-cols-4 mt-4 px-4">
          <div className="border p-4 rounded-md">
            <div className="flex items-center">
              <div className="w-3/4 flex flex-col ml-2 h-1/2 justify-center">
                <div className="flex-grow font-semibold text-md">
                  Average Call Duration
                </div>
                <div className="flex-grow font-bold text-md mt-2">
                  {calculateTime(analysisForm.averageCallDuration)}
                </div>
              </div>
              <div className="w-1/4 flex flex-col items-center">
                <img src={Duration} />
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-md">
            <div className="flex items-center">
              <div className="w-3/4 flex flex-col ml-2 h-1/2 justify-center">
                <div className="flex-grow font-semibold text-md">
                  Number of Inquiries
                </div>
                <div className="flex-grow font-bold text-xl mt-2">
                  {analysisForm.inquiry}
                </div>
              </div>
              <div className="w-1/4 flex flex-col items-center">
                <img src={Inquiries} />
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-md">
            <div className="flex items-center">
              <div className="w-3/4 flex flex-col ml-2 h-1/2 justify-center">
                <div className="flex-grow font-semibold text-md">
                  Number of Complaints
                </div>
                <div className="flex-grow font-bold text-xl mt-2">
                  {analysisForm.complaint}
                </div>
              </div>
              <div className="w-1/4 flex flex-col items-center">
                <img src={Complaints} />
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-md">
            <div className="flex items-center">
              <div className="w-3/4 flex flex-col ml-2 h-1/2 justify-center">
                <div className="flex-grow font-semibold text-md">
                  Number of Warranties
                </div>
                <div className="flex-grow font-bold text-xl mt-2">
                  {analysisForm.warranty}
                </div>
              </div>
              <div className="w-1/4 flex flex-col items-center">
                <img src={Warranties} />
              </div>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="grid w-full gap-4 grid-cols-3 mt-4 px-4">
          {/* Num of call sentiments */}
          <div className="flex items-center col-span-1 border rounded-md p-8">
            <div className="w-1/3 flex flex-col mr-4">
              <div
                className="rounded-lg overflow-hidden"
                style={{ width: "150px", height: "150px" }}
              >
                <canvas id="chartDoughnut"></canvas>
              </div>
            </div>
            <div className="w-2/3 flex flex-col ml-8 justify-center">
              <div className="flex">
                <div className="flex-grow font-bold text-lg">
                  Number of Call Sentiments
                </div>
                <div
                  data-tooltip-style="light"
                  data-tooltip-target="callSentiment"
                >
                  <QuestionIcon></QuestionIcon>
                </div>
                <div
                  id="callSentiment"
                  role="tooltip"
                  class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-normal text-xs text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
                >
                  Positive means the call's objectives are <br></br> achieved,
                  otherwise negative
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
              <div className="flex flex-grow font-medium mt-2">
                <img src={PositiveRectangle} />
                <p className="ml-2">
                  {countToPercentage(
                    analysisForm.positiveRecSentiment,
                    analysisForm.negativeRecSentiment
                  )}
                  % Positive ({analysisForm.positiveRecSentiment})
                </p>
              </div>

              <div className="flex flex-grow font-medium">
                <img src={NegativeRectangle} />
                <p className="ml-2">
                  {countToPercentage(
                    analysisForm.negativeRecSentiment,
                    analysisForm.positiveRecSentiment
                  )}
                  % Negative ({analysisForm.negativeRecSentiment})
                </p>
              </div>
            </div>
          </div>

          <div className="flex col-span-2 border rounded-md p-4">
            {/* Top 5 employee */}
            <div className="w-2/5 h-1/2">
              <div className="flex h-1/3 items-center mb-2">
                <div className="flex-grow font-bold text-md">
                  Top 5 Employee Based On Performance
                </div>
                <div className="relative w-2/5"></div>
              </div>
              <div className="relative">
                <table className="w-full text-sm text-left text-gray-500 border border-[#83848A]">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-[#83848A]">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Employee name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Avg Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeDetails.slice(0, 5).map((employee, index) => (
                      <tr className="bg-[#80F2AA] border-b border-[#83848A]">
                        <th
                          scope="row"
                          className="px-6 py-2 font-medium text-black whitespace-nowrap"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-2 text-black">
                          {employee.employeeName}
                        </td>
                        <td className="px-6 py-2 text-black">
                          {employee.employeeAvgPerformance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Employee's sentiment */}
            <div className="w-3/5 border-l ml-4">
              <div className="grid-cols-2 flex h-1/3 px-4 items-center gap-24">
                <div className="flex">
                  <div className="font-bold text-lg mr-2">
                    Employee's Sentiment
                  </div>
                  <div
                    data-tooltip-style="light"
                    data-tooltip-target="employeeSentiment"
                  >
                    <QuestionIcon></QuestionIcon>
                  </div>
                  <div
                    id="employeeSentiment"
                    role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-normal text-xs text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
                  >
                    Positive if the agent is being polite and understanding
                    <br></br> when talking to the customer, otherwise negative
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>

                <div className="relative w-1/3">
                  <select
                    className="bg-gray-50 block appearance-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 focus:ring-indigo-600 focus:border-indigo-600 block px-2"
                    id="grid-state"
                    value={employeeName}
                    onChange={(event) =>
                      handleEmployeeSentiment(event.target.value)
                    }
                  >
                    {employeeDetails.map((employee, index) => (
                      <option key={index} value={employee.employeeName}>
                        {employee.employeeName}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {employeeDetails.length > 0 &&
                  (employeeDetails[employeeKey].positiveEmpSentiment !== 0 ||
                  employeeDetails[employeeKey].negativeEmpSentiment !== 0 ? (
                    <div className="grid grid-cols-3">
                      <div className="flex flex-col items-center col-span-1">
                        <div className="flex items-center">
                          <img
                            src={
                              countToPercentage(
                                employeeDetails[employeeKey]
                                  .positiveEmpSentiment,
                                employeeDetails[employeeKey]
                                  .negativeEmpSentiment
                              ) > 49
                                ? Heart
                                : RedHeart
                            }
                          />
                          <p
                            className={`text-3xl font-bold ${
                              countToPercentage(
                                employeeDetails[employeeKey]
                                  .positiveEmpSentiment,
                                employeeDetails[employeeKey]
                                  .negativeEmpSentiment
                              ) > 49
                                ? "text-[#80F2AA]"
                                : "text-[#EE5B3D]"
                            }`}
                          >
                            {[
                              countToPercentage(
                                employeeDetails[employeeKey]
                                  .positiveEmpSentiment,
                                employeeDetails[employeeKey]
                                  .negativeEmpSentiment
                              ),
                            ]}
                            %
                          </p>
                        </div>
                        <p className="text-xl font-medium">
                          {countToPercentage(
                            employeeDetails[employeeKey].positiveEmpSentiment,
                            employeeDetails[employeeKey].negativeEmpSentiment
                          ) > 49
                            ? "High"
                            : "Low"}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center col-span-2">
                        <div className="relative w-full">
                          <div className="flex items-center justify-between font-medium">
                            <div className="text-[#80F2AA]">
                              {
                                employeeDetails[employeeKey]
                                  .positiveEmpSentiment
                              }{" "}
                              (
                              {countToPercentage(
                                employeeDetails[employeeKey]
                                  .positiveEmpSentiment,
                                employeeDetails[employeeKey]
                                  .negativeEmpSentiment
                              )}
                              %)
                            </div>
                            <div className="text-[#EE5B3D]">
                              {
                                employeeDetails[employeeKey]
                                  .negativeEmpSentiment
                              }{" "}
                              (
                              {countToPercentage(
                                employeeDetails[employeeKey]
                                  .negativeEmpSentiment,
                                employeeDetails[employeeKey]
                                  .positiveEmpSentiment
                              )}
                              %)
                            </div>
                          </div>
                          <div className="flex h-3 overflow-hidden rounded-xl bg-[#EE5B3D] text-xs">
                            <div
                              style={{
                                width: `${countToPercentage(
                                  employeeDetails[employeeKey]
                                    .positiveEmpSentiment,
                                  employeeDetails[employeeKey]
                                    .negativeEmpSentiment
                                )}%`,
                              }}
                              className="bg-[#80F2AA]"
                            ></div>
                          </div>
                          <div className="flex items-center justify-between font-medium">
                            <div className="text-[#80F2AA]">Positive</div>
                            <div className="text-[#EE5B3D]">Negative</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center mt-8 text-lg">
                      Employee does not have any recordings yet
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Third row */}
        <div className="grid w-full gap-4 grid-cols-2 mt-4 px-4">
          <div className="border rounded-md p-8">
            <p className="font-bold text-xl mb-4">
              Average Employee Performance
            </p>
            <div className="rounded-lg overflow-hidden">
              <Bar
                style={{
                  padding: "10px",
                }}
                data={employeePerformanceData}
                options={employeePerformanceOptions}
              ></Bar>
            </div>
          </div>

          {/* Number of calls handled */}
          <div className="border rounded-md p-8">
            <p className="font-bold text-xl mb-4">Number of Calls Handled</p>
            <div className="overflow-y-scroll h-96 pr-4">
              {sortedCallsHandled.map((employee, index) => (
                <div className="mb-4">
                  <p className="font-semibold">{employee.employeeName}</p>
                  <div className="relative w-full">
                    <div className="flex items-center justify-between">
                      <div className="text-[#83848A]">
                        Average session:{" "}
                        {calculateTime(
                          employee.totalDuration / employee.numberOfCalls
                        )}
                      </div>
                      <div className="text-[#83848A]">
                        {employee.numberOfCalls} of {totalCalls} calls
                      </div>
                    </div>
                    {/* Bar */}
                    <div className="mb-5 h-3 rounded-full bg-[#F5F5F5]">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${countToPercentage(
                            employee.numberOfCalls,
                            totalCalls - employee.numberOfCalls
                          )}%`,
                          backgroundColor: randomColors[index],
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Fourth row */}
        <div className="px-4">
          <div className="grid w-full mt-4 border rounded rounded-md">
            <div className="p-8 border-r">
              <p className="font-bold text-xl mb-4">Improvement Suggestions</p>
              <p style={{ textAlign: "justify" }}>{analysisForm.suggestion}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryAnalysis;
