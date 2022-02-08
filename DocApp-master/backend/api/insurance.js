const router = require('express').Router();
let Insurance = require('../models/insurance');
let storage;

/**
 * @swagger
 * /add:
 *  post: 
 *    description: Saving patient insurance details API
 *    tags: [Patient]
 *    responses:
 *      400:
 *        description: Error
 *      200:
 *        description: Insurance Added
 * 
 * 
  */
router.route('/add').post((req,res)=>{
    const insuranceProvider = req.body.insuranceProvider;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const birthDate = req.body.birthDate;
    const startDate = req.body.startDate;
    const expiryDate = req.body.expiryDate;
    const insuranceNumber = req.body.insuranceNumber;
    const cardNumber = req.body.cardNumber;
    const identificationNumberOfCarrier = req.body.identificationNumberOfCarrier;
    console.log(req.body.firstName);
    const newInsurance = new Insurance({
        insuranceProvider,
        firstName,
        lastName,
        address,
        birthDate,
        startDate,
        expiryDate,
        insuranceNumber,
        cardNumber,
        identificationNumberOfCarrier
    });

    newInsurance.save()
    .then(()=>{
        res.json('Insurance Added');
        console.log('Added')
    })
    .catch(e=>{console.log(e)})
})

router.route('/somedata').post((req,res)=>{
    const name =  req.body.name;
    if(name == "Bhushan"){
        storage = name;
        res.send("Received your data and I allow you to do shit" + name);
        console.log(storage)
    }else{
        res.send('No access');
    }
    
 
 })
 
 router.route('/somedata').get((req,res)=>{
   const name = req.body.name
   console.log(name+"  Ashwini")  
 })


router.route('/').get((req,res)=>{
    Insurance.find()
    .then((insu)=>{
        res.json(insu)
        console.log(insu)
    })
    .catch((e)=>{
        console.log(e)
    })
})

module.exports = router;