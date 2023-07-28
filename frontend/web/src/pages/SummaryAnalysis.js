import React, { useState, useEffect } from "react";
import { Duration, Inquiries, Complaints, Warranties, PositiveRectangle, NegativeRectangle, Heart, NegativeWordmap } from "../assets/index";
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

  const mostMentionedData = {
    labels: ['Battery', 'Monitor', 'Internet', 'Keyboard', 'Mouse'],
    datasets: [
        {
            data: [1000, 800, 700, 500, 300],
            backgroundColor: '#EE5B3D',
            borderWidth: 0,    
        }
    ]
  }

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

  useEffect(() => {
    // Chart data
    const dataDoughnut = {
      labels: ["Positive", "Negative"],
      datasets: [
        {
          label: "Number of calls",
          data: [1544, 386],
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

    const canvas = document.getElementById("chartDoughnut");
    const categoryCanvas = document.getElementById("chartCategoryTrend");

    // Destroy any existing chart instance on the canvas
    if (canvas.chart) {
      canvas.chart.destroy();
    }

    if (categoryCanvas.chart) {
      categoryCanvas.chart.destroy();
    }

    // Render the doughnut chart
    canvas.chart = new ChartJS(canvas, configDoughnut);
    categoryCanvas.chart = new ChartJS(categoryCanvas, dataLine);
  }, []);

  return (
    <>
      <div className="">
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
                      4 minutes 30 seconds
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
                      330
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
                      600
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
                      1000
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
                <p className="ml-2">80% Positive (1544)</p>
              </div>
              <div className="flex flex-grow font-medium">
                <img src={NegativeRectangle} />
                <p className="ml-2">20% Negative (386)</p>
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
                      // value={formData.gender}
                      // onChange={(event) => setFormData({ ...formData, gender: event.target.value })}
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
                    <tr className="bg-[#80F2AA] border-b border-[#83848A]">
                      <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                          1
                      </th>
                      <td className="px-6 py-2">
                          Gui
                      </td>
                      <td className="px-6 py-2">
                          99%
                      </td>
                    </tr>
                    <tr className="bg-[#80F2AA] border-b border-[#83848A]">
                      <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                          1
                      </th>
                      <td className="px-6 py-2">
                          Gui
                      </td>
                      <td className="px-6 py-2">
                          99%
                      </td>
                    </tr>
                    <tr className="bg-[#80F2AA] border-b border-[#83848A]">
                      <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                          1
                      </th>
                      <td className="px-6 py-2">
                          Gui
                      </td>
                      <td className="px-6 py-2">
                          99%
                      </td>
                    </tr>
                    <tr className="bg-[#80F2AA] border-b border-[#83848A]">
                      <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                          1
                      </th>
                      <td className="px-6 py-2">
                          Gui
                      </td>
                      <td className="px-6 py-2">
                          99%
                      </td>
                    </tr>
                    <tr className="bg-[#80F2AA]">
                      <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                          1
                      </th>
                      <td className="px-6 py-2">
                          Gui
                      </td>
                      <td className="px-6 py-2">
                          99%
                      </td>
                    </tr>
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
                      // value={formData.gender}
                      // onChange={(event) => setFormData({ ...formData, gender: event.target.value })}
                  >
                      <option value="Bryant">Bryant</option>
                      <option value="Excel">Excel</option>
                      <option value="Patricia">Patricia</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3">
                  <div className="flex flex-col items-center col-span-1">
                    <div className="flex items-center">
                      <img src={Heart} />
                      <p className="text-3xl font-bold text-[#80F2AA]">90%</p>
                    </div>
                    <p className="text-xl font-medium">High</p>
                  </div>
                  <div className="flex flex-col items-center justify-center col-span-2">
                    <div className="relative w-full">
                      <div className="flex items-center justify-between font-medium">
                        <div className="text-[#80F2AA]">174 (90%)</div>
                        <div className="text-[#EE5B3D]">19 (10%)</div>
                      </div>
                      <div className="flex h-3 overflow-hidden rounded-xl bg-[#EE5B3D] text-xs">
                        <div style={{ width: '90%' }} className="bg-[#80F2AA]"></div>
                      </div>
                      <div className="flex items-center justify-between font-medium">
                        <div className="text-[#80F2AA]">Positive</div>
                        <div className="text-[#EE5B3D]">Negative</div>
                      </div>
                    </div>
                  </div>
                </div>
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
            <div className="mb-4">
              <p className="font-semibold">Gui</p>
              <div className="relative w-full">
                <div className="flex items-center justify-between">
                  <div className="text-[#83848A]">Average session: 2 minutes 58 seconds</div>
                  <div className="text-[#83848A]">579 of 1930 calls</div>
                </div>
                <div className="mb-5 h-3 rounded-full bg-[#F5F5F5]">
                  <div className="h-3 rounded-full bg-[#A5A5A5]" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Bryant</p>
              <div className="relative w-full">
                <div className="flex items-center justify-between">
                  <div className="text-[#83848A]">Average session: 2 minutes 58 seconds</div>
                  <div className="text-[#83848A]">579 of 1930 calls</div>
                </div>
                <div className="mb-5 h-3 rounded-full bg-[#F5F5F5]">
                  <div className="h-3 rounded-full bg-[#FFC000]" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Gui</p>
              <div className="relative w-full">
                <div className="flex items-center justify-between">
                  <div className="text-[#83848A]">Average session: 2 minutes 58 seconds</div>
                  <div className="text-[#83848A]">579 of 1930 calls</div>
                </div>
                <div className="mb-5 h-3 rounded-full bg-[#F5F5F5]">
                  <div className="h-3 rounded-full bg-[#4472C4]" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Gui</p>
              <div className="relative w-full">
                <div className="flex items-center justify-between">
                  <div className="text-[#83848A]">Average session: 2 minutes 58 seconds</div>
                  <div className="text-[#83848A]">579 of 1930 calls</div>
                </div>
                <div className="mb-5 h-3 rounded-full bg-[#F5F5F5]">
                  <div className="h-3 rounded-full bg-[#ED7D31]" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold">Gui</p>
              <div className="relative w-full">
                <div className="flex items-center justify-between">
                  <div className="text-[#83848A]">Average session: 2 minutes 58 seconds</div>
                  <div className="text-[#83848A]">579 of 1930 calls</div>
                </div>
                <div className="mb-5 h-3 rounded-full bg-[#F5F5F5]">
                  <div className="h-3 rounded-full bg-[#5B9BD5]" style={{ width: '10%' }}></div>
                </div>
              </div>
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
