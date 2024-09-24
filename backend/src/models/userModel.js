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
    phoneNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
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
        enum:["ARFF","MECHANICAL","IT","ATC"]
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","User"],
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

},
{
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema)