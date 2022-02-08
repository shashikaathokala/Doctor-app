import React,{useState,useEffect} from "react";
import {Switch,Route,Link,useNavigate} from "react-router-dom";
import DoctorDataService from "../services/doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'


const ViewAppointments=(props)=> {

 
    const { id } = useParams()
    const navigate = useNavigate();
    let data={}
   const doc = {
        Address: "",
        Contact: "",
        License: "",
        Rating: "",
        Specialization: "",
        name: "",
        _id: "",
    }
    const [date, setDate] = useState(new Date());
    const [doctor,setDoctor] = useState(doc)
    const [slots,setSlots] = useState([])
    const [daydata,setdatdata] = useState(data)
    const [disable,setDisabled] = useState(1)

    
    const getDoctorDetails = id =>{
        console.log(id)
        DoctorDataService.getDetails(id)
        .then(response=>{
            console.log(response.data);
            console.log(response.data);

            setDoctor(response.data)

        })
        .catch(e=>{
            console.log(e);
        })
    }
    
    function checked(e,index){
        setDisabled(0.7)
        
        navigate('/doctor/bookappointment/',{state:{ind:index,dat:daydata,doc:doctor,sid:e._id,slot:e.timeslot}});
      
    }


    useEffect(()=>{
        getDoctorDetails(id)

    },[id])

    function getWeekOfMonth(date) {
        let adjustedDate = date.getDate()+ date.getDay();
        let prefixes = ['0', '1', '2', '3', '4', '5'];
        return (parseInt(prefixes[0 | adjustedDate / 7])+1);
    }
    const confirm=()=>{
       let cd = new Date()
        console.log(cd.getMonth())
        console.log(date.getMonth())
        console.log(id)
        console.log(getWeekOfMonth(date))
        console.log(date.getDay())
        if(cd.getMonth()!= date.getMonth()){
            alert("Please select an appointment from this month, the appointment from next month will be unlocked in that month")
        }else{
            data =  {
                "day":date.getDay(),
                "week":getWeekOfMonth(date),
                "id":id
    
            }
            setdatdata(data)
            
           
            DoctorDataService.getAppointments(data)
            
            .then((response)=>{
                console.log(response)
                setSlots(response.data)
                console.log(slots)
            })
            .catch(e=>{
                console.log(e)
            })
            
        }
        }
       
  return (
    <div className="App">
    <h1> Doctor detail Page</h1>
    <br/><br/><br/><br/>
    <h2>Name: {doctor.Fname +"  "+ doctor.Lname}</h2>
    <h2>Specialization: {doctor.Specialization}</h2>
    <h3>Address: {doctor.Address}</h3>
    <h4>Rating: {doctor.Rating}</h4>
    <h4>License: {doctor.License}</h4>
    <div>
            <h2>Appointment</h2>
            <Calendar
        calendarType="ISO 8601"
        defaultView="month"
        showNavigation={true}
        showFixedNumberOfWeeks={true}
        onChange={setDate}
        value={date}
      />
      <button onClick={confirm}>Confirm</button>
            </div>
            <div>
                <h1>Slots</h1>
                { slots.map((slot,index) => {
                    if(slot.available == "Yes"){
                    return (
                        <div key={slot._id}>
                        <p onClick={()=>checked(slot,index)}>{slot.timeslot}    {slot.available}</p>
                        </div>
                    )
                }
                })}
            </div>
    </div>
  );
}

export default ViewAppointments;
