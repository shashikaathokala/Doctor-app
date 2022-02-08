const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InsuranceSchema = new Schema({
    insuranceProvider:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    address:{type:String},
    birthDate:{type:String},
    startDate:{type:String},
    expiryDate:{type:Array},
    insuranceNumber:{type:String,unique:true},
    cardNumber:{type:String,unique:true},
    identificationNumberOfCarrier:{type:String}
});

const Insurance = mongoose.model('Insurance',InsuranceSchema);

module.exports = Insurance;