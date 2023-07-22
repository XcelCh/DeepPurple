import React, { useState } from 'react';
import TranscriptCard from '../components/TranscriptCard';
import { AudioPlayer } from '../components/AudioPlayer';
import { EmptySentiment } from "../assets/index";
import { Category, EmployeeSentiment, CustomerSentiment, CallSentiment, Confidence, SampleRate, AudioFormat } from "../assets/index";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function RecordingAnalysis() {
    const [isEdited, setIsEdited] = useState(false);
    const updateIsEdited = (value) => {
        setIsEdited(value);
    };

    const data = {
        labels: ['Silent', 'Employee', 'Customer'],
        datasets: [
            {
                data: [20, 40, 60],
                backgroundColor: ['yellow', 'green', 'blue'],
                borderColor: 'black',
                borderWidth: 1,    
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
              display: false, // Set to false to hide the legend
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y;
                        return value + '%';
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return value + '%';
                    },
                }
            }
        }
    }

    let initialParagraphs = [
        { id: 'group1_p1', role: "Agent", speaker: "Excel", startTime: "00:00", endTime: "00:05", sentence: "Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed. Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed." },
        { id: 'group1_p2', role: "Customer", speaker: "Customer", startTime: "00:05", endTime: "00:10", sentence: "Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed. Lorem ipsum dolor." },
        { id: 'group1_p3', role: "Agent", speaker: "Excel", startTime: "00:10", endTime: "01:00",  sentence: "Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed. Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed." },
        { id: 'group1_p4', role: "Customer", speaker: "Customer", startTime: "01:00", endTime: "01:23", sentence: "Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed. Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed." },
        { id: 'group1_p5', role: "Agent", speaker: "Excel", startTime: "01:23", endTime: "01:38", sentence: "Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed. Lorem ipsum dolor." },
        { id: 'group1_p6', role: "Customer", speaker: "Customer", startTime: "01:38", endTime: "02:02", sentence: "Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed. Lorem ipsum dolor sit amet consectetur adipiscing elit, porttitor cum dui sem cubilia sed." },
        // Add more paragraphs as needed
    ];

    return (
        <div className="">
            <div className="flex items-center">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <p className="text-2xl font-bold text-left ml-4">Recording Analysis</p>
            </div>
            <p className="text-xl font-bold text-left ml-12 mt-4">Sample Recording 1</p>
            <div class="grid w-full gap-6 grid-cols-9 mt-8">
                <div class="flex items-center">
                    <div className="w-1/4 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <div className="w-3/4 flex flex-col ml-4 border-r border-gray-400 h-1/2 justify-center">
                        <div className="flex-grow font-bold text-lg">
                            Agent
                        </div>
                        <div className="flex-grow">
                            Excel
                        </div>
                    </div>
                </div>
                <div class="flex items-center col-span-2">
                    <div className="w-1/4 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="w-3/4 flex flex-col border-r border-gray-400 h-1/2 justify-center">
                        <div className="flex-grow font-bold text-lg">
                            Upload Data and Time
                        </div>
                        <div className="flex-grow">
                            2023-01-01 01:01:01
                        </div>
                    </div>
                </div>
                <div class="flex items-center col-span-2">
                    <div className="w-1/4 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                    </div>
                    <div className="w-3/4 flex flex-col border-r border-gray-400 h-1/2 justify-center">
                        <div className="flex-grow font-bold text-lg">
                            Date Recorded
                        </div>
                        <div className="flex-grow">
                            2023-01-01 01:01:01
                        </div>
                    </div>
                </div>
                <div class="flex items-center col-span-2">
                    <div className="w-1/4 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                        </svg>
                    </div>
                    <div className="w-3/4 flex flex-col border-r border-gray-400 h-1/2 justify-center">
                        <div className="flex-grow font-bold text-lg">
                            Call Duration
                        </div>
                        <div className="flex-grow">
                            5 minutes 30 seconds
                        </div>
                    </div>
                </div>
                <div class="flex items-center col-span-2">
                    <div className="w-1/4 flex flex-col items-center">
                        <img src={Category} />
                    </div>
                    <div className="w-3/4 flex flex-col">
                        <div className="flex-grow font-bold text-lg">
                            Category
                        </div>
                        <div className="flex-grow">
                            Inquiry
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 w-full border rounded-lg text-justify p-4">
                <p className="text-xl font-bold">Summary</p>
                <p className="text-md">
                    The customer called to report their laptop’s battery is swollen. The employee told the customer 
                    to bring the customer to the official service. The agent confirmed the customer personal details 
                    and sent a booking website link to the customer. The customer asked how long the estimate time to 
                    service the laptop. The agent said it will be around 5 days and the call ended. The caller’s needs 
                    were met.
                </p>
            </div>
            <div className="mt-8 grid w-full gap-4 grid-cols-5">
                <div className="grid w-full grid-cols-5 gap-2 p-4 border rounded-lg col-span-3">
                    <div className="col-span-2">
                        <p className="text-xl font-bold">Speaker Time</p>
                        <div className="mt-4">
                            <p className="text-lg font-bold">Employee Time</p>
                            <p>2 minutes 30 seconds</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-lg font-bold">Customer Time</p>
                            <p>2 minutes 30 seconds</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-lg font-bold">Silent Time</p>
                            <p>30 seconds</p>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <p className="text-xl font-bold">Visualization</p>
                        <Bar
                            style = {{
                                padding: '20px'
                            }}
                            data = {data}
                            options = {options}    
                        ></Bar>
                    </div>
                </div>
                
                <div className="border p-4 rounded-lg col-span-2">
                    <p className="flex justify-center text-xl font-bold">Recording Sentiment Analysis</p>
                    <div className="grid grid-rows-2">
                        <div class="grid grid-cols-2 mt-2">
                            <div class="flex flex-col justify-center items-center">
                                <img src={CustomerSentiment}/>
                                <p className="font-semibold">Customer</p>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#80F2AA" class="w-7 h-7">
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
                                    </svg>
                                    <p className="ml-1">Positive</p>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center items-center">
                                <img src={EmployeeSentiment}/>
                                <p className="font-semibold">Employee</p>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFAFAF" class="w-7 h-7">
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clip-rule="evenodd" />
                                    </svg>
                                    <p className="ml-1">Negative</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <img src={CallSentiment}/>
                            <p className="font-semibold">Call</p>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFAFAF" class="w-7 h-7">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clip-rule="evenodd" />
                                </svg>
                                <p className="ml-1">Negative</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-xl font-bold">Recording Playback</p>
                <div className="mt-4 grid w-full gap-4 grid-cols-5">
                    <div className="grid w-full p-4 border rounded-lg col-span-3">
                        <p className="text-xl font-bold mb-2">Sample Recording 1</p>
                        <AudioPlayer initialParagraphs={initialParagraphs}/>
                    </div>
                    
                    <div className="col-span-2">
                        <div className="grid grid-rows-2 p-4">
                            <div className="flex items-center border-b border-gray-400 p-4">
                                <div className="mr-4">
                                    <img src={Confidence} />
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-xl font-bold">Transcript Confidence Rate</p>
                                        <p className="text-xl font-bold">90%</p>
                                    </div>
                                    <p className="inline-block px-3 rounded-full bg-[#3CAA1E] text-white">High</p>
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
                                            <p>.wav</p>
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
                                            <p>8000 Hz</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="mt-4 grid w-full gap-4 grid-cols-5">
                    <div className="grid w-full rounded-lg col-span-3">
                        <div className="p-2">
                            <TranscriptCard isEdited={isEdited} updateIsEdited={updateIsEdited} initialParagraphs={initialParagraphs} />
                        </div>
                        <div className="flex mt-2 justify-end items-center pr-4">
                            <button disabled={!isEdited} className={`inline-flex items-center justify-center w-1/5 mr-2 px-4 py-2 text-white rounded-lg focus:outline-none ${isEdited ? "bg-[#3C3988] hover:bg-[#351D4F]" : "bg-[#83848A]"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                <p className="ml-2">Re-analyze</p>
                            </button>
                        </div>
                    </div>
                    
                    <div className="col-span-2">
                        <div className="m-4">
                            <p className="text-xl font-bold">
                                Transcript Emotion Classifier
                            </p>
                            <div className="h-96 mt-2">
                                <div className="tabs">
                                    <a className={`tab tab-lifted bg-[#E5E6E6] font-bold tab-active`}>All</a>
                                </div>
                                <div className="border-x-2 border-b-2 border-t-2 p-2 mr-2 rounded-b-lg rounded-r-lg">
                                    <img src={EmptySentiment} className="mx-auto"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default RecordingAnalysis;