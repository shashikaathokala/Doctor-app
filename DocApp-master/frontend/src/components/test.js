import Card from 'react-bootstrap/Card'
import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DoctorDataService from "../services/doctors";
import {Link, Routes,Route,BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';
import DoctorDetails from './doctor-details';


const Test = () => {
    const [name,setName] = useState("")
    const handleChange = (e)=>{
        setName(e.target.value)
    }
    const send=()=>{
        axios.post('http://localhost:5000/api/insurance/somedata',{
            name:name
        })
        .then((response)=>{
            console.log(response)
        })
        .catch((e)=>{
            console.log(e)
        })
        // console.log(name)
    }

    return (
    <div className="App">
        <h1>Test</h1>
        <div>
        <input type="text" name="name" onChange={handleChange} />
        <button onClick={send}>Send</button>
        </div>
       
    </div>
  );
}

export default Test;
