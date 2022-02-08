const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    Fname:{type:String},
    Lname:{type:String},
    Address:{type:String},
    License:{type:String},
    Specialization:{type:String},
    Phone:{type:String},
    Postcode:{type:String},
    City:{type:String},
    Country:{type:String},
    Qualification:{type:String},
    weeks:[
            {
                day:{type:String},
                available:{type:String},
                starttime:{type:String},
                endtime:{type:String},
                slotduration:{type:String},
                timeslots:[{
                    slotnumber:{},
                    timeslot:{},
                    available:{}
                
                    
                }]
            }
        ]
        
        })

const Doctor = mongoose.model('Doctors',doctorSchema);

module.exports = Doctor;




