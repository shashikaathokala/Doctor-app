import React, { useEffect,useState } from 'react'
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import PatientDataService from '../services/patients'

const PatientRegistration = ()=>{
    let patient = {}
    let user = {}
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('') 
    const [fname,setfName] = useState("")
    const [lname,setlName] = useState("")
    const [address,setAddress] = useState("")
    const [phone,setPhone] = useState("")
    const [postcode,setPostcode] = useState("")
    const [birthDate,setBirthDate] = useState("")
    const [city,setCity] = useState('')
    const [startDate,setStartDate] = useState('')
    const [expiryDate,setExpiryDate] = useState('')
    const [country,setCountry] = useState("")
    const [insuranceProvider,setInsuranceProvider] = useState("")
    const [insuranceCardNumber,setInsuranceCardNumber] = useState('')
    const [insuranceNumber,setInsuranceNumber] = useState('')
    const [insuranceIdentificationNumber,setInsuranceIdentificationNumber] = useState('')
    const [email,setEmail] = useState('')

    useEffect(()=>{
        console.log(localStorage.getItem('iid'))
    })
    const navigate = useNavigate()
    const register = ()=>{
    patient = { 
     Fname : fname,
     Lname : lname,
     Addres : address,
     Phone : phone,
     Postcode : postcode,
     City : city,
     
    insuranceProvider:insuranceProvider,
    firstName:fname,
    lastName:lname,
    address:address,
    birthDate:birthDate,
    startDate:startDate,
    expiryDate:expiryDate,
    insuranceNumber:insuranceNumber,
    cardNumber:insuranceCardNumber,
    identificationNumberOfCarrier:insuranceIdentificationNumber
        
    }
    user = {
        username:username,
        password:password,
        email:email,
        iid:'',
        account_type:'Patient'
    }
   

        
    
        PatientDataService.registerPatient(patient)
        .then((response)=>{
            console.log(response.data)
            user.iid = response.data._id       
                PatientDataService.registerUser(user)
                .then((response)=>{
                    console.log(response)
                    console.log("user created")
                    navigate("/")
                })
                .catch(e=>{
                    console.log(e)
                    alert("Username Already in use")
                    PatientDataService.DeletePatient(user.iid)
                navigate("/")
                }
                    
                    )
                
            
        })
        .catch(e=>console.log(e))

    }
    

    return(
        <section className="container-fluid backgd">
        <section className="row justify-content-center">
            <section className="col-12 col-sm-6 col-md-3">
                    <h3 className="fw-normal mb-3 pb-3 " style={{letterSpacing: "1px"}}>Patient Registration</h3>
                    <div className="mb-3">
                    <label>Username: </label><input name="username" className="form-control"  onChange={(e)=>{
                        setUsername(e.target.value)
                        }} /><br/>
                        <label>Email: </label><input name="email" className="form-control"  onChange={(e)=>{
                        setEmail(e.target.value)
                        }} /><br/>
                        <label>Password: </label><input name="password" type="password" className="form-control" onChange={(e)=>{
                        setPassword(e.target.value)
                        }} /><br/>
                        <label>Confirm Password: </label><input className="form-control" name="cpassword" type="password"  /><br/>
                        <label>FirstName: </label><input name="fname"  className="form-control" onChange={(e)=>{
                            setfName(e.target.value)
                        }} /><br/>
                        <label>LastName: </label><input name="lname"  className="form-control" onChange={(e)=>{
                            setlName(e.target.value)
                        }} /><br/>
                        <label>Date of Birth: </label><input name="dob" className="form-control" onChange={(e)=>{
                            setBirthDate(e.target.value)
                        }} /><br/>
                        <label>Address: </label><input name="address"  className="form-control" onChange={(e)=>{
                            setAddress(e.target.value)
                        }} /><br/>
                        <label>Phone: </label><input name="phone"  className="form-control" onChange={(e)=>{
                            setPhone(e.target.value)
                        }} /><br/>
                        <label>Postcode: </label><input name="postcode"  className="form-control" onChange={(e)=>{
                            setPostcode(e.target.value)
                        }} /><br/>
                        <label>City: </label><input name="city" className="form-control"  onChange={(e)=>{
                            setCity(e.target.value)
                        }} /><br/>
                        <label>Country: </label><input name="country"  className="form-control" onChange={(e)=>{
                            setCountry(e.target.value)
                        }} /><br/>
                        <label>Add Insurance Provider: </label><input name="provider"  className="form-control" onChange={(e)=>{
                            setInsuranceProvider(e.target.value)
                        }} /><br/>
                        <label>Add Insurance Card Number: </label><input name="cardNumber" className="form-control"  onChange={(e)=>{
                            setInsuranceCardNumber(e.target.value)
                        }} /><br/>
                        <label>Add Insurance Start Date: </label><input name="cardNumber" className="form-control"  onChange={(e)=>{
                            setStartDate(e.target.value)
                        }} /><br/>
                        <label>Add Card expiryDate: </label><input name="cardNumber" className="form-control"  onChange={(e)=>{
                            setExpiryDate(e.target.value)
                        }} /><br/>
                        <label>Add Insurance Number: </label><input name="insurancenumber"  className="form-control" onChange={(e)=>{
                            setInsuranceNumber(e.target.value)
                        }} /><br/>
                        <label>Add Identification Number of Insurance Provider: </label><input className="form-control" name="identificationnumber"  onChange={(e)=>{
                            setInsuranceIdentificationNumber(e.target.value)
                        }} /><br/>

                    </div>
                      <button className="btn btn-block btn-lg btn-primary" onClick={register}>Register</button><br/><br/>
                     
            </section>
        </section>
    </section>
    )
}

export default PatientRegistration