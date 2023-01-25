const mongoose= require('mongoose');
const userApplySchema= new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 15,
        trim: true
    },
    resume:{
        type:String,
        require:true,
    },
    coverLetter:{
        type:String,
        require:true
    }
},{timestamps:true});

module.exports= mongoose.model("userApply",userApplySchema)