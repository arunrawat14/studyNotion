require("dotenv").config();
const jwt = require("jsonwebtoken")
require("dotenv").config();

// auth
exports.auth = async(req,res,next) => {
    try {

        // fetch token from the request 
        console.log("yha middelware me check hone se pehle")
        const token =
  req.cookies.token ||
  req.body.token ||
  (req.headers.authorization && req.headers.authorization.replace(/^Bearer\s*/i, "")) ||
  req.token;
        console.log("yha middelware me check hone token pahuncha", token)
        // validate the token 
        if(!token) {
            console.log("Token didn't recived");
            res.status(401).json({
                sucess: false,
                message: "Token is missing"
            })
        } else {

             // decode token that is is authorized of not 

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode) {
            console.log("Token is invalid");
            res.status(401).json({
                sucess: false,
                message: "Token is invalid"
            })
        }

        console.log("decode token: " , decode);
        req.user = decode;

        next();

        }


    }   catch(error) {
            console.log("Something went wrong in authentication", error);
            res.status(500).json({
                sucess: false,
                message: "Something went wrong in authentication"
            })
    }
}

// isstudent

exports.isStudent = async(req,res,next) => {
    try{

        // validating authenticity
        if(req.user.accountType !== "Student") {
            console.log("This route is protected for student only");
            res.status(401).json({
            sucess: false,
            nessage: "This is protected route is protected for student only"
        })
        }
        next();
    }   catch(error) {
            console.log("Something went wrong in student authentication");
            res.status(500).json({
                sucess: false,
                message: "Something went wrong in  student authentication"
            })
    } 
}

//isinstructor
exports.isInstructor = async(req,res,next) => {
    try{
        // validating authenticity
        if(req.user.accountType !== "Instructor") {
            console.log("This route is protected for Instructor only");
           return  res.status(401).json({
                sucess: false,
                message: "This is protected route is protected for Instructor only"
            })
        }
        console.log("middleware check ho gya ab aage jaa rha hai instructor dashboard me ")
        next();
    }   catch(error) {
            console.log("Something went wrong in instructor authentication", error);
            return res.status(500).json({
                sucess: false,
                message: "Something went wrong in instructor authentication"
            })
    } 
}

// isadmin

exports.isAdmin = async(req,res,next) => {
    try{
        // validating authenticity
        console.log("yha ponch gye")
        console.log("account type",req.user.accountType )
        if(req.user.accountType !== "Admin") {
            console.log("This route is protected for Admin only");
            return res.status(401).json({
                sucess: false,
                message: "This is protected route is protected for Admin only"
            })
        }
        next();
    }   catch(error) {
            console.log("Something went wrong in admin authentication", error);
            res.status(500).json({
                sucess: false,
                nessage: "Something went wrong in admin authentication"
            })
    } 
}

