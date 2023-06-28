const mongoose = require('mongoose');

const  FoundImageSchema = new mongoose.Schema({
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
        type: Number,
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
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model('foundImage', FoundImageSchema);