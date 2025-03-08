import express from 'express'
import {createPatientRecord, deletePatientRecord, patientsRecords, readOnePatientRecord, updatePatientRecord} from '../controller/patient.js'

var router = express.Router()


// patient apis

router.post('/patients', createPatientRecord)
router.get('/patients/:patientId', readOnePatientRecord)
router.get('/patients', patientsRecords)
router.put('/patients/:patientId', updatePatientRecord)
router.delete('/patients/:patientId', deletePatientRecord)


export default router