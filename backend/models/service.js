const Mongoose = require('mongoose');

const serviceSchema = new Mongoose.Schema({
    service:{
        type:String,
        required:true
    },
    allow:{
        type:[String],
        default:[]
    },
    deny:{
        type:[String],
        default:[]
    }
});

module.exports = Mongoose.model('Service',serviceSchema);