const mongoose  = require('mongoose');

const categoryschema = new mongoose.Schema({
 
    name : {
        type: String,
        requires: true,
    },

    description: {
        type: String,
        required: true,
    },

    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }]
})

module.exports = mongoose.model("Category", categoryschema);