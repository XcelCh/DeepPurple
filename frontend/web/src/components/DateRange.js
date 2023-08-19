import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker";
import { BASE_URL } from "../pages/config";

const DateRange = ({ dateRange, setDateRange }) => {
  const [startDate, endDate] = dateRange;

  const CustomInput = ({ value, onClick, onChange }) => {
    return (
      <>
        <label class="mr-2 relative w-full">Upload Date</label>

        <input
          type="text"
          value={value}
          className="py-2.5 px-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 max-w-sm"
          onClick={onClick}
          onChange={onChange}
        ></input>
      </>
    );
  };

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
      customInput={<CustomInput />}
    />
  );
};

export default DateRange;
