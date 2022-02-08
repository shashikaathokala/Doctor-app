import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import DoctorDataService from '../services/doctors'

const Login = ()=>{
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const login = async(event)=>{
        event.preventDefault ()
        const result = await fetch('http://localhost:5000/api/doctor/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/JSON'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((res) => res.json())

        if(result.status != 'error'){
            
            console.log('got the token: ', result.acesstoken)
            localStorage.setItem('token', result.acesstoken)
            console.log(result)
            console.log(result.type)
            
            console.log(result.iid)
            if(result.type == 'Patient'){
                localStorage.setItem('iid',result.iid)
                //patient home page send id to home page
                navigate('/patient/allDoctors')
            }else{
                localStorage.setItem('iid',result.iid)
                //doctor home page send id to home page
                navigate("/doctor/home")
            }
            
        } else {
            console.log(result)
            alert(result.data)
        }
       
        
    }
    const registerPatient = ()=>{

    }
    const registerDoctor =()=>{

    }
    return(
        <section className="container-fluid backgd">
        <section className="row justify-content-center">
            <section className="col-12 col-sm-6 col-md-3">
                <form id = "reg-login" className="form-container">
                    <h3 className="fw-normal mb-3 pb-3 " style={{fontSize:'3rem',marginTop:'5rem',textAlign:'center'}}>Login</h3>
                    <div className="mb-3">
                      <label  className="form-label">User name</label>
                      <input type="text" className="form-control" id="username" onChange={(e)=>{
                          setUsername(e.target.value)
                      }} aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                      <label  className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" onChange={(e)=>{
                          setPassword(e.target.value)
                      }} />
                    </div>
                    <div className="col text-center">
                    <button type="submit" className="btn btn-block btn-lg btn-primary" onClick={login}>Submit</button>
                    </div><br></br>
                    <div className="col text-center">
                    <h6>New to Here? Please use the below links to register</h6>
                    <h6><a type="submit" className="" href='/patient/registration'>Register as Patient</a></h6><br></br>
                    <h6><a type="submit" className="" href='/doctor/registration'>Register as Doctor</a></h6>
                    </div>
                  </form>
            </section>
        </section>
    </section>
    )
}


export default Login;