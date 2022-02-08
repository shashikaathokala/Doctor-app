import React from 'react'
import Map from './Map';
import {useLocation, useNavigate} from 'react-router-dom';


const Final = () => {
    const location = useLocation();
    let details = location.state
    const navigate = useNavigate();
    return (
        <div style={{ marginLeft: 'auto',
            marginRight: 'auto'}}> 
            <h2>Congratulations! Your Appointment has been booked.</h2>
           <h4>Doctor's Name : {details.Dname}</h4> 
           <h4>Appointment Date: {details.date} </h4>
           <h4>Appointment time: {details.time}</h4>
           <h4>Address: {details.address}</h4>
            <Map/>
            <button className='primary' onClick={()=>{
                navigate('/patient/allDoctors')
            }}>Home</button>
        </div>
    )
}

export default Final;