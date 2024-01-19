const nodemailer = require('nodemailer');
require("dotenv").config();
const mailSender = async (email, title, body) => {
    try {
        console.log(process.env.MAIL_HOST)
        console.log(process.env.MAIL_USER)
        console.log(process.env.MAIL_PASS)
        console.log("Yha Tak bhi ponch gye hain");
        
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        console.log("yha tak aa gye hain mail send hone se just  pehle")

             let info  =  await transporter.sendMail({
                from : "studyNotion || Arun rawat",
                to : `${email}`,
                subject: `${title}`,
                html: `${body}`,
            })

            console.log("Yha gadbad nhi hai")
            console.log(info)
            return info;
    }
    catch (err) {
        console.log("error in sending mail in mailsender function ", err);
        // res.status(500).json({
        //     sucess: false,
        //     message: "error sending mail in mailsender function"
        // })
    }
} 

module.exports = mailSender;