const Category = require('../models/category')

// create category 
exports.createCategory = async(req,res) => {
    try {

        // fetch data from the user 
        const {name, description} = req.body;

        // validation 
        console.log("name and descriptions are: ",  name, description)

        if(!name || !description) {
            return res.status(401).json({
                sucess: false,
                message: "All feilds are required"
            })
        }

        // category entry in db 
        const newCategory = await Category.create({
            name,
            description
        })

        if(!newCategory) {
            console.log("Category is not created");
            return res.stauts(401).json({
                sucess: false,
                message: "Category is not created"
            })
        }

        res.status(200).json({
            sucess: true,
            message: "Category created successfully",
            newCategory,
        })
        

    }   catch(error) {
        console.log("Error in  creating category", error);
        return res.status(500).json({
            sucess: false,
            message: "Error in  creating category, Try again later"
        })
    }
}


// Get all the Categories
exports.getAllCategory = async(req,res) => {
    try {

        // fetch all the categories

        const allCategory = await Category.find({});

        // send all categories

        res.status(200).json({
            sucess: true,
            message : "All categories are available",
            Category: allCategory,
        })

    }   catch(error) {
        console.log("Something went wrong in getting all the categories")
        res.stauts(500).json({
            sucess: false,
            message: "Something went wrong in getting all the categories"
        })
    }
}

// get all categorypage details

exports.CategoryPageDetails = async(req,res) => {
    try {

        // fetch data
        const {categoryId} = req.body;

        // validation 
        if(!categoryId) {
            console.log("No Ctegory Id Found");
            return res.status(404).json({
                sucess: false,
                message: "Ctegory Id not found"
            })
        }

        const selectedCtegory = await Category.findById(categoryId).populate("courses").exec();

        if(!selectedCtegory) {
            console.log("selected Ctegory not Found");
            return res.status(404).json({
                sucess: false,
                message: "selected Ctegory not Found"
            })
        }

        // get all difeerenet catogories

        const differentCategories = await Category.find({
                                    _id: {$ne: categoryId}, 
                                    }).populate("courses").exec();
        if(!differentCategories) {
            console.log("different Ctegory not Found");
            return res.status(404).json({
                sucess: false,
                message: "different Ctegory not Found"
            })
        }

        res.status(200).json({
            sucess: false,
            message: "Category Page Details Found Successfully",
            selectedCtegory,
            differentCategories
        })


    } catch(error) {
        console.log("Something went wrong in getting all the categoriesPageDetails", error.message);
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong in getting all the categoriesPageDetails",
            error: error.message
        })
    }
}