const RatingAndReviews = require('../models/RatingAndReviews')
const mongoose  = require('mongoose')
const Course  = require('../models/Course')


// create ratings 
exports.createRating = async(req,res) => {
    try {

        // ftech data for rating 
        const {rating, review, courseId} = req.body;
        // userId
        const userId = req.user.id;
        
        // check if user enrolled or not in a course if enrolled then only he/she can review
        
        const uid = new mongoose.Types.ObjectId(userId);

        if(!Course.studentEnroll.includes(uid)) {
            console.log("User is not enrolled in this course he cant rate and review this course");
            return res.status(401).json({
                sucess: false,
                messgae: "User cannot rate and review this course because he/she is not enrolled in this course",
            })
        }

        // check user alredy reviewd or not
        const ratingReview = await RatingAndReviews.findOne({user: userId}, {course: courseId});

        if(ratingReview) {
            console.log("User Already Reviewed this course");
            return res.status(403).json({
                sucess: false,
                message: "User already reviewed this course",
            })
        }

        // create rating review 

        const ratingResult = RatingAndReviews.create({
            user: userId,
            rating,
            review,
            course: courseId,
        })

        // updating rating in the course

        const updatedCorseRating  = await Course.findByIdAndUpdate({_id: courseId}, 
            {
                $push:{
                    ratingAndReviews: ratingResult._id
                }

            },
            {new: true}
          
        )
        
        // kaam done done hogya bhai log  send the response 
        res.statu(200).json({
            sucess: false,
            message: "Review id added successfully",
            updatedCorseRating,
        })

    } catch (error) {
        console.log("Error in create Rating", error);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in creating the rating tr again later",
        })
    }
}

// get average rating 

exports.getAverageRating = async(req,res) => {
    try {

        // fetch data
        const courseId = req.body;

        // match the course id and get average rating 

        const result = await RatingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating : {$avg: "$rating"},
                }
            }
        ])

        //return rating
        if(result.length > 0) {

            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })

        }
        
        //if no rating/Review exist
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })

    } catch(error) {
        console.log("Error in getAverageRating", error);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in getting average rating ",
        })
    }
}

// getAllRating 

exports.getAllRating = async (req,res) => {
    try {

        const allRatings = await RatingAndReviews.find({})
                                 .sort(({rating: "desc"}))
                                 .populate({
                                    path:"user",
                                    select: "firseName lastName email igame"
                                 })
                                 .populate({
                                    path: "course",
                                    select: "courseName"
                                 })

        res.status(200).json({
            sucess: true,
            message: "All reviews are fetched successfully",
            data: allRatings
        })

    } catch(error) {
        console.log("Error in getAllRating", error);
        return res.status(500).json({
            sucess: false,
            messgae: "Something went wrong in getting all ratings"
        })
    }
}

