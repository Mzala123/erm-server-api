import { DataTypes, Model } from "sequelize";
import sequelize from "./db";

class User extends Model{}

User.init(
    {
        email:{
          type: DataTypes.STRING,
          unique: true
        },
    },
    {
        sequelize,
        modelName: "User",
        createdAt: true,
        updatedAt: true
    },
  
)