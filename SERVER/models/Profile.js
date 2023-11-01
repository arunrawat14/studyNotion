const mongoose  = require('mongoose');

const profiSchema = new mongoose.Schema({
 
    gender: {
        type: String,
    },

    dateOfBirth: {
        type: String,
    },

    about: {
        type: String,
        trim: true,
    },

    contactNumber: {
        type: Number,
        time: true,
    }

})

module.exports = mongoose.model("Profile", profiSchema);