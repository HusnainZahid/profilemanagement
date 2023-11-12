const express = require("express");
const router = express.Router();
const { SignUp, Login, Logout } = require("../controllers/auth");
const { Validator, validate } = require("../middleware/authValidator");
const { AllProfiles, profile, updateProfile, deleteProfile } = require("../controllers/profile");
const authToken = require("../middleware/authenticateToken");
const uploadFile = require("../middleware/uploadFile");

let routes = (app) => {
    
    router.post("/signup",Validator,validate,SignUp);
    router.post("/login",Login);
    router.post("/logout",authToken,Logout);

    router.get("/profile", authToken,AllProfiles);
    router.get("/profile/:id",authToken,profile);
    router.put("/profile/:id",authToken,uploadFile.single('image'),updateProfile);
    router.delete("/profile/:id",deleteProfile);

    return app.use("/api", router);
};

module.exports = routes;