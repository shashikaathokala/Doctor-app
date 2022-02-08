import React,{useState,useEffect} from "react";
import {Switch,Route,Link,useNavigate} from "react-router-dom";
import DoctorDataService from "../services/doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import PatientDataService from "../services/patients";
import Calendar from 'react-calendar'
import Modal from 'react-bootstrap/Modal'
import MyNavbar from './navbar';

const DoctorDetails=(props)=> {

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
    const [maindate,setMainDate] = useState('')
    const [show,setShow] = useState(false)
    const hide = ()=>{
        setShow(false)
    }
    const [iid,setIid] = useState('')

    
    const getDoctorDetails = id =>{
        console.log(id)
       let token = localStorage.getItem('token')
        DoctorDataService.getDetails(id,token)
        .then(response=>{
            console.log(response.data);
            console.log(response.data);

            setDoctor(response.data)
            
        })
        .catch(e=>{
            console.log(e);
        })
    }
    const deleteProfile = ()=>{
        PatientDataService.deleteProfile(iid)
        .then(()=>{
            navigate("/")
        })
        .catch(e=>console.log(e))
    }
    
    function checked(e,index){
        setDisabled(0.7)
        
        navigate('/patient/bookappointment/',{state:{ind:index,dat:daydata,doc:doctor,sid:e._id,slot:e.timeslot,maindate:maindate,iid:iid}});
      
    }

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


    useEffect(()=>{
        getDoctorDetails(id)
        let idd = localStorage.getItem('iid')
        setIid(idd)
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
        let maindate = formatDate(date)
        setMainDate(maindate)
        console.log(formatDate(date))
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
    <div className="App" style={{ maxWidth: '100%',overflowX:'unset'}}>
        <h1 style={{textAlign:'center'}}> Doctor detail Page</h1>
        <Modal backdrop={true} show={show} onHide={hide}>
    <Modal.Header closeButton>
    <Modal.Title>Delete Account</Modal.Title>
    </Modal.Header>

    <Modal.Body>
    <p> Are your sure you want to delete your profile?</p>
  </Modal.Body>

  <Modal.Footer>
    <button className="primary" onClick={hide} >Close</button>
    <button className="danger" onClick={deleteProfile}>Delete</button>
  </Modal.Footer>
  </Modal>
        <MyNavbar title='DocApp'  pathSecond ={"/patient/allDoctors"} pathThird={"/patient/updatePatient/"+localStorage.getItem('iid')} pathFifth={()=>{
                setShow(true)
            }}
         pathFourth={()=>{
            localStorage.removeItem("iid")
            localStorage.removeItem("token")
            navigate("/")
        }} second='Home' third='Update Profile' fourth='Logout' fifth='Delete Profile'  /><br/><br/>
        <div>
        <div className="col-md-3">
        <div>
            <h5 >Appointment</h5>
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
           
            </div>
    <div className="col-md-9" style={{position:'absolute',left:'35rem',top:150}}>
    <h3>Name: {doctor.Fname +"  "+ doctor.Lname}</h3>
    <h3>Specialization: {doctor.Specialization}</h3>
    <h3>Address: {doctor.Address}</h3>
    <h3>License: {doctor.License}</h3>

    <div><br></br>
                <h4>Available Slots : </h4>
                <div  style={{display:"flex",flexDirection:'row',flexWrap: 'wrap',width:'40rem'}}>
                { slots.map((slot,index) => {
                    if(slot.available == "Yes"){
                    return (
                        <div key={slot._id} style={{flex:1,whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>
                        <button style={{width:'10rem' }} onClick={()=>checked(slot,index)}>{slot.timeslot}</button>
                        </div>
                    )
                }
                })}
                </div>
            </div>
    </div>
    </div>

    
    </div>
  );
}

export default DoctorDetails;
