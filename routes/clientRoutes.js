const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require("../controllers/clientController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");
const validateFields = require("../middleware/validateInput");
const Client = require("../models/Client");

// sign up 
router.post(
    "/register",
    validateFields(["name", "username", "email", "password", "phone"]),
    registerUser
);

// sign in
router.post(
    "/login",
    validateFields(["email", "password"]),
    loginUser
);

// get user profile protected with jwt 
router.get("/profile", auth, getProfile);

// update user profile protected with jwt 

router.put("/profile", auth, updateProfile);

// get all clients (admin only)
router.get("/all-clients", auth, roleCheck(["admin"]), async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


module.exports = router;
