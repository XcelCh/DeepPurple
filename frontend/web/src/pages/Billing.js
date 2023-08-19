import React, { useEffect, useState } from "react";
import visaImage from "../assets/Visa.png";
import masterCardImage from "../assets/Mastercard.png";
import GenericModal from "../components/GenericModal";
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Empty } from "../assets/index";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import 'flowbite';
import { BASE_URL } from "./config";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import authHeader from "../services/auth-header";
import AuthService from "../services/auth.service";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function Billing() {

    const token = authHeader();
    const navigate = useNavigate();

    const [fetchDone, setFetchDone] = useState(false); //to store fetch requests' state
    const [cardNum, setCardNum] = useState(''); 
    const [expDate, setExpDate] = useState(''); //state for billing expire date
    const [card, setCard] = useState(false);
    const [limit, setLimit] = useState(0.0); //state for billing limit
    const user = AuthService.getCurrentUser();
    const [firstDigit, setFirstDigit] = useState('');
    const [billingHistory, setBillingHistory] = useState([]);
    const [visible, setVisible] = useState(false);
    const [limitError, setLimitError] = useState(false);
    const [totalUsage, setTotalUsage] = useState(0.0); //to keep track of user's current totalUsage
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const limitPattern = /^[0-9]+\.?[0-9]+$/;

    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    //get billing history
    const getBillingHistory = () => {
        fetch(`${BASE_URL}/payment/getBillingHistory`,
        {
            headers: token
        })
        .then (response => {
            if (response.ok) {
                console.log('Successfully fetch billing history.');
                return response.json();
            }
            else if(response.status === 401) {
                console.log('Unauthorized.');
                navigate('/unauthorizedPage');

            }
        })
        .then(data => {
            setBillingHistory(data.body);
            console.log(data.body[0]);
        })
        .catch(error => {
            console.error(error);
        })
    };

    //get user's total usage
    const getTotalUsage = () => {
        fetch(`${BASE_URL}/payment/getUsage`,
        {
            headers: token
        })
        .then (response => {
            if (response.ok) {
                console.log('Successfully fetch billing history.');
                return response.json();
            }
            else if(response.status === 401) {
                console.log('Unauthorized.');
                navigate('/unauthorizedPage');

            }
        })
        .then(data => {
            setTotalUsage(data);
        })
        .catch(error => {
            console.error(error);
        })
    };

    //delete user's card
    const deleteCard = async () => {
        await fetch(`${BASE_URL}/payment/deleteCard`,
        {
            method: 'PUT',
            headers: token
        })
        .then (response => {
            if (response.ok) {
                console.log('Successfully fetch billing history.');
                setSuccessMessage(true);
                return response.json();
            }
            else if(response.status === 401) {
                console.log('Unauthorized.');
                navigate('/unauthorizedPage');

            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        })
        setCard(false);
        closeModal();

        getBillingHistory();
        getTotalUsage();
    }

    useEffect (() => {
        window.scrollTo(0, 0);
        fetch(`${BASE_URL}/payment/getCard`, {
            headers : token
        })
        .then(response => {
            if (response.ok) {

                console.log('Successfully fetch card.');
                setFetchDone(true);
                return response.json();
            }
            else if(response.status === 401) {

                console.log('Unauthorized.');
                navigate('/unauthorizedPage');

            }
        })
        .then(data => {
            console.log(data);

            setCardNum(data.cardNumber.substring(14));
            var month = data.expiryDate.substring(5,7);
            var year = data.expiryDate.substring(0,4);
            console.log(month, year);
            setExpDate(month+'/'+year);
            setCard(true);
            setLimit(data.usageLimit);
            setFirstDigit(data.cardNumber.charAt(0));
        })
        .catch(error => {
            console.error(error);
        })

        getBillingHistory();
        getTotalUsage();
    }, [])

    //set user's requested usage limit
    const setUsageLimit = (limit) => {

        if(!limitPattern.test(limit)) {
            setErrorMessage('Please enter a valid price.');
            setLimitError(true);
            return;
        }
        
        fetch(`${BASE_URL}/payment/setLimit?limit=${limit}`, {
            method: 'POST',
            headers: token
        })
        .then (response => {
            if(response.ok) {
                setLimit(limit);
                console.log('Limit Changed.');
            }
            else if(response.status === 401) {
                console.log('Unauthorized;');
                navigate('/unauthorizedPage');
            }
            else if(response.status === 400) {
                setErrorMessage('Limit can not be lower than current usage!');
                setLimitError(true);
                console.log('Limit can not be lower than current usage.');
            }
        })
        .catch(error => {
            console.error(error);
        })
    };

    return ( 
        <>
        {fetchDone ? (
            <div className="h-full bg-[#F7F2FB]">
                <div className="pt-32 px-32 mb-8">
                    <p className="text-4xl text-[#7566BB] font-semibold">
                        Usage and billing
                    </p>
                    <p className="text-lg text-[#7566BB] font-medium">
                        Manage your plan and billing details.
                    </p>
                </div>
                <div>
                    <div className="grid w-full gap-16 grid-cols-2 px-32">
                        <div className="border border-[#A5A5A5] rounded-md p-6 bg-white">
                        {/* {limit !== 0 ?( */}
                            <div>
                                <p className="text-xl font-semibold text-[#414141]">
                                    Usage this month
                                </p>
                                { card ? (
                                    <div>
                                        <p className="text-md text-[#414141]">
                                            The amount you need to pay for this month.
                                        </p>
                                        <div className="h-4 rounded-full bg-[#F5F5F5] mt-2">
                                            <div className="h-4 rounded-full" style={{ width: `${(totalUsage / limit) * 100}%`, backgroundColor: `#7566BB` }}></div>
                                        </div>
                                        <div className="flex justify-end text-md mt-2 text-[#414141] font-light">
                                            <p>${totalUsage} / ${limit}</p>
                                        </div>
                                        <div className="flex justify-end text-md mt-2">
                                            <label
                                                htmlFor="setUsageLimitModal"
                                                className="text-[#7566BB] hover:underline"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <p className="text-md font-light">Set limits</p>
                                            </label>
                                        </div>
                                        {limitError && (
                                            <div className="fixed top-0 left-0 right-0 z-50 pt-32 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full bg-black bg-opacity-50">
                                                <div className="relative w-2/5 mx-auto">
                                                    <div className="relative bg-white rounded-lg shadow">
                                                        <button onClick={() => setLimitError(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                            </svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                        <div className="p-8 text-center">
                                                            <svg className="mx-auto mb-4 text-[#414141] w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                            </svg>
                                                            <p className="mb-5 text-lg font-semibold text-[#414141]">{errorMessage}</p>
                                                            <button onClick={() => setLimitError(false)} className="text-gray-500 bg-white hover:bg-gray-100 hover:font-semibold focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10">Continue</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                ) : (
                                    <p>You must set up a payment method to set up usage limits</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="border border-[#A5A5A5] rounded-md p-6 bg-white">
                            <p className="text-xl font-semibold text-[#414141]">
                                Payment method
                            </p>
                            { card ? (
                            <div>
                                <p className="text-md text-[#414141]">
                                    Change how you pay for your plan.
                                </p>
                                <div className="flex items-center space-x-4 border rounded-md border-[#A5A5A5] mt-2 p-2">
                                    {firstDigit === '4' ? (
                                        <img className="h-5 justify-self-end mr-8 ml-4" src={visaImage} alt="Visa image" />
                                    ) : (
                                        <img className="h-8 w-12 justify-self-end mr-8 ml-10" src={masterCardImage} alt="MasterCard image" />
                                    )}
                                    <div className="flex-1">
                                        <div className="text-md font-semibold text-[#414141]">
                                            Visa ending in {cardNum}
                                        </div>
                                        <div className="text-sm text-[#414141]">
                                            Expiry {expDate}
                                        </div>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#414141" class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                            {user && user.email && (
                                                <p className="text-sm ml-1 text-[#414141]">
                                                    {user.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <td className="flex justify-center items-center">
                                        <div className="dropdown dropdown-end">
                                            <label
                                            tabIndex={0}
                                            className="bg-[#FFFFFF] border-[#FFFFFF] cursor-pointer h-1 mr-4"
                                            >
                                            <MoreVertIcon
                                                style={{ color: "black" }}
                                            ></MoreVertIcon>
                                            </label>
                                            <ul
                                            tabIndex={0}
                                            className="dropdown-content z-[1] menu shadow bg-[#7566BB] rounded-box w-48 rounded-md border-[#D1D1D1]"
                                            >
                                                <li className="hover:bg-[#5E519A] hover:text-[#FFFFFF]">
                                                    <a
                                                    className="text-white hover:font-semibold"
                                                    href='/paymentForm'
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                        Edit payment
                                                    </a>
                                                </li>
                                                <li onClick={openModal} className="hover:bg-[#5E519A] hover:text-[#FFFFFF]">
                                                    <label
                                                    className="text-white hover:font-semibold"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                        Delete payment
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        </td>
                                </div>
                            </div>
                            ) : (
                                <div className="mt-2">
                                    <a href="/paymentForm" className="flex hover:bg-gray-50 p-4 rounded-lg border inline-flex">
                                        <div class="text-white bg-[#7566BB] font-medium rounded-lg text-sm p-3 text-center inline-flex items-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col text-left text-[#414141]">
                                            <p className="font-semibold text-lg">Add a payment</p>
                                            <p className="text-md">Set up paid account</p>
                                        </div>
                                    </a>
                                </div>
                            )}

                            {visible && (
                                <div className="fixed top-0 left-0 right-0 z-50 pt-32 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full bg-black bg-opacity-50">
                                    <div className="relative w-2/5 mx-auto">
                                        <div className="relative bg-white rounded-lg shadow">
                                            <button onClick={closeModal} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-8 text-center">
                                                <svg className="mx-auto mb-4 text-[#414141] w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                </svg>
                                                <p className="mb-5 text-lg font-semibold text-[#414141]">Are you sure you want to remove your payment details?</p>
                                                <p className="mb-5 text-md text-[#414141]">You will be billed for your usage of this month before your cards will be completely removed.</p>
                                                <button onClick={deleteCard} className="text-white bg-red-600 hover:bg-red-800 hover:font-semibold focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                    Yes, I'm sure
                                                </button>
                                                <button onClick={closeModal} className="text-gray-500 bg-white hover:bg-gray-100 hover:font-semibold focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10">No, cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {successMessage && (
                                <div className="fixed top-0 left-0 right-0 z-50 pt-32 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full bg-black bg-opacity-50">
                                    <div className="relative w-2/5 mx-auto">
                                        <div className="relative bg-white rounded-lg shadow">
                                            <button onClick={() => setSuccessMessage(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-8 text-center items-center justify-center flex flex-col">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mb-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                                </svg>
                                                <p className="mb-5 text-lg font-semibold text-[#414141]">Your payment details has been succesfully deleted!</p>
                                                <button onClick={() => setSuccessMessage(false)} className="text-gray-500 bg-white hover:bg-gray-100 hover:font-semibold focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10">Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <div className="mt-8 mb-16">
                    <div className="px-32">
                        <div className="border border-[#A5A5A5] rounded-md p-8 bg-white">
                            <p className="text-2xl font-semibold text-[#414141]">
                                Billing history
                            </p>
                            {billingHistory.length === 0 ? (
                                <div className="flex flex-col items-center justify-center mt-8">
                                    <img src={Empty}></img>
                                    <p className="font-semibold text-lg">No invoiced found</p>
                                </div>
                            ) : (
                                <div>
                                    <table className="table table-auto mx-auto w-full text-md mt-4">
                                        {/* head */}
                                        <thead>
                                            <tr className="border-b border-t text-[#414141]">
                                                <th className="bg-[#FFFFFF] normal-case text-lg font-medium" style={{ width: '10%' }}>
                                                    No
                                                </th>
                                                <th className="bg-[#FFFFFF] normal-case text-lg font-medium" style={{ width: '40%' }}>
                                                    Billing date
                                                </th>
                                                <th className="bg-[#FFFFFF] normal-case text-lg font-medium" style={{ width: '25%' }}>
                                                    Amount
                                                </th>
                                                <th className="bg-[#FFFFFF] normal-case text-lg font-medium" style={{ width: '25%' }}>
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                                        <table className="table table-auto mx-auto w-full text-md">
                                            <tbody>
                                                {billingHistory && billingHistory.map((billing, index) => (
                                                    <tr className="text-[#414141]">
                                                        <th className="h-1" style={{ width: '10%' }}>
                                                            {index+1}
                                                        </th>
                                                        <td className="h-1" style={{ width: '40%' }}>
                                                            {billing.dateBilled.toString()}
                                                        </td>
                                                        <td className="h-1" style={{ width: '25%' }}>
                                                            $ {billing.totalAmount.toString()}
                                                        </td>
                                                        <td className="h-1" style={{ width: '25%' }}>
                                                            Paid
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
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
        ): null}
        </>
    );
}

export default Billing;