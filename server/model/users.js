import { DataTypes, Model } from "sequelize";
import sequelize from "./db.js";
import Person from "./person.js";
import crypto from  "crypto"
import jwt from "jsonwebtoken"
import { sendJsonResponse } from "../services/response.js";

const User = sequelize.define(
    "users",
    {
        userId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
       email:{
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
       },
       hash: {
        type: DataTypes.STRING,
        allowNull: false,
       },
       salt: {
        type: DataTypes.STRING,
        allowNull: false
       },
       personId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Person,
            key: "personId"
        }
       }
    }
)

Person.hasOne(User, {foreignKey:"personId", onDelete:"CASCADE"})
User.belongsTo(Person, {foreignKey:"personId", onDelete:"CASCADE"})


// export const getUserByEmail = (email)=>{
//     User.findOne({where:{"email":email}}).then((user)=>{
//         return user;
//     }).catch((err)=>{
//         return sendJsonResponse(res, 500, err)
//     })
// }

export const setPassword =  (password)=>{
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('base64');
    return { salt, hash };
}

export const validPassword =  (user, password)=>{
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64).toString('base64')
    return user.hash === hash
}

export const generateJWT = (user)=>{
    //  const expiry = new Date()
    //  expiry.setDate(expiry.getDate() + 1)
     return jwt.sign(
        {
            userId: user.userid,
            email: user.email
        },
        process.env.JWT_SECRET,
        {   
            expiresIn:'1d'
        }
     )
}


export default User