import { where } from "sequelize";
import Patient from "../model/patient.js";
import { sendJsonResponse } from "../services/response.js";
import { Sequelize, Op, QueryTypes } from 'sequelize'
import sequelize from "../model/db.js";

export const createPatientRecord = (req, res) => {
    const { firstname, lastname, gender, birthdate, current_address, occupation } = req.body
    if (!firstname || !lastname) {
        sendJsonResponse(res, 400, { "message": "Please fill in all requireds fields" })
    }
    Patient.create({
        firstname,
        lastname,
        gender,
        birthdate,
        current_address,
        occupation
    }).then(() => {
        sendJsonResponse(res, 201, { "message": "Patient record created successfully!" })
    }).catch((err) => {
        sendJsonResponse(res, 500, { "message": "Failed to create patient record! " + err })
    })
}

export const patientsRecords = async (req, res) => {
        const patients = await sequelize.query('SELECT * FROM patients WHERE lastname ILIKE :lastname',
            {
                replacements: {lastname: "%nza"},
                mapToModel: true,
                model: Patient,
                type: QueryTypes.SELECT
            }
        )

        sendJsonResponse(res, 200, patients)
        // Patient.findAll(
        //     {
        //         attributes:{
        //             exclude: ["createdAt", "updatedAt"]
        //         },
        //         order: [['firstname', 'ASC']]
        //     }
        // )
        // .then((patient)=>{
             
        //     sendJsonResponse(res, 200, patient)
        // }).catch((err)=>{
        //     sendJsonResponse(res, 500, err)
        // })
}

export const readOnePatientRecord = (req, res) => {
     const{patientId} =  req.params
     Patient.findByPk(patientId, {attributes:{
        exclude: ["createdAt", "updatedAt"]
     }}).then((patient)=>{
        sendJsonResponse(res, 200, patient)
     }).catch((err)=>{
        sendJsonResponse(res, 500,  {"message":"Error finding patient record "+err})
     })
}

export const updatePatientRecord = (req, res) => {

    const {patientId} = req.params
    const { firstname, lastname, gender, birthdate, current_address, occupation } = req.body

    if (!firstname || !lastname) {
        sendJsonResponse(res, 500, { "message": "Please fill in all requireds fields" })
    }

    Patient.update(
        {
            firstname, 
            lastname, 
            gender, 
            birthdate,
            current_address, 
            occupation
        },
        {
            where: {patientId}
        }
    ).then(()=>{
        sendJsonResponse(res, 200, {"message":"Patient record updated successfully"})
    }).catch((err)=>{
        sendJsonResponse(res, 500, {"message":"Failed to updated patients record ",err})
    })

}

export const deletePatientRecord = (req, res) => {
     const {patientId} = req.params
     Patient.destroy(
        {
            where: {patientId}
        }
     ).then(()=>{
        sendJsonResponse(res, 200, {"message":"Patient record removed successfully"})
     }).catch((err)=>{
        sendJsonResponse(res, 500, {"message":"Failed to remove patient record ", err})
     })
}