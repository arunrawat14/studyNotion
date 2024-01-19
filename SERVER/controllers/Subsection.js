const SubSection = require('../models/SubSection')
const Section = require('../models/Section')
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const fileUpload = require('express-fileupload');

// create subsection 
exports.createSubsection = async(req,res) => {
    try {

        // fetch data
        const {sectionId, title, description} = req.body;

        // fetch video file
        const file = req.files.videoFile;

        console.log("section id , title , description , file :::::::::::::::::::-> ", sectionId, title, description, file)

        // validate data 
        if(!title || !description || !sectionId || !file) {
            console.log("All feilds are required for the subsection");
            return res.status(401).json({
                sucess: false,
                message: "All feilds are required for the subsection"
            })
        }

        // upload video to cloudinary serevr
        const uploadDetails = await uploadImageToCloudinary(file, process.env.FOLDER_NAME);

        // create Subsection 
        const newSubsection = await SubSection.create(
            {
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl : uploadDetails.secure_url
            }
        )

        // update subesction in section 
        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
            {
                $push: {
                    subSections: newSubsection._id,
                }
            }, 
            {new: true}).populate("subSections")

        // return section 
        res.status(200).json({
            sucess: true,
            message: "Subsection created successfully",
            data:updatedSection,
        })

    }   catch(error) {
        console.log("Error in creating subsection", error.message);
        return res.status(500).json({
            sucess: false,
            messgae : "Error in creating subsection",
            error: error.message
        })
    }
}

// update subsection 
exports.upadteSubsection = async(req,res) => {
    try {

        // fetch data
        const {title, timeDuration, description, subSectionId} = req.body;

        // fetch video file
        const file = req.files.videoFile;

        // validate data 
        if(!title || !timeDuration || !description || !file) {
            console.log("All feilds are required for the subsection");
            return res.status(401).json({
                sucess: false,
                message: "All feilds are required for the subsection"
            })
        }

        // upload video to cloudinary serevr
        const uploadDetails = await uploadImageToCloudinary(file, process.env.FOLDER_NAME);

        // update Subsection 
        const updateSubsection = await SubSection.findByIdAndUpdate( subSectionId,
            {
            title: title,
            description: description,
            timeDuration: timeDuration,
            videoUrl : uploadDetails.secure_url
            },
            {new: true}
        )

        // return subsection 
        res.status(200).json({
            sucess: true,
            message: "Subsection updated successfully",
            updateSubsection
        })

    }   catch(error) {
        console.log("Error in Updating subsection", error.message);
        return res.status(500).json({
            sucess: false,
            messgae : "Error in Updating subsection",
            error: error.message
        })
    }
}

// delete a subsection 
exports.deleteSubsection = async(req,res) => {
    try {

        // fetch data
        const {sectionId ,subSectionId} = req.body;

        console.log("section id and subsection id are: ", sectionId, " and " + subSectionId);
        // find updated section and return it
        const updatedSection =   await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
              $pull: {
                subSections: subSectionId,
              },
            },
            {new: true}
          ).populate("subSections")

        // validate data 
        if(!subSectionId) {
            console.log("All feilds are required for the subsection");
            return res.status(401).json({
                success: false,
                message: "All feilds are required for the subsection"
            })
        }

      const subSection =   await SubSection.findByIdAndDelete(subSectionId);

       
    if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
   
        // return response 
        res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            data: updatedSection,
        })
    }   catch(error) {
        console.log("Error in Updating subsection");
        console.log(error);
        return res.status(500).json({
            sucess: false,
            messgae : "error in updating section "
        })
    }
}
