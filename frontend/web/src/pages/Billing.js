import React, { useEffect } from "react";
import visaImage from "../assets/Visa.png";
import GenericModal from "../components/GenericModal";
import Footer from '../components/Footer';

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

function Billing() {
    
    const data = {
        labels: ['01 Aug', '02 Aug', '03 Aug', '04 Aug', '05 Aug', '06 Aug'],
        datasets: [
            {
                data: [0.24, 0.48, 0.72, 0.96, 1.2, 1.5],
                backgroundColor: '#7566BB',
                borderWidth: 0,    
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
                        return '$' + value;
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
                    return '$' + value;
                },
                },
            },
        },
    }

    const setUsageLimit = (limit) => {
        
    };

    return (
        <div className="h-full bg-[#ECEAEF]">
            <div className="pt-32 px-32 mb-8">
                <p className="text-4xl text-[#7566BB] font-bold">
                    Usage and billing
                </p>
                <p className="text-lg text-[#7566BB] font-semibold">
                    Manage your plan and billing details.
                </p>
            </div>
            <div>
                <div className="grid w-full gap-16 grid-cols-2 px-32">
                    <div className="border border-[#A5A5A5] rounded-md p-6 bg-white">
                        <p className="text-xl font-bold text-[#414141]">
                            Usage this month
                        </p>
                        <p className="text-md text-[#414141]">
                            The amount you need to pay for this month.
                        </p>
                        <div className="h-4 rounded-full bg-[#F5F5F5] mt-2">
                            <div className="h-4 rounded-full" style={{ width: `25%`, backgroundColor: `#7566BB` }}></div>
                        </div>
                        <div className="flex justify-end text-md mt-2 text-[#414141]">
                            <p>$2.11 / $10.00</p>
                        </div>
                        <div className="flex justify-end text-md mt-2">
                            <label
                                htmlFor="setUsageLimitModal"
                                className="text-[#7566BB] hover:underline"
                                style={{ cursor: 'pointer' }}
                            >
                                <p className="text-md">Set limits</p>
                            </label>
                        </div>
                    </div>
                    
                    <div className="border border-[#A5A5A5] rounded-md p-6 bg-white">
                        <p className="text-xl font-bold text-[#414141]">
                            Payment method
                        </p>
                        <p className="text-md text-[#414141]">
                            Change how you pay for your plan.
                        </p>
                        <div className="flex items-center space-x-4 border rounded-md border-[#A5A5A5] mt-2 p-2">
                            <img class="h-5 justify-self-end mr-8 ml-4" src={visaImage} alt="Visa image"></img>
                            <div className="flex-1">
                                <div className="text-md font-bold">
                                    Visa ending in 1234
                                </div>
                                <div className="text-sm text-[#414141]">
                                    Expiry 06/2024
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#414141" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    <p className="text-sm ml-1 text-[#414141]">testing@gmail.com</p>
                                </div>
                            </div>
                            <button
                                className="bg-[#7566BB] text-white hover:bg-[#5E519A] py-2 px-4 rounded-lg inline-flex items-center"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="px-32">
                    <div className="border border-[#A5A5A5] rounded-md p-8 bg-white">
                        <p className="text-2xl font-bold text-[#414141]">
                            Usage
                        </p>
                        <p className="text-md text-[#414141]">
                            The chart below provides a visual representation of your usage activity over time.
                        </p>
                        <div className="flex mt-2">
                            <select
                                className="select select-bordered font-normal select-sm h-11 w-48"
                                >
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                            </select>
                            <select
                                className="select select-bordered font-normal select-sm h-11 w-24 ml-4"
                                >
                                <option value="January">2023</option>
                                <option value="February">2022</option>
                                <option value="March">2021</option>
                            </select>
                        </div>
                        <p className="text-xl font-bold mt-2 mb-2 text-[#414141]">
                            Daily usage (SGD)
                        </p>
                        <div style={{ width: '800px', height: '400px'}}>
                            <Bar
                                data = {data}
                                options = {options}    
                            ></Bar>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 mb-16">
                <div className="px-32">
                    <div className="border border-[#A5A5A5] rounded-md p-8 bg-white">
                        <p className="text-2xl font-bold text-[#414141]">
                            Billing history
                        </p>
                        <table className="table table-auto mx-auto w-full text-md mt-4">
                            {/* head */}
                            <thead>
                                <tr className="border-b border-t text-[#414141]">
                                    <th className="bg-[#FFFFFF] normal-case text-lg font-bold">
                                        No
                                    </th>
                                    <th className="bg-[#FFFFFF] normal-case text-lg font-bold">
                                        Billing date
                                    </th>
                                    <th className="bg-[#FFFFFF] normal-case text-lg font-bold text-center">
                                        Amount
                                    </th>
                                    <th className="bg-[#FFFFFF] normal-case text-lg font-bold text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-[#414141]">
                                    <th className="h-1">1</th>
                                    <td className="h-1">Jan 1, 2023</td>
                                    <td className="text-center h-1">$10.00</td>
                                    <td className="text-center h-1">Paid</td>
                                </tr>
                                <tr className="text-[#414141]">
                                    <th className="h-1">2</th>
                                    <td className="h-1">Feb 1, 2023</td>
                                    <td className="text-center h-1">$10.00</td>
                                    <td className="text-center h-1">Paid</td>
                                </tr>
                                <tr className="text-[#414141]">
                                    <th className="h-1">3</th>
                                    <td className="h-1">Mar 1, 2023</td>
                                    <td className="text-center h-1">$10.00</td>
                                    <td className="text-center h-1">Paid</td>
                                </tr>
                                <tr className="text-[#414141]">
                                    <th className="h-1">4</th>
                                    <td className="h-1">Apr 1, 2023</td>
                                    <td className="text-center h-1">$10.00</td>
                                    <td className="text-center h-1">Paid</td>
                                </tr>
                                <tr className="text-[#414141]">
                                    <th className="h-1">5</th>
                                    <td className="h-1">May 1, 2023</td>
                                    <td className="text-center h-1">$10.00</td>
                                    <td className="text-center h-1">Paid</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <GenericModal
                cardTitle="Set monthly spend limits"
                fieldName="Usage limits"
                placeholderContent="$5.00"
                buttonContent="Save"
                id="setUsageLimitModal"
                handleSave={setUsageLimit}
            ></GenericModal>
            <Footer />
        </div>
    );
}

export default Billing;