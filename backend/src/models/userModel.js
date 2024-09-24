const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,

    },
    lastName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["admin","user"],
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    employeeId:{
        type:Number,
        required:true
    },
    level:{
        type:Number,
        required:true,
    },
    department:{
        type:String,
        required:true,
        enum:["arff","mechanical","it","atc"]
    }

},
{
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema)