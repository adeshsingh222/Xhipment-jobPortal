const mongoose= require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const jobSchema= new mongoose.Schema({

    title:{
        type:String,
        require:true,
        time:true
    },
    discription:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        lowercase: true
    },

    skills:{
        type:String,
        // require:true,
        trim:true,
    },
    experience:{
        type:Number,
        // require:true,
        trim:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

},{timestamps:true});

module.exports = mongoose.model("job", jobSchema);