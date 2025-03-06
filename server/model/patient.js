import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Patient = sequelize.define(
    "Patient",
    {
        patientId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        gender:{
            type: DataTypes.ENUM,
            values: ["Male", "Female"],
            allowNull: false
        },

        birthdate: {
            type: DataTypes.DATEONLY
        },
        current_addresss: DataTypes.TEXT,
        occupation: DataTypes.STRING ,
    },
    {
      getterMethods: {

        getFullname(){
            return [this.firstname, this.lastname].join(' ')
        },
      }
    }
)

// const patient  = new Patient({fistname: "Mtende", lastname:"Mwanza"})
// console.log(patient.getFullname())

export default Patient