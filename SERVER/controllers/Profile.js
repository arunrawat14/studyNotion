const Profile = require('../models/Profile')
const User = require('../models/user')
const {uploadImageToCloudinary } = require('../utils/imageUploader')
// update the existing profile
exports.updateProfile = async( req, res) => {
    try {

        // fetch data 
        const {gender, dateOfBirth="", about="", contactNumber} =  req.body;
        // fetch id
        const id = req.user.id;

        // validation 
        if(!gender || !id || !contactNumber)  {
            console.log("All fields are required for updating profile");
            return res.status(401).json({
                sucess: false,
                message: "All feilds are required for updating profile"
            })
        }

        // get profile id by user id 
        const userDetails =  await User.findById(id);

        // fetch user profile id from additional details
        const profileId = userDetails.additionalDetails;

        // update profile 

        const updatedProfile = await Profile.findByIdAndUpdate(profileId, {
            gender: gender,
            dateOfBirth: dateOfBirth,
            about: about,
            contactNumber: contactNumber,
        }, {new: true});

        console.log(updatedProfile);

        return res.status(200).json({
            sucess: true,
            message : "Profile updated successfully",
            updatedProfile,
        })

    } catch(error) {
        console.log("Error in updating profile: " , error);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in updating profile, try again later"
        })
    }
}


// delete user 
exports.deleteUser = async( req, res) => {
    try {

        // fetch id
        const id = req.user.id;

        // validation 
        if(!id)  {
            console.log("ID is required for Deleting profile");
            return res.status(401).json({
                sucess: false,
                message: "Id is required for Deleting profile"
            })
        }

        // get profile id by user id 
        const userDetails =  await User.findById(id);

        // fetch user profile id from additional details
        const profileId = userDetails.additionalDetails;

       // delete profile id first 
        await Profile.findByIdAndDelete(profileId);

        //TOOD: HW unenroll user form all enrolled courses

        

        // delete user 
        await User.findByIdAndDelete(userDetails.id);

        res.status(200).json({
            sucess: true,
            message : "Profile deleted successfully"
        })

    } catch(error) {
        console.log("Error in deleting profile: " + error.message);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in deleting profile, try again later",
            error: error.message
        })
    }
}

// get all user details 
exports.getAllUserDetails = async(req,res) => {
    try {

        // fetch user id 
        const userId = req.user.id;

        // fetch details 
        const userDetails = await User.findById(userId)
            .populate("additionalDetails").exec();

        console.log("User details: " , userDetails)

        res.status(200).json({
            sucess: true,
            message: "User Data fetched sucessfully",
            data: userDetails,
        });

    } catch(error) {
        console.log("Error in getting user details: " + error);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in getting user details, try again later"
        })
    }
}



// update profile Picture
exports.updateProfilePicture = async (req,res) => {
    try {

        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        console.log(userId, displayPicture)
        // upload image to cloudinary
        console.log("Profile updated hone se pehle tak") 
        const image  = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
        console.log("Profile updated", image)
        const updateProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: image.secure_url},
            {new: true},
        )

        console.log("Profile updated")
        res.status(200).json({
            sucess: true,
            message: "Profile updated successfully",
            data: updateProfile
        })

    } catch(error) {
        console.log("Error in getting user details: " , error);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in getting user details, try again later"
        })
    }
}


// get enroll courses 

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};