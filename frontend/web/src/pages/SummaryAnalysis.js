import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Duration, Inquiries, Complaints, Warranties, PositiveRectangle, NegativeRectangle, Heart, RedHeart } from "../assets/index";
import randomColor from 'randomcolor';
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

  const [mostMentionedData, setMostMentionedData] = useState({
    labels: [],
    datasets: []
  });

  const mostMentionedOptions = {
      indexAxis: "y",
      plugins: {
          legend: {
            display: false, // Set to false to hide the legend
          },
      },
      scales: {
          x: {
            grid: {
              display: false, // Set to false to hide the vertical grid lines
            }
          },
          y: {
            grid: {
              display: false, // Set to false to hide the vertical grid lines
            }
          },
      },
  }

  const calculateTime = (secs) => {
    if(secs < 60) {
        return `${secs} ${secs === 1 ? 'second' : 'seconds'}`;
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

  const [summaryAnalysisData, setSummaryAnalysisData] = useState([]);
  const [topSentimentOption, setTopSentimentOption] = useState('Positive');
  const [randomColors, setRandomColors] = useState([]);
  const [employeeSentimentOption, setEmployeeSentimentOption] = useState(0);
  const [employeeSentiment, setEmployeeSentiment] = useState({
    sentimentCount: [],
    sentimentPercentage: [],
    sentimentCategory: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8082/summaryAnalysis/getAnalysis`)
      .then(response => {
          // error unauthorized
          if (response.status == 401) {
              navigate("/");
              console.log("401 Unauthorized");
          }
          else if (response.status == 200) {
              console.log("Success");
              return response.json();
          }
      })
      .then(data => {
        data.averageCallDuration = parseInt(data.averageCallDuration);
        setSummaryAnalysisData(data);
        setEmployeeSentiment({
          sentimentCount: data.employeeSentiment,
          sentimentPercentage: [countToPercentage(data.employeeSentiment[0][0], data.employeeSentiment[0][1]), countToPercentage(data.employeeSentiment[0][1], data.employeeSentiment[0][0])],
          sentimentCategory: countToPercentage(data.employeeSentiment[0][0], data.employeeSentiment[0][1]) > 49 ? "High" : "Low",
        })
        setMostMentionedData({
          labels: [data.mostMentionedWords[0][0], data.mostMentionedWords[1][0], data.mostMentionedWords[2][0], data.mostMentionedWords[3][0], data.mostMentionedWords[4][0]],
          datasets: [{
            data: [data.mostMentionedWords[0][1], data.mostMentionedWords[1][1], data.mostMentionedWords[2][1], data.mostMentionedWords[3][1], data.mostMentionedWords[4][1]],
            backgroundColor: '#EE5B3D',
            borderWidth: 0,
          }]
        })
      })
      .catch(error => {
          console.error(error);
      })

    const dataLine = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Inquiry',
            data: [40, 45, 42, 52, 60, 68, 49, 39, 42, 52, 67, 62],
            backgroundColor: '#38BAF4',
            borderColor: '#38BAF4',
          },
          {
            label: 'Complaint',
            data: [10, 20, 10, 30, 25, 34, 40, 31, 14, 19, 25, 28],
            backgroundColor: '#EE5B3D',
            borderColor: '#EE5B3D',
          },
          {
            label: 'Warranty',
            data: [63, 77, 70, 85, 81, 65, 90, 100, 91, 84, 80, 92],
            backgroundColor: '#FFA425',
            borderColor: '#FFA425',
          },
          {
            label: 'Total',
            data: [150, 147, 130, 189, 181, 195, 200, 162, 153, 170, 187, 169],
            backgroundColor: '#6676EE',
            borderColor: '#6676EE',
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false, // Set to false to hide the vertical grid lines
            }
          },
        },
      }
    };

    const categoryCanvas = document.getElementById("chartCategoryTrend");

    if (categoryCanvas.chart) {
      categoryCanvas.chart.destroy();
    }
    
    categoryCanvas.chart = new ChartJS(categoryCanvas, dataLine);
  }, []);

  useEffect(() => {
    console.log(employeeSentiment);
    console.log(summaryAnalysisData);

    if (!summaryAnalysisData) {
      // Data is not available yet, skip rendering the chart
      return;
    }

    if (summaryAnalysisData.callsHandled) {
      const colors = summaryAnalysisData.callsHandled.map(randomColor);
      setRandomColors(colors);
    }

    // Chart data
    const dataDoughnut = {
      labels: ["Positive", "Negative"],
      datasets: [
        {
          label: "Number of calls",
          data: [summaryAnalysisData.countPositiveSentiment, summaryAnalysisData.countNegativeSentiment],
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
  }, [summaryAnalysisData])

  const handleEmployeeSentiment = (employeeId) => {
    setEmployeeSentimentOption(employeeId);
    fetch(`http://localhost:8082/summaryAnalysis/employeeSentiment/${employeeId}`)
      .then(response => {
          // error unauthorized
          if (response.status == 401) {
              navigate("/");
              console.log("401 Unauthorized");
          }
          else if (response.status == 200) {
              console.log("Success");
              return response.json();
          }
      })
      .then(data => {
        setEmployeeSentiment({
          sentimentCount: data,
          sentimentPercentage: [countToPercentage(data[0][0], data[0][1]), countToPercentage(data[0][1], data[0][0])],
          sentimentCategory: countToPercentage(data[0][0], data[0][1]) > 49 ? "High" : "Low"
        });
      })
      .catch(error => {
          console.error(error);
      })
  }

  return (
    <>
      <div className="pt-16 pl-16">
        <div className="flex items-center">
          <p className="text-2xl font-bold text-left ml-4">Analysis Summary</p>
        </div>

        {/* Date recorded range */}
        <div>
          <p className="text-xl font-bold text-left ml-4 mt-4">Date Recorded Range</p>
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
                      {calculateTime(summaryAnalysisData.averageCallDuration)}
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
                      {summaryAnalysisData.countInquiry}
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
                      {summaryAnalysisData.countComplaint}
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
                      {summaryAnalysisData.countWarranty}
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
              <div className="rounded-lg overflow-hidden" style={{ width: '150px', height: '150px' }}>
                <canvas id="chartDoughnut"></canvas>
              </div>
            </div>
            <div className="w-2/3 flex flex-col ml-8 justify-center">
              <div className="flex-grow font-bold text-lg">
                Number of Call Sentiments
              </div>
              <div className="flex flex-grow font-medium mt-2">
                <img src={PositiveRectangle} />
                <p className="ml-2">{countToPercentage(summaryAnalysisData.countPositiveSentiment, summaryAnalysisData.countNegativeSentiment)}% Positive ({summaryAnalysisData.countPositiveSentiment})</p>
              </div>
              <div className="flex flex-grow font-medium">
                <img src={NegativeRectangle} />
                <p className="ml-2">{countToPercentage(summaryAnalysisData.countNegativeSentiment, summaryAnalysisData.countPositiveSentiment)}% Negative ({summaryAnalysisData.countNegativeSentiment})</p>
              </div>
            </div>
          </div>

          <div className="flex col-span-2 border rounded-md p-4">
            {/* Top 5 employee */}
            <div className="w-2/5 h-1/2">
              <div className="flex h-1/3 items-center mb-2">
                <div className="flex-grow font-bold text-md">
                  Top 5 Employee Based On Sentiment
                </div>
                <div className="relative w-2/5">
                  <select 
                      className="bg-gray-50 block appearance-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 h-full px-2" 
                      id="grid-state"
                      value={topSentimentOption}
                      onChange={(event) => setTopSentimentOption(event.target.value)}
                  >
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
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
                            Value
                        </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSentimentOption === 'Positive' ? (
                      summaryAnalysisData.top5Positive && summaryAnalysisData.top5Positive.map((employee, index) => (
                        <tr className="bg-[#80F2AA] border-b border-[#83848A]">
                          <th scope="row" className="px-6 py-2 font-medium text-black whitespace-nowrap">
                              {index+1}
                          </th>
                          <td className="px-6 py-2 text-black">
                              {employee[0]}
                          </td>
                          <td className="px-6 py-2 text-black">
                              {employee[1]}
                          </td>
                        </tr>
                      ))
                    ) : (
                      summaryAnalysisData.top5Negative && summaryAnalysisData.top5Negative.map((employee, index) => (
                        <tr className="bg-[#EE5B3D] border-b border-[#83848A]">
                          <th scope="row" className="px-6 py-2 font-medium text-black whitespace-nowrap">
                              {index+1}
                          </th>
                          <td className="px-6 py-2 text-black">
                              {employee[0]}
                          </td>
                          <td className="px-6 py-2 text-black">
                              {employee[2]}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Employee's sentiment */}
            <div className="w-3/5 border-l ml-4">
              <div className="flex h-1/3 px-4 items-center">
                <div className="flex-grow font-bold text-lg">
                  Employee's Sentiment
                </div>
                <div className="relative w-1/3">
                  <select 
                      className="bg-gray-50 block appearance-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 focus:ring-indigo-600 focus:border-indigo-600 block px-2" 
                      id="grid-state"
                      value={employeeSentimentOption}
                      onChange={(event) => handleEmployeeSentiment(event.target.value)}
                  >
                    {summaryAnalysisData.allEmployeeName && summaryAnalysisData.allEmployeeName.map((employee, index) => (
                      <option key={index} value={employee[0]}>
                        {employee[1]}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                {employeeSentiment.sentimentCount && employeeSentiment.sentimentCount[0] && (
                  <div className="grid grid-cols-3">
                    <div className="flex flex-col items-center col-span-1">
                      <div className="flex items-center">
                        <img src={employeeSentiment.sentimentCategory === "Low" ? RedHeart : Heart} />
                        <p className={`text-3xl font-bold ${employeeSentiment.sentimentCategory === "Low" ? "text-[#EE5B3D]" : "text-[#80F2AA]"}`}>{employeeSentiment.sentimentPercentage[0]}%</p>
                      </div>
                      <p className="text-xl font-medium">{employeeSentiment.sentimentCategory}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-2">
                      <div className="relative w-full">
                        <div className="flex items-center justify-between font-medium">
                          <div className="text-[#80F2AA]">{employeeSentiment.sentimentCount[0][0]} ({employeeSentiment.sentimentPercentage[0]}%)</div>
                          <div className="text-[#EE5B3D]">{employeeSentiment.sentimentCount[0][1]} ({employeeSentiment.sentimentPercentage[1]}%)</div>
                        </div>
                        <div className="flex h-3 overflow-hidden rounded-xl bg-[#EE5B3D] text-xs">
                          <div style={{ width: `${employeeSentiment.sentimentPercentage[0]}%` }} className="bg-[#80F2AA]"></div>
                        </div>
                        <div className="flex items-center justify-between font-medium">
                          <div className="text-[#80F2AA]">Positive</div>
                          <div className="text-[#EE5B3D]">Negative</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Third row */}
        <div className="grid w-full gap-4 grid-cols-2 mt-4 px-4">
          <div className="border rounded-md p-8">
            <p className="font-bold text-xl mb-4">Call Category Trend</p>
            <div className="rounded-lg overflow-hidden">
              <canvas id="chartCategoryTrend"></canvas>
            </div>
          </div>

          {/* Number of calls handled */}
          <div className="border rounded-md p-8">
            <p className="font-bold text-xl mb-4">Number of Calls Handled</p>
            <div className="overflow-y-scroll h-96 pr-4">
              {summaryAnalysisData.callsHandled && summaryAnalysisData.callsHandled.map((call, index) => (
                <div className="mb-4">
                  <p className="font-semibold">{call[0]}</p>
                  <div className="relative w-full">
                    <div className="flex items-center justify-between">
                      <div className="text-[#83848A]">Average session: {calculateTime(call[1])}</div>
                      <div className="text-[#83848A]">{call[2]} of {summaryAnalysisData.recordingCount} calls</div>
                    </div>
                    {/* Bar */}
                    <div className="mb-5 h-3 rounded-full bg-[#F5F5F5]">
                      <div className="h-3 rounded-full" style={{ width: `${countToPercentage(call[2], summaryAnalysisData.recordingCount - call[2])}%`, backgroundColor: randomColors[index] }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fourth row */}
        <div className="px-4">
          <div className="grid w-full grid-cols-2 mt-4 border rounded rounded-md">
            <div className="col-span-1 p-8 border-r">
              <p className="font-bold text-xl mb-4">Improvement Suggestions</p>
              <p style={{ textAlign: 'justify' }}>To improve customer satisfaction and streamline the process, I would suggest that the employee proactively offer the customer a temporary laptop replacement while their device is being serviced. This gesture would address the customer's immediate needs, ensuring they can continue their work without interruptions during the estimated 5-day service period. Additionally, the employee could provide regular updates on the progress of the laptop repair, keeping the customer informed and minimizing any potential frustration or uncertainty. Such proactive measures will enhance the overall customer experience and foster a positive impression of the company's service.</p>
            </div>
            <div className="grid grid-rows-2 col-span-1 p-8">
              <div className="border-b">
                <p className="font-bold text-xl mb-4">Negative Word Cloud</p>
                <div className="flex items-center justify-center">
                  <ul class="flex justify-center flex-wrap max-w-xl align-center gap-2 leading-8">
                    <li><a class="text-3xl text-cyan-500">Country Names</a></li>
                    <li><a class="text-xl text-teal-500">Chemistry</a></li>
                    <li><a class="text-md text-red-500">File Type</a></li>
                    <li><a class="text-lg text-green-500">Cryptocurrency</a></li>
                    <li><a class="text-sm text-orange-500">Academic</a></li>
                    <li><a class="text-3xl text-cyan-500">Softwares</a></li>
                    <li><a class="text-md text-blue-500">General</a></li>
                    <li><a class="text-2xl text-indigo-500">Web Technology</a></li>
                    <li><a class="text-xl text-indigo-500">Business</a></li>
                    <li><a class="text-md text-blue-500">Technology</a></li>
                    <li><a class="text-xs text-cyan-500">Sports</a></li>
                    <li><a class="text-4xl text-red-500">Law</a></li>
                    <li><a class="text-lg text-gray-500">Internet Slangs</a></li>
                    <li><a class="text-3xl text-cyan-500">Insurance</a></li>
                    <li><a class="text-md text-blue-500">Space Science</a></li>
                    <li><a class="text-4xl text-red-500">Jobs</a></li>
                    <li><a class="text-lg text-gray-500">Certifications</a></li>
                    <li><a class="text-sm text-orange-500">Electronics</a></li>
                  </ul>
                </div>
              </div>
              <div>
                <p className="font-bold text-xl mt-4">5 Most Mentioned Words</p>
                <div className="flex items-center justify-center">
                  <div style={{ width: '500px', height: '250px'}}>
                    <Bar
                      data = {mostMentionedData}
                      options = {mostMentionedOptions}    
                    ></Bar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryAnalysis;
