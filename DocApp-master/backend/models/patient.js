const mongoose = require('mongoose')

const patient = new mongoose.Schema({

    id: { type: String },
    Fname: { type: String },
    Lname: { type: String },
    Address: { type: String },
    Phone: { type: String },
    Postcode: { type: String },
    City: { type: String },
    Insurance: {

        insuranceProvider: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        address: { type: String },
        birthDate: { type: String },
        startDate: { type: String },
        expiryDate: { type: String },
        insuranceNumber: { type: String },
        cardNumber: { type: String },
        identificationNumberOfCarrier: { type: String }


    },
    Country: { type: String }
}, {
    minimize: false

});

module.exports = mongoose.model('patient', patient)