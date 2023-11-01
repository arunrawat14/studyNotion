// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPaymentSignature } = require("../controllers/Payment")
const { auth, isStudent } = require("../middleware/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifyPaymentSignature)

module.exports = router