const Course = require('../models/Course')
const Category = require('../models/category')
const User = require('../models/user')
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const RatingAndReviews = require('../models/RatingAndReviews')
const { convertSecondsToDuration } = require("../utils/secToDuration")
const CourseProgress = require('../models/CourseProgress')
// create course schema 

exports.createCourse = async(req,res) => {
    try {
        // fetch all data for course creation 
        const {courseName,
               courseDescription, 
               whatYouWillLearn, 
               price, 
               category,
               tag: _tag,
               status,
            instructions: _instructions,
        } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
      
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        // data validation 
        if(!courseName || !tag.length || !instructions.length || !courseDescription || !whatYouWillLearn || !price || !category) {
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
        
        if(!thumbnailuploaded) {
            console.log("Thumbail not uploaded");
            return res.status(401).json({
                sucess: false,
                message: "Thumbnail not uploaded",
                error: error.message
            })
        }

        console.log("upload ho gyi image ")

        const courseDetails  = await Course.create({
            courseName,
            courseDescription,
            price,
            whatYouWillLearn,
            instructor: req.user.id,
            category: categoryDetails._id,
            thumbnail : thumbnailuploaded.secure_url,
            tag,
            status: status,
        instructions,
        })

        if(!courseDetails) {
            console.log("Course not created")
            return res.status(401).json({
                sucess: false,
                message: "Course not created try again later",
                error: error.message
            })
        }
        console.log("aad course to the instructor user schema tak ho gya ")
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

        console.log("add  course to the category tak ho gya")
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
        
        console.log(" sb successfully ho gya")

    }   catch(error) {
        console.log("Something went wrong in course creation try again later", error.message);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in course creation try again later",
            error: error.message
        })
    }
}


// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("RatingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// get all courses function 

exports.getAllCourses = async(req,res) => {
    try{

        const allCourses = await Course.find(
            {status: "Published" },
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
            const {courseId} = req.query;
            console.log("getcourse details me aagya peeche ::::::>>>>>>", courseId);
            //find course details
            const courseDetails = await Course.findById({_id:courseId})
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
                                                select: "-videoUrl",
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

                let totalDurationInSeconds = 0;

                // Check if courseDetails is defined and has courseContent
                if (courseDetails && courseDetails.courseContent) {
                  courseDetails.courseContent.forEach((content) => {
                    // Check if content has subSections
                    if (content.subSections) {
                      content.subSections.forEach((subSection) => {
                        // Check if subSection has timeDuration and it's a valid number
                        const timeDurationInSeconds = parseInt(subSection?.timeDuration);
                
                        if (!isNaN(timeDurationInSeconds)) {
                          totalDurationInSeconds += timeDurationInSeconds;
                        }
                      });
                    }
                  });
                }
                

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
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

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.query
    const userId = req.user.id
    const courseDetails = await Course.findById(courseId).populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("RatingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSections.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled

          if (studentsEnrolled && studentsEnrolled.length > 0) {
            for (const studentId of studentsEnrolled) {
              await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
              });
            }
          } 
      
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      
      if (courseSections && courseSections.length > 0) {
        for (const sectionId of courseSections) {
          // Delete sub-sections of the section
          const section = await Section.findById(sectionId);
          if (section) {
            const subSection = section.subSections;
            
            if (subSection && subSection.length > 0) {
              for (const subSectionId of subSection) {
                await SubSection.findByIdAndDelete(subSectionId);
              }
            }
          }
      
          // Delete the section
          await Section.findByIdAndDelete(sectionId);
        }
      }
      
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }
