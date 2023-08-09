const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({

    phonenumber : {
        type : int,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email :{
        type : String,
        unique : true
    }
},{timestamps : true});

module.exports = mongoose.model("Users", UserSchema);