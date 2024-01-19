const mongoose  = require('mongoose');

const courseschema = new mongoose.Schema({
 
    courseName : {
        type: String,
        required: true,
        trim: true,
    },

    courseDescription : {
        type: String,
        required: true,

    },

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    whatYouWillLearn: {
        type: String ,

    },

    courseContent : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],

    RatingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews",
    }],

    price: {
        type: Number,
        required: true,
    },

    thumbnail: {
        type: String ,
        required: true,
    },

    category: {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },

    studentEnroll: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    status: {
		type: String,
		enum: ["Draft", "Published"],
        default: "Draft",
	},
    instructions: {
		type: [String],
	},
    tag: {
		type: [String],
		required: true,
	},
    createdAt: { type: Date, default: Date.now },
})


module.exports = mongoose.model("Course", courseschema);