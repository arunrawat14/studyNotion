const cloudinary = require("cloudinary").v2;

// image uploader function
exports.uploadImageToCloudinary = async(file, folder, height, quality ) => {
    try {
        console.log("yha tak ponch gya hai")
        let options = {folder};
        
        
        if(height) {
            options.height = height;
        }

        if(quality) {
            options.quality = quality;
        }
        
        
        options.resource_type = "auto";
        console.log("yha tak b sb theek hai .........")
        return await cloudinary.uploader.upload(file.tempFilePath, options);

    } catch(error) {
        console.log("Error in uplodaing image in cloudinary function");
        res.status(500).json({
            sucess: false,
            message: "Something went wrong in uploading image to cloudinary",
            error: error.message,
        })
    }
}