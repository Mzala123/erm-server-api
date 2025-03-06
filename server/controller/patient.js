import Patient from "../model/patient.js";


export function createPatientRecord (req, res){
     const patient = Patient.build({firstname: "Mtende"})
     console.log(patient)

      patient.save().then(()=>{

     }).catch(()=>{

     }).finally(()=>{

     })
}