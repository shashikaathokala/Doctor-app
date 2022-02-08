import React from 'react';
// import './App.css';Switch
import {Routes,Route,BrowserRouter as Router} from "react-router-dom";
// import {Routes,Route, BrowserRouter as Router,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import DoctorList from './components/doctor-list';
import DoctorDetails from './components/doctor-details';
import Test from './components/test';
import DoctorRegistration from './components/doctor-registration';
import DoctorSlots from './components/doctor-slots';
import UpdateDoctor from './components/update-doctor';
import BookAppointment from './components/book-appointment';
import DoctorHome from './components/doctor-home';
import PatientInfo from './components/patient-info';
import Login from './components/login';
import PatientRegistration from './components/patient-registration';
import Map from './components/Map';
import Final from './components/Final';
import MyAppointments from './components/patient-viewAppointments';
import UpdatePatient from './components/update-patient';
import DeleteDoctor from './components/doctor-delete';
const App = () =>  {
  return (
    <Router>
    <div className="app">
      <Routes>
      <Route path={'/patient/myappointments/:id'} element={<MyAppointments/>}>
        </Route>
      <Route path={'/'} element={<Login/>}>
        </Route>
        <Route path={'/patient/Alldoctors/'} element={<DoctorList/>}>
        </Route>
        <Route 
        path="/patient/Alldoctors/doctordetails/:id"
        element={<DoctorDetails/>}
        />
        <Route
        path="/patient/BookingConfirmed"
        element = {<Final/>}
        ></Route>
         <Route 
        path="/doctor/registration/"
        element={<DoctorRegistration/>}
        />
         <Route 
        path="/doctor/slots/"
        element={<DoctorSlots/>}
        />
        <Route 
        path="/doctor/update/:id"
        element={<UpdateDoctor/>}
        />
        
      <Route 
      path="/patient/updatePatient/:id"
      element={<UpdatePatient/>}/>



        <Route 
        path="/patient/bookappointment/"
        element={<BookAppointment/>}
        />
         <Route 
        path="/doctor/delete/:id"
        element={<DeleteDoctor/>}
        />
        <Route 
        path="/doctor/home"
        element={<DoctorHome/>}
        />
        <Route
        path="/doctor/viewappointments"
        element={<PatientInfo/>}
        />
        <Route
        path="/patient/registration"
        element={<PatientRegistration/>}
        />
        </Routes>
       </div>
       </Router>
  );
}

export default App;
