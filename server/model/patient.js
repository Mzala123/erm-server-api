import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import { get } from "express/lib/response.js";

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
        fullName: {
            type: DataTypes.VIRTUAL,
            get(){
             return `${this.firstname} ${this.lastname}`
            },
            set(value){
                throw new Error(`Do not try to set the ${fullName} value!`)
            }
        }
    },
    // {
    //   getterMethods: {

    //     getFullname(){
    //         return [this.firstname, this.lastname].join(' ')
    //     },
    //   }
    // }
)


export default Patient