import React,{useState,useEffect} from "react";
import {Switch,Route,Link,useNavigate} from "react-router-dom";
import DoctorDataService from "../services/doctors";
import PatientDataService from "../services/patients"
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import DeleteDoctor from "./doctor-delete";



const DoctorSlots=(props)=> {

    const { id } = useParams()
    const location = useLocation();
    let doc = location.state.doc
    let user = location.state.user
    let week = {

    }
    const navigate = useNavigate();

    const [mavailable,setmavailable] = useState("Yes")
    const [mstime,setmstime] = useState("")
    const [metime,setmetime] = useState("")
    const [mslotduration,setmslotduration] = useState("")

    const [tuavailable,settuavailable] = useState("Yes")
    const [tustime,settustime] = useState("")
    const [tuetime,settuetime] = useState("")
    const [tuslotduration,settuslotduration] = useState("")

    const [wavailable,setwavailable] = useState("Yes")
    const [wstime,setwstime] = useState("")
    const [wetime,setwetime] = useState("")
    const [wslotduration,setwslotduration] = useState("")

    const [thavailable,setthavailable] = useState("Yes")
    const [thstime,setthstime] = useState("")
    const [thetime,setthetime] = useState("")
    const [thslotduration,setthslotduration] = useState("")

    const [favailable,setfavailable] = useState("Yes")
    const [fstime,setfstime] = useState("")
    const [fetime,setfetime] = useState("")
    const [fslotduration,setfslotduration] = useState("")

    const [saavailable,setsaavailable] = useState("Yes")
    const [sastime,setsastime] = useState("")
    const [saetime,setsaetime] = useState("")
    const [saslotduration,setsaslotduration] = useState("")

    const [suavailable,setsuavailable] = useState("Yes")
    const [sustime,setsustime] = useState("")
    const [suetime,setsuetime] = useState("")
    const [suslotduration,setsuslotduration] = useState("")

    const [address,setaddress] = useState("")
    const [license,setlicense] = useState("")
    const [specialization,setspecialization] = useState("")
    const [phone,setphone] = useState("")
    const [postcode,setpostcode] = useState("")
    const [city,setcity] = useState("")
    const [qualification,setqualification] = useState("")
    

    // const getDoctorDetails = id =>{
    //     console.log(id)
    //     DoctorDataService.getDetails(id)
    //     .then(response=>{
    //         console.log(response.data.weeks.week1[0].available);
    //         console.log(response.data.weeks.week1[0].timeslots[0].timeslot1);

    //         setDoctor(response.data)

    //     })
    //     .catch(e=>{
    //         console.log(e);
    //     })
    // }
    

    function createslot(st,et,sd){
        let starttime = st;
        let endtime = et;
         let durationtime = sd;
         let totalduration = diff(starttime,endtime)
         console.log(totalduration)
         let td = totalduration.split(":");
         let drt = durationtime.split(':');
         let cur = starttime;
         let timeslot = (parseInt(td[0])*60)/parseInt(drt[1]);
         console.log(timeslot)
          let timeslots = [

          ]
          let time = {}
          let t = []
             for( let i=0; i<timeslot;i++){
                 t[i] = cur+"-"+addTimes(cur,durationtime);
                   time = {
                    "slotnumber":i,
                    "timeslot":t[i],
                    "available":"Yes"
                }
                timeslots.push(time);
                 //  console.log(cur)
                //  console.log(durationtime)
                 cur = addTimes(cur,durationtime);
                
                }
        return timeslots;

    }
    function addTimes (startTime, endTime) {
        var times = [ 0, 0 ]
        var max = times.length
      
        var a = (startTime || '').split(':')
        var b = (endTime || '').split(':')
      
        // normalize time values
        for (var i = 0; i < max; i++) {
          a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
          b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
        }
      
        // store time values
        for (var i = 0; i < max; i++) {
          times[i] = a[i] + b[i]
        }
      
        var hours = times[0]
        var minutes = times[1]
      
        if (minutes >= 60) {
          var h = (minutes / 60) << 0
          hours += h
          minutes -= 60 * h
        }
      
        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) 
      }


      function diff(start, end) {
        start = start.split(":");
        end = end.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
        
        return   hours + ":" + minutes;
    }


   const call = ()=>{
//     let w = [];
//         for(let i=1;i<=5;i++){
//             for( let j=1;j<=7;j++){
//                w = [
//                    {
//                     "week":i,
//                    "day":j,
//                    "available": mavailable,
//                    "starttime": mstime,
//                     "endtime": metime,
//                     "slotduration":mslotduration,
//                     "timeslots":createslot(mstime,metime,mslotduration)
//                },
//                {
//                     "week":i,
//                     "day":j,
//                     "available": tuavailable,
//                     "starttime": tustime,
//                     "endtime": tuetime,
//                     "slotduration":tuslotduration,
//                     "timeslots":createslot(tustime,tuetime,tuslotduration)
//                },
//                {
//                 "week":i,
//                 "day":j,
//                 "available": wavailable,
//                 "starttime": wstime,
//                 "endtime": wetime,
//                 "slotduration":wslotduration,
//                 "timeslots":createslot(wstime,wetime,wslotduration)
//            },
//            {
//             "week":i,
//             "day":j,
//             "available": thavailable,
//             "starttime": thstime,
//             "endtime": thetime,
//             "slotduration":thslotduration,
//             "timeslots":createslot(thstime,thetime,thslotduration)
//        },
//        {
//         "week":i,
//         "day":j,
//         "available": favailable,
//         "starttime": fstime,
//         "endtime": fetime,
//         "slotduration":fslotduration,
//         "timeslots":createslot(fstime,fetime,fslotduration)
//    },
//    {
//     "week":i,
//     "day":j,
//     "available": saavailable,
//     "starttime": sastime,
//     "endtime": saetime,
//     "slotduration":saslotduration,
//     "timeslots":createslot(sastime,tuetime,tuslotduration)
// },

//                ]
//         }
//     } 
//     console.log(w)
            



    let week1 = [
                {
               
                "day": "1",
                "available":mavailable,
                "starttime": mstime,
                "endtime": metime,
                "slotduration":mslotduration,
                "timeslots":createslot(mstime,metime,mslotduration)
            },
            {
               
                "day": "2",
                "available":tuavailable,
                "starttime": tustime,
                "endtime": tuetime,
                "slotduration":tuslotduration,
                "timeslots":createslot(tustime,tuetime,tuslotduration)
            },
            {
               
                "day": "3",
                "available":wavailable,
                "starttime": wstime,
                "endtime": wetime,
                "slotduration":wslotduration,
                "timeslots":createslot(wstime,wetime,wslotduration)
            },
            {
               
                "day": "4",
                "available":thavailable,
                "starttime": thstime,
                "endtime": thetime,
                "slotduration":thslotduration,
                "timeslots":createslot(thstime,thetime,thslotduration)
            },
            {
                
                "day": "5",
                "available":favailable,
                "starttime": fstime,
                "endtime": fetime,
                "slotduration":fslotduration,
                "timeslots":createslot(fstime,fetime,fslotduration)
            },
            {
                
                "day": "6",
                "available":saavailable,
                "starttime": sastime,
                "endtime": saetime,
                "slotduration":saslotduration,
                "timeslots":createslot(sastime,saetime,saslotduration)
            },
            {
                
                "day": "7",
                "available":suavailable,
                "starttime": sustime,
                "endtime": suetime,
                "slotduration":suslotduration,
                "timeslots":createslot(sustime,suetime,suslotduration)
            },
        ]
        

        let week2 = week1;
        let week3 = week1
        let week4  = week1
        let week5 = week1
        
        // week =  {

        //         week1,
        //         week2,
        //         week3,
        //         week4,
        //         week5,
        // }
       let myweeks = [...week1,...week2,...week3,...week4,...week5];
        // let weeksa = ['a','b','c']
        // let weeksb = ['a','b','c']
        // weeksa.concat(weeksb);
        // console.log(weeksa)
        console.log(myweeks)
        doc['weeks'] = myweeks
        console.log(doc)
        
        DoctorDataService.postDoc(doc)
        .then((response)=>{
            console.log(response.data)
            user.iid = response.data._id
            PatientDataService.registerUser(user)
            .then(()=>{
                console.log("Doctor/User Added")
                navigate("/")
            })
            .catch((e)=>{
                console.log(e)
                alert("Username Already in use")
                DoctorDataService.DeleteDoctor(user.iid)
                navigate("/")
            })
        })
        .catch((e)=>{
            console.log(e)
        })
         
   }
  return (
    <div className="App">
    <h1 style={{textAlign:'center'}}> Slot Registration Page</h1>
    <br/><br/><br/><br/>
    <label >Monday: </label>
    <label >Open</label> <input type="radio" value="Yes" name="mavailable" checked={mavailable === "Yes"} onChange={(e)=>{
        setmavailable(e.target.value)
    }} />
    <label >Closed</label> <input type="radio" value="No" name="mavailable" checked={mavailable === "No"} onChange={(e)=>{
        setmavailable(e.target.value)
    }} /><br></br>
    <label>Start Time</label><input name="starttime"  onChange={(e)=>{
        setmstime(e.target.value)
    }} />
    <label>End Time</label><input name="endtime"  onChange={(e)=>{
        setmetime(e.target.value)
    }} />
    <label>Select Slot Duration</label>
    <select onChange={(e)=>{
        setmslotduration(e.target.value)
    }} >
    <option value="00:15">15 mins</option>
    <option value="00:30">30 mins</option>
    <option value="00:45">45 mins</option>
    <option value="00:60">60 mins</option>
    </select><br/>

<label>Tuesday: </label>
    <label>Open</label> <input type="radio" value="Yes" name="tuavailable" checked={tuavailable === "Yes"} onChange={(e)=>{
        settuavailable(e.target.value)
    }} />
    <label>Closed</label> <input type="radio" value="No" name="tuavailable" checked={tuavailable === "No"} onChange={(e)=>{
        settuavailable(e.target.value)
    }} /><br></br>
    <label>Start Time</label><input name="starttime"  onChange={(e)=>{
        settustime(e.target.value)
    }} />
    <label>End Time</label><input name="endtime"  onChange={(e)=>{
        settuetime(e.target.value)
    }} />
    <label>Select Slot Duration</label>
    <select onChange={(e)=>{
        settuslotduration(e.target.value)
    }} >
     <option value="00:15">15 mins</option>
    <option value="00:30">30 mins</option>
    <option value="00:45">45 mins</option>
    <option value="00:60">60 mins</option>
    </select><br/>

<label>Wednesday: </label>
    <label>Open</label> <input type="radio" value="Yes" name="wavailable" checked={wavailable === "Yes"} onChange={(e)=>{
        setwavailable(e.target.value)
    }} />
    <label>Closed</label> <input type="radio" value="No" name="wavailable" checked={wavailable === "No"} onChange={(e)=>{
        setwavailable(e.target.value)
    }} /><br></br>
    <label>Start Time</label><input name="starttime"  onChange={(e)=>{
        setwstime(e.target.value)
    }} />
    <label>End Time</label><input name="endtime"  onChange={(e)=>{
        setwetime(e.target.value)
    }} />
    <label>Select Slot Duration</label>
    <select onChange={(e)=>{
        setwslotduration(e.target.value)
    }} >
    <option value="00:15">15 mins</option>
    <option value="00:30">30 mins</option>
    <option value="00:45">45 mins</option>
    <option value="00:60">60 mins</option>
    </select><br/>

<label>Thursday: </label>
    <label>Open</label> <input type="radio" value="Yes" name="thavailable" checked={thavailable === "Yes"} onChange={(e)=>{
        setthavailable(e.target.value)
    }} />
    <label>Closed</label> <input  type="radio" value="No" name="thavailable" checked={thavailable === "No"} onChange={(e)=>{
        setthavailable(e.target.value)
    }} /><br></br>
    <label>Start Time</label><input name="starttime"  onChange={(e)=>{
        setthstime(e.target.value)
    }} />
    <label>End Time</label><input name="endtime"  onChange={(e)=>{
        setthetime(e.target.value)
    }} />
    <label>Select Slot Duration</label>
    <select onChange={(e)=>{
        setthslotduration(e.target.value)
    }} >
   <option value="00:15">15 mins</option>
    <option value="00:30">30 mins</option>
    <option value="00:45">45 mins</option>
    <option value="00:60">60 mins</option>
    </select><br/>

<label>Friday: </label>
    <label>Open</label> <input type="radio" value="Yes" name="favailable" checked={favailable === "Yes"} onChange={(e)=>{
        setfavailable(e.target.value)
    }} />
    <label>Closed</label> <input type="radio" value="No" name="favailable" checked={favailable === "No"} onChange={(e)=>{
        setfavailable(e.target.value)
    }} /><br></br>
    <label>Start Time</label><input name="starttime"  onChange={(e)=>{
        setfstime(e.target.value)
    }} />
    <label>End Time</label><input name="endtime"  onChange={(e)=>{
        setfetime(e.target.value)
    }} />
    <label>Select Slot Duration</label>
    <select  onChange={(e)=>{
        setfslotduration(e.target.value)
    }} >
     <option value="00:15">15 mins</option>
    <option value="00:30">30 mins</option>
    <option value="00:45">45 mins</option>
    <option value="00:60">60 mins</option>
    </select><br/>

<label>Saturday: </label>
    <label>Open</label> <input type="radio" value="Yes" name="saavailable" checked={saavailable === "Yes"} onChange={(e)=>{
        setsaavailable(e.target.value)
    }} />
    <label>Closed</label> <input type="radio" value="No" name="saavailable" checked={saavailable === "No"} onChange={(e)=>{
        setsaavailable(e.target.value)
    }} /><br></br>
    <label >Start Time</label><input name="starttime"  onChange={(e)=>{
        setsastime(e.target.value)
    }} />
    <label>End Time</label><input name="endtime"  onChange={(e)=>{
        setsaetime(e.target.value)
    }} />
    <label> Select Slot Duration</label>
    <select onChange={(e)=>{
        setsaslotduration(e.target.value)
    }} >
   <option value="00:15">15 mins</option>
    <option value="00:30">30 mins</option>
    <option value="00:45">45 mins</option>
    <option value="00:60">60 mins</option>
    </select><br/>

<label>Sunday: </label>
    <label>Open</label> <  input type="radio"  value="Yes" name="suavailable" checked={suavailable === "Yes"} onChange={(e)=>{
        setsuavailable(e.target.value)
    }} />
    <label>Closed</label> <input type="radio" value="No" name="suavailable" checked={suavailable === "No"} onChange={(e)=>{
        setsuavailable(e.target.value)
    }} /><br></br>
    <label>Start Time</label><input name="starttime"  onChange={(e)=>{
        setsustime(e.target.value)
    }} />
    <label>End Time</label><input name="endtime"  onChange={(e)=>{
        setsuetime(e.target.value)
    }} />
    <label>Select Slot Duration</label>
    <select onChange={(e)=>{
        setsuslotduration(e.target.value)
    }} >
    <option value="00:15">15 mins</option>
    <option value="00:30">30 mins</option>
    <option value="00:45">45 mins</option>
    <option value="00:60">60 mins</option>
    </select><br/>



    <button className="form-control" onClick={call}>Register</button>
    </div>
  );
}

export default DoctorSlots;
