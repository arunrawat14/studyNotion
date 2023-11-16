const User = require('../models/user')
const mailSender = require('../utils/mailSender')
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const {passwordUpdated} = require('../mail/templates/passwordUpdate')
// password reset link generator
exports.resetPasswordToken = async (req, res) => {
    try {

        // fetch email from the request
        const {email} = req.body;

        if(!email) {
            console.log("Email is not given");
            return res.status(401).json({
                success: false,
                message: "Please Enter your email",
            })
        }

        // check if user exist or not 
        const user = await User.findOne({ email: email });

        if (!user) {
            console.log("User is not registered");
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            })
        }

        // token generation 
        const token = crypto.randomBytes(20).toString("hex");


        // update the token in the database of user

        const updatedDetails = await User.findOneAndUpdate({ email: email },
            { token: token },
            { resetTokenExpiration: Date.now() + 5 * 60 * 1000 },
            { new: true });

        // generate url 

        const url = `http://localhost:3000/update-password/${token}`

        // send mail
        const response = await mailSender(email, "Password rest link", `Password reset link: ${url}  `)

        if (!response) {
            console.log("Reset link send nahi hua");
            return res.status(401).json({
                success: false,
                message: "Password reset link is not sent"
            })
        }

        res.status(200).json({
            success: true,
            message: "Password reset link han been sent successfully"
        })

    } catch (error) {
        console.log("Something went wrong in sending reset password link to mail", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in sending reset password link to mail, Try Again Later"
        })
    }
}

// reset password 
exports.resetPassword = async (req, res) => {
    try {

        // fetch data from request
        const { password, confirmPassword, token } = req.body;
        // validation 
        if (!password || !confirmPassword) {
            console.log("please provide both the password and confirmpassword", password, confirmpassword);
            return res.status(401).json({
                success: false,
                message: "Please provide both the password and confirmpassword"
            })
        }

        if (password !== confirmPassword) {
            console.log("Password and Confirm Password does not match");
            return res.status(401).json({
                success: false,
                message: "Password and Confirm Password does not match"
            })
        }



        const userDetails = await User.findOne({ token: token });

        if (!userDetails) {
            console.log("Token is invalid");
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }

        // check token expiration check
        if (userDetails.resetTokenExpiration < Date.now()) {
            console.log("Token expires");
            return res.stauts(401).json({
                success: false,
                message: "Token is experied , Regenerate the token"
            })
        }

        // update the password first hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // update the password
        const updateUserDetails = await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true },
        );

        if (!updateUserDetails) {
            console.log("Something went worng password is not reset, please try again");
            return res.status(401).json({
                success: false,
                message: "Something went worng password is not reset, please try again"
            })
        }

        const response = await mailSender(userDetails.email, "Password Updated Sucessfully", passwordUpdated(userDetails.email, userDetails.firstName) )

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        })

    } catch (error) {
        console.log("Password is not updated try again", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went worng password is not updated, please try again",
        })
    }
}