import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Patient = sequelize.define(
    "patients",
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
        fullname: {
            type: DataTypes.VIRTUAL,
            get(){
             return `${this.firstname} ${this.lastname}`
            },
            set(value){
                throw new Error(`Do not try to set the ${fullName} value!`)
            }
        }
    },
)


export default Patient