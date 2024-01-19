const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")
const {
  deleteUser,
  updateProfile,
  getAllUserDetails,
  updateProfilePicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile")



// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteUser)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateProfilePicture)
router.get("/instructorDashboard", auth , instructorDashboard)


module.exports = router