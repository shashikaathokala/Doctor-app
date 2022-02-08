const router = require('express').Router();
const  Mongoose = require('mongoose');
let Doctor = require('../models/doctors');
const appointment = require('../models/appointment')
const patient = require('../models/patient');
const authenticateToken = require('../authenticateToken');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Usermodel = require('../models/Usermodel')
const JWT_SECRET = "c7b6279efb87ef30afcc4e403e2ab580eb02f2f15e51ee0259b5114c9b6c35d0f93222085d0f32df0c6c498867b02c137ecd4921f2434b87a9d3c7f36077e0d1";

/**
 * @swagger
 * /api/login:
 *  post: 
 *    description: Doctor login API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Invalid username/password
 *      200:
 *        description: Login successfull
 */
router.post('/api/login', async(req, res) => {

    const { username, password } = req.body;

    const User = await Usermodel.findOne({ username }).lean();
    console.log(JWT_SECRET)
    console.log(User)

    if (!User) {

        return res.json({ status: "error", error: "Invalid username/password" });

    }



    // if (await bcrypt.compare(password, User.password)) {
    if(User.password === password){
        const token = jwt.sign({

                id: User.id,

                username: User.username,
            
            },

            JWT_SECRET

        );




        return res.json({ status: "ok", acesstoken: token,type:User.account_type,iid:User.iid });

    }



    res.json({ status: "error", data: "Invalid username/password" });

});



router.route('/').get(authenticateToken,(req,res)=>{
    console.log(req.query)
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const q = req.query.q
    if(q == 'All' || q == ''){
    const startIndex = (page-1) * limit
    const endIndex = page * limit
    Doctor.find()
    .then((doc)=>{
      let result = {}
      if(endIndex < doc.length)
      result.next = {
          page:page +1,
          limit:limit
      }  
      if(startIndex > 0){
        result.prev = {
            page:page - 1,
            limit:limit
        }
      }
     
      result.result =  doc.slice(startIndex,endIndex)
        res.json(result) 
    } )
    .catch(err=> res.status(400).json('Error: ' + err) )
    }
    else{
    const startIndex = (page-1) * limit
    const endIndex = page * limit
    Doctor.find({Specialization:q})
    .then((doc)=>{
      let result = {}
      if(endIndex < doc.length)
      result.next = {
          page:page +1,
          limit:limit
      }  
      if(startIndex > 0){
        result.prev = {
            page:page - 1,
            limit:limit
        }
      }
     
      result.result =  doc.slice(startIndex,endIndex)
        res.json(result) 
    } )
    .catch(err=> res.status(400).json('Error: ' + err) )
    }

    
});

/**
 * @swagger
 * /getPatientByid/:id:
 *  post: 
 *    description: Fetching patient by Id - API
 *    tags: [Doctor]
 * 
 * 
 */
router.route('/getPatientByid/:id').get(authenticateToken, (req, res) => {

    patient.findById(req.params.id)

        .then(pat => res.json(pat))



})

function paginatedResults(model){
    return(req,res,next)=>{
        const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page-1) * limit
    const endIndex = page * limit

    let result = {}
    if(endIndex < model.length)
    result.next = {
        page:page +1,
        limit:limit
    }  
    if(startIndex > 0){
      result.prev = {
          page:page - 1,
          limit:limit
      }

      result.result =  model.slice(startIndex,endIndex)
      res.paginatedResults = result
      next()
    }
    }
}

/**
 * @swagger
 * /doctordetails/:id:
 *  get: 
 *    description: Fetching doctor by Id - API
 *    tags: [Doctor]
 * 
 * 
 */
router.route('/doctordetails/:id').get(authenticateToken,(req,res)=>{
    Doctor.findById(req.params.id)
    .then(doc=> res.json(doc))
})

/**
 * @swagger
 * /doctordetails/slots/:
 *  post: 
 *    description: Creating doctor slots - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Login successfull
 */
//while appointment change slots
router.route('/doctordetails/slots/').post((req,res)=>{
    console.log(req.body.id)
    console.log(req.body.day)
    console.log(req.body.week)

    Doctor.find({"_id":req.body.id},{"weeks.timeslots":1})
    .then((doc) => {
        let d = parseInt(req.body.day)
        let w = req.body.week
        if(w=="1"){
            w = 0 + d
        }
        if(w=="2"){
            w = 6 + d
        }
        if(w=="3"){
            w = 13 + d
        }
        if(w=="4"){
            w = 20 + d
        }
        if(w=="5"){
            w = 27 + d
            if(w>31){
                w = 0
            }
        }
        


        console.log(doc[0].weeks[w].timeslots)
        sdata = doc[0].weeks[w].timeslots
        res.json(sdata)
        // console.log(res)

        // console.log(doc.weeks.week1[0].timeslots)
    })
})

/**
 * @swagger
 * /update/:id:
 *  put: 
 *    description: Updating doctor's profile - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Updated Successfully
 */
//overall update
router.route('/update/:id').put((req,res)=>{
    const id = req.params.id;
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const Address = req.body.Address;
    const License = req.body.License;
    const Specialization = req.body.Specialization;
    const Phone = req.body.Phone;
    const Postcode = req.body.Postcode;
    const City = req.body.City;
    const available = req.body.available
    const Qualification = req.body.Qualification;
    const weeks = req.body.weeks;

    const NewDoc = {
        Fname,
        Lname,
        Address,
        License,
        Specialization,
        Phone,
        Postcode,
        City,
        Qualification,
        weeks
    };

    Doctor.findByIdAndUpdate(id,NewDoc)
    .then(()=>{
        res.json("Updated Successfully")
        
    })
    .catch(e=>console.log(e))
})

//update start and end time
// router.route('/updateday/:id').put((req,res)=>{
//     const id = req.params.id
//     const dayid = req.body.dayid
//     const timeslotid = req.body.timeslotid
//     const available = req.body.available
//     const weeks = req.body.weeks;
//     const w = "0";
    
//     let key = "weeks."+w+".timeslots."+w+"._id";
//     let key1 = "weeks."+w+".timeslots."+w+".available";
    

// Doctor.findOneAndUpdate(
    
//     {  [key]: id },
//     {
//        [key1]:available
//     },

   
    
// )
        
//     .then(()=>{
//         // console.log(key)
//         // res.json(doc)
//         // console.log(res)
//         res.json("Updated")
        
//     })
//     .catch(e=>console.log(e))
// })


/**
 * @swagger
 * /updateday/:id:
 *  put: 
 *    description: Updating doctor's day timings - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Updated Successfully
 */
//update day
router.route('/updateday/:id').put((req,res)=>{
    const id = req.params.id
    const day = req.body.day
    const timeslotid = req.body.timeslotid
    const available = req.body.available
    const w = req.body.week;
    
    let key = "weeks."+w+".day";
    let key1 = "weeks."+w+".available";
    
    console.log(key)
    console.log(key1)
Doctor.findOneAndUpdate(
    
    {  _id:id,[key]: day },
    {
       [key1]:available
    },

   
    
)
        
    .then(()=>{
        // console.log(key)
        // res.json(doc)
        // console.log(res)
        res.json("Updated")
        
    })
    .catch(e=>console.log(e))
})




/**
 * @swagger
 * /updateday/:id:
 *  put: 
 *    description: Updating doctor's slots  - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Updated Successfully
 */
router.route('/updateslot/').put((req,res)=>{
    const id = req.body.id
    let d = req.body.day
    const available = req.body.available
    let w = req.body.week
    let s = req.body.slot
    if(w=="1"){
        w = 0 + d
    }
    if(w=="2"){
        w = 6 + d
    }
    if(w=="3"){
        w = 13 + d
    }
    if(w=="4"){
        w = 20 + d
    }
    if(w=="5"){
        w = 27 + d
        if(w>31){
            w = 0
        }
    }
    
    let key = "weeks."+w+".timeslots."+s+"._id";
    let key1 = "weeks."+w+".timeslots."+s+".available";
    
    console.log(key)
    console.log(key1)
Doctor.findOneAndUpdate(
    
    {  [key]: id },
    {
       [key1]:available
    },

   
    
)
        
    .then(()=>{
        // console.log(key)
        // res.json(doc)
        // console.log(res)
        res.json("Updated")
        
    })
    .catch(e=>console.log(e))
})


/**
 * @swagger
 * /updateslotandavailability/:
 *  put: 
 *    description: Updating doctor's slot availability - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Updated Successfully
 */
router.route('/updateslotandavailability/').put((req,res)=>{
    const id = req.body.id
    let d = req.body.day
    const available = req.body.available
    let w = req.body.week
    let slottime = req.body.slottime
    let s = req.body.slot
    if(w=="1"){
        w = 0 + d
    }
    if(w=="2"){
        w = 6 + d
    }
    if(w=="3"){
        w = 13 + d
    }
    if(w=="4"){
        w = 20 + d
    }
    if(w=="5"){
        w = 27 + d
        if(w>31){
            w = 0
        }
    }
    
    let key = "weeks."+w+".timeslots."+s+"._id";
    let key1 = "weeks."+w+".timeslots."+s+".available";
    let key2 = "weeks."+w+".timeslots."+s+".timeslot"
    
    console.log(key)
    console.log(key1)
Doctor.findOneAndUpdate(
    
    {  [key]: id },
    {
       [key1]:available,
       [key2]:slottime,
    },

   
    
)
        
    .then(()=>{
        // console.log(key)
        // res.json(doc)
        // console.log(res)
        res.json("Updated")
        
    })
    .catch(e=>console.log(e))
})

/**
 * @swagger
 * /add/:
 *  post: 
 *    description: Creating doctor's profile - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Updated Successfully
 */
router.route('/add/').post((req,res)=>{
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const Address = req.body.Address;
    const License = req.body.License;
    const Specialization = req.body.Specialization;
    const Phone = req.body.Phone;
    const Postcode = req.body.Postcode;
    const City = req.body.City;
    const Qualification = req.body.Qualification;
    const weeks = req.body.weeks;
    
    const Doc = new Doctor({
        Fname,
        Lname,
        Address,
        License,
        Specialization,
        Phone,
        Postcode,
        City,
        Qualification,
        weeks
    });
    Doc.save()
    .then((response)=>{
        res.status(200).json(response)
        console.log("Doctor Added")
    })
    .catch(e=>{
        console.log(e)
    })

})

router.route('/updatePrescription/:id').put((req,res)=>{
    const id = req.params.id
    const prescription = req.body.prescription
    console.log(prescription)
    console.log(id)
    
    appointment.findOneAndUpdate({_id:id},{Prescription:prescription})
    .then((response)=>{
        res.status(200).json(response)
        console.log("Sent")
    })
    .catch(e=>{
        console.log(e)
    })

})


// const cache = require('D:/React/doc_app/routeCache')

// router.get('/getappointment/:id', cache(200), async(req, res) => {

//     const abcd = await appointment.find({ PatientId: req.params.id })
//     console.log(abcd)


//     res.json(abcd)
// })

/**
 * @swagger
 * /getappointmentByDate/:date/:did:
 *  get: 
 *    description: Fetching patient appoitments by ID for doctors - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Updated Successfully
 */
//Patient Appointments
router.get('/getappointmentByDate/:date/:did',authenticateToken, async(req, res) => {
    const dateString = req.params.date
    const docId = req.params.did
    console.log(docId)

    const ab = await appointment.aggregate([{
            $match: {
                $and: [
                    { DoctorId: { $eq: req.params.did } },
                    { date: { $eq: req.params.date } }
                ]
            }
        },
        { "$addFields": { "Patientid": { "$toObjectId": "$PatientId" } } },
        {
            $lookup: {

                from: "patients",
                localField: "Patientid",

                foreignField: "_id",
                as: "details",

            }
        },

        {
            $unwind: {
                path: "$details",
                preserveNullAndEmptyArrays: true
            }
        }


    ])

    res.json(ab)


})



//Doctor Appointments by date
// router.get('/getappointmentByDate/:date/:id', async(req, res) => {
//     const dateString = req.params.date
//     const docId = req.params.id
//     console.log(docId)
//     const abcd = await appointment.find({ DoctorId: docId, date: dateString })
//     console.log(abcd)
//     res.json(abcd)


// })

/**
 * @swagger
 * /getPatDet:
 *  get: 
 *    description: Fetching patient info on doctor's click - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Updated Successfully
 */
//get Patient info on doctor's click
router.get('/getPatDet', async(req, res) => {

    const ab = await appointment.aggregate([{
            $lookup: {
                from: "patients",
                localField: "PatientId",
                foreignField: "id",
                as: "patientDetails",

            }

        }

    ])
    res.json(ab)

});

/**
 * @swagger
 * /deletePatient/:id:
 *  delete: 
 *    description: Deleting Patient profile - API
 *    tags: [Patient]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Patient deleted
 */
router.delete('/deletePatient/:id', async(req, res) => {
    const tempId = req.params.id
    console.log(tempId)
    patient.deleteOne({ _id: new mongoose.Types.ObjectId(tempId) })
        .then(() => {
            res.json("Patient deleted")
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })

});

/**
 * @swagger
 * /deleteDoctor/:id:
 *  delete: 
 *    description: Deleting doctor's profile - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Doctor deleted
 */
router.delete('/deleteDoctor/:id', async(req, res) => {
    const tempId = req.params.id
    console.log(tempId)
    Doctor.deleteOne({ _id: new Mongoose.Types.ObjectId(tempId) })
        .then(() => {
            res.json("Doctor deleted")
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })

});

/**
 * @swagger
 * /deleteDoctor/:id:
 *  post: 
 *    description: Fetching patient info on doctor's click - API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Doctor deleted
 */
//Post appointment
router.post('/appointment', async(req, res) => {
    const patApp = new appointment({


        date: req.body.date,
        time: req.body.time,
        AppointmentInfo: req.body.AppointmentInfo,
        Prescription: req.body.Prescription,
        DoctorId: req.body.DoctorId,
        PatientId: req.body.PatientId,
        Status: req.body.Status,
    })
    try {
        const newApp = await patApp.save()
        res.status(200).json(newApp)
        console.log("Appointment added")
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})




/**
 * @swagger
 * /deleteDoctor/:id:
 *  post: 
 *    description: Creating patient profile - API
 *    tags: [Patient]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Patient added
 */






//Post Patient
router.route('/patient').post((req, res) => {
    const patientApp = new patient({
        id: req.body.id,
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Postcode: req.body.Postcode,
        City: req.body.City,
        Insurance: {
            insuranceProvider: req.body.insuranceProvider,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            birthDate: req.body.birthDate,
            startDate: req.body.startDate,
            expiryDate: req.body.expiryDate,
            insuranceNumber: req.body.insuranceNumber,
            cardNumber: req.body.cardNumber,
            identificationNumberOfCarrier: req.body.identificationNumberOfCarrier
        },
        Country: req.body.Country,
    });
    patientApp.save()
        .then(() => {
            res.json("Patient added")
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })

})

/**
 * @swagger
 * /updateslotandavailability/:
 *  put: 
 *    description: Update patient profile - API
 *    tags: [Patient]
 *    responses:
 *      400:
 *        description: Patient doesn't exist!
 *      200:
 *        description: Updated Successfully
 */
//Update Patient
router.put('/updatePatient/:id', async(req, res) => {
    try {

        const updatedPatient = await patient.updateOne({ _id: req.params.id },
            req.body
        );
        res.json(updatedPatient);
    } catch {
        res.status(404)
        res.send({ error: "Patient doesn't exist!" })
    }
});




module.exports = router;

// days:[{
//     day:{type:Number},
//     available:{type:String},
//     starttime:{type:String},
//     endtime:{type:String},
//     timeslots:[{
//         timeslotflag:{type:String}
        
//     }]
