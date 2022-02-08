import React,{useState,useEffect} from "react";
import {Switch,Route} from "react-router-dom";
import DoctorDataService from "../services/doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'
import MyNavbar from "./navbar";
import Modal from 'react-bootstrap/Modal'
import { useNavigate,Link } from 'react-router-dom';


const UpdateDoctor=(props)=> {

    const navigate = useNavigate()
    const { id } = useParams()
    // const checked = ()=>{
    //     setDisabled(0.7)
    //     alert("Booked")
    //     //add a page for some comments and then call appointment api
    // }
   const doc = {
       
    }
    const [date, setDate] = useState(new Date());
    const [doctor,setDoctor] = useState(doc)
    const [slots,setSlots] = useState([])
    const [disable,setDisabled] = useState(1)
    const [token,setToken] = useState('')
    const [show,setShow] = useState(false)
    const [did,setDid] = useState('')
    const hide = ()=>{
        setShow(false)
    }
    
    const getDoctorDetails = id =>{
        console.log(id)
        let t= localStorage.getItem('token')
        console.log(t)
        setToken(t)
        setDid(id)
        DoctorDataService.getDetails(id,t)
        .then(response=>{
            console.log(response.data);
            console.log(response.data);

            setDoctor(response.data)

        })
        .catch(e=>{
            console.log(e);
        })
    }
    
    useEffect(()=>{
        getDoctorDetails(id )

    },[id])

    function getWeekOfMonth(date) {
        let adjustedDate = date.getDate()+ date.getDay();
        let prefixes = ['0', '1', '2', '3', '4', '5'];
        return (parseInt(prefixes[0 | adjustedDate / 7])+1);
    }

    const UpdateData = ()=>{
        DoctorDataService.updateData(did,doctor)
        .then((res)=>{
            console.log(res)
            alert("Updated")
        })
        .catch(e=>console.log(e))
    }
    const updateslotandavailability = (slot,index)=>{
        // const id = req.body.id
        // let d = req.body.day
        // const available = req.body.available
        // let w = req.body.week
        // let slottime = req.body.slottime
        // let s = req.body.slot
        let data = {
            id:slot._id,
            day:date.getDay(),
            week:getWeekOfMonth(date),
            slottime :slot.timeslot,
            available :slot.available,
            slot:index

        }
        // console.log(data)
        DoctorDataService.updateSlotAndAvailability(data)
        .then((res)=>{
            console.log(res)
            alert("Updated")

        })
        .catch(e=>console.log(e))
    }
    const handleChange=(e,id)=>{
        const { value } = e.target; 
        // console.log(value)
    setSlots((timeslot) =>
      timeslot.map((list, index) =>
        index === id ? { ...list, timeslot: value } : list
      )
    );
    }

    const handleChangeA=(e,id)=>{
        const { value } = e.target; 
        // console.log(value)
    setSlots((available) =>
      available.map((list, index) =>
        index === id ? { ...list, available: value } : list
      )
    );
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
        }
       let data={
            "day":date.getDay(),
            "week":getWeekOfMonth(date),
            "id":id

        }
       
        DoctorDataService.getAppointments(data)
        .then((response)=>{
            console.log(response)
            
            setSlots(response.data)
            
        })
        .catch(e=>{
            console.log(e)
        })
        
    }
    const deleteProfile = ()=>{
        DoctorDataService.deleteProfile(did)
        .then(()=>{
            navigate("/")
        })
        .catch(e=>console.log(e))
    }
  return (
    <div className="App">
    <h1 style={{textAlign:'center'}}> Doctor detail Page</h1>
    <br/>
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
    <MyNavbar title='DocApp' pathThird={'doctor/home'} pathFourth={()=>{
            localStorage.removeItem("iid")
            localStorage.removeItem("token")
            navigate("/")
        }} pathFifth={()=>{
                setShow(true)
            }} third='My Appointments' fourth='Logout' fifth='Delete Profile'  /><br></br>
    <div  className="col-md-9" style={{width: '15rem', height: '20rem'}} >
            <h4>Update Slots</h4>
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
               
                { slots.map((slot,index) => {
                     <h1>Slots</h1>
                    return (
                        <div key={slot._id}>
                        <input name="timeslot" value={slot.timeslot}  onChange={(e)=>{handleChange(e,index)}}   /> 
                        <input name="available" value={slot.available} onChange={(e)=>{handleChangeA(e,index)}} />  
                        <button onClick={()=>{
                            updateslotandavailability(slot,index)
                            // console.log(slot.timeslot)
                            // console.log(slot.available)
                        }}>Update</button>
                        </div>
                                            )
                })}
                <br></br>
            </div>
    <div className="col-md-9" style={{position:'absolute',left:'35rem',top:150}} >
    <h4>First Name: <input name="Fname" value={doctor.Fname} onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }} /></h4>
    <h4>Last Name: <input name="Lname" value={doctor.Lname} onChange={(e)=>{
        setDoctor({...doctor,"Lname":e.target.value})
    }}/></h4>
    <h4>Address: <input name="Address" value={doctor.Address}onChange={(e)=>{
        setDoctor({...doctor,"Address":e.target.value})
    }} /></h4>
    <h4>Qualification: <input name="Qualification" value={doctor.Qualification}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>License: <input name="License" value={doctor.License}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>Specialization:<input name="Specialization" value={doctor.Specialization}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>Phone: <input name="Phone" value={doctor.Phone}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>City: <input name="City" value={doctor.City}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>Postcode: <input name="Postcode" value={doctor.Postcode}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
     <button onClick={UpdateData}>Update</button> 
    </div>
   
    </div>
  );
}

export default UpdateDoctor;
