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
        type: Number,
    },
    img: {
        data: Buffer,
        contentType: String,
    },
});

module.exports = new mongoose.model('foundImage', imageSchema);