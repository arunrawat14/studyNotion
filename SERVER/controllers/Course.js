const Course = require('../models/Course')
const Category = require('../models/category')
const User = require('../models/user')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const RatingAndReviews = require('../models/RatingAndReviews')

// create course schema 

exports.createCourse = async(req,res) => {
    try {
        // fetch all data for course creation 
        const {courseName,
               courseDescription, 
               whatYouWillLearn, 
               price, 
               category,
               tag
        } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
      

        // data validation 
        if(!courseName  || !courseDescription || !whatYouWillLearn || !price || !category) {
            console.log("all feilds are required");
            return res.status(401).json({
                sucess: false,
                message: "all feilds are required"
            })
        }

        // category is valid or not

        const categoryDetails = Category.findById(category)
     

        if(!categoryDetails) {
            console.log("Invalid category: " , category);
            return res.status(404).json({
                sucess: false,
                message: "category details not found",
                error: error.message
            })
        }

        // upload thumbnail to cloudinary server

        const thumbnailuploaded = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log("upload ho gyi image ")
        if(!thumbnailuploaded) {
            console.log("Thumbail not uploaded");
            return res.status(401).json({
                sucess: false,
                message: "Thumbnail not uploaded",
                error: error.message
            })
        }

        const courseDetails  = await Course.create({
            courseName,
            courseDescription,
            price,
            whatYouWillLearn,
            instructor: req.user.id,
            category: categoryDetails._id,
            thumbnail : thumbnailuploaded.secure_url,
            tag,
        })

        if(!courseDetails) {
            console.log("Course not created")
            return res.status(401).json({
                sucess: false,
                message: "Course not created try again later",
                error: error.message
            })
        }

        // add course to the instructor user schema such that he has created a course 
        const updatedUser = await User.findByIdAndUpdate(
            {_id: req.user.id},
            {
                $push: {
                    courses: courseDetails._id,
                }
            },
            {new: true},
        )

        if(!updatedUser) {
            console.log("User courses section is not updated after creating new course")
            return res.status(401).json({
                sucess:  false,
                message: "User courses section is not updated after creating new course",
                error: error.message
            })
        }


        // add course to the category so that category has the imformation that how many courses has these categories are having
        const updateCategory = await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push: {
                    courses: courseDetails._id,
                }
            },
            {new: true},
        )

        if(!updateCategory) {
            console.log("Category courses section is not updated after creating new course")
            return res.status(401).json({
                sucess:  false,
                message: "Category courses section is not updated after creating new course",
                data: courseDetails
            })
        }

        // return response of course creation 
        res.status(200).json({
            sucess: true,
            message: "Course created successfully",
            courseDetails,
        })

    }   catch(error) {
        console.log("Something went wrong in course creation try again later", error.message);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in course creation try again later",
            error: error.message
        })
    }
}

// get all courses function 

exports.getAllCourses = async(req,res) => {
    try{

        const allCourses = await Course.find(
            {},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
            ).populate("instructor")
			.exec();

        if(!allcourses) {
            console.log("All courses not found")
            return res.status(401).json({
                sucess:  false,
                message: "All courses not found"
            })
        }

        res.status(200).json({
            sucess: true,
            message: "All courses found",
            courses: allcourses,
        })

    } catch(error) {
        console.log("Something went wrong in getting all courses");
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in getting all courses"
        })
    }
} 

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            const courseDetails = await Course.find(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        .populate("RatingAndReviews")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSections",
                                            },
                                        })
                                        .exec();

                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


// delete course 


