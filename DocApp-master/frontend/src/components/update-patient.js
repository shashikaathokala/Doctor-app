import React, { useEffect, useState } from 'react'
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import DoctorDataService from '../services/doctors'
import { useParams } from 'react-router-dom';
import MyNavbar from './navbar';
const UpdatePatient = (props) => {

    

    const { id } = useParams()
    const [token,setToken] = useState('')


    const [patient, setPatient] = useState({})
    const [insurance,setInsurance] = useState({})
    const [iid,setIid] = useState('')
    const getPatientdata = id => {
        console.log(id)
        let t = localStorage.getItem('token')
        setToken(t)
        DoctorDataService.getpatient(id, t)
            .then(response => {
                console.log(response);
               

                setPatient(response.data)
                setInsurance(response.data.Insurance)
                console.log(patient)
            

            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        let iid =localStorage.getItem('iid')
        setIid(iid)
        getPatientdata(id)

    }, [id])
 

        const action =()=>{
        let data = {
            _id : patient._id,
            Fname:patient.Fname,
            Lname:patient.Lname,
            Address:patient.Address,
            Phone:patient.Phone,
            Postcode:patient.Postcode,
            City:patient.City,
            Insurance:{
                    insuranceProvider:insurance.insuranceProvider,

                    firstName:patient.Fname,

                    lastName:patient.Lname,

                    address:patient.Address,

                    birthDate:insurance.birthDate,

                    startDate:insurance.startDate,

                    expiryDate:insurance.expiryDate,

                    insuranceNumber:insurance.insuranceNumber,

                    cardNumber:insurance.insuranceCardNumber,

                    identificationNumberOfCarrier:insurance.insuranceIdentificationNumber
            }
        }
        DoctorDataService.updatePat(id,data)
          
                   .then((response)=>{
                       console.log(response)
                       alert('Updated')
                   })
                   .catch(e=>console.log(e))
                           
      }        
      
      
    let path2 = "/patient/myappointments/"+iid

       return(
        
        <section className="row justify-content-center">
             <h1 className="fw-normal " style={{letterSpacing: "1px", textAlign:'center'}}>Update Details</h1>
            <MyNavbar title='DocApp'  pathSecond ={path2} pathThird={"/patient/allDoctors/"}  second='View Appointment' third='Home' fourth='Logout' fifth='Delete Profile'  />
        <div className='col-3'>
        <section className="container-fluid backgd col-12">
            <section className="col-12 col-sm-12 col-md-12">
                    <div className='col-12'>     
 {console.log(insurance.insuranceProvider)}
                        <label>FirstName: </label><input name="Fname"  className="form-control" value={patient.Fname} onChange={(e)=>{
                           setPatient({...patient,[e.target.name]:e.target.value})
                        }} /><br/>
                        <label>LastName: </label><input name="Lname"  className="form-control" value={patient.Lname} onChange={(e)=>{
                            setPatient({...patient,"Lname":e.target.value})
                        }} /><br/>
                        
                        <label>Address: </label><input name={patient.Address}  className="form-control" value={patient.Address} onChange={(e)=>{
                             setPatient({...patient,[e.target.name]:e.target.value})
                        }} /><br/>
                        <label>Phone: </label><input name="Phone"  className="form-control"  value={patient.Phone} onChange={(e)=>{
                            setPatient({...patient,[e.target.name]:e.target.value})
                        }} /><br/>
                        <label>Postcode: </label><input name="Postcode"  className="form-control" value={patient.Postcode} onChange={(e)=>{
                            setPatient({...patient,[e.target.name]:e.target.value})
                        }} /><br/>
                        <label>City: </label><input name="City" className="form-control"  value={patient.City} onChange={(e)=>{
                             setPatient({...patient,[e.target.name]:e.target.value})
                        }} /><br/>
                        <label>Add Insurance Provider: </label><input name="insuranceProvider" className="form-control" value={insurance.insuranceProvider} onChange={(e)=>{
                             setPatient({...patient,[e.target.name]:e.target.value})
                        }} /><br/>
                        
                        <label>Add Insurance Card Number: </label><input name="cardNumber" className="form-control" value={insurance.cardNumber} onChange={(e)=>{
                           setInsurance({...insurance,[e.target.name]:e.target.value})
                        }} /><br/>
                         <label>Date Of birth: </label><input name="birthDate" className="form-control" value={insurance.birthDate} onChange={(e)=>{
                            setInsurance({...insurance,[e.target.name]:e.target.value})
                        }} /><br/>
                        <label>Add Insurance Start Date: </label><input name="startDate" className="form-control" value={insurance.startDate} onChange={(e)=>{
                            setInsurance({...insurance,[e.target.name]:e.target.value})
                        }} /><br/>
                        <label>Add Card expiryDate: </label><input name="expiryDate" className="form-control" value={insurance.expiryDate} onChange={(e)=>{
                           setInsurance({...insurance,[e.target.name]:e.target.value})
                        }} /><br/>
                        <label>Add Insurance Number: </label><input name="insuranceNumber"  className="form-control" value={insurance.insuranceNumber} onChange={(e)=>{
                            setInsurance({...insurance,[e.target.name]:e.target.value})
                        }} /><br/>
                        <label>Add Identification Number of Insurance Provider: </label><input className="form-control" value={insurance.identificationNumberOfCarrier} name="identificationNumberOfCarrier"  onChange={(e)=>{
                            setInsurance({...insurance,[e.target.name]:e.target.value})
                        }} /><br/>

                    </div>
                   
                      <button className="btn btn-block btn-lg btn-primary" onClick={action}>Update</button><br/><br/>
                     
            </section>
        </section>
        </div>
    </section>
    )

}


export default UpdatePatient;

///////////////////////////


 


    
