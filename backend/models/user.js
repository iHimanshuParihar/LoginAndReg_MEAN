const mongoose = require('mongoose');

const Scheema = mongoose.Schema;
const userSchema = new Scheema({
    Name:{type:String},
    Email:{type:String, unique:true},
    Password:{type:String, required:true},
    created_at:{type:Number, default:Date.now().valueOf()},
    updated_at:{type:Number, default:Date.now().valueOf()},
    
}) //created a schema for our data to database



module.exports = mongoose.model('User',userSchema);//exporting this model
