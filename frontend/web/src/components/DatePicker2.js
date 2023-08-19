import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "react-datepicker/dist/react-datepicker";
import { BASE_URL } from "../pages/config";

const Datepicker = ({formData, setFormData}) => {

    const [startDate, setStartDate] = useState(new Date());
    

    useEffect (() => {

        console.log('here'+formData.dob);
        if (formData.dob.length > 0) {
            // console.log(dob);
            setStartDate(new Date(formData.dob));
        } 

    }, [formData.dob])
    
    const handleChange = (selectedDate) => {

        setStartDate(selectedDate);
        setFormData({...formData, dob:selectedDate});
    }

    const CustomInput = ({value, onClick, onChange}) => {
        
        return (
            <input type="text" value={value} className="input input-bordered w-full max-w-xs" onClick={onClick} onChange={onChange}>
                
            </input>
        )
    }
    
    return (
    
            <DatePicker 
                selected={startDate} 
                onChange={handleChange} 
                dateFormat="MMMM d, yyyy"
                showMonthDropdown
                showYearDropdown      
                dropdownMode="select"
                maxDate={new Date()}
                customInput={<CustomInput/>}
            />
       
    );
  };

  export default Datepicker;