// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course")


// Categories Controllers Import
const {
  getAllCategory,
  createCategory,
  CategoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section")

// Sub-Sections Controllers Import
const {
  createSubsection,
  upadteSubsection,
  deleteSubsection,
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReviews")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, upadteSubsection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubsection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.get("/getCourseDetails", getCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", getAllCategory)
router.get("/getCategoryPageDetails", CategoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router