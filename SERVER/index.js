const express = require('express')
const app = express();

// routes import 

const userRoutes = require('./routes/User')
const profileRoutes = require('./routes/Profile')
const paymentRoutes = require('./routes/Payments')
const courseRoutes = require('./routes/Course')
const contactUsRoute = require("./routes/Contact");

// inport config 
const cloudinary = require('./config/cloudinary');
const database = require('./config/database')

// env file 
require("dotenv").config();

// middlewares 
const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 4000;

// database connect
database.dbconnect();
// cloudinary connect
cloudinary.cloudinaryConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());
// add cors
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
)
// add fileupload
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

// routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/reach", contactUsRoute);

// default route

app.get('/', (req,res)=> {
    return res.json({
        sucess: true,
        message: "Your server is up and running"
    })
});

// activate your server 

app.listen(PORT, (req,res)=> {
    console.log(`listening on port ${PORT}`);
})
