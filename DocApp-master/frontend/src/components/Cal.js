import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import Calendar from 'react-calendar';
// import Heading from './Heading';

// const genderselect=document.getElementById("gender");
const ReactCalendar =({onChange,date}) => {
  return(
    <div style={{width: '15rem', height: '15rem'}}>
      <Calendar  calendarType="ISO 8601" onChange={onChange} value={date}/>
    </div>
  );
};
export default Calendar;
