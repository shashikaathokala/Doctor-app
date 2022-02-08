const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({


    date: { type: String },
    time: { type: String },
    AppointmentInfo: { type: String },
    Prescription: { type: String },
    DoctorId: { type: String },
    PatientId: { type: String },
    Status: { type: String }


})
module.exports = mongoose.model('appointment', Appointment)



// patientID: {
//     id: "",
//     required: ""
// },
// patientName: {
//     type: String,
//     required: true,

// },
// appointmentTime: {
//     type: String,

// },
// AptInfo: {
//     type: String

// }