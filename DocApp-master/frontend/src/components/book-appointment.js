import React,{useState,useEffect} from "react";
import {Switch,Route,Link, useNavigate} from "react-router-dom";
import DoctorDataService from "../services/doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import PatientDataService from "../services/patients";
import Modal from 'react-bootstrap/Modal'
import MyNavbar from './navbar';


    


     

 

const BookAppointment=(props)=> {

    
    const [show,setShow] = useState(false)

const hide = ()=>{
        setShow(false)
    }

    const { id } = useParams()
    const navigate = useNavigate()
    const [appointmentInfo,setAppointmentInfo] = useState('')
    const location = useLocation();
    let doc = location.state.doc
    let slot = location.state.slot
    let maindate = location.state.maindate
    let sid = location.state.sid
    let dat = location.state.dat
    let tsl = location.state.ind
    let iid = location.state.iid
    let data = {
        "week":dat.week,
        "day":dat.day,
        "id":sid,
        "available":"No",
        "slot": tsl
        }
    let data1 = {
        date:maindate,
        time:slot,
        AppointmentInfo:appointmentInfo,
        Prescription:'',
        DoctorId:doc._id,
        PatientId:iid,
        Status:"Confirmed"
    }
    let data2={
        date : maindate,
        time :slot,
        Dname : doc.Fname+" "+doc.Lname,
        address :doc.Address
    }
    useEffect(()=>{
        console.log(doc)
        console.log(sid)
        console.log(slot)
        console.log(dat)
        console.log(tsl)
        console.log(maindate)
    })
    
    const deleteProfile = ()=>{
        PatientDataService.deleteProfile(iid)
        .then(()=>{
            navigate("/")
        })
        .catch(e=>console.log(e))
    }


    const call = ()=>{
        //appointment api
        DoctorDataService.postAppointment(data1)
        .then((res)=>{
            console.log(res)
        })
        .catch(e=>console.log(e))
        DoctorDataService.updateSlots(data)
        .then((res)=>{
            console.log(res)
            navigate('/patient/BookingConfirmed',{state:data2})
            //Add FInal page here.
        })
        .catch(e=>console.log(e))
    }

    const [city,setcity] = useState("")
    const [qualification,setqualification] = useState("")
    
    


   
          
   
  return (
    <div className="App">
    <h1 style={{textAlign:'center'}}> Appointment Confirmation Page</h1>
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
    <br/>
    <MyNavbar title='DocApp'  pathSecond ={"/patient/allDoctors"} pathThird={"/patient/updatePatient/"+localStorage.getItem('iid')} pathFifth={()=>{
                setShow(true)
            }}
         pathFourth={()=>{
            localStorage.removeItem("iid")
            localStorage.removeItem("token")
            navigate("/")
        }} second='Home' third='Update Profile' fourth='Logout' fifth='Delete Profile'  />
    <div style={{marginLeft:'10rem'}} >
    <h3 style={{lineHeight:1.5}}><label>Doctor's Name : </label> <label>{doc.Fname +" "+ doc.Lname}</label></h3>
    <h3 style={{lineHeight:1.5}}><label>Address : </label> <label>{doc.Address}</label><br></br></h3>
    <h3 style={{lineHeight:1.5}}><label>City : </label> <label>{doc.City}</label><br></br></h3>
    <h3 style={{lineHeight:1.5}}><label>Phone : </label ><label>{doc.Phone}</label><br></br></h3>
    <h3 style={{lineHeight:1.5}}><label>Specialization : </label>   <label>{doc.Specialization}</label><br></br></h3>
    <h3 style={{lineHeight:1.5}}><label>Your Slot time : </label> <label>{slot}</label><br></br></h3>
    <h3 style={{lineHeight:1.5}} ><label>Appointment related Information : </label><br/>
    <textarea cols={70} rows={3} name="appointmentInfo" onChange={(e)=>{
        setAppointmentInfo(e.target.value)
    }}/></h3><br></br>
   
    <button style={{float:'right',marginRight:'20rem'}} onClick={call}>BookAppointment</button>
    </div>
    </div>
  )
}


export default BookAppointment;
