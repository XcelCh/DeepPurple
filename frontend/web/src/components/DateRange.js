import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker";

const DateRange = ({ dateRange, setDateRange }) => {
  const [startDate, endDate] = dateRange;

  const CustomInput = ({ value, onClick, onChange }) => {
    return (
      <input
        type="text"
        value={value}
        className="input input-bordered bg-[#FBFBFB] w-full h-8 text-xs px-2"
        onClick={onClick}
        onChange={onChange}
      ></input>
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
