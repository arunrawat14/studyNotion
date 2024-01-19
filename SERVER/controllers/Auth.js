const User = require('../models/user')
const OTP = require('../models/otp')
const Profile = require('../models/Profile')
const bcrypt = require("bcrypt");
const otpgenerator = require('otp-generator');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// send OTP
exports.sendOTP = async (req, res) => {
    try {

        // extract email from the requesst
        const {email} = req.body;

        // check that user already exist or not 
        const checkUserPresent = await User.findOne({ email: email });

        // if user already exists then send response that user already exists
        if (checkUserPresent) {
            return res.status(401).json({
                sucess: false,
                message: "User already exists"
            })
        }

        // generate otp using otp generator
        let otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log(otp);

        // check unique otp or not 
        let result = await OTP.findOne({ otp: otp });

        //  generate otp till fresh otp is found 
        while (result) {

            otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({ otp: otp });
        }
        

        // creating payload for storing the otp in db

        const payload = { email, otp };

        // saving the payload in the otp database
        const otpbody = await OTP.create(payload);
        console.log(otpbody);

        res.status(200).json({
            success: true,
            message: 'OTP sent sucessfully'
        })
    }
    catch (error) {
        console.log("Error in otp sending", error.message);
        return res.status(500).json({
            sucess: false,
            error: error.message,
            message: "Something went wrong try again"
        })
    }
}


// signup
exports.signUp = async (req, res) => {
    try {
        // data fetch from the request
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;


        // all input feild validations are required
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            console.log("all feilds are not filled ");
            return res.status(400).json({
                success: false,
                message: "All feilds are required"
            })
        }
        console.log("yha tak aagye signup me ")
        if (!validator.isEmail(email)) {
            console.log("Email address is not valid");
            return res.status(400).json({
                success: false,
                message: "Email address is not valid"
            })
        }

        // find existing user 
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        // match password and confrimpassword

        if (password !== confirmPassword) {
            console.log("password and confirmpassword does not match");
            return res.status(401).json({
                success: false,
                message: "password and confirmpassword does not match"
            })
        }

        // find the most recent otp for the otp verification 
        const recentotp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);

        console.log("yha tak bhi ponch gye otp fetch krne ko")
        console.log(recentotp)
        // check weather otp found or not
        if (!recentotp) {
            // otp not found 
            console.log("otp not found ");
            return res.status(400).json({
                success: false,
                message: "otp not found"
            })
        } else if (otp !== recentotp.otp) {
            // otp does not match
            console.log("otp does not match");
            return res.status(401).json({
                success: false,
                message: "otp does not match"
            })
        }

        console.log("neeche aa gye otp fetch krke otp match kar gya ")

        // otp match kar gya

        // hash the password 
        const hashpassword = await bcrypt.hash(password, 10);


        // creating profile to save its refrence 

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })

        // create entry in the database
        const user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashpassword,
            additionalDetails: profileDetails._id,
            accountType,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        console.log("user registration successful")
        return res.status(200).json({
            success: true,
            message: "user registered sucessfully",
            user,
        })
    }
    catch (error) {
        console.log("Error in SIgnup ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong please register again",
        })
    }
}


// login 
exports.login = async (req, res) => {
    try {

        //data fetch from the request 
        const { email, password } = req.body;

        // validation 

        if (!email || !password) {
            console.log("all feilds are required");
            return res.status(400).json({
                success: false,
                message: "All feilds are required",
                error: "Please fill all the feilds "
            })
        }

        // check user exits or not 
        const user = await User.findOne({ email: email }).populate("additionalDetails");

        // check if not exists
        if (!user) {
            console.log("user not registered");
            return res.status(401).json({
                success: false,
                message: `User Not Registered`,
                error: "User Not Registered"

            })
        }

        // user exists
        // password matches or not check 
        if (await bcrypt.compare(password, user.password)) {
            // password matches

            // ready payload 
            const payload = {
                email: email,
                id: user._id,
                accountType: user.accountType
            }

            // sign the token 
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2d'
            })

            user.token = token.object
            user.password = undefined

            // create cookie and send response 

            // create option 

            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie('token', token, option).status(200).json({
                success: true,
                user,
                token,
                message: "user log in sucessfully"
            })
            console.log("User Logged In Sucessfully");
        }
        else {
            console.log("password does not match");
            return res.status(400).json({
                success: false,
                message: "Password does not match",
            })
        }
    }
    catch (error) {
        console.log("Login not sucessfull", error);
        return res.status(500).json({
            sucess: false,
            message: "something went wrong login again",
            error: "Something went wrong login again"
        })
    }
}

// change password
exports.changepassword = async (req, res) => {
    try {

        const { password, newpassword, conformnewpassword } = req.body;

        if (!password || !newpassword || !conformnewpassword) {
            console.log("All feilds are requires");
            return res.status(401).json({
                sucess: false,
                message: "All feilds are required"
            })
        }

        // doing all this stuff just to get email
        const token = req.header("Authorization").replace("Bearer", "");

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const { email } = decode.email;

        const user = await User.findOne({ email: email });

        if (!user) {
            console.log("Somethis went wrong try again");
            return res.status(401).json({
                sucess: false,
                message: "Something went wrong try again"
            })
        }

        // new password and confirm new password should be same 
        if (newpassword !== conformnewpassword) {
            console.log("New Password and Confirm New Password");
            return res.status(401).json({
                sucess: false,
                message: "New Password and Confirm New Password"
            })
        }

        if(await bcrypt.compare(password, user.password)) {
            // password match 
            const hashednewpassword = bcrypt.hash(password, 10);

            // find one and update save entry in database 

            const respone  = await User.findOneAndUpdate(   {email: user.email},
                                                            { password: hashedPassword }, 
                                                            {new:true});
            console.log(response);

            res.status(200).json({
                sucess: false,
                message: "Password changes sucessfully"
            })
        }
        else {
            console.log("Password does not match ");
            return res.status(401).json({
                sucess: false,
                message: "Password does not match"
            })
        }
    }
    catch (error) {
        console.log("something went wrong password change cannot possible try again")
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong try again tu change your password",
        })
    }
}
