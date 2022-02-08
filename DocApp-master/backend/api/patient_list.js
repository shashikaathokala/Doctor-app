const router = require('express').Router();
const  Mongoose = require('mongoose');
let Doctor = require('../models/doctors');
const appointment = require('../models/appointment')
const patient = require('../models/patient');
const authenticateToken = require('../authenticateToken');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const user = require('../models/Usermodel')
const JWT_SECRET = "c7b6279efb87ef30afcc4e403e2ab580eb02f2f15e51ee0259b5114c9b6c35d0f93222085d0f32df0c6c498867b02c137ecd4921f2434b87a9d3c7f36077e0d1";

/**
 * @swagger
 * /patient:
 *  post: 
 *    description: Creating patient profile API
 *    tags: [Patient]
 *    responses:
 *      200:
 *        description: Patient added successfully
 *      400:
 *        description: Invalid username/password
 * 
 */
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
    .then((response) => {
        res.status(200).json(response)
        console.log("Patient Added")
        })
        .catch((e) => {
            console.log(e)
        })

})

/**
 * @swagger
 * /patient/login:
 *  post: 
 *    description: Patient login API
 *    tags: [Patient]
 *    responses:
 *      400:
 *        description: Invalid username/password
 *      200:
 *        description: Login successfull
 * 
 * 
 */
router.post("/patient/login", async (req, res) => {
    const { username, password } = req.body;
    const User = await user.findOne({ username }).lean();
  
    if (!User) {
      return res.json({ status: "error", error: "Invalid username/password" });
    }
  
    // if (await bcrypt.compare(password, User.password)) {
      if(User.password === password){
      const token = jwt.sign(
        {
          id: User.id,
          username: User.username,
        },
        JWT_SECRET
      );
  
      return res.json({ status: "ok", acesstoken: token });
    }
  
    res.json({ status: "error", data: "Invalid username/password" });
  });

  
 /**
 * @swagger
 * /user:
 *  post: 
 *    description: User authentication profile creation API
 *    tags: [Patient]
 *    responses:
 *      400:
 *        description: Invalid username/password
 *      11000:
 *        description: Username already in use
 *      200:
 *        description: User created successfully
 * 
 * 
 */
  router.post("/user", async (req, res) => {
    const { username, email,iid,account_type } = req.body;
    var password = req.body.password
    if (!username || typeof username !== "string") {
      return res.json({
        status: "error",
        error: "Invalid username",
      });
    }
  
    if (!email || typeof email !== "string") {
      return res.json({
        status: "error",
        error: "Invalid email",
      });
    }
  
    if (email.includes("@") !== true) {
      return res.json({
        status: "error",
        error: "Invalid email. Should contain @",
      });
    }
  
    if (email.includes(".com") !== true) {
      return res.json({
        status: "error",
        error: "Invalid email. Should contain .com",
      });
    }
  
//     if (!plaintextpassword || typeof plaintextpassword !== "string") {
//       return res.json({
//         status: "error",
//         error: "Invalid password",
//       });
//     }
  
//     if (plaintextpassword.length < 7) {
//       return res.json({
//         status: "error",
//         error: "Password too small. Min length should be 7",
//       });
//     }
// <<<<<<< shardul
// //  password = await bcrypt.hash(plaintextpassword, 12);
// =======
//  password = await bcrypt.hash(plaintextpassword, 12); 
  
    try {
      const response = await user.create({
        username,
        email,
        password,
        iid,
        account_type
      });
      console.log("User created successfully", response);
    } catch (error) {
      if (error.code == 11000) {
        return res.json({ status: "error", error: "Username already in use" });
      }
      throw error;
    }
  
    res.json({ status: "ok" });
  });

 /**
 * @swagger
 * /:
 *  get: 
 *    description: Fetching doctors list for patient API
 *    tags: [Doctor]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Doctor inforation fetched
 * 
 * 
 */
  router.route('/').get(authenticateToken,(req,res)=>{
    console.log(req.query)
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

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
});

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
 * /deletePatient/:id:
 *  delete: 
 *    description: Patient deletion API
 *    tags: [Patient]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Patient deleted
 * 
 * 
 */
router.delete('/deletePatient/:id', async(req, res) => {
    const tempId = req.params.id
    console.log(tempId)
    patient.deleteOne({ _id: new Mongoose.Types.ObjectId(tempId) })
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
 * /myAppointments/:id:
 *  get: 
 *    description: Fetching Patient appointment API
 *    tags: [Patient]
 * 
 * 
 */
router.get('/myAppointments/:id',async(req,res)=>{
    const app = await appointment.aggregate([{
        $match: {
            $and: [
                { PatientId: { $eq: req.params.id } },
                
            ]
        }
    },
    { "$addFields": { "Doctorid": { "$toObjectId": "$DoctorId" } } },
    {
        $lookup: {

            from: "doctors",
            localField: "Doctorid",

            foreignField: "_id",
            as: "details",

        }
    },

    {
        $unwind: {
            path: "$details",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $project:     
          {
            "_id":1,
            "date":1,
            "time":1,
            "AppointmentInfo":1,
            "Prescription":1,
            "DoctorId":1,
            "PatientId":1,
            "Status":1,
            "details.Fname":1,
            "details.Lname":1,
            "details.Address":1
          }
    }



])

res.json(app)

})

router.get('/getappointmentByDate/:date/:did', async(req, res) => {
    const dateString = req.params.date
    const docId = req.params.did
    console.log(docId)

    const app = await appointment.aggregate([{
      $match: {
          $and: [
              { PatientId: { $eq: req.params.date } },
              { date:{$eq:req.params.did}}
          ]
      }
  },
  { "$addFields": { "Doctorid": { "$toObjectId": "$DoctorId" } } },
  {
      $lookup: {

          from: "doctors",
          localField: "Doctorid",

          foreignField: "_id",
          as: "details",

      }
  },

  {
      $unwind: {
          path: "$details",
          preserveNullAndEmptyArrays: true
      }
  },
  {
      $project:     
        {
          "_id":1,
          "date":1,
          "time":1,
          "AppointmentInfo":1,
          "Prescription":1,
          "DoctorId":1,
          "PatientId":1,
          "Status":1,
          "details.Fname":1,
          "details.Lname":1,
          "details.Address":1
        }
  }



])

res.json(app)



})

module.exports = router;