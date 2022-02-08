import React,{useState,useEffect} from "react";
import {Switch,Route,Link,useNavigate} from "react-router-dom";
import Card from 'react-bootstrap/Card'
import DoctorDataService from "../services/doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'
import PatientDataService from '../services/patients';
import Cal from './Cal';
import { Col, Row } from "react-bootstrap";
import MyNavbar from "./navbar";


const MyAppointments=(props)=> {

 
    const { id } = useParams()
    const navigate = useNavigate();
    let data={}
    const [iid ,setIid] = useState('')
    const [show,setShow] = useState(false)
    const hide = ()=>{
        setShow(false)
    }
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
    const [appointments,setAppointment] = useState([])
    const [slots,setSlots] = useState([])
    const [daydata,setdatdata] = useState(data)
    const [disable,setDisabled] = useState(1)

    
    const getDoctorDetails = id =>{
        console.log(id)
        PatientDataService.getMyAppointments(id)
        .then(response=>{
            console.log(response.data);
            console.log(response.data);

            setAppointment(response.data)

        })
        .catch(e=>{
            console.log(e);
        })
    }
    
    function checked(e,index){
        setDisabled(0.7)
        
        // navigate('/doctor/bookappointment/',{state:{ind:index,dat:daydata,doc:doctor,sid:e._id,slot:e.timeslot}});
      
    }


    useEffect(()=>{
        setIid(localStorage.getItem('iid'))
        getDoctorDetails(id)

    },[id])

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }

    const onChange = date => {
        let d = formatDate(date)
        PatientDataService.getMyAppointmentsByDate(d,iid)
        .then((response)=>{
            console.log(response)
           let app = response.data
            setAppointment(app)
            console.log(app)
        })
        .catch(e=>alert("Nothing found"))
        // console.log(formatDate(date))
        // setDate(d)
    };

    // function getWeekOfMonth(date) {
    //     let adjustedDate = date.getDate()+ date.getDay();
    //     let prefixes = ['0', '1', '2', '3', '4', '5'];
    //     return (parseInt(prefixes[0 | adjustedDate / 7])+1);
    // }
    // const confirm=()=>{
    //    let cd = new Date()
    //     console.log(cd.getMonth())
    //     console.log(date.getMonth())
    //     console.log(id)
    //     console.log(getWeekOfMonth(date))
    //     console.log(date.getDay())
    //     if(cd.getMonth()!= date.getMonth()){
    //         alert("Please select an appointment from this month, the appointment from next month will be unlocked in that month")
    //     }else{
    //         data =  {
    //             "day":date.getDay(),
    //             "week":getWeekOfMonth(date),
    //             "id":id
    
    //         }
    //         setdatdata(data)
            
           
    //         DoctorDataService.getAppointments(data)
            
    //         .then((response)=>{
    //             console.log(response)
    //             setSlots(response.data)
    //             console.log(slots)
    //         })
    //         .catch(e=>{
    //             console.log(e)
    //         })
            
    //     }
    //     }
    const deleteProfile = ()=>{
        PatientDataService.deleteProfile(iid)
        .then(()=>{
            navigate("/")
        })
        .catch(e=>console.log(e))
    }
  return (
    <div className="App">
    <h1 style={{textAlign:'center'}}> My Appointments</h1>
    <br/><br/>
    <MyNavbar title='DocApp'  pathSecond ={"/patient/allDoctors"} pathThird={"/patient/updatePatient/"+iid} pathFifth={()=>{
                setShow(true)
            }}
         pathFourth={()=>{
            localStorage.removeItem("iid")
            localStorage.removeItem("token")
            navigate("/")
        }} second='Home' third='Update Profile' fourth='Logout' fifth='Delete Profile'  />
    <div className="container-fluid mx-2 " >
                <div className="row mt-5 mx-2">
                    <div className="col-md-3">
                    <button className="primary" style={{marginLeft:'5rem',marginBottom:'1rem'}} onClick={()=>{
                        getDoctorDetails(id)
                    }} >All</button>
                    <Cal onChange={onChange} value={date} />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12 mb-10">
    <Row  xs={1} md={2} lg={3} className="g-4">
    {appointments.map((appointment)=>{
            console.log(appointment)
            return(
               <Col>
                <Card className='Card' style={{ width: '23rem',marginBottom:'1rem',marginRight:'10rem'}}>
        <Card.Body style={{flex:1}}>
            <Card.Title>{appointment.details.Fname +"  "+ appointment.details.Lname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{appointment.Address}</Card.Subtitle>
            <Card.Text>
            Appointment Date : {appointment.date}<br></br>
            Appointment Time :{appointment.time}<br></br>
            Doctor's Address :{appointment.details.Address}<br></br>
            Prescription :{appointment.details.Prescription}
            </Card.Text>
            {/* <Card.Link><Link to={"#"}> More Info</Link></Card.Link> */}
        </Card.Body>
        </Card>
            </Col>
        
       
            )
        })}
        </Row>
        </div>
        </div>
        </div>
        </div>
        </div>
    </div>
  )}

export default MyAppointments;
