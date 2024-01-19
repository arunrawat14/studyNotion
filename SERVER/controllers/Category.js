const Category = require('../models/category')

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

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
        res.status(500).json({
            sucess: false,
            message: "Something went wrong in getting all the categories"
        })
    }
}

// get all categorypage details

exports.CategoryPageDetails = async(req,res) => {
    try {

        // fetch data
         const { categoryId } = req.query;

        console.log("fetch category page data tak ponch gya bhai logon:::::::::::::->>>>>", categoryId )

        // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
    .populate({
      path: "courses",
      match: { status: "Published" },
      populate: "RatingAndReviews",
    })
    .exec()

  console.log("SELECTED COURSE", selectedCategory)
  // Handle the case when the category is not found
  if (!selectedCategory) {
    console.log("Category not found.")
    return res
      .status(404)
      .json({ success: false, message: "Category not found" })
  }
  // Handle the case when there are no courses
  if (selectedCategory.courses.length === 0) {
    console.log("No courses found for the selected category.")
    return res.status(404).json({
      success: false,
      message: "No courses found for the selected category.",
    })
  }

       // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      console.log()
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)

        res.status(200).json({
            success: true,
            message: "Category Page Details Found Successfully",
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
              },
        })

    } catch(error) {
        console.log("Something went wrong in getting all the categoriesPageDetails", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in getting all the categoriesPageDetails",
            error: error.message
        })
    }
}