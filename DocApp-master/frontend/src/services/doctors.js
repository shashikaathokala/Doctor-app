import http from "../http-common";

class DoctorDataService{
    getAll(p,l,q,token){
        return http.get('/doctor?page='+p+'&limit='+l+'&q='+q,{
            headers:{
                'Authorization':'Bearer '+token
            }
            
        })
    }
    getDetails(id,token){
        return http.get('doctor/doctordetails/'+id,{
            headers:{
                'Authorization':'Bearer '+token
            }
            
        })
    }
    getAppointmentsByDate(date,id,token){
        return http.get('doctor/getappointmentByDate/'+date+'/'+id,{
        headers:{
            'Authorization':'Bearer '+token
        }
        })
    }
    addPrescription(id,data){
        return http.put('doctor/updatePrescription/'+id,data)
    }
    postDoc(data){
        return http.post('doctor/add/',data)
    }
    getAppointments(data){
        return http.post('doctor/doctordetails/slots/',data)
    }
    updateData(id,data){
        return http.put('doctor/update/'+id,data)
    }
    updateSlotAndAvailability(data){
        return http.put('doctor/updateslotandavailability/',data)
    }
    updateSlots(data){
        return http.put('doctor/updateslot/',data)
    }
    postAppointment(data){
        return http.post('doctor/appointment',data)
    }
    updatePat(id, data) {
        return http.put('doctor/updatePatient/' + id, data)
    }
    getpatient(id, token) {

        return http.get('doctor/getPatientByid/' + id, {
            headers: {
                'Authorization': 'Bearer ' + token
            }

        })


    }
    deleteProfile(id){
        return http.delete('doctor/deleteDoctor/'+id)
    }
}

export default new DoctorDataService();