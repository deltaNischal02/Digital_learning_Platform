const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
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
    level:{
        type:Number,
        required:true,
    },
    department:{
        type:String,
        required:true,
    }

},
{
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema)