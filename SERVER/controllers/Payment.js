const instance = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/user')
const mailSender = require('../utils/mailSender')

// capture the payment and initiate the razorpay

exports.capturePayment = async (req, res) => {
    try {

        // fetch courseId UserId

        const courseId = req.body;

        // user id req.user me hai pdi hui
        const userId = req.user.id;

        // validation 

        if (!courseId) {
            console.log("CourseId Not found");
            return res.status(404).json({
                success: false,
                message: "CourseId Not Found in the request Body",
            })
        }

        // validation of course 

        const course = await Course.findById(courseId);

        if (!course) {
            console.log("Course not found");
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            })
        }

        // already enrolled 
        // conver userId into object uid
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentEnroll.includes(userId)) {
            console.log("User Already enrolled")
            return res.status(401).json({
                success: false,
                message: "User already enrolled"
            })
        }

        // create order 

        // amount , currency 
        const amount = course.price;
        const currency = "INR";

        // create option

        const option = {
            amount: amount,
            currency: currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: course._id,
                userId: userId,
            }
        }

        // initiate payment using gateway razorpay
        try {

            const paymentResponse = await instance.orders.create(option);
            console.log(paymentResponse);

            return res.status(200).json({
                sucess: true,
                message: "Order created successfully",
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            })

        } catch (err) {
            console.log(error);
            return res.json({
                success: false,
                message: "Could not initiate order",
            });
        }


    } catch (error) {
        console.log("Error in capturePayment", error);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong with capture payment , Try Again Later"
        })
    }
}

// verify payment signature with the hel[p of razorpay

exports.verifyPaymentSignature = async (req, res) => {
    try {

        // verify payment signature

        // webhookSecret 
        const webhookSecret = "123456678"

        // fetch signature from razorpay
        const signature = req.headers["x-razorpay-signature"];

        // convert webhookSecret to digest 

        const shasum = crypto.createHmac('sha256', webhookSecret);
        // updateing shashum to string
        shasum.update(JSON.stringify(req.body));
        // digest shasum
        const digest = shasum.digest("hex");

        if (signature === digest) {
            console.log("Payment is authorized");

            // ftech useId and courseId
            const { courseId, userId } = req.body.payload.entity.notes;

            // update the course and enroll student in this course
            const enrollCourse = await Course.findByIdAndUpdate(
                { _id: courseId },
                {
                    $push: {
                        studentEnroll: userId,
                    }
                },
                { new: true },
            )

            if (!enrollCourse) {
                console.log("Course not found")
                return res.status(404).json({
                    sucess: false,
                    message: "Course not found so cant enroll course"
                })
            }

            // add course to the users course section 

            const enrollStudent = await User.findByIdAndUpdate(
                { _id: userId },
                {
                    $push: {
                        courses: courseId,
                    }
                },
                {new: true},
            )
            
            // send email that you have purchased the course 
            const emailResponse = await mailSender(enrollStudent.email, 
                "Congratulations from studyNotion",
                "Congratulations , you are onboarded into new Course ..."    
                
            )

            res.status(200).json({
                success: true,
                message: "Signature Verified and COurse Added"
            })


        } else {
            console.log("Payment is not authorized")
            return res.status(401).json({
                success: false,
                message: "Payment is not authorized",
            })
        }

    } catch (error) {
        console.log("Error in Payment Authorization", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong with  Payment Authorization, Try Again Later"
        })

    }
}