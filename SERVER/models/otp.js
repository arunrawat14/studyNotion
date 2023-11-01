const mongoose  = require('mongoose');
const mailSender = require('../utils/mailSender')
const emailTemplate = require('../mail/templates/emailVerificationTemplate')

const OTPschema = new mongoose.Schema({
 
    email : {
        type: String,
        requires: true,
    },

    otp: {
        type: String,
        required: true,
    },

    createdAt: {
        type : Date,
        default: Date.now(),
        expires: 5*60
    }
})


//  a function to send emails 

async function sendverificationEmail(email, otp) {
    try {
        console.log("yha tak ponch gye bhai")
        console.log(email, otp)
        const mailResponse = await mailSender(email, "Verification email from StudyNotion", emailTemplate(otp))
        console.log("Email sent sucessfully", mailResponse);
        console.log("hehe")
    }
    catch(error) {
        console.log("Erron in sending verification email", error);
    }
}

// pre middleware to send otp before saving the data into the mongodb

OTPschema.pre("save", async function(next) {
    await sendverificationEmail(this.email, this.otp);
    next()
})

module.exports = mongoose.model("OTP", OTPschema);