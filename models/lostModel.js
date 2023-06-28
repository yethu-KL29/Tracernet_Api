const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age:{
        type: Number,

    },
    gender:{
        type: String,
    },
    location:{
        type: String,
    },
    description:{
        type: String,
    },
    contactnumber:{
        type: String,
    },
    img: {
        data: Buffer,
        contentType: String,
    },
    identification:{
        type: String,
    },
    complaint:{
        type: String,
        
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model('Image', imageSchema);