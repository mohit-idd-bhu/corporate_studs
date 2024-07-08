const Mongoose = require('mongoose');

const connectionSchema = new Mongoose.Schema({
    from:{
        type:Number,
        required:true
    },
    to:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    }
});

module.exports = Mongoose.model('Connection',connectionSchema);