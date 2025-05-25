import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import Person from "./person.js";

const Patient = sequelize.define(
    "patients",
    {
        patientId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },  
        personId:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Person,
                key: "personId"
            }
        }
    },
    {
        paranoid: true
    }
)

Person.hasOne(Patient, {foreignKey:"personId", onDelete:"CASCADE"})
Patient.belongsTo(Person, {foreignKey:"personId", onDelete: "CASCADE"})

export default Patient