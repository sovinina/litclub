import db from "../db.js";
import {DataTypes} from "sequelize";

const Events = db.define('events', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    time:{type: DataTypes.TIME, allowNull: false},
    description:{type: DataTypes.TEXT, allowNull: false},
    place:{type: DataTypes.STRING, allowNull: false},
    link:{type: DataTypes.STRING, allowNull: false},
    poster:{type: DataTypes.STRING, defaultValue: "./img/defaultPoster.svg"}
})

const User = db.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    role:{type:DataTypes.STRING, defaultValue: "USER"},
    login:{type:DataTypes.STRING,allowNull:true, unique: true},
    password:{type:DataTypes.STRING, allowNull:true}
})


export default {
    Events, User
}