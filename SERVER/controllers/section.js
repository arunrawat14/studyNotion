const Section = require('../models/Section')
const Course = require('../models/Course');
const { response } = require('express');

exports.createSection = async (req, res) => {
    try {

        //fetch data
        const { sectionName, courseId } = req.body;

        // validation 
        if (!sectionName) {
            console.log("All feilds are required");
            return res.status(401).json({
                sucess: false,
                message: "All feilds are required",
            })
        }

        // create section 
        const newSection = await Section.create({ sectionName: sectionName });

        // update section in course 
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            { new: true })

        // send response 
        res.status(200).json({
            sucess: true,
            message: "Section Created successfully",
            updatedCourse,
            newSection,
        })

    } catch (error) {
        console.log("Error in creating section: ", error.message);
        return res.status(500).jaon({
            sucess: false,
            message: "Error creating section",
            error: error,
        })
    }
}

// update the section 
exports.updateSection = async (req, res) => {
    try {

        // fetch data
        const { sectionName, sectionId } = req.body;

        // validation 
        if (!sectionName || !sectionId) {
            console.log("Please provide a section name and a section id");
            return res.status(401).json({
                sucess: false,
                message: "Please provide a section name and a section id"
            })
        }

        // update section 

        const updateSection = await Section.findByIdAndUpdate(sectionId,
            { sectionName: sectionName }, { new: true })

        // send response 
        res.status(200).json({
            sucess: false,
            messgae: " Section updated Successfully",
            updateSection: updateSection
        })


    } catch (error) {
        console.log("Error in Updating section: ", error);
        return res.status(500).jaon({
            sucess: false,
            message: "Error Updating section"
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {

        // fetch section id 
        const { sectionId , courseId} = req.body;
        console.log("Section id is ", sectionId)
        // validation 
        if (!sectionId) {
            console.log("SectionId not found in Request");
            return res.status(404).json({
                sucesS: false,
                message: "SectionId not found in request"
            })
        }

        // delete section 
        await Section.findByIdAndDelete(sectionId);

        // Remove the reference to the section from the specified course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $pull: { courseContent: sectionId } },
            { new: true }
        );

        res.status(200).json({
            sucess: true,
            message: "Section deleted successfully",
            updatedCourse
        })
    } catch (error) {
        console.log("Error in Deleting section: ", error.message);
        return res.status(500).json({
            sucess: false,
            message: "Error Deleting section"
        })
    }
}