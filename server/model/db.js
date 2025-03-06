import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()
// console.log("Loaded DB Config:", process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USER, process.env.DATABASE_NAME);
// console.log("inside db file", process.env)

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
    // define:{
    //     freezeTableName
    // }
})


export default sequelize


